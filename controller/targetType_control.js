
var ObjectId = require('mongodb').ObjectId;
var flow = require('../services/flow.js')
var TargetType = require('../model/targetType_model.js');

module.exports = {
    newTargetType: function (targetType, callback) {
        targetType.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error.message;
                console.log(alert);
                callback("351", alert, null);
            }
            else {
                callback("352", null, saveResponse)
            }
        });
    },
    checkTargetTypeByID: function (targetTypeId, callback) {
        TargetType.findOne({ "_id": targetTypeId }, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in finding TargetType with _id: " + targetTypeId + "\nError: " + error.message;
                callback("361", alert, null)
            }
            else if (targetTypeResponse) {
                callback("362", null, targetTypeResponse)
            }
            else {
                var alert = "TargetType with _id: " + targetTypeId + " not found";
                callback("363", alert, 0)
            }
        });
    },
    getTargetTypeIdArrayFromTargetTypeName: function (targetTypeName, callback) {
        console.log("targetTypeName >> " + targetTypeName)

        if (targetTypeName != "0") {
            var re = new RegExp(targetTypeName, "g");
            TargetType.find({ "targetTypeName": { $regex: re, $options: 'i' } }, function (error, targetTypeResponse) {
                if (error) {
                    var alert = "Error in finding TargetType with _id: " + targetTypeId + "\nError: " + error.message;
                    callback("361", alert, null)
                }
                else if (targetTypeResponse) {
                    //console.log("targetTypeResponse >> " + JSON.stringify(targetTypeResponse))
                    tmp = []
                    for (let i = 0; i < targetTypeResponse.length; i++) {
                        tmp.push(new ObjectId(targetTypeResponse[i]._id))
                    }
                    //console.log(tmp.toString())
                    callback("362", null, tmp)
                }
                else {
                    var alert = "TargetType with _id: " + targetTypeId + " not found";
                    callback("363", alert, [])
                }
            });
        }
        else {
            console.log("OKAY!")
            callback("363", null, "0")
        }
    },
    getAllTargetTypeName: function (callback) {
        TargetType.find({}, { resourceName: true }, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in finding TargetType Error: " + error.message;
                callback("371", alert, null)
            }
            else {
                callback("372", null, targetTypeResponse)
            }
        });
    },
    deleteTargetType: function (targetTypeId, callback) {
        TargetType.remove({ "_id": targetTypeId }, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in deleting TargetType Error: " + error.message;
                callback("381", alert, null)
            }
            else {
                callback("382", null, targetTypeResponse)
            }
        });
    }
};