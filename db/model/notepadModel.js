const mongoose = require ('mongoose');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema

let  userSchema = new Schema({
    user : { type : Number},
    mouth : {type :Number},
    year : {type : Number},
    flag : {type : String},
    body : [
        {
            title : {type : String},
            time : {type : String},
            money : {type : String}
        }
    ],

});
// schema创建完是不能用的  要转化为数据模型
let Notepad = mongoose.model('notepad' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}
// Notepad.insertMany({user : 15349387633 , mouth : 3 , year : 2020 , flag: 1 , body: {title : '话费充值' , time : '2020年3月6日' , money : 100}}).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });

module.exports = Notepad;