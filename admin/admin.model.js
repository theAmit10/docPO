const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    photo: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;