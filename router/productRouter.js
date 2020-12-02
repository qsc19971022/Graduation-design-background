const express = require('express');
const router = express.Router();
const Product = require ('../db/model/productModel');
const User = require ('../db/model/userModel');
const Notepad = require ('../db/model/notepadModel');

/**
 * @api {post} /products/list 产品清单
 * @apiName 产品清单
 * @apiGroup product
 */

// 产品清单
router.get('/list' , (req , res) => {
    Product.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log('查询失败');
    });
});

/**
 * @api {post} /products/detail 产品详情页跳转
 * @apiName 详情页跳转
 * @apiGroup product
 *
 * @apiParam {String} name  产品名
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 详情页跳转
router.get('/detail' , (req , res) => {
    let name = req.query.product_name;
    Product.find({product_name : name}).then((data) => {
        console.log(data);
        res.send(data[0]);
    }).catch((err) => {
        console.log('查询失败');
    });
});

/**
 * @api {post} /products/pay 产品购买
 * @apiName 产品购买
 * @apiGroup product
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} product_name  产品名
 * @apiParam {String} money  所需金额
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 购买产品
router.post('/pay' , (req , res) => {
    let {product_name , money , user} = req.body;
    User.find({user : user}).then((data) => {
        console.log(data);
       let user_money = data[0].money;
       if (user_money < money) {
           res.send({code : 1 ,msg :'余额不足，请充值'});
       }else{
           user_money -= money;
           console.log(user_money);
           User.updateOne({user:user},{$set:{money:user_money}}).then((data) => {
               res.send({code : 0 , msg: '购买成功'});
               console.log('修改成功');
           }).catch((err) => {
               console.log('修改失败');
           });
       }
    }).catch((err) => {
        console.log('查询失败');
    });
});

module.exports = router;