//https://nodemailer.com/about/

var express = require('express');
var router = express.Router();


var Return_control = require('../controller/return_control.js');
var ReturnCode = require('../model/returnCode.js');

// DATABASE SETUP

//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saktayasuksri@gmail.com',
    pass: 'sddssdsdsda'
  }
});

var mailOptions = {
  from: 'saktayasuksri@gmail.com',
  to: 'livelivelivework@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
router.post('/deanMailer/', function (request, response) {
    // request.body.name
    // request.body.email 
    // request.body.phone  
    // request.body.topic  
    // request.body.detail

    //mail to admin and investor when admin create  C  S  S+
    // mail({
    //     from: "Admin ghb-npl2560 <tum@discoverym.com>", // sender address
    //     bcc: "", // list of receivers
    //     subject: "มีชุดคำถาม-ตอบ ใหม่จากระบบ", // Subject line
    //     text: "✔", // plaintext body
    //     html: "<h5> สถานะ : " + status + "</h5> สามารถเข้าดูได้ที่ <a href='http://www.ghb-npl2560.com'>ghb-npl2560.com</a>"

    // });

    mail({
        from: '"KLEAR" <krystallizer26@gmail.com>', // sender address
        bcc: 'krystallizer26@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: "<h5> สถานะ : 555555 </h5> สามารถเข้าดูได้ที่ <a href='http://www.ghb-npl2560.com'>ghb-npl2560.com</a>"
    });
    Return_control.responseWithCode(ReturnCode.success, "Email is being sent...", response);
});

module.exports = router;

//-----------------------------------------------------------------------------