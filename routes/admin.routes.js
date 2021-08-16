const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/:query',(request,response)=>{
    adminController.getAdmin(request,response);
})
router.post('/',(request,response)=>{
    console.log('Admin Post');
})

module.exports = router;