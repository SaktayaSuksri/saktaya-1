var flow = require('../services/flow.js');
var ObjectId = require('mongodb').ObjectId;

var Tag = require('../model/tag_model.js');

module.exports = {
    newTag: function (tag, callback) {
        tag.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error.message;
                console.log(alert);
                callback("021", alert, null);
            }
            else {
                callback("022", null, saveResponse)
            }
        });
    },
    checkTagByArrayID: function (tagIDArray, callback) {
        var errorOnce = false;
        var notFoundText = "Tag not found with _id :";
        var errorFoundText = "Error in finding tag with _id :";
        var tagNameArray = [];

        let tagID_Current;

        if (tagIDArray.length > 0) {

            flow.serialForEach(tagIDArray, function (tagID) {
                tagID_Current = tagID;
                //console.log("tagID: " + tagID);
                checkTagByID(new ObjectId(tagID), this);
            }, function (code, error, checkResult) {
                if (code == "061") {
                    errorFoundText = errorFoundText + tagID_Current + ", ";
                }
                else if (code == "063") {
                    notFoundText = notFoundText + tagID_Current + ", ";
                }
                else {
                    var obj = new Object();
                    obj.tagId = tagID_Current;
                    obj.tagName = checkResult.tagName;
                    tagNameArray.push(obj);
                }
            }, function () {
                callback("072", null, tagNameArray)
            });
        }
        else {
            callback("073", null, null)
        }
    },
    getAllTagName: function (callback) {
        Tag.find({}, { tagName: true }, function (error, tagCallback) {
            if (error) {
                var alert = "Error in finding Tag Error: " + error.message;
                callback("201", alert, null)
            }
            else {
                callback("202", null, tagCallback)
            }
        });
    },
    checkTagByID: function (tagId, callback) {
        Tag.findOne({ "_id": tagId }, function (error, tagCallback) {
            if (error) {
                var alert = "Error in finding Tag with _id: " + tagId + "\nError: " + error.message;
                callback("061", alert, null)
            }
            else if (tagCallback) {
                callback("062", null, tagCallback)
            }
            else {
                var alert = "Tag with _id: " + tagId + " not found";
                callback("063", alert, 0)
            }
        });
    },
    deleteTag: function (tagId, callback) {
        Tag.remove({ "_id": tagId }, function (error, tagCallback) {
            if (error) {
                var alert = "Error in deleting Tag Error: " + error.message;
                callback("211", alert, null)
            }
            else {
                callback("212", null, tagCallback)
            }
        });
    },
    updateTagByID: function (tagId, tag, callback) {
        var myquery = { "_id": tagId };
        var newvalues = { $set: { "tagName": tag.tagName, "dateTime_edit": Date.now() } };
        Tag.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                var alert = "Error in updating Tag with _id: " + tagId + "\nError: " + error.message;
                callback("241", alert, null)
            }
            else if (updateResponse) {
                callback("242", null, updateResponse)
            }
            else {
                var alert = "Tag with _id: " + tagId + " not found";
                callback("243", alert, updateResponse)
            }
        });
    }
};

function checkTagByID(tagId, callback) {
    //console.log("Finding Tag No " + tagId);
    Tag.findOne({ "_id": tagId }, function (error, tagResponse) {
        if (error) {
            var alert = "Error in finding Tag with _id: " + tagId + "\nError: " + error.message;
            callback("061", alert, null)
        }
        else if (tagResponse) {
            callback("062", null, tagResponse)
        }
        else {
            var alert = "Tag with _id: " + tagId + " not found";
            callback("063", alert, null)
        }
    });
}