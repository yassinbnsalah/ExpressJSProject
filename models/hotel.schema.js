const mongo = require("mongoose");

const Schema = mongo.Schema;
const Hotel = new Schema({
    nom: String,
    adresse: String,
    nbChambre: Number,
    email : String,
});

module.exports = mongo.model("Hotel", Hotel);