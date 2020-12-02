const express = require('express');
const router = express.Router();
const User = require ('../db/model/userModel');
const Product = require ('../db/model/productModel');
const request = require ('request');
const querystring = require("querystring");
const bcrypt = require ('bcrypt');
const salt = bcrypt.genSaltSync(10);
const https = require ("https");
let getMail = require ('../tools/mail');
//const fetch = require("node-fetch");
let redis = {};

/**
 * @api {post} /user/mail 邮箱验证
 * @apiName 邮箱验证
 * @apiGroup User
 *
 * @apiParam {String} mail  邮箱
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */
let num1 = parseInt(Math.random() * 9) + 1;
let num2 = parseInt(Math.random() * 10);
let num3 = parseInt(Math.random() * 10);
let num4 = parseInt(Math.random() * 10);
let num5 = parseInt(Math.random() * 10);
let num6 = parseInt(Math.random() * 10);
let code = num1 + '' + num2 + num3 + num4 + num5 + num6;
router.post('/mail',(req,res) => {   //邮箱验证码
    let {mail} = req.body;
    // 产生随机验证码
    getMail.send(mail,code).then( () =>{
        redis[mail] = code;
        console.log(redis);
        res.send('验证码发送成功');
    }).catch(() => {
        res.send('验证码发送失败');
    });
});

/**
 * @api {post} /user/tel 短信验证
 * @apiName 短信验证码
 * @apiGroup User
 *
 * @apiParam {String} tel  邮箱
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 短信验证码
router.post('/tel' , (req,res) => {
    let {tel} = req.body;
    console.log(tel);
    let queryData = querystring.stringify({
        'mobile' : tel,
        'content': '您的手机验证码为' + code + '，5分钟内有效。请不要把此验证码泄露给任何人。【Simon】',
        'appkey':'06d97dfdd1fd0bb5'
    });
    let queryUrl = 'https://api.jisuapi.com/sms/send?' + queryData;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 打印接口返回内容
            redis[tel] = code;
            console.log(redis);
            // let jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
            // // console.log(jsonObj)
            // res.json(jsonObj);//将json返回过去。使用调试工具获取到对应的内容。
        } else {
            res.json({code: 110,msg:'意外的错误' });
            console.log('请求异常');
        }
    });
});
/**
 * @api {post} /user/reg 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} pwd   密码
 * @apiParam {Number} code  验证码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

router.post('/reg' , (req ,res) => {  // 注册接口
    let {user,code} = req.body;
    console.log(redis[user]);
    if (redis[user] == code){
        User.find({user}).then( data => {
            if (data.length > 0){
                console.log(data);
                res.send({status : 2 , msg : '用户已存在'});
            } else {
                //要判断验证码是否ok
                User.insertMany({user:user}).then(() => {
                    res.send({status : 0 , msg : '注册成功'});
                }).catch(err => {
                    res.send('注册失败');
                });
            }
        }).catch( err => {
            res.send('意外的错误');
        })
    }else {
        res.send({status: 1 , msg : '验证码错误'});
    }

});

/**
 * @api {post} /user/reg 用户登录
 * @apiName 用户登录
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} pwd   密码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 登录接口
router.post('/login' , (req , res) => {
    let {user,pwd} = req.body;
    User.find({user,pwd}).then( data => {
        if (data.length > 0){
            res.json({status : 0 , msg : '登录成功'});
        } else {
            res.json({status : 1 , msg : '登录失败'});
        }
    }).catch( err => {
        res.send('意外的错误');
    })
});

/**
 * @api {post} /user/setpwd 设置密码
 * @apiName 设置密码
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} pwd   密码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 设置密码
router.post('/setpwd' ,async (req , res) => {
    let {user, pwd} = req.body;
    let flag = await bcrypt.hashSync(pwd, salt);
    console.log(flag);
    User.updateMany({user:user},{$set:{pwd:flag}}).then((data) => {
        res.json({status: 0, msg: '密码设置成功'});
    }).catch(err => {
        res.json({status: 1, msg: '密码设置失败'});
    });
});

/**
 * @api {post} /user/setmoney 余额充值
 * @apiName 余额充值
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} money   金额
 * @apiParam {String} bank_card   银行卡号
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 余额充值
router.post('/setmoney' , (req ,res) => {
    let {user , money} = req.body;
    money = parseInt(money);
    User.find({user:user}).then( data => {
        let _money = parseInt(data[0].money);
            _money = _money + money;
            User.updateMany({user:user},{$set:{money:_money}}).then((data) => {
                res.json({status: 0, msg: '充值成功'});
            }).catch(err => {
                res.json({status: 1, msg: '充值失败'});
            });
    }).catch( err => {
        res.send('意外的错误');
    })
});

/**
 * @api {post} /user/getmoney 余额提现
 * @apiName 余额提现
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} money   金额
 * @apiParam {String} bank_card   银行卡号
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 余额提现
router.post('/getmoney' , (req , res) => {
    let {user , money} = req.body;
    User.find({user:user}).then( data => {
       let _money = parseInt(data[0].money);
       if (_money >= money) {
           _money = _money - money;
           User.updateMany({user:user},{$set:{money:_money}}).then((data) => {
               res.json({status: 0, msg: '提现成功'});
           }).catch(err => {
               res.json({status: 1, msg: '提现失败'});
           });
       }else {
           res.send({status : 2 , msg : '提现金额不能超过余额'});
       }
    }).catch( err => {
        res.send('意外的错误');
    })
});

/**
 * @api {post} /user/compare 支付验证
 * @apiName 支付验证
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} paypwd   支付密码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 支付验证
router.post('/compare' , (req , res) => {
    let {user , paypwd} = req.body;
    User.find({user:user}).then((data) => {
        let _paypwd = data[0].paypwd;
        if(_paypwd == paypwd){
            res.json({status: 0, msg: '密码正确'});
        }else {
            res.json({status: 0, msg: '支付密码错误'});
        }
    }).catch(err => {
        res.json({status: 1, msg: '密码设置失败'});
    });
});

/**
 * @api {post} /user/pay 付款
 * @apiName 付款
 * @apiGroup User
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} money   话费面值
 * @apiParam {String} way   支付方式
 * @apiParam {String} phone   充值号码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

//  话费充值
router.post('/pay' , (req , res) => {
    let {user , money} = req.body;
    User.find({user:user}).then( data => {
        let _money = parseInt(data[0].money);
        if (_money >= money) {
            _money = _money - money;
            console.log(_money);
            User.updateMany({user:user},{$set:{money:_money}}).then((data) => {
                res.json({status: 0, msg: '话费充值成功'});
            }).catch(err => {
                res.json({status: 1, msg: '充值失败'});
            });
        }else {
            res.send({status : 2 , msg : '余额不足'});
        }
    }).catch( err => {
        res.send('意外的错误');
    })
});
module.exports = router;