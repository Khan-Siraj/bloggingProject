const tokenService = require('../services/token.service');
const _dbService = require('../services/database.service');

const getAdmin = async (request,response)=>{
   const token= tokenService.verifyToken(request);
   if(token.isVerified){
       const getEmail = {
           email:token.data.email
       }
       const emailRes = await _dbService.getRecordByQuery(getEmail,'admin');
       if(emailRes.length > 0){
        if(emailRes[0].password == token.data.password){
            const data = {
                email:emailRes[0].email
            };
            response
           .status(200)
           .json({
            isUserValid:true,
            data:data
          }); 
        }else{
            response
            .status(401)
            .json({
             isUserValid:false,
             message:'Wrong Password !'
           });  
        }
       }else{
        response
        .status(404)
        .json({
            isUserValid:false,
            message:'Wrong Email Address !'
        });  
       }
   }
   else{
    response
    .status(401)
    .json({
        isUserValid:false,
        message:'Permission Denied !'
    });
   }
}

module.exports = {
    getAdmin:getAdmin
}