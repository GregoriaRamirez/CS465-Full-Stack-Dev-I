const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');


// API endpoint and fetch options
const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};



// Path to local trips.json as a fallback
const tripsFilePath = path.join(__dirname, '..', '..', 'app_server', 'data', 'trips.json');

// Load trips from local file (used as fallback)
let localTrips = [];
if (fs.existsSync(tripsFilePath)) {
  try {
    localTrips = JSON.parse(fs.readFileSync(tripsFilePath, 'utf8'));
  } catch (err) {
    console.error('Error parsing trips.json:', err);
  }
} else {
  console.error('trips.json file not found at', tripsFilePath);
}

// Controller function
const travel = async (req, res) => {
  let message = null;
  let trips = [];

  try {
    const response = await fetch(tripsEndpoint, options);
    const data = await response.json();

    if (!Array.isArray(data)) {
      message = "API lookup error: Data is not in expected format.";
      trips = localTrips;
    } else if (data.length === 0) {
      message = "No trips exist in our database!";
      trips = localTrips;
    } else {
      trips = data;
    }

  } catch (error) {
    console.error("Fetch error:", error.message);
    message = "Unable to fetch trips from API. Showing local data.";
    trips = localTrips;
  }

  res.render("travel", {
    title: "Travlr Getaways",
    trips,
    message
  });
};

module.exports = {
  travel
};
