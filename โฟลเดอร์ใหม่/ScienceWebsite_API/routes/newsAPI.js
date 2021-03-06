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

router.post('/newNews/', function (request, response) {
    var news = new News();
    var methodCode = "03";

    var requiredData = [];
    requiredData.push(request.body.topicShort);
    requiredData.push(request.body.topicFull);
    requiredData.push(request.body.detailShort);
    requiredData.push(request.body.detailFull);
    requiredData.push(request.body.resourceId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.resourceId);
    objectIdData.push(request.body.departmentId);
    var tagIDArray = new Array();
    tagIDArray = request.body.tagId.split(",");
    for (let i = 0; i < tagIDArray.length; i++)
        objectIdData.push(tagIDArray[i]);
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
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Tag_Control.checkTagByArrayID(tagIDArray, this);
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
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(request.body.resourceId), this);
                }
            }, function (code, err, checkResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.clearPinnedNews(request.body.isPinned, new ObjectId(request.body.resourceId), new ObjectId(request.body.departmentId), this);
                }
            }, function (code, err, updateResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    news.topicShort = request.body.topicShort;
                    news.topicFull = request.body.topicFull;
                    news.detailShort = request.body.detailShort;
                    news.detailFull = request.body.detailFull;
                    news.topicPicture = request.body.topicPicture;
                    news.author = request.body.author;
                    news.isPinned = request.body.isPinned;
                    news.resourceId = request.body.resourceId;
                    news.departmentId = request.body.departmentId;
                    news.tagId = request.body.tagId;
                    News_Control.newNews(news, this);
                }
            }, function (code, err, saveResult) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "New News was saved successfully as _id: " + saveResult._id, response);
                }
            }
        );
    }
});

router.post('/editNews/', function (request, response) {
    var news = new News();
    var methodCode = "04";

    var requiredData = [];
    requiredData.push(request.body.newsID);
    requiredData.push(request.body.topicShort);
    requiredData.push(request.body.topicFull);
    requiredData.push(request.body.detailShort);
    requiredData.push(request.body.detailFull);
    requiredData.push(request.body.resourceId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.newsID);
    objectIdData.push(request.body.resourceId);
    objectIdData.push(request.body.departmentId);
    var tagIDArray = new Array();
    tagIDArray = request.body.tagId.split(",");
    for (let i = 0; i < tagIDArray.length; i++)
        objectIdData.push(tagIDArray[i]);
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
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Tag_Control.checkTagByArrayID(tagIDArray, this);
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
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(request.body.resourceId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.checkNewsByID(new ObjectId(request.body.newsID), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.clearPinnedNews(request.body.isPinned, new ObjectId(request.body.resourceId), new ObjectId(request.body.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    news.topicShort = request.body.topicShort;
                    news.topicFull = request.body.topicFull;
                    news.detailShort = request.body.detailShort;
                    news.detailFull = request.body.detailFull;
                    news.topicPicture = request.body.topicPicture;
                    news.author = request.body.author;
                    news.isPinned = request.body.isPinned;
                    news.resourceId = request.body.resourceId;
                    news.departmentId = request.body.departmentId;
                    news.tagId = request.body.tagId;
                    News_Control.updateNewsByID(new ObjectId(request.body.newsID), news, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "News with _id: " + request.body.newsID + " has updated successfully.", response);
                }
            }
        );
    }
});

router.post('/getAllNews/', function (request, response) {
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

router.post('/getNewsfromID/', function (request, response) {
    var news = new News();
    var methodCode = "07";

    var thisNews;
    var thisDepartment;
    var thisResourceType;

    var requiredData = [];
    requiredData.push(request.body.newsID);
    requiredData.push(request.body.readCount);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.readCount);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.newsID);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    var obj = new Object();
    obj.topicShort = "N/A";
    obj.topicFull = "N/A";
    obj.detailShort = "N/A";
    obj.detailFull = "N/A";
    obj.topicPicture = "N/A";
    obj.datetimePost = "N/A";
    obj.datetimeEdit = "N/A";
    obj.author = "N/A";
    obj.readCount = "N/A";
    obj.isPinned = "N/A";
    obj.resourceName = "N/A";
    obj.departmentName = "N/A";
    obj.tagName = ["N/A"];

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
    else {
        flow.exec(
            function () {
                News_Control.checkNewsByID(new ObjectId(request.body.newsID), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    thisNews = result;
                    obj.topicShort = result.topicShort;
                    obj.topicFull = result.topicFull;
                    obj.detailShort = result.detailShort;
                    obj.detailFull = result.detailFull;
                    obj.topicPicture = result.topicPicture;
                    obj.datetimePost = result.datetimePost;
                    obj.datetimeEdit = result.datetimeEdit;
                    obj.author = result.author;
                    obj.readCount = result.readCount;
                    obj.isPinned = result.isPinned;
                    Department_Control.checkDepartmentByID(new ObjectId(thisNews.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.departmentName = result.departmentName;
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(thisNews.resourceId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.resourceName = result.resourceName;
                    Tag_Control.checkTagByArrayID(thisNews.tagId, this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    obj.tagName = result;
                    News_Control.countReader(new ObjectId(request.body.newsID), request.body.readCount);
                    Return_control.responseWithCode("999999", obj, response)
                }
            }
        );
    }
});

module.exports = router;

//-----------------------------------------------------------------------------

function responseWithCode(codeNum, txt, response) {
    response.json({ code: codeNum, message: txt });
}