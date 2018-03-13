var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});


var flow = require('../services/flow.js')

var ReturnCode = require('../model/returnCode.js');
var ResourceType = require('../model/resourceType_model.js');
var Department = require('../model/department_model.js');
var News = require('../model/news_model.js');
var Tag = require('../model/tag_model.js');
var Position = require('../model/position_model.js');
var Personel = require('../model/personel_model.js');

var Validate = require("../controller/validation_controller.js");
var ResourceType_Control = require("../controller/resourceType_control.js");
var Department_Control = require('../controller/department_control.js');
var Tag_Control = require("../controller/tag_control.js");
var News_Control = require("../controller/news_control.js");
var Position_Control = require('../controller/position_control.js');
var Personel_Control = require('../controller/personel_control.js');
var Return_control = require('../controller/return_control.js');

router.post('/newPosition/', function (request, response) {
    var position = new Position();
    var methodCode = "08";

    var requiredData = [];
    requiredData.push(request.body.positionName);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                position.positionName = request.body.positionName;
                Position_Control.newPosition(position, this);
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "New Position was saved successfully as _id: " + saveResult._id, response);
                }
            }
        );
    }
});

router.post('/getPositionById', function(req, res) {
    if (!req.body.posId) {
        res.json({
            code: 'FAILED',
            message: 'Invalid request!'
        });
    } else {
        Position.findById(new ObjectId(req.body.posId), function(err, pos) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: 'Error in finding position by id "' + req.body.posId + '" >> ' + err.message
                });
            else if (!pos)
                res.json({
                    code: 'FAILED',
                    message: 'No position found!'
                });
            else
                res.json({
                    code: '999999',
                    message: pos
                });
        });
    }
});

router.get('/getPositionsAll', function(req, res) {
    Position.find(function(err, postns) {
        if (err)
            res.json({
                code: 'ERROR',
                message: 'Error in finding all positions >> ' + err.message
            });
        else if (postns.length == 0)
            res.json({
                code: 'FAILED',
                message: 'No position found!'
            });
        else
            res.json({
                code: '999999',
                message: postns
            });
    });
});

module.exports = router;