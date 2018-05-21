//https://nodemailer.com/about/

var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var Return_control = require('../controller/return_control.js');
var ReturnCode = require('../model/returnCode.js');




var fs = require('fs');
var handlebars = require('handlebars');

// DATABASE SETUP

//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests


router.post('/deanMailer/', function (request, response) {

    var methodCode = "65";

    console.log(request.body.name)
    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'webmaster.kmitl@gmail.com',
            pass: 'kmitlWebmaster2018'
        }
    });



    readHTMLFile(__dirname + '/../public/deanmailtemplate.html', function (err, html) {

        var template = handlebars.compile(html);
        var replacements = {
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            topic: request.body.topic,
            detail: request.body.detail


        };

        var htmlToSend = template(replacements);

        var mailOptions = {
            from: 'webmaster.kmitl@gmail.com',
            to: 'livelivelivework@gmail.com',
            subject: "คณะบดีพบประชาชน: " + request.body.topic,
            html: htmlToSend


        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + "001", error, response);
            } else {
                console.log('Email sent: ' + info.response);
                response.send("<h4 class=;alert alert-success alert-dismissible'>ส่งข้อความเรียบร้อยแล้ว</h4")
                //   Return_control.responseWithCode(ReturnCode.success, "Sending E-mail, please wait...", response);
            }
        });
        /*var template = handlebars.compile(html);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'my@email.com',
            to : 'some@email.com',
            subject : 'test subject',
            html : htmlToSend
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    */

    });

});


module.exports = router;

//-----------------------------------------------------------------------------




//-----------------------------------------------------------------------------