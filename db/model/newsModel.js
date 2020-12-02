/*
 * @Author: your name
 * @Date: 2020-03-13 12:57:39
 * @LastEditTime: 2020-03-13 13:27:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /paper/db/model/newsModel.js
 */
const mongoose = require ('mongoose');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema

let  userSchema = new Schema({
    'titleImg' : {type : String , require : true},
    'new1' : {type : String , require: true},
    'new2' : {type : String , require: true},
});
// schema创建完是不能用的  要转化为数据模型
let New= mongoose.model('news' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}
// New.insertMany({titleImg: 'abcdefg' , new1: '第九条新闻', new2 : '第十条新闻'}).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });
module.exports = New;