const nodemailer = require("nodemailer");
// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.163.com",   // 发送方用的邮箱
    port: 465,                     // 端口号
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'qishengchengg@163.com', // 发送方的邮箱地址
        pass: 'qsc1231'  //  mpt 验证码
    }
});

//发送邮件

function send(mail,code){
    // 邮件信息
    let mailObj ={
        from: '"假装是个服务器" <qishengchengg@163.com>', // sender address
        to: mail, // list of receivers
        subject: "注册验证", // Subject line
        text: `你的验证码是${code},有效时间五分钟.` // plain text body
    };
    return new Promise((resolve,reject) => {
        transporter.sendMail(mailObj , (err,data) => {
            if (err){
                reject();
            } else {
                resolve();
            }
        });
    })
}
module.exports = {'send' : send};