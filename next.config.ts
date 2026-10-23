import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // AFTER CONNECTING TO MY OWN CDN (Clouflare R2) OR HOSTING IMAGES LOCALLY, REMOVE THE BELOW BLOCK.
  // REMOVE THE BELOW BLOCK IF YOU ARE NOT USING IMAGES FROM EXTERNAL SOURCES AND AFTER CONNECTING TO MY OWN CDN OR HOSTING IMAGES LOCALLY. THIS IS TO ALLOW NEXT.JS TO LOAD IMAGES FROM EXTERNAL SOURCES.
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

export default nextConfig;
