const FuturesFundPhotoClient = require("./futures-fund-photo-client")
const ImageResizer = require("./image-resizer")
const S3Client = require("./s3-client")

const processImage = (image) => {
  const s3Prefix = `photos/${image.image_id}/`
  const uploadPath = s3Prefix + "upload"
  const thumbPath = s3Prefix + "thumb" + _extensionSuffix(image)
  const originalPath = s3Prefix + "original" + _extensionSuffix(image)

  let originalBuffer

  return S3Client.getObject(uploadPath).then(buffer => {
    originalBuffer = buffer
    return ImageResizer.resizeThumbnail(originalBuffer)
  }).then(thumbBuffer => {
    return Promise.all([
      S3Client.uploadObject(originalPath, originalBuffer),
      S3Client.uploadObject(thumbPath, thumbBuffer)
    ])
  }).then(() => {
    return FuturesFundPhotoClient.markImageProcessed(image)
  }).then(() => {
    return S3Client.deleteObject(uploadPath)
  })
}

const _extensionSuffix = (image) => {
  if (image.extension) {
    return `.${image.extension}`
  } else {
    return ""
  }
}

module.exports = { processImage }
