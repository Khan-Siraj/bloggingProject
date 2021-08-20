const ajax = require('supertest');

const postRequest = async (request)=>{
    const response = await ajax(request.endpoint)
    .post(request.api)
    .send({
        token:request.data
    });
    return response;
}
const postRequestWithFile = async (request)=>{
    const response = await ajax(request.endpoint)
    .post(request.api)
    .send({
        token:request.data,
        file:request.file
    });
    return response;
}

const getRequest = async (request)=>{
    const response= await ajax(request.endpoint)
    .get(request.api+'/'+request.data)
    .set({'X-Auth-Token':request.data});
    return response;
}

module.exports = {
    postRequest:postRequest,
    getRequest:getRequest,
    postRequestWithFile:postRequestWithFile
}