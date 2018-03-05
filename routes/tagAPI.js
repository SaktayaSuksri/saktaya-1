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

router.post('/newTag/', function (request, response) {
    var tag = new Tag();
    var methodCode = "02";

    var requiredData = [];
    requiredData.push(request.body.tagName);
    var requiredReady = Validate.requiredData_Check(requiredData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else {
        flow.exec(
            function () {
                tag.tagName = request.body.tagName;
                Tag_Control.newTag(tag, this);
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "New Tag was saved successfully as _id: " + saveResult._id,saveResult, response);
                }
            }
        );
    }
});

router.get('/getTag/', function (request, response) {
    var tag = new Tag();
    var methodCode = "14";

    flow.exec(
        function () {
            Tag_Control.getAllTagName(this);
        }, function (code, err, saveResult) {
            if (err) {
                Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
            }
            else {
                Return_control.responseWithCode(ReturnCode.success, saveResult, response);
            }
        }
    );
});

router.post('/getTagFromID/', function (request, response) {
    var tag = new Tag();
    var methodCode = "15";

    var requiredData = [];
    requiredData.push(request.body.tagId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.tagId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)


    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Tag_Control.checkTagByID(new ObjectId(request.body.tagId), this);
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, saveResult, response);
                }
            }
        );
    }
});

router.post('/editTag/', function (request, response) {
    var tag = new Tag();
    var methodCode = "20";

    var requiredData = [];
    requiredData.push(request.body.tagId);
    requiredData.push(request.body.tagName);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.tagId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Tag_Control.checkTagByID(new ObjectId(request.body.tagId), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    console.log(request.body.tagName)
                    tag.tagName = request.body.tagName;
                    Tag_Control.updateTagByID(new ObjectId(request.body.tagId), tag, this);
                }
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCodeAndData(ReturnCode.success, "Tag with _id: " + request.body.tagId + " has updated successfully.",saveResult, response);
                }
            }
        );
    }
});

router.post('/deleteTag/', function (request, response) {
    var tag = new Tag();
    var methodCode = "16";

    var requiredData = [];
    requiredData.push(request.body.tagId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.tagId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Tag_Control.checkTagByID(new ObjectId(request.body.tagId), this);
            }, function (code, err, callback) {
                if (err || callback == 0) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Tag_Control.deleteTag(new ObjectId(request.body.tagId), this);
                }
            }, function (code, err, callback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "Tag _id: " + request.body.tagId + " was deleted successfully", response);
                }
            }
        );
    }
});

module.exports = router;