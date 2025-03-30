var fs = require('fs');
var path = require('path');

// Path to the trips.json file
const tripsFilePath = path.join(__dirname, './data/trips.json');

// Read and parse the JSON file only once
let trips = [];

// Check if trips.json exists and read the file
if (fs.existsSync(tripsFilePath)) {
    try {
        trips = JSON.parse(fs.readFileSync(tripsFilePath, 'utf8'));
    } catch (err) {
        console.error('Error parsing trips.json:', err);
    }
} else {
    console.error('trips.json file not found at', tripsFilePath);
}

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
    travel
};
