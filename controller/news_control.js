var News = require('../model/news_model.js');

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
    clearPinnedNews: function (needClear, resourceId, departmentId, callback) {
        if (needClear == "true") {
            var myquery = { $and: [{ "isPinned": "true" }, { "departmentId": departmentId }, { "resourceId": resourceId }] };
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
    getAllNews: function (resourceId, departmentId, tagId, isPreview, limitNum, isPosted, callback) {
        var today = new Date();
        console.log("resourceId: " + resourceId + " / departmentId " + departmentId + " / tagId: " + tagId);
        var myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }, { "tagId": tagId }] };
        var projection = {}

        if (resourceId == "0" && departmentId == "0" && tagId == "0" && isPosted == "false")
            myquery = {}
        else if (resourceId == "0" && departmentId == "0" && isPosted == "false")
            myquery = { "tagId": tagId }
        else if (resourceId == "0" && tagId == "0" && isPosted == "false")
            myquery = { "departmentId": departmentId }
        else if (departmentId == "0" && tagId == "0" && isPosted == "false")
            myquery = { "resourceId": resourceId }
        else if (resourceId == "0" && isPosted == "false")
            myquery = { $and: [{ "departmentId": departmentId }, { "tagId": tagId }] }
        else if (departmentId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "tagId": tagId }] }
        else if (tagId == "0" && isPosted == "false")
            myquery = { $and: [{ "resourceId": resourceId }, { "departmentId": departmentId }] }

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

        if (isPreview == "true") {
            projection = { "_id": true, "topicShort": true, "detailShort": true, "topicPicture": true, "readCount": true, "isPinned": true, "resourceId": true, "departmentId": true };
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
    }
};