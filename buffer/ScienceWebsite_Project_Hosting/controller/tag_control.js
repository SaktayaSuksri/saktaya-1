var flow = require('../services/flow.js');
var ObjectId = require('mongodb').ObjectId;

var Tag = require('../model/tag_model.js');

module.exports = {
    newTag: function (tag, callback) {
        tag.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error;
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

        let tagID_Current;
        flow.serialForEach(tagIDArray, function (tagID) {
            tagID_Current = tagID;
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
        }, function () {
            if (errorOnce)
                callback("071", errorFoundText + " >> " + notFoundText)
            else
                callback("072", null)

        });
    }
};

function checkTagByID(tagId, callback) {
        //console.log("Finding Tag No " + tagId);
        Tag.findOne({ "_id": tagId }, function (error, tagResponse) {
            if (error) {
                var alert = "Error in finding ResourceType with _id: " + tagId + "\nError: " + error;
                callback("061", alert, null)
            }
            else if (tagResponse) {
                callback("062", null, tagResponse)
            }
            else {
                var alert = "ResourceType with _id: " + tagId + " not found";
                callback("063", alert, tagResponse)
            }
        });
    }