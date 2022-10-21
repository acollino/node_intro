const fs = require("fs");
const axios = require("axios");

function cat(path, output = null) {
  if (!path) {
    console.log("INVALID INPUT: Path to file is required.");
    process.exit(1);
  } else {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log(`Error reading ${path}:\n`, err.message);
        process.exit(1);
      } else {
        if (output) {
          writeFile(output, data);
        } else {
          console.log(data);
        }
      }
    });
  }
}

async function webCat(url, output = null) {
  if (!url) {
    console.log("INVALID INPUT: A valid url is required.");
    process.exit(1);
  } else {
    try {
      let resp = await axios.get(url);
      if (output) {
        writeFile(output, resp.data);
      } else {
        console.log(resp.data);
      }
    } catch (err) {
      console.log(`Error fetching ${url}:\n`, err.message);
      process.exit(1);
    }
  }
}

function writeFile(path, data) {
  fs.open(path, "r+", (openError, fileID) => {
    if (openError) {
      console.log(`Couldn't access file at ${path}\n`, openError.message);
    } else {
      fs.ftruncate(fileID, (truncError) => {
        if (truncError) {
          console.log(`Couldn't clear file at ${path}\n`, truncError.message);
        }
      });
      fs.write(fileID, data, { encoding: "utf8" }, (writeError) => {
        if (writeError) {
          console.log(`Couldn't write to ${path}\n`, writeError.message);
        } else {
          console.log("Output written to file successfully.");
        }
      });
      fs.close(fileID, (closeError) => {
        if (closeError) {
          console.log("Error closing file\n", closeError.message);
        }
      });
    }
  });
}

function isURL(strToCheck) {
  return strToCheck && strToCheck.match(/^http[s]?:\/\/\S+\.\S+$/);
}

if (process.argv[2] === "--out") {
  let outputFile = process.argv[3];
  let inputStr = process.argv[4];
  if (isURL(inputStr)) {
    webCat(inputStr, outputFile);
  } else {
    cat(inputStr, outputFile);
  }
} else {
  let inputStr = process.argv[2];
  if (isURL(inputStr)) {
    webCat(inputStr);
  } else {
    cat(inputStr);
  }
}
