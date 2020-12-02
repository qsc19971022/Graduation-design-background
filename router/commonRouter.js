const express = require('express');
const router = express.Router();
const User = require ('../db/model/userModel');

/**
 * @api {get} /common/add 获取资料
 * @apiName 获取资料
 * @apiGroup common
 *
 * @apiParam {String} user  用户名
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 获取资料
router.get('/info' , (req,res) => {
    let user = parseInt(req.query.user);
    User.find({user : user}).then((data) => {
        console.log(data);
        res.json(data[0]);
        console.log('查询结果');
    }).catch((err) => {
        console.log('查询失败');
    });
});

/**
 * @api {post} /common/edit 编辑资料
 * @apiName 编辑资料
 * @apiGroup common
 *
 * @apiParam {String} user   用户名
 * @apiParam {String} name   昵称
 * @apiParam {String} img    图片url
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 编辑资料
router.post('/edit' , (req,res) => {
    let user = parseInt(req.body.user);
    let {name,img} = req.body;
    User.updateOne({user},{$set:{name:name , img:img}}).then((data) => {
        console.log(data);
        res.json({status:1,msg:'修改成功'});
        console.log('修改成功');
    }).catch((err) => {
        console.log('修改失败');
    });

});

module.exports = router;