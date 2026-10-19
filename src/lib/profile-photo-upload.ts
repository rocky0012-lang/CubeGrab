const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES: string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

type UploadResult = {
  profilePhotoUrl: string;
};

type UploadUrlResponse = {
  uploadUrl?: string;
  key?: string;
  error?: string;
};

type FinalizeResponse = {
  profilePhotoUrl?: string;
  error?: string;
};

function putFileWithProgress(
  uploadUrl: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(
          Math.round((event.loaded / event.total) * 100)
        );
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(
          new Error(
            `R2 upload failed with status ${xhr.status}.`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(
        new Error(
          "Upload failed. Check your connection and R2 CORS settings."
        )
      );
    };

    xhr.onabort = () => {
      reject(new Error("Upload was cancelled."));
    };

    xhr.send(file);
  });
}

export async function uploadProfilePhoto(
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Choose a JPG, PNG, or WebP image.");
  }

  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    throw new Error(
      "Your image must be larger than 0 bytes and no bigger than 5 MB."
    );
  }

  const urlResponse = await fetch(
    "/api/profile-photo/upload-url",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        contentType: file.type,
        size: file.size,
      }),
    }
  );

  const urlData = (await urlResponse.json()) as UploadUrlResponse;

  if (!urlResponse.ok) {
    throw new Error(
      urlData.error || "Could not authorize the upload."
    );
  }

  if (
    typeof urlData.uploadUrl !== "string" ||
    typeof urlData.key !== "string"
  ) {
    throw new Error(
      "The server returned an invalid upload response."
    );
  }

  // Upload directly to R2, not through the Next.js server.
  await putFileWithProgress(
    urlData.uploadUrl,
    file,
    onProgress
  );

  const finalizeResponse = await fetch(
    "/api/profile-photo/finalize",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        key: urlData.key,
      }),
    }
  );

  const finalizeData = (await finalizeResponse.json()) as FinalizeResponse;

  if (!finalizeResponse.ok) {
    throw new Error(
      finalizeData.error ||
        "Could not verify and save your profile photo."
    );
  }

  if (typeof finalizeData.profilePhotoUrl !== "string") {
    throw new Error(
      "The server did not return the saved photo URL."
    );
  }

  onProgress(100);

  return {
    profilePhotoUrl: finalizeData.profilePhotoUrl,
  };
}
