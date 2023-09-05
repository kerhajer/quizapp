const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const ResultsSchema = new mongoose.Schema({
    username: String,
    result: {
        type: Array,
        default: []
    },
   
    attempts: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    achieved: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Results = mongoose.model("Results", ResultsSchema);

module.exports = Results;