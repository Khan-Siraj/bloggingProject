const express = require('express')
const tokenService = require('../services/token.service');
const httpService = require('../services/http.service');
const router = express.Router();

router.post('/', async (request,response)=>{
    const expiresIn = 120;
    const token = await tokenService.createToken(request,expiresIn);
    const ajaxRes = await httpService.getRequest({
        endpoint:request.get('origin'),
        api:'/api/private/admin',
        data:token
    });
   if(ajaxRes.body.isUserValid){
      const expiresInOneDay = 86400;
      const tokenRes = await tokenService.createToken(request,expiresInOneDay);
      response.cookie('auth_token',tokenRes,{maxAge:expiresInOneDay});
      response.status(ajaxRes.status);
      response.json(ajaxRes.body);
   }else{
    response.status(ajaxRes.status);
    response.json(ajaxRes.body);
   }
})

module.exports = router;