const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    Id: { type: String, required: true },
    citytown: { type: String, required: true },
    kebele: { type: String, required: true },
    state: { type: String, required: true }
}, {
    timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;