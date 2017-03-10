require("dotenv").load()

const logger = require("winston")
const ImageProcessor = require("./src/image-processor")
const SQSClient = require("./src/sqs-client")

const run = () => {
  SQSClient.receiveMessages().then(messages => {
    messages = _cleanUpMessages(messages || [])

    logger.info(`Processing ${messages.length} new message(s).`)
    return Promise.all(messages.map(_respondToMessage))
  }).catch(err => {
    logger.error("Unexpected Error processing images: ", err)
  }).then(() => {
    setImmediate(() => {
      run()
    })
  })
}

const _cleanUpMessages = (messages) => {
  const results = []
  messages.forEach(message => {
    message.Body = JSON.parse(message.Body)
    if (results.find(candidate => candidate.Body.image_id === message.Body.image_id) === undefined) {
      results.push(message)
    }
  })
  return results
}

const _respondToMessage = (message) => {
  SQSClient.deleteMessage(message).then(() => {
    return ImageProcessor.processImage(message.Body)
  })
}

run()
