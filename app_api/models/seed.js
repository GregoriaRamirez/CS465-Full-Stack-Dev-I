const mongoose = require('../../app_api/models/db');
const Trip = require('../../app_api/models/travlr'); 

const fs = require('fs');
const path = require('path');

// Path to your trips.json file
const tripsFilePath = path.join(__dirname, '..', '..', 'app_server', 'data', 'trips.json');

const seedDB = async () => {
  try {
    // Ensure trips.json exists and is not empty
    if (!fs.existsSync(tripsFilePath)) {
      console.error('trips.json file not found at path:', tripsFilePath);
      process.exit(1); // Exit if file not found
    }

    // Read and parse the trips data
    const trips = JSON.parse(fs.readFileSync(tripsFilePath, 'utf8'));

    // Log the trips to ensure they're being read correctly
    console.log('Trips data:', trips);

    if (!Array.isArray(trips) || trips.length === 0) {
      console.log('No trips found in trips.json or data is not an array');
      process.exit(0); // Exit if trips data is empty or not an array
    }

    // Seed the database by deleting existing records and inserting new ones
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with error code if there's an issue
  }
};

// Call the seed function and close the DB connection
seedDB().then(async () => {
  await mongoose.connection.close();
  console.log('Connection closed');
  process.exit(0);
});
