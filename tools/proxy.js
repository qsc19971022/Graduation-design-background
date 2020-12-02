const express = require('express')
const path = require('path');
const app = express();
const request = require('request');


let serverUrl = 'https://api.n-1.cn/qqtx';//代理server地址
// 配置静态文件服务中间件
app.use(express.static(path.join(__dirname, 'src')));
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
})