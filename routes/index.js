var express = require('express');
var router = express.Router();
const controller = require("../controller/controller");
const { addHotel } = require('../controller/examnController');
const examnController = require("../controller/examnController");
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'big j1' });
});
router.get('/chat', function(req, res, next) {
  res.render('chat');
});

router.post("/newjoueur", controller.addJoueur);
router.get("/getAllJoueurs", controller.getAllJoueurs);
router.get("/getOneJ/:farouk", controller.getOneJ);
router.delete("/deletedJ/:id", controller.deletedJ);
router.put("/attack/:ida/:idv", controller.attack);
router.post("/newpartie/:id1/:id2", controller.newpartie);
router.get("/allParties" , controller.allParties);


router.get("/hotels/list" , examnController.allHotels);
router.post("/hotels/add" , examnController.addHotel);
router.get("/hotels/getByID/:id" , examnController.getHotelsbyID) ; 
router.delete("/hotels/delete/:id" , examnController.deleteHotelByID); 
router.post("/chambre/add/:id" , examnController.addChambre);
router.put("/chambre/reserve/:id/:nom_client" , examnController.reserverChambre)
router.get("/res" , examnController.reservationView)
router.get("/chambre/nonReserver/:id" , examnController.chambreNonReserver) 
module.exports = router;
