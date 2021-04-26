const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const InvoiceDetail = new Schema({
    id_donhang: { type: Number, ref: 'invoices', required: true },
    id_sanpham: { type: Number, ref: 'products', required: true },
    soluong: { type: Number, default: 0 },
    gia: { type: Number, default: 0 }
})
module.exports = mongoose.model('invoicedetails', InvoiceDetail);