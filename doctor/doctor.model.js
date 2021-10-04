const mongoose = require('mongoose')

const newDoctor = mongoose.Schema({
    name: String,
    degree: String,
    appointment_time: String,
    fees: String,
    address: String,
    address_point: String,
    email: String,
    photo: String,
    number: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Doctor = mongoose.model("Doctor", newDoctor);

module.exports = Doctor

