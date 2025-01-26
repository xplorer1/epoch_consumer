require("dotenv").config();

let express = require("express");
let mongoose = require('mongoose');
let EpochTimeStamp = require("./epoch_time_stamp");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function(err) {
    console.log('mongoose connection error:', err.message);
});

app.get("/timestamp", async (req, res) => {
    try {
        let current_timestamp = await EpochTimeStamp.findOne({}, {"epoch_time": 1, "_id": 0},{}).sort({ createdAt: -1 });
        if (!current_timestamp) return res.status(404).send("No timestamp available.");

        let formatted_time = new Date(current_timestamp.epoch_time * 1000).toLocaleString();
        return res.status(200).json({formatted_time});

    } catch (error) {
        console.error("Error fetching timestamp:", error);
        return res.status(500).send("Internal Server Error");
    }
});

let PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Epoch Consumer running on http://localhost:${PORT}`);
});

module.exports = app;