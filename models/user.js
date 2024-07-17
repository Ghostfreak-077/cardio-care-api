const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    uid:{
        type:String,
        required:true,
        select:false
    },
    emer_email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
})

//JWT Token Generate
adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

module.exports = mongoose.model("admin", adminSchema);