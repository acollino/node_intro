const fs = require("fs");
const axios = require("axios");

function cat(path) {
  if (!path) {
    console.log("INVALID INPUT: Path to file is required.");
    process.exit(1);
  } else {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading ${path}:\n`, err);
        process.exit(1);
      } else {
        console.log(data);
      }
    });
  }
}

async function webCat(url) {
  if (!url) {
    console.log("INVALID INPUT: A valid url is required.");
    process.exit(1);
  } else {
    try {
      let resp = await axios.get(url);
      console.log(resp.data);
    } catch (err) {
      console.log(`Error fetching ${url}:\n`, err.message);
      process.exit(1);
    }
  }
}

if (process.argv[2].match(/^http[s]?:\/\/\S+\.\S+$/)) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
