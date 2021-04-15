const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let expense = new Schema({
    details: { type: String, require: true },
    amount: { type: Number, require: true, default: 0 },
    date: { type: Date, default: new Date() },
    category: { type: String, enum: ['entertainment', 'food', 'grocery', 'snacks', 'utility', 'other'], default: "other" }
}, { collection: 'expense' });

module.exports = mongoose.model('Expense', expense);