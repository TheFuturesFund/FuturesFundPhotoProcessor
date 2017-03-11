const express = require("express")
const logger = require("winston")
const request = require("request-promise")

const app = express()

app.get("/", (req, res) => {
  logger.info("GET /")
  res.json({ current_time: new Date() })
})

const keepAlive = () => {
  request({
    uri: process.env.KEEP_ALIVE_URL,
    method: "GET",
  }).then(() => {
    logger.info("Keep Alive: Still running")
  })

  setInterval(keepAlive, 60 * 1000)
}

const port = process.env.PORT || 4000
app.listen(port, () => {
  logger.info("Listening on", port)
  keepAlive() 
})
