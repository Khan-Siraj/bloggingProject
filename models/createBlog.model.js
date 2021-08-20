const mongoose = require('mongoose');
const { countDocuments } = require('./categories.model');

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

blogSchema.pre('validate',async function(next){
    if(this.title != ""){
        next();
    }else{
        throw next({
            field:'title',
            text:'Title Is Required !'
        })
    }
})
blogSchema.pre('validate',async function(next){
    if(this.author != ""){
        next();
    }else{
        throw next({
            field:'author',
            text:'Author Name Is Required !'
        })
    }
})
blogSchema.pre('validate',async function(next){
    if(this.content != " "){
        next();
    }else{
        throw next({
            field:'content',
            text:'Write Some Words Atleast !'
        })
    }
})

blogSchema.pre('save',async function(next){
    const query = {
        title:this.title
    };
    const length = await mongoose.model('Blog').countDocuments(query);
    if(length > 0){
        throw next({
            field:'title',
            text:'This Title Already Exits !'
        })
    }else{
        next();
    }
})


module.exports = mongoose.model('Blog',blogSchema);