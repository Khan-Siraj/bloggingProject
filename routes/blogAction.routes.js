const express = require('express');
const blogController = require('../controllers/createBlog.controller');
const router = express.Router();

router.delete('/:id',async (request,response)=>{
   //    console.log('Routes Console',request.body);
     blogController.deleteBlog(request,response);
   })
   
router.put('/:id',async (request,response)=>{
   //    console.log('Routes Console',request.body);
      blogController.updateBlog(request,response);
   })

module.exports = router;