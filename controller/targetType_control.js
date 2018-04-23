var TargetType = require('../model/targetType_model.js');

module.exports = {
    newTargetType: function (targetType, callback) {
        targetType.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error.message;
                console.log(alert);
                callback("011", alert, null);
            }
            else {
                callback("012", null, saveResponse)
            }
        });
    },
    checkTargetTypeByID: function (targetTypeId, callback) {
        TargetType.findOne({ "_id": targetTypeId }, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in finding TargetType with _id: " + targetTypeId + "\nError: " + error.message;
                callback("051", alert, null)
            }
            else if (targetTypeResponse) {
                callback("052", null, targetTypeResponse)
            }
            else {
                var alert = "TargetType with _id: " + targetTypeId + " not found";
                callback("053", alert, 0)
            }
        });
    },
    getAllResourceName: function (callback) {
        TargetType.find({}, { resourceName: true}, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in finding TargetType Error: " + error.message;
                callback("181", alert, null)
            }
            else {
                callback("182", null, targetTypeResponse)
            }
        });
    },
    deleteTargetType: function (targetTypeId, callback) {
        TargetType.remove({ "_id": targetTypeId }, function (error, targetTypeResponse) {
            if (error) {
                var alert = "Error in deleting TargetType Error: " + error.message;
                callback("191", alert, null)
            }
            else {
                callback("192", null, targetTypeResponse)
            }
        });
    }
};