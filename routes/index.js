var express = require('express');
var router = express.Router();
const controller = require("../controller/controller");

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'big j1' });
});

router.post("/newjoueur", controller.addJoueur);
router.get("/getAllJoueurs", controller.getAllJoueurs);
router.get("/getOneJ/:id", controller.getOneJ);
router.delete("/deletedJ/:id", controller.deletedJ);
router.put("/attack/:ida/:idv", controller.attack);
router.post("/newpartie/:id1/:id2", controller.newpartie);

module.exports = router;
