import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function matchesImageSignature(
  bytes: Uint8Array,
  contentType: string
): boolean {
  if (contentType === "image/jpeg") {
    return (
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff
    );
  }

  if (contentType === "image/png") {
    return (
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }

  if (contentType === "image/webp") {
    return (
      bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
    );
  }

  return false;
}

export async function POST(request: Request) {
  let r2: S3Client | undefined;
  let bucket: string | undefined;
  let key: string | undefined;

  try {
    const origin = request.headers.get("origin");

    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must sign in first." },
        { status: 401 }
      );
    }

    const body: unknown = await request.json().catch(() => null);

    if (
      typeof body !== "object" ||
      body === null ||
      !("key" in body) ||
      typeof body.key !== "string"
    ) {
      return NextResponse.json(
        { error: "A valid object key is required." },
        { status: 400 }
      );
    }

    key = body.key;

    // Only accept UUID-named objects in this user's folder.
    const keyPattern = new RegExp(
      `^profile-photos/${user.id}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`,
      "i"
    );

    if (!keyPattern.test(key)) {
      return NextResponse.json(
        { error: "Invalid profile-photo object key." },
        { status: 403 }
      );
    }

    const {
      R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME,
      R2_PUBLIC_URL,
    } = process.env;

    if (
      !R2_ACCOUNT_ID ||
      !R2_ACCESS_KEY_ID ||
      !R2_SECRET_ACCESS_KEY ||
      !R2_BUCKET_NAME ||
      !R2_PUBLIC_URL
    ) {
      console.error("R2 environment variables are missing.");

      return NextResponse.json(
        { error: "Upload service is not configured." },
        { status: 500 }
      );
    }

    r2 = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    bucket = R2_BUCKET_NAME;

    const object = await r2.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    const contentType = object.ContentType;
    const size = object.ContentLength;

    if (
      !contentType ||
      !ALLOWED_TYPES.includes(contentType) ||
      typeof size !== "number" ||
      size <= 0 ||
      size > MAX_FILE_SIZE
    ) {
      await r2.send(
        new DeleteObjectCommand({ Bucket: bucket, Key: key })
      );

      return NextResponse.json(
        { error: "The uploaded image is invalid or exceeds 5 MB." },
        { status: 400 }
      );
    }

    // Read only the first 12 bytes for a basic file-signature check.
    const imageObject = await r2.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        Range: "bytes=0-11",
      })
    );

    const signature = imageObject.Body
      ? await imageObject.Body.transformToByteArray()
      : new Uint8Array();

    if (!matchesImageSignature(signature, contentType)) {
      await r2.send(
        new DeleteObjectCommand({ Bucket: bucket, Key: key })
      );

      return NextResponse.json(
        { error: "The file content does not match an allowed image type." },
        { status: 400 }
      );
    }

    const baseUrl = R2_PUBLIC_URL.replace(/\/+$/, "");
    const encodedKey = key
      .split("/")
      .map(encodeURIComponent)
      .join("/");
    const publicUrl = `${baseUrl}/${encodedKey}`;

    // This uses the user's session and is subject to Supabase RLS.
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ profile_photo_url: publicUrl })
      .eq("id", user.id)
      .select("id")
      .maybeSingle();

    if (updateError || !data) {
      // The previous profile photo URL remains unchanged.
      try {
        await r2.send(
          new DeleteObjectCommand({ Bucket: bucket, Key: key })
        );
      } catch (cleanupError) {
        console.error("Failed to clean up uploaded photo:", cleanupError);
      }

      console.error(
        "Profile-photo database update failed:",
        updateError
      );

      return NextResponse.json(
        { error: "Could not save your profile photo." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        profilePhotoUrl: publicUrl,
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Profile-photo finalization failed:", error);

    // Clean up only the new upload if finalization fails.
    if (r2 && bucket && key) {
      try {
        await r2.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          })
        );
      } catch (cleanupError) {
        console.error("Profile-photo cleanup failed:", cleanupError);
      }
    }

    return NextResponse.json(
      { error: "Could not verify and save the uploaded photo." },
      { status: 500 }
    );
  }
}
