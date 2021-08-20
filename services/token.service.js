require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const issService = require('./iss.service');
const createToken = async (request,expiresIn)=>{
    const formData = request.body;
    const endpoint = request.get('origin');
    const api = request.originalUrl;
    const iss = endpoint+api;
    const token = await jwt.sign({
        iss:iss,
        data:request.body
    },secretKey,{expiresIn:expiresIn});
    return token;

}
const createCustomToken = async (request,expiresIn)=>{
    const formData = request.body.data;
    const endpoint = request.endpoint;
    const api = request.api;
    const iss = endpoint+api;
    const token = await jwt.sign({
        iss:iss,
        data:request.body
    },secretKey,{expiresIn:expiresIn});
    return token;
}



const verifyToken =  (request)=>{
    let token = "";
    if(request.method == 'GET' || request.method == 'DELETE' || request.method == 'PUT'){
        if(request.headers['x-auth-token']){
           token = request.headers['x-auth-token'];
        }
        else{
            token = request.cookies.auth_token;
        }
    }
    else{
        token = request.body.token;
    }
    // Verify Token
    if(token){
        try{
        const tmp = jwt.verify(token,secretKey);
        const requestCommingFrom = tmp.iss;
        if(issService.indexOf(requestCommingFrom)!=-1){
            return {
                isVerified:true,
                data:tmp.data
            };
        }else{
            return {
                isVerified:false
            }
        }
        }
        catch(error){
            return {
                isVerified: false,
              };
        }
    }else{
        return {
            isVerified: false,
          };
    }
}

module.exports = {
    createToken:createToken,
    verifyToken:verifyToken,
    createCustomToken:createCustomToken
}
