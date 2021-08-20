const _dbService = require('../services/database.service');
const tokenService = require('../services/token.service');
const fs = require('fs');
const addBlog = async (request,response)=>{
    const token = await tokenService.verifyToken(request);
    if(token.isVerified){
        if(!request.body.file){
            response.status(404);
            response.json({
                type:'image-validation',
                field:'image',
                message:'please select an image.'
            });
        }
        const data = token.data;
        const destination = request.body.file.destination;
        const filename = request.body.file.filename;
        const imagePath = destination+'/'+filename;
        data['image']=imagePath;  
        try{
         const dataRes = await _dbService.createRecord(data,'blog');
          response
          .status(200)
          .json({
            isBlogCreated:true,
            message:'Success',
            data:dataRes
          });
        }
        catch(error){
            try{ 
                fs.unlinkSync(imagePath);   
               } 
            catch(error){ 
                console.log(error.code) 
            }
           response
          .status(422)
          .json({
            isBlogCreated:false,
            message:error
          });
        }
    }else{
        response
        .status(401)
        .json({
            isBlogCreated:false,
            message:'Permission Denied !'
        });
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

const getBlogsByCategory = async (request,response)=>{
    try{
        // _dbService.getAllRecords(schemaName,order); pass -1 for data in descending order or pass 1 for ascending
        const category = request.params.category;
        const query = {
            category:category
        }
        const dataRes = await _dbService.getRecordByQuery(query,'blog');
        return dataRes;
    }catch(error){
        return error;
    }
}

const getLimitedBlogs = async (request,response)=>{
    try{
        // _dbService.getAllRecords(schemaName,order); pass -1 for data in descending order or pass 1 for ascending
        const limit = 50;
        const dataRes = await _dbService.getLimitedRecords('blog',-1,limit);
        return dataRes;
    }catch(error){
        return error;
    }
}

const deleteBlog = async (request,response)=>{

    try{
        const id = request.params.id;
        const oldImage = request.body.image;
            try{ 
                fs.unlinkSync(oldImage);   
               } 
               catch(error){ 
                console.log(error.code) 
            }
        const dataRes = await _dbService.deleteRecordById('blog',id);
        response.status(200);
            response.json({
                isBlogDeleted:true,
                message:'Delete Success',
                data:dataRes
        }) 
    }
    catch(error){
        response
            .status(422)
            .json({
                isBlogDeleted:false,
                message:error.code
        });
    }
    
}

const updateBlog = async (request,response)=>{
    try{
        const data = request.body;
        if(request.file){
            const oldImage = request.body.oldImage;
            try{ 
                fs.unlinkSync(oldImage); 
                const destination = request.file.destination;
                const filename = request.file.filename;
                const imagePath = destination+'/'+filename;
                data['image']=imagePath;  
               } 
               catch(error){ 
                response
               .status(422)
               .json({
                isBlogUpdated:false,
                message:error.code
              });  
              return false;
            }
        }
        if(data.title.trim() != ""){
             if(data.author.trim() != ""){
               if(data.content.trim() != ""){
                const id = request.params.id;
                const dataRes = await _dbService.updateRecordById('blog',id,data);
                response.status(200);
                 response.json({
                    isBlogUpdated:true,
                    message:'Success',
                    data:dataRes
                 }) 
               }else{
                response.status(404);
                response.json({
                isBlogUpdated:false,
                message:{
                    field:'content',
                    text:'Content Is Required !'
                },
                }) 
                return false;
               }
             }else{
                response.status(404);
                response.json({
                isBlogUpdated:false,
                message:{
                    field:'author',
                    text:'Author Is Required !'
                },
                }) 
                return false;
             }
        }else{
            response.status(404);
            response.json({
                isBlogUpdated:false,
                message:{
                    field:'title',
                    text:'Title Is Required !'
                },
            })
            return false;
        }
        
    }
    catch(error){
        if(error.code == 11000){
            response
            .status(422)
            .json({
                isBlogUpdated:false,
                message:'Title Already Exits !'
            });
         }else{
            response
            .status(422)
            .json({
                isBlogUpdated:false,
                message:error.code
            });  
         }
    }
}
module.exports = {
    addNewBlog:addBlog,
    getAllBlogs:getAllBlogs,
    getBlogsByCategory:getBlogsByCategory,
    getLimitedBlogs:getLimitedBlogs,
    deleteBlog:deleteBlog,
    updateBlog:updateBlog
}