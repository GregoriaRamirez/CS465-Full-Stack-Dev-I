const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /api/trips - list all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }
        return res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips list:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// GET: /api/trips/:tripCode - return one trip
const tripsReadOne = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;
        const trip = await Trip.findOne({ code: tripCode });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error.message);
        return res.status(500).json({ message: 'Server error', error });
    }
};

// POST: /api/trips - add one or multiple trips
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // return new trip
        return res
            .status(201)
            .json(q);
    }

    //: uncomment the following to show results of operation
    // console.log(q);
};



// PUT: /api/trips/:tripCode - update one trip
const tripsUpdateTrip = async (req, res) => {
    try {
         console.log("Params:", req.params);
         console.log("Body:", req.body);

        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        console.error("Update error:", err);
        return res.status(400).json({ message: "Error updating trip.", error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsReadOne,
    tripsAddTrip,
    tripsUpdateTrip
};
