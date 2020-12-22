const fs = require("fs");
const path = require("path");
const outputPath = path.resolve(__dirname, "../static/version.json");
const info = {
  ts: Date.now()
};
fs.writeFileSync(outputPath, JSON.stringify(info));
