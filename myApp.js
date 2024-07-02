let express = require("express");
let app = express();
console.log("Hello World");
// get is METHOD
// "/" is PATH
// function(req, res) is HANDLER
// Had to restart for changes to take effect
app.get("/", function (req, res) {
  // Serve a string
  const absolutepath = __dirname + "/views/index.html";
  res.sendFile(absolutepath);
});

const absolutepath = __dirname + "/public";
app.use("/public", express.static(absolutepath));

module.exports = app;
