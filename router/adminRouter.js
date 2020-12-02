/*
 * @Author: your name
 * @Date: 2020-03-11 09:39:08
 * @LastEditTime: 2020-03-17 17:14:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /paper/router/adminRouter.js
 */
const express = require('express');
const router = express.Router();
const Admin = require ('../db/model/adminModel');
const User = require ('../db/model/userModel');
const Product = require ('../db/model/productModel');

/**
 * @api {post} /admin/login 管理员登录
 * @apiName 管理员登录
 * @apiGroup admin
 *
 * @apiParam {String} user  用户名
 * @apiParam {String} pwd   密码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 后台登录
router.post('/login' , (req , res) => {
    let {user , pwd} = req.body;
    Admin.find({user,pwd}).then( data => {
        console.log(data);
        if (data.length > 0){
            res.json({status : 0 , msg : '登录成功'});
        } else {
            res.json({status : 1 , msg : '账号或密码错误'});
        }
    }).catch( err => {
        res.send('意外的错误');
    })
});

/**
 * @api {post} /admin/customer 客户列表
 * @apiName 客户列表
 * @apiGroup admin
 *
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 客户列表
router.post('/customer' , (req ,res) => {
    User.find().then(data => {
        res.send(data);
    })
});

/**
 * @api {post} /admin/product/edit 产品管理
 * @apiName 产品管理
 * @apiGroup admin
 *
 * @apiParam {String} name  产品名
 * @apiParam {String} product_name  修改后的产品名
 * @apiParam {String} product_rate  修改后的收益率
 * @apiParam {String} product_trade  修改后的周期
 * @apiParam {String} risk_level  修改后的风险等级
 * @apiParam {String} produce  修改后适合人群
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 产品管理
router.post('/product/edit' , (req,res) => {
    let {name,product_name,product_rate,product_trade,risk_level,produce} = req.body;
    Product.updateOne({product_name:name},{$set:{product_name,product_rate,product_trade,risk_level,produce}}).then(data => {
        res.send({status : 0 , msg : '编辑成功'});
        console.log(data);
    }).catch(err => {
        res.send({status : 1 , msg : '意外的错误'});
    })
});

/**
 * @api {post} /admin/product/add 新增产品
 * @apiName 新增产品
 * @apiGroup admin
 *
 * @apiParam {String} product_name  产品名
 * @apiParam {String} product_rate  收益率
 * @apiParam {String} product_trade  周期
 * @apiParam {String} risk_level  风险等级
 * @apiParam {String} produce  适合人群
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 新增产品
router.post('/product/add' , (req,res) => {
    let {product_name,product_rate,product_trade,risk_level,produce} = req.body;
    Product.insertMany({product_name,product_rate,product_trade,risk_level,produce}).then(data => {
        res.send({status : 0 , msg : '添加成功'});
    }).catch(err => {
        res.send({status : 1 , msg : '添加失败'});
    })
});

/**
 * @api {post} /product/list 管理员列表
 * @apiName 管理员列表
 * @apiGroup admin
 *
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 管理员列表
router.post('/list' , (req,res) => {
    Admin.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.send({status : 1 , msg : '意外的错误'});
    })
});

/**
 * @api {post} /admin/add 添加管理
 * @apiName 添加管理
 * @apiGroup admin
 *
 * @apiParam {String} name  管理员名
 * @apiParam {String} user  用户名
 * @apiParam {String} pwd  密码
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 添加管理
router.post('/add' , (req,res) => {
    let {name,user,pwd} = req.body;
    Admin.insertMany({name,user,pwd}).then(data => {
        res.send({status : 0 , msg : '添加成功'});
    }).catch(err => {
        res.send({status : 1 , msg : '意外的错误'});
    })
});

/**
 * @api {post} /admin/del 删除管理
 * @apiName 删除管理
 * @apiGroup admin
 *
 * @apiParam {String} user  用户名
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 删除管理
router.post('/del' , (req,res) => {
    let {user} = req.body;
    Admin.deleteOne({user}).then(data => {
        res.send({status : 0 , msg : '移除成功'});
    }).catch(err => {
        res.send({status : 1 , msg : '意外的错误'});
    })
});
module.exports = router;