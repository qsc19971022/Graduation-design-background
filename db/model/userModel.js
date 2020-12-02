const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema

let  userSchema = new Schema({
    'user' : {type : Number , require : true},
    'pwd' : {type : String , require: true, set(val){
            return bcrypt.hashSync(val,8);
        }},
    'age' : Number,
    'paypwd' : {type : Number , default : 123456},
    'money' : {type : Number , default : 100},
    'img' : {type : String , default : 'http://www.woftsun.com/res/sc.jpg'},
    'name' : {type : String , default : '新用户'},
    'balance' : {type : Number , default : 0},
    'income' :{type : Number , default : 0},
    'user_money' : {type : Number , default : 100},
    'bank_card' : [
        {
            bank : {type : String},
            bank_id : {type : String},
            bank_logo : {type : String},
            bank_type : {type : String}
        },
        ]
});
// schema创建完是不能用的  要转化为数据模型
let User = mongoose.model('user' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}

// 插入数据
// User.insertMany({income : 4.31 , user_money : 100 }).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });

// 查询数据
// User.find({age:17}).then((data) => {
//     console.log(data);
//     console.log('查询结果');
// }).catch((err) => {
//     console.log('查询失败');
// });

// 删除数据
// User.remove({age:16}).then((data) => {
//     console.log(data);
//     console.log('删除成功');
// }).catch((err) => {
//     console.log('删除失败');
// });

// 修改数据
// User.updateOne({user:15349387633},{$set:{age:+2}}).then((data) => {
//     console.log(data);
//     console.log('修改成功');
// }).catch((err) => {
//     console.log('修改失败');
// });
module.exports = User;