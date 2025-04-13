const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");  

// List all trips
router.route("/trips").get(tripsController.tripsList);  

// Get one trip by tripCode
router.route("/trips/:tripCode").get(tripsController.tripsReadOne);  

module.exports = router;
