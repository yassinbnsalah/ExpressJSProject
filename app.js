const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongo.json");
var path = require("path");
const controller = require("./controller/controller");

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

//1-socket
const io = require("socket.io")(server);
io.on('connection', (socket) => {




  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });




});





server.listen(3001, () => console.log("server is run"));

