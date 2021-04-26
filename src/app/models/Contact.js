{ _id: 1, ten_khachhang: 'Diem', email: '18520596@gm.uit.edu.vn', message: 'hihi', tinh_trang: 0, ngaydang: '2020-12-27' },
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
const Product = new Schema({
    _id: { type: Number },
    ten_khachhang: { type: String, required: true, max: 100 },
    email: { type: String, required: true },
    message: { type: String, max: 500 },
    tinh_trang: { type: Number, required: true, enum: [0, 1], defaul: 0 },
    ngaydang: { type: Date, default: Date.now }
})
module.exports = mongoose.model('product', Product);