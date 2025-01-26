const mongoose = require("mongoose");

const epoch_timestamp_schema = new mongoose.Schema({
    epoch_time: { type: Number, required: true },
    created_at: { type: Date, default: Date.now}
});

module.exports = mongoose.model("EpochTimeStamp", epoch_timestamp_schema);
