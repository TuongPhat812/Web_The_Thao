const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Product = new Schema({
        _id: { type: Number },
        id_danhmuc: { type: Number, ref: 'categorys', required: true },
        ten_sanpham: { type: String, max: 200 },
        anh_sanpham: { type: String, default: ""},
        ngaydang: { type: String, default: "" + new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate()},
        mo_ta: { type: String },
        sanpham_hot: { type: Number, enum: [0, 1], default: 0 },
        gia: { type: Number },
        gia_km: { type: Number }
    })
    /*
    mongoose.plugin(slug);
    Comic.plugin(mongooseDelete, {
        deletedAt: true,
        overrideMethods: true
    });
    */
    //tra ve url cho product
    // Product
    //     .virtual('url')
    //     .get(function() {
    //         return '/category/product/_id=' + this._id;
    //     });
module.exports = mongoose.model('Product', Product);