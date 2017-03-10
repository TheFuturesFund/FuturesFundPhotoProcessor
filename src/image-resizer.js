const sharp = require("sharp")

const resizeThumbnail = (buffer) => {
  return sharp(buffer).resize(300, 300).max().toBuffer()
}

module.exports = { resizeThumbnail }
