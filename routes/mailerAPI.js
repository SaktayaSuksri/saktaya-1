//https://nodemailer.com/about/

var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

// DATABASE SETUP

//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests

router.post('/deanMailer/', function (request, response) {
    
});

module.exports = router;

//-----------------------------------------------------------------------------
