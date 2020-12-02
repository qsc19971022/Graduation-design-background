/*
 * @Author: your name
 * @Date: 2020-03-13 13:19:50
 * @LastEditTime: 2020-03-15 20:30:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /paper/router/newsRouter.js
 */
const express = require ("express");
const router = express.Router();
const New = require ("../db/model/newsModel");

/**
 * @api {get} /news/list 新闻列表
 * @apiName 新闻列表
 * @apiGroup news
 *
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 获取资讯内容
router.get('/list' , (req,res) => {
    New.find().then(data => {
        res.send(data);
    });
});

/**
 * @api {post} news/add 添加新闻
 * @apiName 添加新闻
 * @apiGroup news
 *
 * @apiParam {String} new1  新闻1
 * @apiParam {String} new2  新闻2
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */
// 添加资讯
router.post('/add', (req,res) => {
    let {new1,new2} = req.body;
    New.insertMany({new1,new2}).then(data => {
        res.send({status:0 , msg : '资讯新增成功'});
    }).catch(err => {
        res.send({status : 1 ,msg : '意外的错误'});
    });
});

/**
 * @api {post} news/edit 编辑新闻
 * @apiName 编辑新闻
 * @apiGroup news
 *
 * @apiParam {String} new1  旧新闻1
 * @apiParam {String} new2  旧新闻2
 * @apiParam {String} info  新的新闻
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  状态日志
 */

// 编辑资讯
router.post('/edit', (req,res) => {
    let {new1,new2,info} = req.body;
    New.updateOne({new1,new2},{$set:{new1:info.new1,new2:info.new2}}).then(data => {
        console.log(data);
        res.send({status : 0 , msg : '资讯修改成功'});
    }).catch(err => {
        res.send({status : 1 ,msg : '意外的错误'});
    });
});
module.exports = router;
