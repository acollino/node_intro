const fs = require("fs");

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

cat(process.argv[2]);
