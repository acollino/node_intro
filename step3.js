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

function writeFile(path, data) {
  fs.open(path, (openError, fileID) => {
    if (openError) {
      console.log(`Couldn't access file at ${path}\n`, openError.message);
    } else {
      fs.write(fileID, data, { encoding: "utf8" }, (writeError) => {
        if (writeError) {
          console.log(`Couldn't write to ${path}\n`, writeError.message);
        } else {
          fs.close(fileID, (closeError) => {
            if (closeError) {
              console.log("Error closing file\n", closeError.message);
            } else {
              console.log("Output written to file successfully.");
            }
          });
        }
      });
    }
  });
}

if (process.argv[2] === "--out") {
} else {
}

if (process.argv[2].match(/^http[s]?:\/\/\S+\.\S+$/)) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
