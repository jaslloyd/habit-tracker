const mongoose = require('mongoose');

const HabitSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    category: {type: String, required: true},
    target: {type: Number, required: true},
    completed: {type: Number, required: true},
    month:  {type: String},
    year:  {type: String, required: true},
    lastUpdated: {type: Array, required: true},
    owner: {type: String, required: true},
    reward: {type: String},
    endDate: {type: String}
}, {  timestamps: true });

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;