const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Category = new Schema({
        _id: { type: Number },
        id_nhomsp: { type: Number, ref: 'productgroups', required: true },
        ten_danhmuc: { type: String, max: 100 },
    })
    /*
    mongoose.plugin(slug);
    Category.plugin(mongooseDelete, {
        deletedAt: true,
        overrideMethods: true
    });
    */
module.exports = mongoose.model('categories', Category);