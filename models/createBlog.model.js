const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },   
})

blogSchema.pre('save',function(next){
    console.log('Model Call =>');
    console.log(this);
    next();
})


module.exports = mongoose.model('Blog',blogSchema);