const mongo = require("mongoose");

const Schema = mongo.Schema;
const Chambre = new Schema({
    numero : Number , 
    hotel : String , 
    reservee : Boolean ,   
    nom_client : String
});

module.exports = mongo.model("Chambre", Chambre);