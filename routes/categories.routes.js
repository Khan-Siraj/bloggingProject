const express= require('express');
const categoryController = require('../controllers/categories.controller');
const router = express.Router();

router.post('/',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const dataRes = await categoryController.addCategory(request,response);
   response.json(dataRes);
})

router.get('/',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const dataRes = await categoryController.getCategories(request,response);
   response.json(dataRes);
})

router.delete('/:id',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const dataRes = await categoryController.deleteCategory(request,response);
   response.json(dataRes);
})

router.put('/:id',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const dataRes = await categoryController.updateCategory(request,response);
   response.json(dataRes);
})

module.exports = router;