var Division = require('../model/division_model.js');

module.exports = {
    newDivision: function (division, callback) {
        division.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error.message;
                console.log(alert);
                callback("311", alert, null);
            }
            else {
                callback("312", null, saveResponse)
            }
        });
    },
    checkDivisionByID: function (divisionId, callback) {
        Division.findOne({ "_id": divisionId }, function (error, divisionResponse) {
            if (error) {
                var alert = "Error in finding Division with _id: " + divisionId + "\nError: " + error.message;
                callback("321", alert, null)
            }
            else if (divisionResponse) {
                callback("322", null, divisionResponse)
            }
            else {
                var alert = "Division with _id: " + divisionId + " not found";
                console.log("alert >> "+alert);
                callback("323", alert, 0)
            }
        });
    },
    getAllDivisionName: function (callback) {
        Division.find({}, { resourceName: true}, function (error, divisionResponse) {
            if (error) {
                var alert = "Error in finding Division Error: " + error.message;
                callback("331", alert, null)
            }
            else {
                callback("332", null, divisionResponse)
            }
        });
    },
    deleteDivision: function (divisionId, callback) {
        Division.remove({ "_id": divisionId }, function (error, divisionResponse) {
            if (error) {
                var alert = "Error in deleting Division Error: " + error.message;
                callback("341", alert, null)
            }
            else {
                callback("342", null, divisionResponse)
            }
        });
    }
};