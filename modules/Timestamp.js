const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const City = require('./City');
const tokgen = new TokenGenerator(); 

const UserSchema = mongoose.Schema({
    deviceId:{
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
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
    cities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: City,
        require: true
    }]

},{timestamps: true});


module.exports = mongoose.model('Users',UserSchema);