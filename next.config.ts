import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  // Images are optimized after `next build` by next-image-export-optimizer
  images: {
    loader: "custom",
    imageSizes: [],
    deviceSizes: [480, 640, 828, 1080, 1920],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/assets",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    nextImageExportOptimizer_quality: "85",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    nextImageExportOptimizer_remoteImageCacheTTL: "0",
  },
  trailingSlash: true,
}

export default nextConfig
