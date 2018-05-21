//https://nodemailer.com/about/

var express = require('express');
var router = express.Router();


var Return_control = require('../controller/return_control.js');
var ReturnCode = require('../model/returnCode.js');

// DATABASE SETUP

//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

var nodemailer = require('nodemailer');

router.post('/deanMailer/', function (request, response) {
    var methodCode = "65"

    request.body.name

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'webmaster.kmitl@gmail.com',
            pass: 'kmitlWebmaster2018'
        }
    });

    var mailOptions = {
        from: 'webmaster.kmitl@gmail.com',
        to: 'webmaster.kmitl@gmail.com',  //DEAN's EMAIL
        subject: "คณะบดีพบประชาชน: " + request.body.topic, //หัวเมลล์จ้า
        text: "From: " + request.body.name + " (" + request.body.email + ")\n\nTopic: " + request.body.topic + "\nDetail: " + request.body.detail + "\n\nContact: " + request.body.phone
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            Return_control.responseWithCode(ReturnCode.serviceError + methodCode + "001", error, response);
        } else {
            console.log('Email sent: ' + info.response);
            Return_control.responseWithCode(ReturnCode.success, "Sending E-mail, please wait...", response);
        }
    });
});

module.exports = router;

//-----------------------------------------------------------------------------