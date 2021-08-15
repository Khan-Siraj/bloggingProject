const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Category',categorySchema);