const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let myCollection = new Schema({
    name: { type: String, require: true },
    description: { type: Number },
    price: { type: Number, default: 0 },
}, { collection: 'myCollection' });

module.exports = mongoose.model('MyCollection', myCollection);