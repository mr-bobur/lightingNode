const mongoose = require('mongoose');
const City = require('./City'); 


const DeviceSchema = mongoose.Schema({
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
    automatic1:{
        type: Boolean,  
        default: true
    },
    automatic2:{
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
    switch4:{
        type: Boolean, 
        default: false
    }, 
    ontime1: {
        type: Date,
        required: true,
        default: Date.now
    },
    offtime1: {
        type: Date,
        required: true,
        default: Date.now
    },
    ontime2: {
        type: Date,
        required: true,
        default: Date.now
    },
    offtime2: {
        type: Date,
        required: true,
        default: Date.now
    },
    ontime3: {
        type: Date,
        required: true,
        default: Date.now
    },
    offtime3: {
        type: Date,
        required: true,
        default: Date.now
    },
    temp: {
        type: Number,
        required: true,
        default: 25
    },
    status:{
        type: Boolean, 
        default: false
    },
    cities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: City,
        require: true
    }]   
},{timestamps: true});


module.exports = mongoose.model('Devices',DeviceSchema);