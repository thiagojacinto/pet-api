const fs = require("fs");
const path = require("path");
const { random } = require("faker");

function uploadStreamImage(inputPath, cb) {
  const fileName = random.uuid();
  const type = path.extname(inputPath);

  const outputPath = `assets/images/${fileName}${type}`;

  fs.createReadStream(inputPath)
    .pipe(fs.createWriteStream(outputPath))
    .on("finish", () => cb(false, outputPath));
}

module.exports = uploadStreamImage;