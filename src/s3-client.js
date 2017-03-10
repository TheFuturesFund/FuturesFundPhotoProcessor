const AWS = require("aws-sdk")

const _s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
})

const deleteObject = (path) => {
  return new Promise((resolve, reject) => {
    _s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path,
    }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const getObject = (path) => {
  return new Promise((resolve, reject) => {
    _s3.getObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path,
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Body)
      }
    })
  })
}

const uploadObject = (path, buffer) => {
  return new Promise((resolve, reject) => {
    _s3.putObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path,
      Body: buffer,
      ACL: "public-read",
    }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports = { deleteObject, getObject, uploadObject }
