var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/about", function(req, res) {
  res.render("about");
});
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/new-entry", function(req, res) {
  res.render("new-entry");
});

app.post("/new-entry", function(req, res) {
  if (!req.body.title || !req.body.body || !req.body.name) {
    res.status(400).send("Entries must have a title a body, and a name.");
    return;
  }
  entries.push({
    title: req.body.title,
    body: req.body.body,
    name: req.body.name,  
    published: new Date()
  });
  res.redirect("/");
});

app.get("/clear", function(req, res) {
  entries = [];
  app.locals.entries = entries;
  res.redirect("/");
});

app.get("/main", function(req, res) {
   res.redirect("/");
});

app.use(function(req, res) {
  res.status(404).render("404");
});

http.createServer(app).listen(3008, function() {
  console.log("Guestbook app started.");
});
