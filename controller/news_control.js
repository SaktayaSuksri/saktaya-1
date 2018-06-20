var News = require('../model/news_model.js');
var Department_Control = require('../controller/department_control.js');
var Tag_Control = require("../controller/tag_control.js");
var TargetType_Control = require('../controller/targetType_control.js');
var ResourceType_Control = require("../controller/resourceType_control.js");

var ObjectId = require('mongodb').ObjectId;
var flow = require('../services/flow.js')

module.exports = {
    newNews: function (news, callback) {
        news.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving News fail, Error: " + error.message;
                console.log(alert);
                callback("031", alert, null);
            }
            else {
                callback("032", null, saveResponse)
            }
        });
    },
    updateNewsByID: function (newsID, news, callback) {
        var myquery = { "_id": newsID };
        var newvalues = {
            $set: {
                "topicShort": news.topicShort,
                "topicFull": news.topicFull,
                "detailShort": news.detailShort,
                "detailFull": news.detailFull,
                "topicPicture": news.topicPicture,
                "author": news.author,
                "isPinned": news.isPinned,
                "resourceId": news.resourceId,
                "targetTypeId": news.targetTypeId,
                "departmentId": news.departmentId,
                "tag": news.tag,
                "datetimePost": news.datetimePost,
                "datetimeExpire": news.datetimeExpire,
                "datetimeEdit": Date.now()
            }
        };
        News.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                var alert = "Error in finding News with _id: " + newsID + "\nError: " + error.message;
                callback("091", alert, null)
            }
            else if (updateResponse) {
                callback("092", null, updateResponse)
            }
            else {
                var alert = "News with _id: " + newsID + " not found";
                callback("093", alert, updateResponse)
            }
        });
    },
    checkNewsByID: function (newsID, callback) {
        News.findOne({ "_id": newsID }, function (error, newsResponse) {
            if (error) {
                var alert = "Error in finding News with _id: " + newsID + "\nError: " + error.message;
                callback("081", alert, null)
            }
            else if (newsResponse) {
                callback("082", null, newsResponse)
            }
            else {
                var alert = "News with _id: " + newsID + " not found";
                callback("083", alert, newsResponse)
            }
        });
    },
    clearPinnedNews: function (needClear, resourceId, targetTypeId, departmentId, callback) {
        if (needClear == "true") {
            var myquery = { $and: [{ "isPinned": "true" }, { "targetTypeId": targetTypeId }, { "departmentId": departmentId }, { "resourceId": resourceId }] };
            var newvalues = { $set: { "isPinned": "false" } };
            News.updateOne(myquery, newvalues, function (error, updateResponse) {
                if (error) {
                    var alert = "Error in updating News, Error: " + error.message;
                    console.log(alert);
                    callback("041", alert, null);
                }
                else {
                    callback("042", null, updateResponse)
                }
            });
        }
        else {
            callback("043", null, null)
        }
    },
    getAllNews: function (resourceId, departmentId, targetTypeId, tag, isPreview, limitNum, isPosted, isPinned, needPicture, callback) {
        var today = new Date();
        console.log("resourceId: " + resourceId + " / targetType " + targetTypeId + " / departmentId " + departmentId + " / isPinned " + isPinned + " / tag: " + tag);
        var myquery = {};

        let tmp = [];
        let queryFlag = false;
        if (resourceId !== "0") {
            queryFlag = true;
            tmp.push({ "resourceId": resourceId })
        }
        if (departmentId !== "0") {
            queryFlag = true;
            tmp.push({ "departmentId": departmentId })
        }
        if (targetTypeId !== "0") {
            queryFlag = true;
            tmp.push({ "targetTypeId": targetTypeId })
        }
        if (tag !== "0") {
            queryFlag = true;
            tmp.push({ "tag": tag })
        }
        if (isPosted == "true") {
            queryFlag = true;
            tmp.push({ "datetimeExpire": { $gte: today } })
        }
        if (isPinned !== "0") {
            queryFlag = true;
            tmp.push({ "isPinned": isPinned })
        }

        if (queryFlag)
            myquery = { $and: tmp };

        //$and: [{ "resourceId": resourceId }, { "targetTypeId": targetTypeId }, { "departmentId": departmentId }, { "tag": tag }]

        var projection = {}
        if (needPicture) {
            if (isPreview == "true") {
                projection = { "_id": true, "topicShort": true, "datetimePost": true, "datetimeExpire": true, "targetTypeId": true, "detailShort": true, "topicPicture": true, "readCount": true, "isPinned": true, "resourceId": true, "departmentId": true, "tag": true };
            }
            else {
                projection = {}
            }
        }
        else {
            if (isPreview == "true") {
                projection = { "_id": true, "topicShort": true, "datetimePost": true, "datetimeExpire": true, "targetTypeId": true, "detailShort": true, "readCount": true, "isPinned": true, "resourceId": true, "departmentId": true, "tag": true };
            }
            else {
                projection = { "topicPicture": false }
            }
        }

        News.find(myquery, projection, { sort: { datetimePost: -1 }, limit: limitNum }, function (error, newsGetResult) { 	// return error into 'err' and response into 'bear'
            if (error) {
                var alert = "Error in getAllNews , Error : " + error.message;
                console.log(alert);
                callback("121", alert, null)
            }
            else if (newsGetResult.length > 0) {
                var alert = "Get News Completed! " + JSON.stringify(newsGetResult);
                //console.log(alert);
                callback("122", null, newsGetResult)
            }
            else {
                var alert = "No News with resourceId: " + resourceId + " / departmentId: " + departmentId + " / targetTypeId: " + targetTypeId + " / isPinned " + isPinned + " / tag: " + tag + " was found";
                console.log(alert);
                callback("123", alert, null)
            }
        });

    },
    countReader: function (newsId, readCount) {
        var myquery = { "_id": newsId };
        var projection = { $inc: { "readCount": 1 } };
        if (readCount) {
            News.update(myquery, projection, function (error, newsGetResult) { 	// return error into 'err' and response into 'bear'
                if (error) {
                    var alert = "Error in countReader , Error : " + error.message;
                    console.log(alert);
                }
                else {
                    var alert = "Update Reader Completed!";
                    console.log(alert);
                }
            });
        }
    },
    deleteNews: function (newsId, callback) {
        News.remove({ "_id": newsId }, function (error, newsCallback) {
            if (error) {
                var alert = "Error in deleting News Error: " + error.message;
                callback("251", alert, null)
            }
            else {
                callback("252", null, newsCallback)
            }
        });
    },

    joinNewsData: function (news, callback) {
        let forCallback = [];
        console.log("news.length >> " + news.length)
        let j = 0;
        for (let i = 0; i < news.length; i++) {
            getFullNews(news[i], function (a) {
                //console.log("a >> " + JSON.stringify(a))
                forCallback[i] = a;
                if (j == news.length - 1)
                    callback("...", null, forCallback);
                else
                    j++;
            });
        }
    },

    createNewsIndex: function (callback) {
        News.reIndex(function () {
            callback()
        });
    }
};

//----------------

function getFullNews(news, callback) {
    let tmp = JSON.parse(JSON.stringify(news));
    let tmpTag = tmp.tag;

    tmp.tag = []
    for (let i = 0; i < tmpTag.length; i++)
        tmp.tag.push({ text: tmpTag[i] });

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(news.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["departmentName"] = functionCallback.departmentName;
            }
            else {
                tmp["departmentName"] = "N/A";
            }
            ResourceType_Control.checkResourceTypeByID(new ObjectId(news.resourceId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["resourceName"] = functionCallback.resourceName;
            }
            else {
                tmp["resourceName"] = null;
            }
            TargetType_Control.checkTargetTypeByID(new ObjectId(news.targetTypeId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["targetTypeName"] = functionCallback.targetTypeName;
            }
            else {
                tmp["targetTypeName"] = null;
            }

            tmp["isExpired"] = false;
            console.log(news._id + " >> " + news.datetimeExpire)
            if (news.datetimeExpire) {
                let now = new Date();
                let expire = new Date(news.datetimeExpire);
                if (expire < now)
                    tmp["isExpired"] = true;
                else {
                    let hourLeft = (expire - now) / 3.6e6;
                    tmp["isExpired"] = false;
                }
            }
            else {
                tmp["isExpired"] = false;
            }

            let posted = new Date(news.datetimePost);
            let postedDate = posted.getDate()
            let postedMonth = convertToThaiMonth(posted.getMonth() + 1)
            let postedYear = posted.getFullYear() + 543
            tmp["datetimepost_Preview"] = postedDate + " " + postedMonth + " พ.ศ. " + postedYear

            callback(tmp)
        }
    );
}

function convertToThaiMonth(monthNum) {
    if (monthNum == 1)
        return "มกราคม"
    else if (monthNum == 2)
        return "กุมภาพันธ์"
    else if (monthNum == 3)
        return "มีนาคม"
    else if (monthNum == 4)
        return "เมษายน"
    else if (monthNum == 5)
        return "พฤษภาคม"
    else if (monthNum == 6)
        return "มิถุนายน"
    else if (monthNum == 7)
        return "กรกฎาคม"
    else if (monthNum == 8)
        return "สิงหาคม"
    else if (monthNum == 9)
        return "กันยายน"
    else if (monthNum == 10)
        return "ตุลาคม"
    else if (monthNum == 11)
        return "พฤษจิกายน"
    else if (monthNum == 12)
        return "ธันวาคม"

}