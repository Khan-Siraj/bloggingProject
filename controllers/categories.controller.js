const _dbService = require('../services/database.service');
const tokenService = require('../services/token.service');
const addCategory = async (request,response)=>{
    const token= tokenService.verifyToken(request);
    if(token.isVerified){
        try{
           const dataRes = await _dbService.createRecord(token.data,'category')
           response.status(200);
           response.json({
               isCategoryCreated:true,
               message:'Success',
               data:dataRes
           })
        }catch(error){
            response
            .status(422)
            .json({
                isCategoryCreated:false,
                message:error
            });
        }
    }else{
        response
        .status(401)
        .json({
            isCategoryCreated:false,
            message:'Permission Denied !'
        });
    }
   
}

const getCategories = async (request,response)=>{
    const dataRes = await _dbService.getAllRecords('category',1);
    return dataRes;
}

const deleteCategory = async (request,response)=>{
    try{
        const id = request.params.id;
        const dataRes = await _dbService.deleteRecordById('category',id);
        response.status(200);
            response.json({
                isCategoryDeleted:true,
                message:'Delete Success',
                data:dataRes
        }) 
    }
    catch(error){
        response
            .status(422)
            .json({
                isCategoryDeleted:false,
                message:error.code
        });
    }
    
}

const updateCategory = async (request,response)=>{
    try{
        const id = request.params.id;
        const data = request.body;
        if(data.name.trim() != ""){
            const dataRes = await _dbService.updateRecordById('category',id,data);
            response.status(200);
            response.json({
                isCategoryUpdated:true,
                message:'Success',
                data:dataRes
            }) 
        }else{
            response.status(404);
            response.json({
                isCategoryUpdated:false,
                message:'Write Any Category Name !',
            }) 
        }
        
     }catch(error){
         if(error.code == 11000){
            response
            .status(422)
            .json({
                isCategoryUpdated:false,
                message:'Category Name Already Exits !'
            });
         }else{
            response
            .status(422)
            .json({
                isCategoryUpdated:false,
                message:error.code
            });  
         }
     }
}
module.exports = {
    addCategory:addCategory,
    getCategories:getCategories,
    deleteCategory:deleteCategory,
    updateCategory:updateCategory
}