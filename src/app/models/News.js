const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const News = new Schema({
    _id: { type: Number },
    tieude: { type: String, required: true, max: 200 },
    noidung: { type: String },
    hinhanh: { type: String },
    ngaydang: { type: Date, default: Date.now },
    hot: { type: Number, enum: [0, 1], default: 0 }
});
module.exports = mongoose.model('news', News);