const express = require('express');
const multer = require ('multer');
const router = express.Router();
let storage = multer.diskStorage({
// 设置上传后文件路径，uploads文件夹会自动创建
    destination : function(req , file ,cb) {
    cb(null , './uploads')
},
// 给上传文件重命名，获取添加后缀名
    filename : function (req , file , cb) {
        let fileFormat = (file.originalname).split('.');
        // 给图片加上时间戳格式防止发生重名
        // 比如把 abc.jpg图片切割成[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null , Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});
let upload = multer({
    storage : storage
});

/**
 * @api {post} /file/upload 图片上传
 * @apiName 图片上传
 * @apiGroup file
 *
 * @apiParam {String} upload  图片文件
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

router.post('/upload' , upload.single('upload') , (req , res) => {
    let {size,mimetype,path} = req.file;
    let types = ['jpg' , 'jpeg' , 'png' , 'gif'];
    let tmpType = mimetype.split('/')[1];
    if (size > 500000) {
        return res.json({status:-1 , msg : '尺寸过大'});
    } else if (types.indexOf(tmpType) == -1){
        return res.json({status:-2 , msg : '上传类型错误'});
    } else {
        return res.json({status:0 , msg : '上传成功'});
    }
});
module.exports = router;

