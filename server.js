/*
 * @Author: your name
 * @Date: 2020-02-13 14:39:01
 * @LastEditTime: 2020-03-13 13:24:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /paper/server.js
 */
const express = require ('express');
const app = express();
const db = require ('./config/dbConnect');
const request = require ('request');
const path = require ('path');
const userRouter = require ('./router/userRouter');
const commonRouter = require ('./router/commonRouter');
const bankRouter = require ('./router/bankRouter');
const fileRouter = require ('./router/fileRouter');
const productRouter = require ('./router/productRouter');
const infoRouter = require ('./router/infoRouter');
const adminRouter = require ('./router/adminRouter');
const newsRouter = require ('./router/newsRouter');
const cors = require ('cors');
let bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/user' , userRouter);
app.use('/common' , commonRouter);
app.use('/bank' , bankRouter);
app.use('/file' , fileRouter);
app.use('/products' , productRouter);
app.use('/info' , infoRouter);
app.use('/admin' , adminRouter);
app.use('/news' , newsRouter);
// app.use(express.static(path.join(__dirname , 'uploads')));
app.listen(3001 , () => {
    console.log('3001 is running');
});
// 反向代理
let serverUrl = 'https://api.n-1.cn/qqtx';
// 配置静态文件服务中间件
app.use('/', function (req, res) {
    //跨域处理
    res.setHeader('Access-Control-Allow-Origin', '*');
    //代理接口地址
    let url = serverUrl + req.url;
    //用request转发代理
    req.pipe(request(url)).pipe(res);
});

app.listen(3000, () => {
    console.log(`App listening at port 3000`)
});