const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Invoice = new Schema({
    _id: { type: Number },
    id_khachhang: { type: Number, ref: 'users' },
    tinhtrang: { type: Number, enum: [0, 1], required: true, default: 0 },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model('invoice', Invoice);