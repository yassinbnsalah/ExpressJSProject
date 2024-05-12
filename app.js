const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongo.json");
var path = require("path");
mongo
    .connect(mongoconnection.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((err) => {
      console.log(err);
    });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const RootIndex = require("./routes/index");

app.use("/", RootIndex);

const server = http.createServer(app);

server.listen(3000, () => console.log("server is run"));
