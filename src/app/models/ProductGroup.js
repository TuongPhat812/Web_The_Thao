const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ProductGroup = new Schema({
    _id: { type: Number },
    ten_nhomsp: { type: String, max: 200 }
})
module.exports = mongoose.model('productgroup', ProductGroup);