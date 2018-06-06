var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests


var flow = require('../services/flow.js')

var ReturnCode = require('../model/returnCode.js');
var ResourceType = require('../model/resourceType_model.js');
var Department = require('../model/department_model.js');
var News = require('../model/news_model.js');
var Tag = require('../model/tag_model.js');
var Position = require('../model/position_model.js');
var Personel = require('../model/personel_model.js');
var TargetType = require('../model/targetType_model');

var Validate = require("../controller/validation_controller.js");
var ResourceType_Control = require("../controller/resourceType_control.js");
var Department_Control = require('../controller/department_control.js');
var Tag_Control = require("../controller/tag_control.js");
var News_Control = require("../controller/news_control.js");
var Position_Control = require('../controller/position_control.js');
var Personel_Control = require('../controller/personel_control.js');
var TargetType_Control = require('../controller/targetType_control.js');
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
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.isPinned);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.resourceId);
    objectIdData.push(request.body.targetTypeId);
    objectIdData.push(request.body.departmentId);
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
                    TargetType_Control.checkTargetTypeByID(new ObjectId(request.body.targetTypeId), this);
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
                    news.targetTypeId = request.body.targetTypeId;
                    news.departmentId = request.body.departmentId;

                    news.datetimePost = request.body.datetimePost;
                    news.datetimeExpire = request.body.datetimeExpire;

                    news.tag = []
                    for (let i = 0; i < request.body.tag.length; i++)
                        news.tag.push(request.body.tag[i].text);

                    //    news.tag = request.body.tag;
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
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.departmentId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    objectIdData.push(request.body.newsID);
    objectIdData.push(request.body.resourceId);
    objectIdData.push(request.body.targetTypeId);
    objectIdData.push(request.body.departmentId);
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
                    News_Control.checkNewsByID(new ObjectId(request.body.newsID), this);
                }
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    TargetType_Control.checkTargetTypeByID(new ObjectId(request.body.targetTypeId), this);
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
                    news.targetTypeId = request.body.targetTypeId;
                    news.departmentId = request.body.departmentId;

                    news.datetimePost = request.body.datetimePost;
                    news.datetimeExpire = request.body.datetimeExpire;

                    news.tag = []
                    for (let i = 0; i < request.body.tag.length; i++)
                        news.tag.push(request.body.tag[i].text);

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

router.post('/getNews/', function (request, response) {
    var news = new News();
    var methodCode = "06";

    var requiredData = [];
    requiredData.push(request.body.resourceId);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.tag);
    requiredData.push(request.body.limit);
    requiredData.push(request.body.isPosted);
    requiredData.push(request.body.isPreview);
    requiredData.push(request.body.isPinned);
    requiredData.push(request.body.targetTypeId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPosted);
    booleanData.push(request.body.isPreview);
    requiredData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    if (request.body.resourceId != "0")
        objectIdData.push(request.body.resourceId);
    if (request.body.departmentId != "0")
        objectIdData.push(request.body.departmentId);
    if (request.body.targetTypeId != "0")
        objectIdData.push(request.body.targetTypeId);
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
                console.log("OKAY!!!")
                let resource = "0"
                let department = "0"
                let targetTypeId = "0"
                if (ObjectId.isValid(request.body.resourceId))
                    resource = new ObjectId(request.body.resourceId);
                if (ObjectId.isValid(request.body.departmentId))
                    department = new ObjectId(request.body.departmentId);
                if (ObjectId.isValid(request.body.targetTypeId))
                    targetTypeId = new ObjectId(request.body.targetTypeId);
                News_Control.getAllNews(resource, department, targetTypeId, request.body.tag, request.body.isPreview, parseInt(request.body.limit), request.body.isPosted, request.body.isPinned, false, this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.joinNewsData(result, this)
                }
            }, function (code, err, result) {
                console.log();
                Return_control.responseWithCode("999999", result, response)
            }
        );
    }
});

router.post('/getNewsWithPicture/', function (request, response) {
    var news = new News();
    var methodCode = "06";

    var requiredData = [];
    requiredData.push(request.body.resourceId);
    requiredData.push(request.body.departmentId);
    requiredData.push(request.body.tag);
    requiredData.push(request.body.limit);
    requiredData.push(request.body.isPosted);
    requiredData.push(request.body.isPreview);
    requiredData.push(request.body.isPinned);
    requiredData.push(request.body.targetTypeId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var booleanData = [];
    booleanData.push(request.body.isPosted);
    booleanData.push(request.body.isPreview);
    requiredData.push(request.body.isPinned);
    var booleanReady = Validate.booleanData_Check(booleanData)

    var objectIdData = [];
    if (request.body.resourceId != "0")
        objectIdData.push(request.body.resourceId);
    if (request.body.departmentId != "0")
        objectIdData.push(request.body.departmentId);
    if (request.body.targetTypeId != "0")
        objectIdData.push(request.body.targetTypeId);
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
                console.log("OKAY!!!")
                let resource = "0"
                let department = "0"
                let targetTypeId = "0"
                if (ObjectId.isValid(request.body.resourceId))
                    resource = new ObjectId(request.body.resourceId);
                if (ObjectId.isValid(request.body.departmentId))
                    department = new ObjectId(request.body.departmentId);
                if (ObjectId.isValid(request.body.targetTypeId))
                    targetTypeId = new ObjectId(request.body.targetTypeId);
                News_Control.getAllNews(resource, department, targetTypeId, request.body.tag, request.body.isPreview, parseInt(request.body.limit), request.body.isPosted, request.body.isPinned, true, this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.joinNewsData(result, this)
                }
            }, function (code, err, result) {
                console.log();
                Return_control.responseWithCode("999999", result, response)
            }
        );
    }
});

router.get('/getPictureFromNewsId/:newsID/', function (request, response) {
    var personel = new Personel();
    var methodCode = "07";

    var thisNews;
    var thisDepartment;
    var thisResourceType;
    var thisTargetType;

    var requiredData = [];
    requiredData.push(request.params.newsID);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.params.newsID);
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
                News_Control.checkNewsByID(new ObjectId(request.params.newsID), this);
            }, function (code, err, result) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    response.send(result.topicPicture);
                    //Return_control.responseWithCodeAndData("999999","Get Picture Completed", result.topicPicture, response)
                }
            }
        );
    }
});

router.post('/getNewsfromID/', function (request, response) {
    var personel = new Personel();
    var methodCode = "07";

    var thisNews;
    var thisDepartment;
    var thisResourceType;
    var thisTargetType;

    var requiredData = [];
    requiredData.push(request.body.newsID);
    var requiredReady = Validate.requiredData_Check(requiredData)

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
    obj.datetimeExpire = "N/A";
    obj.datetimeEdit = "N/A";
    obj.isExpired = "No";
    obj.author = "N/A";
    obj.readCount = "N/A";
    obj.isPinned = "N/A";
    obj.resourceName = "N/A";
    obj.targetTypeName = "N/A";
    obj.departmentName = "N/A";
    obj.tag = "N/A";

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
                    obj.datetimeExpire = result.datetimeExpire;
                    obj.datetimeEdit = result.datetimeEdit;
                    obj.author = result.author;
                    obj.readCount = result.readCount;
                    obj.isPinned = result.isPinned;

                    if (result.datetimeExpire) {
                        let now = new Date();
                        let expire = new Date(result.datetimeExpire);
                        console.log("now " + now)
                        console.log("expire " + expire)
                        if (expire < now)
                            obj.isExpired = "Yes";
                        else {
                            let hourLeft = (expire - now) / 3.6e6;
                            obj.isExpired = Math.floor(hourLeft / 24) + " days " + (Math.floor(hourLeft % 24) + 1) + " hours left";
                        }
                    }
                    else {
                        obj.isExpired = "Not Expire";
                    }

                    obj.tag = []
                    for (let i = 0; i < result.tag.length; i++)
                        obj.tag.push({ text: result.tag[i] });

                    Department_Control.checkDepartmentByID(new ObjectId(thisNews.departmentId), this);
                }
            }, function (code, err, result) {
                if (err) {
                    obj.departmentName = "N/A";
                }
                else {
                    obj.departmentName = result.departmentName;
                }
                TargetType_Control.checkTargetTypeByID(new ObjectId(thisNews.targetTypeId), this);
            }, function (code, err, result) {
                if (err) {
                    obj.targetTypeName = "N/A";
                }
                else {
                    obj.targetTypeName = result.targetTypeName;
                }
                ResourceType_Control.checkResourceTypeByID(new ObjectId(thisNews.resourceId), this);
            }, function (code, err, result) {
                if (err) {
                    obj.resourceName = "N/A";
                }
                else {
                    obj.resourceName = result.resourceName;
                }
                News_Control.countReader(new ObjectId(request.body.newsID), request.body.readCount);
                Return_control.responseWithCode("999999", obj, response)
            }
        );
    }
});

router.post('/deleteNews/', function (request, response) {
    var resourceType = new ResourceType();
    var methodCode = "20";

    var requiredData = [];
    requiredData.push(request.body.newsId);
    var requiredReady = Validate.requiredData_Check(requiredData)

    var objectIdData = [];
    objectIdData.push(request.body.newsId);
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
                News_Control.checkNewsByID(new ObjectId(request.body.newsId), this);
            }, function (code, err, callback) {
                if (err || callback == 0) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    News_Control.deleteNews(new ObjectId(request.body.newsId), this);
                }
            }, function (code, err, callback) {
                if (err) {
                    Return_control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_control.responseWithCode(ReturnCode.success, "News Type _id: " + request.body.newsId + " was deleted successfully", response);
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