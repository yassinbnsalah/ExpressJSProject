const express = require("express");
const Hotel = require("../models/hotel.schema");

const Chat = require("../models/chat.schema");
const Chambre = require("../models/chambre.schema");

exports.addHotel = async (req, res) => {

    const newHotel = await Hotel.create({
        nom: req.body.nom,
        adresse: req.body.adresse,
        nbChambre: req.body.nbChambre,
        email: req.body.email,

        nbChambre: 0,
    });
    // res.status(200).send("hotel ajouté avec succès" +newHotel.nom);
    res.status(200).send(newHotel);
};


exports.allHotels = async (req, res) => {
    try {

      
        const hotels = await Hotel.find();
        res.status(200).json( hotels);

    } catch (err) {
        res.status(500).send(err);
    }
}


exports.getHotelsbyID = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json( hotel);

    } catch (err) {
        res.status(500).send(err);
    }
}


exports.deleteHotelByID = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json( hotel);

    } catch (err) {
        res.status(500).send(err);
    }
}




exports.addChambre = async (req, res) => {
    try {
        console.log(req.body);
        const newChambre = await Chambre.create({
            numero : req.body.numero , 
            hotel : req.params.id , 
            reservee : false , 
            nom_client : ""
        });

        res.status(200).json(newChambre);
    } catch (err) {
        res.status(500).send(err);
    }
}


exports.reserverChambre = async (req, res) => {
    try {
        console.log(req.body);
        const chambre = await Chambre.findById(req.params.id);
        chambre.reservee = true; 
        chambre.nom_client = req.params.nom_client;
        chambre.save();
        res.status(200).json(chambre);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.chambreNonReserver = async (req, res) => {
    try {
        console.log(req.body);
        const chambres = await Chambre.find({hotel : req.params.id , reservee : false });
        res.status(200).json(chambres);
    } catch (err) {
        res.status(500).send(err);
    }
}


exports.reservationView = async (req, res) => {
    try {
        
        res.status(200).render('reservation.twig')
    } catch (err) {
        res.status(500).send(err);
    }
}

