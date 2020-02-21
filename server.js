// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + "/public"));

const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile)


//Lets you knwo which port the server is using
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

var notes = require("./db/db.json");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays Notes API
app.get("/api/notes", function(req, res) {
  res.json(notes);
});

//Sends you to index.html for unspecified route
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.post("/api/notes", function (req, res) {
    notes.push(req.body)
    writeFileAsync("./db/db.json", JSON.stringify(notes))
    console.log("Added new notes!")
});
