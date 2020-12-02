const mongoose = require ('mongoose');
let Schema = mongoose.Schema;  //通过mongoose来获取schema
let  userSchema = new Schema({
    user : { type : Number},
    head : {
        title : {type : String},
        more : {type : String},
    },
    doc : [
        {
        val : {type : String}
         }
    ],
    con : [
        {
            info_id : { type : Number},
            title : { type : String},
            date : { type : String},
            num : { type : Number},
            pic : { type : String}
        }
    ]
});
// schema创建完是不能用的  要转化为数据模型
let Info = mongoose.model('info' , userSchema);
// Info.updateOne({user : 15349387633},{$push:{doc:{val : '信息6'}}}).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });
// Info.insertMany(json).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });
module.exports = Info;