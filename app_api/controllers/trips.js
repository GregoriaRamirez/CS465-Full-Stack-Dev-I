const fs = require('fs');
const path = require('path');

// GET: /trips - list all of the trips from trips.json
const tripsList = async (req, res) => {
    // Define the path to the trips.json file
    const filePath = path.join(__dirname, '..', 'controllers', 'data', 'trips.json');

    // Read the trips.json file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading trips.json:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }

        try {
            // Parse the JSON data
            const trips = JSON.parse(data);

            if (trips.length === 0) { // No trips found in the JSON file
                return res.status(404).json({ message: 'No trips found' });
            }

            // Return the list of trips as JSON
            return res.status(200).json(trips);

        } catch (parseError) {
            console.error('Error parsing trips.json:', parseError);
            return res.status(500).json({ message: 'Error parsing JSON', error: parseError });
        }
    });
};

module.exports = {
    tripsList
};
