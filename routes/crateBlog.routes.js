const express = require('express');
const blogController = require('../controllers/createBlog.controller');
const tokenService = require('../services/token.service');
const httpRequest = require('../services/http.service');
const router = express.Router();

router.post('/',async (request,response)=>{
  const token = await tokenService.createToken(request,120);
  const ajaxRes = await httpRequest.postRequestWithFile({
     endpoint:request.get('origin'),
     api:'/api/private/blog',
     data:token,
     file:request.file
  });
  response
  .status(ajaxRes.status)
  .json(ajaxRes.body);
})

router.get('/',async (request,response)=>{
   //    console.log('Routes Console',request.body);
      const dataRes = await blogController.getAllBlogs(request,response);
      response.json(dataRes);
   })

router.delete('/:id',async (request,response)=>{
   //    console.log('Routes Console',request.body);
      const dataRes = await blogController.deleteBlog(request,response);
      response.json(dataRes);
   })
   
router.put('/:id',async (request,response)=>{
   //    console.log('Routes Console',request.body);
      const dataRes = await blogController.updateBlog(request,response);
      response.json(dataRes);
   })

module.exports = router;