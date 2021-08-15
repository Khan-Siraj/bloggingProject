const express = require('express');
const blogController = require('../controllers/createBlog.controller');
const router = express.Router();

router.post('/',async (request,response)=>{
   const dataRes = await blogController.addNewBlog(request,response);
   response
   .status(200)
   .json(dataRes);
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