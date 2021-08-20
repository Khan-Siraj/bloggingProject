const express = require('express');
const blogController = require('../controllers/createBlog.controller');
const tokenService = require('../services/token.service');
const router = express.Router();

router.post('/',(request,response)=>{
    blogController.addNewBlog(request,response);    
})

module.exports = router;