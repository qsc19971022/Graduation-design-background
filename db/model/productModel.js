const mongoose = require ('mongoose');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema

let  userSchema = new Schema({
            product_name : {type : String},
            product_rate : {type : String},
            product_trade : {type : String},
            risk_level : {type : String},
            produce : {type : String}

});
// schema创建完是不能用的  要转化为数据模型
 let Product = mongoose.model('product' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}
// Product.insertMany({product_name : '理财10' , product_rate : '6.32' , product_trade : 14 , risk_level: '低' , produce: '成年人'}).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });

module.exports = Product;