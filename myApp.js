require("dotenv").config();

let express = require("express");
let app = express();

// Implement a Root-Level Request Logger Middleware
// As no path specified it will be mounted for all paths
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  // If next() is not done page will never be refreshed
  next();
});

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

app.get("/json", function (req, res) {
  let return_val = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    return_val = return_val.toUpperCase();
  }
  res.json({ message: return_val });
});

// Chain Middleware to Create a Time Server
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString(); // Hypothetical Synchronous operation
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

// Reading the parameters from the client/user
// will respond with {"echo", "MeTheCoder"} for URL http://localhost:3000/MeTheCoder/echo
app.get("/:word/echo", function (req, res) {
  // console.log(req.params);
  // console.log(req.params.word);
  // const word_requested = req.params.word;
  // res.json({ echo: word_requested });
  res.json({ echo: req.params.word });
});

module.exports = app;
