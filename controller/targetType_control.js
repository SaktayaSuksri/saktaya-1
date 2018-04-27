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
    getAllTargetTypeName: function (callback) {
        TargetType.find({}, { resourceName: true}, function (error, targetTypeResponse) {
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