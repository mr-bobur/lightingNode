const mongoose = require('mongoose');
const Device = require('./Device');
const User = require('./User');

const CitySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitide: {
        type: Number,
        required: true
    },
    sunrise: {
        type: Date,
        default: Date.now
    },
    sunset: {
        type: Date,
        default: Date.now
    },
    ontime: {
        type: Date,
        required: true,
        default: Date.now
    },
    offtime: {
        type: Date,
        required: true,
        default: Date.now
    },
    ontimefix: {
        type: Date,
        required: true,
        default: Date.now
    },
    offtimefix: {
        type: Date,
        required: true,
        default: Date.now
    },
    visiblity: {
        type: Number,
        required: true,
        default: 1000
    }, 
    automatic:{
        type: Boolean, 
        default: true
    },
    switch1:{
        type: Boolean, 
        default: true
    },
    switch2:{
        type: Boolean, 
        default: true
    },
    switch3:{
        type: Boolean, 
        default: true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true
    }],
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Device,
        require: true
    }]

},{timestamps: true});
 

module.exports = mongoose.model('Cities',CitySchema);