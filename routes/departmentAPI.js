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

router.post('/newDepartment/', function (request, response) {
    var department = new Department();
    var methodCode = "05";

    var requiredData = [];
    requiredData.push(request.body.departmentName);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                department.departmentName = request.body.departmentName;
                Department_Control.newDepartment(department, this);
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "New Department was saved successfully as _id: " + saveResult._id, response);
                }
            }
        );
    }
});

router.post('/getDepartmentById', function(req, res) {
    if (!req.body.deptId) {
        res.json({
            code: 'FAILED',
            message: 'Invalid request!'
        });
    } else {
        Department.findById(new ObjectId(req.body.deptId), function(err, dept) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: 'Error in finding department by id "' + req.body.deptId + '" >> ' + err.message
                });
            else if (!dept)
                res.json({
                    code: 'FAILED',
                    message: 'No department found!'
                });
            else
                res.json({
                    code: '999999',
                    message: dept
                });
        });
    }
});

router.get('/getDepartmentsAll', function(req, res) {
    Department.find(function(err, depts) {
        if (err)
            res.json({
                code: 'ERROR',
                message: 'Error in finding all departments >> ' + err.message
            });
        else if (depts.length == 0)
            res.json({
                code: 'FAILED',
                message: 'No department found!'
            });
        else
            res.json({
                code: '999999',
                message: depts
            });
    });
});


module.exports = router;