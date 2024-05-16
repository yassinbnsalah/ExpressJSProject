const express = require("express");
const joueur = require("../models/joueur.schema");
const partie = require("../models/partie.schema");
const Chat = require("../models/chat.schema");

exports.addJoueur = async (req, res) => {
    try {
        const newJoueur = await joueur.create({
            pseudo: req.body.pseudo,
            sante: 100,
            score: 0,
        });
        res.status(200).send("joueur ajouté : " + newJoueur.pseudo);
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getAllJoueurs = async (req, res) => {
    try {
        const allplayer = await joueur.find();

        res.status(200).send(allplayer);
    } catch (err) {
        res.status(500).send(err);
    }


};


exports.getOneJ = async (req, res) => {
    try {
        const getOneJ = await joueur.findById(req.params.farouk);
        //const getOneJ2 = await joueur.find({ sante: req.body.sante });

        res.status(200).send(getOneJ);
    } catch (err) {
        res.status(500).send(err);
    }


};

exports.deletedJ = async (req, res) => {
    try {
        const deletedJ = await joueur.findByIdAndDelete(req.params.id);

        res.status(200).send("deleted " + deletedJ.pseudo);
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.attack = async (req, res) => {
    try {

        const attaqueplayer = await joueur.findByIdAndUpdate(req.params.ida, {
            $inc: {
                score: 10,
            },
        });
        const victimeplayer = await joueur.findByIdAndUpdate(req.params.idv, {
            $inc: {
                sante: -20,
            },
        });
        res.status(200).send("attackplayer :  " + attaqueplayer + "\n\n victimeplayer : " + victimeplayer);

    } catch (err) {
        res.status(500).send(err);
    }


};

exports.newpartie = async (req, res) => {
    try {

        const p1 = await joueur.findById(req.params.id1)
        const p2 = await joueur.findById(req.params.id2)
        const newPartie = await partie.create({
            nom: req.body.nom,
            joueur1: p1._id,
            joueur2: p2._id,
            etat: "en cours",
            gagnant: req.body.gagnant,
        });
        res.status(200).send("new partie :  " + newPartie);

    } catch (err) {
        res.status(500).send(err);
    }
}
// socket fnct :

exports.addPartieSocket = async (data) => {
    try {
        const Partie = new partie({
            nom: data.nom,
            joueur1: data.id1,
            joueur2: data.id2,
            etat: "en cours",
            gagnant: "",
        });

        const j1u = await joueur.findByIdAndUpdate(data.id1, {
            sante: 100,
        });
        const j2u = await joueur.findByIdAndUpdate(data.id2, {
            sante: 100,
        });
        await Partie.save();
        //console.log("add success");
    } catch (err) {
        console.log({ error: err.toString() });
    }
}

exports.getTwoPlayers = async (partie) => {
    try {
        
        console.log("data : "+JSON.stringify(partie));

        const j1 = await joueur.findById(partie.id1);
        const j2 = await joueur.findById(partie.id2);

        return {
            nom: partie.nom,
            j1: j1,
            j2: j2,
        }
        console.log("data : "+JSON.stringify(a));
    } catch (err) {
        res.status(500).send(err);
    }

};



/**************************CHAT FNC*********************************/
exports.add = async (msg)=> {
    try {
        const chat = await Chat.create({
            nomSender: msg.nom,
            msg: msg.msg,
            date: new Date(),
        });

        //res.status(200).send("chat ajouté : " + chat);
    } catch (err) {
        console.log(err);
    }
}



