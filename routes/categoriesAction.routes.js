const express= require('express');
const categoryController = require('../controllers/categories.controller');
const tokenService = require('../services/token.service');
const httpService = require('../services/http.service');
const router = express.Router();

router.delete('/:id',async (request,response)=>{
//    console.log('Routes Console',request.body);
   categoryController.deleteCategory(request,response);
})

router.put('/:id',async (request,response)=>{
//    console.log('Routes Console',request.body);
   categoryController.updateCategory(request,response);
})

module.exports = router;