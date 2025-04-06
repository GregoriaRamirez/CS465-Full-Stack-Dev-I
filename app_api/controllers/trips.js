

// GET: /api/trips - list all trips
const tripsList = async (req, res) => {
    try {
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
        const trip = trips.find(t => t.code === tripCode);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    tripsList,
    tripsReadOne
};
