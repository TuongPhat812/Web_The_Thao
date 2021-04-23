const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Product = new Schema({
    _id: {type: Number},
    id_danhmuc:{type: Number},
    ten_sanpham: {type:String},
    anh_sanpham: {type: String},
    ngaydang: {type: String},
    mo_ta: {type: String},
    sanpham_hot: {type: Number}
}
)
/*
mongoose.plugin(slug);
Comic.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true
});
*/
module.exports = mongoose.model('Product', Product);