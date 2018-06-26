var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;

var flow = require('../services/flow.js')

var ReturnCode = require('../model/returnCode.js');
var ResourceType = require('../model/resourceType_model.js');
var Department = require('../model/department_model.js');
var News = require('../model/news_model.js');
var Tag = require('../model/tag_model.js');
var Position = require('../model/position_model.js');
var Personel = require('../model/personel_model.js');
var Division = require('../model/division_model');

var Validate = require("../controller/validation_controller.js");
var ResourceType_Control = require("../controller/resourceType_control.js");
var Department_Control = require('../controller/department_control.js');
var Tag_Control = require("../controller/tag_control.js");
var News_Control = require("../controller/news_control.js");
var Position_Control = require('../controller/position_control.js');
var Personel_Control = require('../controller/personel_control.js');
var Return_control = require('../controller/return_control.js');

router.post('/newPersonel/', function (request, response) {
    // console.log(JSON.stringify(request.body));
    var personel = new Personel();
    var methodCode = "09";

    var requiredData = [];
    requiredData.push(request.body.personelName);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.divisionId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.positionId);
    objectIdData.push(request.body.divisionId);
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
                    personel.position = request.body.position;
                    personel.expertise = request.body.expertise;
                    personel.subjects = request.body.subjects;
                    personel.officeRoom = request.body.officeRoom;
                    personel.email = request.body.email;
                    personel.homepage = request.body.homepage;
                    personel.telNumber = request.body.telNumber;
                    personel.positionId = request.body.positionId;
                    personel.divisionId = request.body.divisionId;
                    personel.departmentId = request.body.departmentId;
                    personel.picture = request.body.picture;
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
    var methodCode = "19";

    var requiredData = [];
    requiredData.push(request.body.personelId);
    requiredData.push(request.body.personelName);
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.divisionId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.personelId);
    objectIdData.push(request.body.positionId);
    objectIdData.push(request.body.divisionId);
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
                    personel.position = request.body.position;
                    personel.expertise = request.body.expertise;
                    personel.subjects = request.body.subjects;
                    personel.officeRoom = request.body.officeRoom;
                    personel.email = request.body.email;
                    personel.homepage = request.body.homepage;
                    personel.telNumber = request.body.telNumber;
                    personel.positionId = request.body.positionId;
                    personel.divisionId = request.body.divisionId;
                    personel.departmentId = request.body.departmentId;
                    personel.picture = request.body.departmentId;

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

router.post('/getPersonel/', function (request, response) {
    var personel = new Personel();
    var methodCode = "16";

    var requiredData = [];
    requiredData.push(request.body.positionId);
    requiredData.push(request.body.divisionId);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.isPreview);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPreview);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    if (request.body.positionId != "0")
        objectIdData.push(request.body.positionId);
    if (request.body.departmentId != "0")
        objectIdData.push(request.body.departmentId);
    if (request.body.divisionId != "0")
        objectIdData.push(request.body.divisionId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

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
        var alert = "Input Not Valid, check if somedata is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                let position = "0"
                let department = "0"
                let division = "0"
                if (ObjectId.isValid(request.body.positionId))
                    position = new ObjectId(request.body.positionId);
                if (ObjectId.isValid(request.body.departmentId))
                    department = new ObjectId(request.body.departmentId);
                if (ObjectId.isValid(request.body.division))
                    division = new ObjectId(request.body.division);

                Personel_Control.getPersonel(position, department, division, request.body.isPreview, this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Personel_Control.joinPersonelData(result, this)
                }
            }, function (code, err, result) {
                console.log();
                Return_control.responseWithCode("999999", result, response)
            }
        );
    }
});

router.post('/getPersonelfromID/', function (request, response) {
    var personel = new Personel();
    var methodCode = "07";

    var thisPersonel;

    var requiredData = [];
    requiredData.push(request.body.personelId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.personelId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var obj = new Object();
    obj.personelName = "N/A";
    obj.education = "N/A";
    obj.picture = "N/A";
    obj.position = "N/A";
    obj.expertise = "N/A";
    obj.subjects = "N/A";
    obj.officeRoom = "N/A";
    obj.email = "N/A";
    obj.homepage = "N/A";
    obj.telnumber = "N/A";
    obj.positionName = "N/A";
    obj.divisionName = "N/A";
    obj.departmentName = "N/A";

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required.";
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response);
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB.";
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response);
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
                    obj.picture = result.picture;
                    obj.position = result.position;
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
                    obj.departmentName = "N/A";
                }
                else {
                    obj.departmentName = result.departmentName;
                }
                Position_Control.checkPositionByID(new ObjectId(thisPersonel.positionId), this);
            }, function (code, err, result) {
                if (err) {
                    obj.positionName = "N/A";
                }
                else {
                    obj.positionName = result.positionName;
                }
                Return_control.responseWithCode(ReturnCode.success, obj, response)
            }
        );

        async function findDivisionByID() {
            await Division.findById(new ObjectId(thisNews.divisionId), function (err, div) {
                if (err) {
                    obj.divisionName = "N/A";
                    console.log('----- Error in finding division by ID >> ' + err.message);
                } else if (!target) {
                    obj.divisionName = "N/A";
                    console.log('----- No division found!');
                } else {
                    obj.divisionName = div.divisionName;
                    Return_control.responseWithCode("999999", obj, response);
                }
            });
        }
        findDivisionByID();
    }
});

module.exports = router;
