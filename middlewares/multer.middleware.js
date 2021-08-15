const multer = require('multer');
// const crypto = require('crypto');
// let unique = crypto.randomBytes(5).toString('hex');
// file uplaod
const storage = multer.diskStorage({
    destination:(request,fileInfo,callback)=>{
        callback(null,'storage/images');
    },
    filename:(request,fileInfo,callback)=>{
        callback(null,`${Date.now()}.png`);
    }
})
const multipart = multer({
    storage:storage
}).single('image');

module.exports = multipart;