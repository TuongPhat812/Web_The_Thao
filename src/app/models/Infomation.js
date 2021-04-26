const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Infomation = new Schema({
    _id: { type: Number, required: true },
    tieude: { type: String, max: 100 },
    noidung: { type: String }
})
module.exports = mongoose.model('infomation', Infomation);