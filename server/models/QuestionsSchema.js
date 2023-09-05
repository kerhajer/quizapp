
const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    questions: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;


