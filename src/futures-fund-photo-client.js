const request = require("request-promise")

const markImageProcessed = (image) => {
  const url = process.env.PHOTO_PROCESSED_CALLBACK_URL.replace("{token}", image.token)
  return request({ method: "PUT", uri: url })
}

module.exports = { markImageProcessed }
