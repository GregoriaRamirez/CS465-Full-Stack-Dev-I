const mongoose = require('mongoose');
const Trip = require('./travlr'); // Ensure travlr.js exists
const tripsData = require('../data/trips.json'); // Adjust path to data

// Convert the start date string to Date objects
tripsData.forEach(trip => {
  trip.start = new Date(trip.start);
});

const dbURI = 'mongodb://127.0.0.1/travlr';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', async () => {
    console.log(`Mongoose connected to ${dbURI}`);

    try {
        await Trip.deleteMany({});
        console.log('Existing trips deleted.');

        await Trip.insertMany(tripsData);
        console.log('Trips successfully seeded.');
    } catch (err) {
        console.error('Error seeding trips:', err);
    } finally {
        mongoose.connection.close();
    }
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
