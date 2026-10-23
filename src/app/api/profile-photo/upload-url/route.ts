import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(request: Request) {
  try {
    // Authenticate using the existing Supabase session.
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: "You must sign in first." },
        { status: 401 }
      );
    }

    // Validate the request body.
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("contentType" in body) ||
      !("size" in body)
    ) {
      return NextResponse.json(
        { error: "Missing file information." },
        { status: 400 }
      );
    }

    const { contentType, size } = body as {
      contentType: unknown;
      size: unknown;
    };

    if (
      typeof contentType !== "string" ||
      !ALLOWED_TYPES.includes(contentType)
    ) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    if (
      typeof size !== "number" ||
      !Number.isSafeInteger(size) ||
      size <= 0 ||
      size > MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        { error: "Image must be 5 MB or smaller." },
        { status: 400 }
      );
    }

    // Ensure R2 credentials are configured on the server.
    const {
      R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME,
    } = process.env;

    if (
      !R2_ACCOUNT_ID ||
      !R2_ACCESS_KEY_ID ||
      !R2_SECRET_ACCESS_KEY ||
      !R2_BUCKET_NAME
    ) {
      console.error("R2 environment variables are missing.");

      return NextResponse.json(
        { error: "Upload service is not configured." },
        { status: 500 }
      );
    }

    const r2 = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    // Generate the key on the server, never from client input.
    const key = `profile-photos/${user.id}/${randomUUID()}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      ContentLength: size,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 300,
    });

    return NextResponse.json(
      {
        uploadUrl,
        key,
        contentType,
        expiresIn: 300,
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Profile-photo URL generation failed:", error);

    return NextResponse.json(
      { error: "Could not authorize the upload." },
      { status: 500 }
    );
  }
}
