const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const User = new Schema({
    _id: { type: Number },
    username: { type: String, max: 50 },
    password: { type: String, min: 8 },
    diachi: { type: String },
    sdt: { type: String, max: 10 },
    fullname: { type: String, max: 100 },
    email: { type: String },
    isadmin: { type: Number, enum: [0, 1], default: 0 }
})
module.exports = mongoose.model('users', User);