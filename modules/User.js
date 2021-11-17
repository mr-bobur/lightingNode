const mongoose = require('mongoose');
const TokenGenerator = require('uuid-token-generator');
const City = require('./City');
const tokgen = new TokenGenerator(); 

const UserSchema = mongoose.Schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
    verification: {
        type: String,
        required: true
    },
    token:{
        type: String,
        default: tokgen.generate()
    },
    cities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: City,
        require: true
    }]

},{timestamps: true});


module.exports = mongoose.model('Users',UserSchema);