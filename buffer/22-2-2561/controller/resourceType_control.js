var ResourceType = require('../model/resourceType_model.js');

module.exports = {
    newResourceType: function (resourceType, callback) {
        resourceType.save(function (error, saveResponse) {
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
    checkResourceTypeByID: function (resourceTypeId, callback) {
        ResourceType.findOne({ "_id": resourceTypeId }, function (error, resourceTypeResponse) {
            if (error) {
                var alert = "Error in finding ResourceType with _id: " + resourceTypeId + "\nError: " + error.message;
                callback("051", alert, null)
            }
            else if (resourceTypeResponse) {
                callback("052", null, resourceTypeResponse)
            }
            else {
                var alert = "ResourceType with _id: " + resourceTypeId + " not found";
                callback("053", alert, 0)
            }
        });
    },
    getAllResourceName: function (callback) {
        ResourceType.find({}, { resourceName: true}, function (error, resourceTypeResponse) {
            if (error) {
                var alert = "Error in finding ResourceType Error: " + error.message;
                callback("181", alert, null)
            }
            else {
                callback("182", null, resourceTypeResponse)
            }
        });
    },
    deleteResourceType: function (resourceTypeId, callback) {
        ResourceType.remove({ "_id": resourceTypeId }, function (error, resourceTypeResponse) {
            if (error) {
                var alert = "Error in deleting ResourceType Error: " + error.message;
                callback("191", alert, null)
            }
            else {
                callback("192", null, resourceTypeResponse)
            }
        });
    }
};