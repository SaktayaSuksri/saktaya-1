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
        var newvalues = { $set: { "topicShort": news.topicShort, "topicFull": news.topicFull, "detailShort": news.detailShort, "detailFull": news.detailFull, "topicPicture": news.topicPicture, "author": news.author, "isPinned": news.isPinned, "resourceId": news.resourceId, "tagId": news.tagId, "datetimeEdit": Date.now() } };
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
    getAllNews: function (resourceId, targetTypeId, departmentId, tagId, isPreview, limitNum, isPosted, callback) {
        var today = new Date();
        console.log("resourceId: " + resourceId + " / targetType " + targetTypeId + " / departmentId " + departmentId + " / tagId: " + tagId);
        var myquery = { $and: [{ "resourceId": resourceId }, { "targetTypeId": targetTypeId }, { "departmentId": departmentId }, { "tagId": tagId }] };
        var projection = {}

        if (resourceId == "0" && departmentId == "0" && tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = {}
        else if (resourceId == "0" && departmentId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { "tagId": tagId }
        else if (resourceId == "0" && tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { "departmentId": departmentId }
        else if (departmentId == "0" && tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { "resourceId": resourceId }
        else if (resourceId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "departmentId": departmentId }, { "tagId": tagId }] }
        else if (departmentId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "tagId": tagId }] }
        else if (tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }] }

        else if (resourceId == "0" && departmentId == "0" && targetTypeId == "0" && tagId == "0" && isPosted == "false")
            myquery = { "targetTypeId": targetTypeId }
        else if (resourceId == "0" && departmentId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "tagId": tagId, "targetTypeId": targetTypeId }] }
        else if (resourceId == "0" && tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "departmentId": departmentId, "targetTypeId": targetTypeId }] }
        else if (departmentId == "0" && tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId, "targetTypeId": targetTypeId }] }
        else if (resourceId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "departmentId": departmentId }, { "tagId": tagId }, { "targetTypeId": targetTypeId }] }
        else if (departmentId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "tagId": tagId }, { "targetTypeId": targetTypeId }] }
        else if (tagId == "0" && targetTypeId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }, { "targetTypeId": targetTypeId }] }

        else if (resourceId == "0" && departmentId == "0" && tagId == "0" && isPosted == "true")
            myquery = { "datetimePost": { $lte: today } }
        else if (resourceId == "0" && departmentId == "0" && isPosted == "true")
            myquery = { $and: [{ "tagId": tagId }, { "datetimePost": { $lte: today } }] }
        else if (resourceId == "0" && tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "departmentId": departmentId }, { "datetimePost": { $lte: today } }] }
        else if (departmentId == "0" && tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "datetimePost": { $lte: today } }] }
        else if (resourceId == "0" && isPosted == "true")
            myquery = { $and: [{ "departmentId": departmentId }, { "tagId": tagId }, { "datetimePost": { $lte: today } }] }
        else if (departmentId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "tagId": tagId }, { "datetimePost": { $lte: today } }] }
        else if (tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }, { "datetimePost": { $lte: today } }] }

        else if (resourceId == "0" && departmentId == "0" && tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (resourceId == "0" && departmentId == "0" && isPosted == "true")
            myquery = { $and: [{ "tagId": tagId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (resourceId == "0" && tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "departmentId": departmentId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (departmentId == "0" && tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (resourceId == "0" && isPosted == "true")
            myquery = { $and: [{ "departmentId": departmentId }, { "tagId": tagId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (departmentId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "tagId": tagId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }
        else if (tagId == "0" && isPosted == "true")
            myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }, { "datetimePost": { $lte: today } }, { "targetTypeId": targetTypeId }] }

        if (isPreview == "true") {
            projection = { "_id": true, "topicShort": true, "targetTypeId": true, "detailShort": true, "topicPicture": true, "readCount": true, "isPinned": true, "resourceId": true, "departmentId": true, "tagId": true };
        }

        News.find(myquery, projection, { sort: { isPinned: -1, datetimePost: -1 }, limit: limitNum }, function (error, newsGetResult) { 	// return error into 'err' and response into 'bear'
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
                var alert = "No News with resourceId: " + resourceId + " and departmentId: " + departmentId + " was found";
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
        else {
            callback("133", null, null)
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
        var counterArray = []
        var forCallback = []
        for (let i = 0; i < news.length; i++) {
            counterArray.push(i)
        }

        let currentPos = 0;
        flow.serialForEach(counterArray, function (pos) {
            currentPos = pos;
            //console.log("historyArray[currentPos] " + historyArray[currentPos]);
            getFullNews(news[currentPos], this);
        }, function (functionCallback) {
            forCallback.push(functionCallback);
        }, function () {
            //console.log("callback")
            callback("421", null, forCallback);
        });

    }
};

//----------------

function getFullNews(news, callback) {
    let tmp = JSON.parse(JSON.stringify(news));
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
            Tag_Control.checkTagByArrayID(news.tagId, this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["tagData"] = functionCallback;
            }
            else {
                tmp["tagData"] = null;
            }
            callback(tmp)
        }
    );
}