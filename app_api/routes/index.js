const express = require("express");
const router = express.Router();

const tripsController = require('../controller/trips');


// List all trips
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// Get one trip by tripCode
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsReadOne)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
