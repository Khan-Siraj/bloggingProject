const _dbService = require('../services/database.service');
const fs = require('fs');
const addBlog = async (request,response)=>{
   
    if(!request.file){
        response.status(404);
        response.json({
            type:'image-validation',
            field:'image',
            message:'please select an image.'
        });
    }
    const data = request.body;
    const destination = request.file.destination;
    const filename = request.file.filename;
    const imagePath = destination+'/'+filename;
    data['image']=imagePath;  
    try{
     const dataRes = await _dbService.createRecord(data,'blog');
     return dataRes;
    }
    catch(error){
        return error;
    }

}

const getAllBlogs = async (request,response)=>{
    try{
        // _dbService.getAllRecords(schemaName,order); pass -1 for data in descending order or pass 1 for ascending
        const dataRes = await _dbService.getAllRecords('blog',-1);
        return dataRes;
    }catch(error){
        return error;
    }
}

const deleteBlog = async (request,response)=>{
    const id = request.params.id;
    const oldImage = request.body.image;
        try{ 
            fs.unlinkSync(oldImage);   
           } 
           catch(error){ 
            console.log(error.code) 
        }
    const dataRes = await _dbService.deleteRecordById('blog',id);
    return dataRes;
}

const updateBlog = async (request,response)=>{
    const data = request.body;
    if(request.file){
        const oldImage = request.body.oldImage;
        console.log(oldImage);
        try{ 
            fs.unlinkSync(oldImage); 
            const destination = request.file.destination;
            const filename = request.file.filename;
            const imagePath = destination+'/'+filename;
            data['image']=imagePath;  
           } 
           catch(error){ 
            console.log(error.code) 
        }
    }
    const id = request.params.id;
    const dataRes = await _dbService.updateRecordById('blog',id,data);
    return dataRes;
}
module.exports = {
    addNewBlog:addBlog,
    getAllBlogs:getAllBlogs,
    deleteBlog:deleteBlog,
    updateBlog:updateBlog
}