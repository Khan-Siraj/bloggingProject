const express= require('express');
const categoryController = require('../controllers/categories.controller');
const tokenService = require('../services/token.service');
const httpService = require('../services/http.service');
const router = express.Router();

router.post('/',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const expiresIn = 120; 
   const token = await tokenService.createToken(request,expiresIn);
   const ajaxRes = await httpService.postRequest({
      endpoint:request.get('origin'),
      api:'/api/private/categories',
      data:token
    });
      response
      .status(ajaxRes.status)
      .json(ajaxRes.body);
})

router.get('/',async (request,response)=>{
//    console.log('Routes Console',request.body);
   const dataRes = await categoryController.getCategories(request,response);
   response.json(dataRes);
})

// router.delete('/:id',async (request,response)=>{
// //    console.log('Routes Console',request.body);
//    const dataRes = await categoryController.deleteCategory(request,response);
//    response.json(dataRes);
// })

// router.put('/:id',async (request,response)=>{
// //    console.log('Routes Console',request.body);
//    const dataRes = await categoryController.updateCategory(request,response);
//    response.json(dataRes);
// })

module.exports = router;