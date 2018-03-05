var Position = require('../model/position_model.js');

module.exports = {
    newPosition: function (position, callback) {
        position.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Position fail, Error: " + error.message;
                console.log(alert);
                callback("141", alert, null);
            }
            else {
                callback("142", null, saveResponse)
            }
        });
    },
    checkPositionByID: function (positionId, callback) {
        Position.findOne({ "_id": positionId }, function (error, positionResponse) {
            if (error) {
                var alert = "Error in finding Position with _id: " + positionId + "\nError: " + error.message;
                callback("151", alert, null)
            }
            else if (positionResponse) {
                callback("152", null, positionResponse)
            }
            else {
                var alert = "Position with _id: " + positionId + " not found";
                callback("153", alert, positionResponse)
            }
        });
    }
};