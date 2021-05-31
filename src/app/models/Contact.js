
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Product = new Schema({
    _id: { type: Number },
    ten_khachhang: { type: String, required: true, max: 100 },
    email: { type: String, required: true },
    message: { type: String, max: 500 },
    tinh_trang: { type: Number, required: true, enum: [0, 1], default: 0 },
    ngaydang: { type: Date, default: Date.now }
})
module.exports = mongoose.model('product', Product);