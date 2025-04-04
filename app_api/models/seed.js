const mongoose = require('./db');  
const Trip = require('./travlr');   

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));  

// Seeding function
const seedDB = async () => {
    try {
        // Deleting existing data
        await Trip.deleteMany({});

        // Inserting new data from the trips.json file
        await Trip.insertMany(trips);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Run seeding function
seedDB().then(async () => {
    // Close the MongoDB connection after seeding
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);  
});
