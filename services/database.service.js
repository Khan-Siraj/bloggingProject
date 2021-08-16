const mongoose = require('mongoose');
const blogSchema = require('../models/createBlog.model');
const categorySchema = require('../models/categories.model');
const adminSchema = require('../models/admin.model');
const schemaList = {
   blog:blogSchema,
   category:categorySchema,
   admin:adminSchema
};

const options ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
const url = 'mongodb://localhost:27017/blogging';
mongoose.connect(url,options)

const createRecord = async (data,schemaName)=>{
  const selectSchema = schemaList[schemaName];
  const collection = new selectSchema(data);
  const response = await collection.save();
  return response;
}

const getAllRecords = async (schemaName,order)=>{
  const selectSchema = schemaList[schemaName];
  const dataRes = await selectSchema.find().sort({created_at:order});
  return dataRes;
}

const getRecordByQuery = async (query,schemaName)=>{
  const selectSchema = schemaList[schemaName];
  const dataRes = await selectSchema.find(query);
  return dataRes;
}

const deleteRecordById = async (schemaName,id)=>{
  const selectSchema = schemaList[schemaName];
  const dataRes = await selectSchema.deleteOne({'_id':id});
  return dataRes;
}

const updateRecordById = async (schemaName,id,data)=>{
  const selectSchema = schemaList[schemaName];
  const dataRes = await selectSchema.updateOne({'_id':id},data);
  return dataRes;
}

module.exports = {
    createRecord:createRecord,
    getAllRecords:getAllRecords,
    getRecordByQuery:getRecordByQuery,
    deleteRecordById:deleteRecordById,
    updateRecordById:updateRecordById
}