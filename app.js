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


  console.log('a user connected');

  socket.on('creerP', (response) => {
    //console.log('Received response from server:', response);
    controller.addPartieSocket(response);
    io.emit('msg', response);
  });




// ki bch traja3 nafs l response lel twig matesthakch async await
// sinon ken bch trajaa haja apartir mn fnct fl controller lezm async await
  socket.on('hathat',  async (partie) => {
    let data = await  controller.getTwoPlayers(partie);
    console.log( "bayy"+JSON.stringify(data))
    io.emit('data', data);
  });

  /*************CHAT*********************/
  socket.on('envoyerMsg', (response) => {
    controller.add(response);
    io.emit('chat', response);
  });
  socket.on('disconnected', () => {
    console.log('user disconnected');
  });







});




server.listen(3000, () => console.log("server is run"));
