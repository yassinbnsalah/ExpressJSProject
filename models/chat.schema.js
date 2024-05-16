const mongo = require("mongoose");

const Schema = mongo.Schema;
const Chat = new Schema({
    msg: String,
    nomSender: String,
    date: Date,
});

module.exports = mongo.model("Chat", Chat);