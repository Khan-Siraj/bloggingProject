const _dbService = require('../services/database.service');

const addCategory = async (request,response)=>{
    try{
        const dataRes = await _dbService.createRecord(request.body,'category')
        return {
            isCategoryCreated:true,
            data:dataRes
        };
    }catch(error){
        return {
            isCategoryCreated:false,
            error:error
        };
    }
}

const getCategories = async (request,response)=>{
    const dataRes = await _dbService.getAllRecords('category',1);
    return dataRes;
}

const deleteCategory = async (request,response)=>{
    const id = request.params.id;
    const dataRes = await _dbService.deleteRecordById('category',id);
    return dataRes;
}

const updateCategory = async (request,response)=>{
    const id = request.params.id;
    const data = request.body;
    const dataRes = await _dbService.updateRecordById('category',id,data);
    return dataRes;
}
module.exports = {
    addCategory:addCategory,
    getCategories:getCategories,
    deleteCategory:deleteCategory,
    updateCategory:updateCategory
}