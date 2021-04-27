const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Product = new Schema({
        _id: { type: Number },
        id_danhmuc: { type: Number, ref: 'categorys', required: true },
        ten_sanpham: { type: String, max: 200 },
        anh_sanpham: { type: String },
        ngaydang: { type: Date, default: Date.now },
        mo_ta: { type: String },
        sanpham_hot: { type: Number, enum: [0, 1], default: 0 }
    })
    /*
    mongoose.plugin(slug);
    Comic.plugin(mongooseDelete, {
        deletedAt: true,
        overrideMethods: true
    });
    */
    //tra ve url cho product
Product
    .virtual('url')
    .get(function() {
        return '/category/product/_id=' + this._id;
    });
module.exports = mongoose.model('Product', Product);