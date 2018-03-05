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

        var _tagIDArray = new Array();
        //console.log("tagIDArray: " + tagIDArray + " length = "+tagIDArray.length);
        _tagIDArray = tagIDArray[0].split(",");

        flow.serialForEach(_tagIDArray, function (tagID) {
            tagID_Current = tagID;
            //console.log("tagID: " + tagID);
            checkTagByID(new ObjectId(tagID), this);
        }, function (code, error, checkResult) {
            if (code == "061") {
                errorOnce = true;
                errorFoundText = errorFoundText + tagID_Current + ", ";
            }
            else if (code == "063") {
                errorOnce = true;
                notFoundText = notFoundText + tagID_Current + ", ";
            }
            else {
                tagNameArray.push(checkResult.tagName);
            }
        }, function () {
            if (errorOnce)
                callback("071", errorFoundText + " >> " + notFoundText, null)
            else
                callback("072", null, tagNameArray)

        });
    },
    getAllTagName: function (callback) {
        Tag.find({}, { tagName: true}, function (error, tagCallback) {
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