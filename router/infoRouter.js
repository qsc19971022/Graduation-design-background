const express = require('express');
const router = express.Router();
const Info = require ('../db/model/infoModel');
/**
 * @api {get} /info/search 咨询列表
 * @apiName 咨询列表
 * @apiGroup info
 */

router.get('/search' , (req , res) => {
    Info.find().then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        console.log('查询失败');
    });
});
module.exports = router;