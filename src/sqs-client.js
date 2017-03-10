const AWS = require("aws-sdk")

const _sqs = new AWS.SQS({
  accessKeyId: process.env.SQS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY,
  region: process.env.SQS_QUEUE_REGION,
})

const deleteMessage = (message) => {
  const params = _sqsDeleteMessageParams(message)

  return new Promise((resolve, reject) => {
    _sqs.deleteMessage(params, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(message)
      }
    })
  })
}

const receiveMessages = () => {
  const params = _sqsReceiveMessagesParams()

  return new Promise((resolve, reject) => {
    _sqs.receiveMessage(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Messages)
      }
    })
  })
}

const _sqsDeleteMessageParams = (message) =>  {
  return {
    QueueUrl: process.env.SQS_QUEUE_URL,
    ReceiptHandle: message.ReceiptHandle,
  }
}

const _sqsReceiveMessagesParams = () => {
  return {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 5,
  }
}

module.exports = { deleteMessage, receiveMessages }
