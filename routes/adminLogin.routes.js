const express = require('express');
const router = express.Router();

router.get('/',(request,response)=>{
    response.render('adminLogin',{title:'Admin Login'});
})

module.exports = router;