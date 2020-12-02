const express = require('express');
const router = express.Router();
const User = require ('../db/model/userModel');
const Notepad = require ('../db/model/notepadModel');
const request = require ('request');
const querystring = require("querystring");

/**
 * @api {post} /bank/add 添加银行卡
 * @apiName 添加银行卡
 * @apiGroup bank
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} bank_id   银行卡号
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 添加银行卡
router.post('/add' , (req,res) => {
    let {user , bank_id} = req.body;
    let Data = querystring.stringify({
        'bankcard' : bank_id,
        'appkey':'06d97dfdd1fd0bb5'
    });
    let queryUrl = 'https://api.jisuapi.com/bankcard/query?' + Data;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
             console.log(jsonObj.result.bankcard)
            //User.updateOne({user : user}, { $set : {bank_card:jsonObj.result.bank , bank_id :bank_id }})
              User.updateOne({user : user},{$push:{bank_card:{bank:jsonObj.result.bank , bank_id :jsonObj.result.bankcard ,bank_logo :jsonObj.result.logo ,bank_type:jsonObj.result.type}}}).then((data) => {
                  console.log(data);
                  res.json({status:1,msg:'绑定成功'});
                  console.log('绑定成功');
              }).catch((err) => {
                  console.log('绑定失败');
              });
            res.json(jsonObj);//将json返回过去。使用调试工具获取到对应的内容。
        } else {
            res.json({code: 110,msg:'意外的错误' });
            console.log('请求异常');
        }
    });
});

/**
 * @api {get} /bank/get 获取银行卡
 * @apiName 获取银行卡
 * @apiGroup bank
 *
 * @apiParam {String} user  用户名
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 获取银行卡
router.get('/get' , (req , res) => {
   let {user} = req.query;
    User.find({user:user}).then((data) => {
        console.log(data[0].bank_card);
        res.send(data[0].bank_card);
    }).catch((err) => {
        console.log('查询失败');
    });
});
module.exports = router;