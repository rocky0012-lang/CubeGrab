
import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function DELETE(request: Request) {
  try {
    // Protect against cross-origin requests.
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
        { error: "Photo removal is not configured." },
        { status: 500 }
      );
    }

    // Read only the signed-in user's own profile.
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("profile_photo_url")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Could not load profile photo:", profileError);

      return NextResponse.json(
        { error: "Could not retrieve your profile photo." },
        { status: 500 }
      );
    }

    const photoUrl = profile?.profile_photo_url;

    if (!photoUrl) {
      return NextResponse.json({
        success: true,
        message: "You do not have a saved profile photo.",
      });
    }

    // Derive the object key from the stored URL.
    // Never accept an arbitrary R2 key from the browser.
    let key: string;

    try {
      const publicBase = new URL(R2_PUBLIC_URL);
      const storedUrl = new URL(photoUrl);
      const basePath = publicBase.pathname.replace(/\/+$/, "");
      const storedPath = storedUrl.pathname;

      if (
        storedUrl.origin !== publicBase.origin ||
        !storedPath.startsWith(`${basePath}/`)
      ) {
        throw new Error("Photo URL is outside the configured public domain.");
      }

      key = decodeURIComponent(
        storedPath.slice(basePath.length + 1)
      );
    } catch {
      return NextResponse.json(
        { error: "The saved photo URL is invalid. Please contact support." },
        { status: 400 }
      );
    }

    // Restrict deletion to this user's profile-photo object.
    const safeKeyPattern = new RegExp(
      `^profile-photos/${user.id}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`,
      "i"
    );

    if (!safeKeyPattern.test(key)) {
      return NextResponse.json(
        { error: "The saved photo does not match your account." },
        { status: 403 }
      );
    }

    // Clear the database URL first so the application stops displaying it.
    const { data: updatedProfile, error: updateError } = await supabase
      .from("users")
      .update({ profile_photo_url: null })
      .eq("id", user.id)
      .select("id")
      .maybeSingle();

    if (updateError || !updatedProfile) {
      console.error("Could not clear profile photo URL:", updateError);

      return NextResponse.json(
        {
          error:
            "Could not remove your profile photo from your account. Check your Supabase permissions.",
        },
        { status: 500 }
      );
    }

    // Delete the corresponding image from Cloudflare R2.
    const r2 = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    try {
      await r2.send(
        new DeleteObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
        })
      );
    } catch (storageError) {
      console.error(
        "Profile URL cleared, but R2 deletion failed:",
        storageError
      );

      return NextResponse.json(
        {
          success: false,
          profilePhotoRemoved: true,
          storageCleanupPending: true,
          error:
            "Your profile photo was removed from your account, but storage cleanup failed. Please try again later or contact support.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profilePhotoRemoved: true,
      storageDeleted: true,
    });
  } catch (error) {
    console.error("Profile photo removal failed:", error);

    return NextResponse.json(
      { error: "Could not remove your profile photo." },
      { status: 500 }
    );
  }
}
