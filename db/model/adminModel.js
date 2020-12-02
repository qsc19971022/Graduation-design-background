/*
 * @Author: your name
 * @Date: 2020-03-11 09:05:21
 * @LastEditTime: 2020-03-17 17:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /paper/db/model/adminModel.js
 */
const mongoose = require ('mongoose');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema

let  userSchema = new Schema({
    'user' : {type : String , require : true},
    'pwd' : {type : String , require: true},
    'name' : {type : String , require: true},
});
// schema创建完是不能用的  要转化为数据模型
let Admin = mongoose.model('admins' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}
// Admin.insertMany({user : 15349387633 , pwd : 10170551 }).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });
module.exports = Admin;