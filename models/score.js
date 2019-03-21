const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var scoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stuID: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});
var Scores = mongoose.model('Score', scoreSchema);

module.exports = Scores;