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


// Category  Empty Validation
categorySchema.pre('validate',function(next){
    if(this.name !== ""){
       next();
    }else{
        throw next({
            field:'category',
            text:'Category Name Can\'t Be Empty.'
        });
    }
})
// Category Name Unique Validation
categorySchema.pre('save',async function(next){
    const query = {
        name:this.name
    };
    const length = await mongoose.model('Category').countDocuments(query);
    if(length > 0){
        throw next({
            field:'category',
            text:'Category Name Already Exits.'
         });
    }else{
      next();
    }
})

module.exports = mongoose.model('Category',categorySchema);
