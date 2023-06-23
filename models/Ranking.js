const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    score: {type: Number, required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Ranking', rankingSchema);