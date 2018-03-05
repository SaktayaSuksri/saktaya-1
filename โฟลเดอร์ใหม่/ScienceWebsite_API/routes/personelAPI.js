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

router.post('/newPersonel/', function (request, response) {
    var personel = new Personel();
    var methodCode = "09";

    var requiredData = [];
    requiredData.push(request.body.personelName);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.positionId);
    objectIdData.push(request.body.departmentId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    personel.personelName = request.body.personelName;
                    personel.education = request.body.education;
                    personel.expertise = request.body.expertise;
                    personel.subjects = request.body.subjects;
                    personel.officeRoom = request.body.officeRoom;
                    personel.email = request.body.email;
                    personel.homepage = request.body.homepage;
                    personel.telNumber = request.body.telNumber;
                    personel.positionId = request.body.positionId;
                    personel.departmentId = request.body.departmentId;
                    Personel_Control.newPersonel(personel, this);
                }
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "New Personel was saved successfully as _id: " + saveResult._id, response);
                }
            }
        );
    }
});

router.post('/editPersonel/', function (request, response) {
    var personel = new Personel();
    var methodCode = "09";

    var requiredData = [];
    requiredData.push(request.body.personelId);
    requiredData.push(request.body.personelName);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.personelId);
    objectIdData.push(request.body.positionId);
    objectIdData.push(request.body.departmentId);
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
                Position_Control.checkPositionByID(new ObjectId(request.body.positionId), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Personel_Control.checkPersonelByID(new ObjectId(request.body.personelId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    personel.personelName = request.body.personelName;
                    personel.education = request.body.education;
                    personel.expertise = request.body.expertise;
                    personel.subjects = request.body.subjects;
                    personel.officeRoom = request.body.officeRoom;
                    personel.email = request.body.email;
                    personel.homepage = request.body.homepage;
                    personel.telNumber = request.body.telNumber;
                    personel.positionId = request.body.positionId;
                    personel.departmentId = request.body.departmentId;
                    Personel_Control.updatePersonelByID(new ObjectId(request.body.personelId), personel, this);
                }
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "Personel with _id: " + request.body.personelId + " has updated successfully.", response);
                }
            }
        );
    }
});

//ยังไม่ได้ทำข่ะ
router.post('/getAllPersonel/', function (request, response) {
    var news = new News();
    var methodCode = "06";

    var requiredData = [];
    requiredData.push(request.body.resourceId);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.limit);
    requiredData.push(request.body.isPosted);
    requiredData.push(request.body.isPreview);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPosted);
    booleanData.push(request.body.isPreview);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.resourceId);
    objectIdData.push(request.body.departmentId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var numberData = [];
    numberData.push(request.body.limit);
    var numberReady = Validate.numberData_Check(numberData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!booleanReady) {
        var alert = "Input Not Valid, check if some data is not boolean."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "002", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else if (!numberReady) {
        var alert = "Input Not Valid, check if some data is not Number."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "004", alert, response)
    }
    else {
        flow.exec(
            function () {
                Department_Control.checkDepartmentByID(new ObjectId(request.body.departmentId), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(request.body.resourceId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.getAllNews(new ObjectId(request.body.resourceId), new ObjectId(request.body.departmentId), request.body.isPreview, parseInt(request.body.limit), request.body.isPosted, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode("999999", result, response)
                }
            }
        );
    }
});

router.post('/getPersonelfromID/', function (request, response) {
    var personel = new Personel();
    var methodCode = "07";

    var thisPersonel;
    var thisDepartment;
    var thisResourceType;

    var requiredData = [];
    requiredData.push(request.body.personelId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.personelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var obj = new Object();
    obj.personelName = "N/A";
    obj.education = "N/A";
    obj.expertise = "N/A";
    obj.subjects = "N/A";
    obj.officeRoom = "N/A";
    obj.email = "N/A";
    obj.homepage = "N/A";
    obj.telnumber = "N/A";
    obj.positionName = "N/A";
    obj.departmentName = "N/A";

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
                Personel_Control.checkPersonelByID(new ObjectId(request.body.personelId), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    thisPersonel = result;
                    obj.personelName = result.personelName;
                    obj.education = result.education;
                    obj.expertise = result.expertise;
                    obj.subjects = result.subjects;
                    obj.officeRoom = result.officeRoom;
                    obj.email = result.email;
                    obj.homepage = result.homepage;
                    obj.telnumber = result.telnumber;
                    Department_Control.checkDepartmentByID(new ObjectId(thisPersonel.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.departmentName = result.departmentName;
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(thisPersonel.resourceId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.resourceName = result.resourceName;
                    Position_Control.checkPositionByID(thisPersonel.positionId, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.positionName = result.positionName;
                    Return_control.responseWithCode(ReturnCode.success, obj, response)
                }
            }
        );
    }
});

module.exports = router;