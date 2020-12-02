// mongoose中一切都是始于schema对象的
const mongoose = require('mongoose');
mongoose.connect('mongodb://dbowner:123456@47.94.107.136:27017/paper' , { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;  //数据库连接对象
db.on('open',function(err){
    if(err){
        console.log('数据库连接失败');
        throw err;
    }
    console.log('数据库连接成功');
});
