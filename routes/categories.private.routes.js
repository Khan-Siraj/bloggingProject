const express= require('express');
const categoryController = require('../controllers/categories.controller');
const router = express.Router();

router.post('/',(request,response)=>{
    categoryController.addCategory(request,response);
})

module.exports = router;