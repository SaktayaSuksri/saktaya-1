var Personel = require('../model/personel_model.js');

var Position_Control = require("../controller/position_control.js");
var Division_Control = require("../controller/division_control.js");
var Department_Control = require("../controller/department_control.js");

var ObjectId = require('mongodb').ObjectId;
var flow = require('../services/flow.js')

module.exports = {
    newPersonel: function (personel, callback) {
        personel.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Personel fail, Error: " + error.message;
                console.log(alert);
                callback("161", alert, null);
            }
            else {
                callback("162", null, saveResponse)
            }
        });
    },
    checkPersonelByID: function (personelId, callback) {
        Personel.findOne({ "_id": personelId }, function (error, personelResponse) {
            if (error) {
                var alert = "Error in finding Personel with _id: " + personelId + "\nError: " + error.message;
                callback("171", alert, null)
            }
            else if (personelResponse) {
                callback("172", null, personelResponse)
            }
            else {
                var alert = "Personel with _id: " + personelId + " not found";
                callback("173", alert, personelResponse)
            }
        });
    },
    updatePersonelByID: function (personelId, personel, callback) {
        var myquery = { "_id": personelId };
        var newvalues = { $set: { "personelName": personel.personelName, "education": personel.education, "position": personel.position, "expertise": personel.expertise, "subjects": personel.subjects, "officeRoom": personel.officeRoom, "email": personel.email, "homepage": personel.homepage, "telNumber": personel.telNumber, "positionId": personel.positionId, "datetimeEdit": Date.now() } };
        Personel.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                var alert = "Error in finding Personel with _id: " + personelId + "\nError: " + error.message;
                callback("091", alert, null)
            }
            else if (updateResponse) {
                callback("092", null, updateResponse)
            }
            else {
                var alert = "Personel with _id: " + personelId + " not found";
                callback("093", alert, updateResponse)
            }
        });
    },
    getPersonel: function (positionId, departmentId, divisionId, isPreview, callback) {
        var myquery = {};
        var projection = {}

        let tmp = [];
        let queryFlag = false;
        if (positionId !== "0") {
            queryFlag = true;
            tmp.push({ "positionId": positionId })
        }
        if (departmentId !== "0") {
            queryFlag = true;
            tmp.push({ "departmentId": departmentId })
        }
        if (divisionId !== "0") {
            queryFlag = true;
            tmp.push({ "divisionId": divisionId })
        }

        if (queryFlag)
            myquery = { $and: tmp };

        Personel.find(myquery, projection,{ sort: { departmentId: 1, divisionId: 1  }}, function (error, personelCallback) { 	// return error into 'err' and response into 'bear'
            if (error) {
                var alert = "Error in getPersonel , Error : " + error.message;
                console.log(alert);
                callback("221", alert, null)
            }
            else if (personelCallback.length > 0) {
                var alert = "Get Personel Completed! " + JSON.stringify(personelCallback);
                //console.log(alert);
                callback("222", null, personelCallback)
            }
            else {
                var alert = "No Personel with positionId: " + positionId + " and departmentId: " + departmentId + " was found";
                console.log(alert);
                callback("223", alert, null)
            }
        });
    },

    joinPersonelData: function (personel, callback) {
        let forCallback = [];
        console.log("personel.length >> " + personel.length)
        let j = 0;
        for (let i = 0; i < personel.length; i++) {
            getFullPersonel(personel[i], function (a) {
                //console.log("a >> " + JSON.stringify(a))
                forCallback[i] = a;
                if (j == personel.length - 1)
                    callback("...", null, forCallback);
                else
                    j++;
            });
        }
    }
};


//----------------

function getFullPersonel(personel, callback) {
    let tmp = JSON.parse(JSON.stringify(personel));

    flow.exec(
        function () {
            //console.log("history.requestId: "+history.requestID)
            Department_Control.checkDepartmentByID(new ObjectId(personel.departmentId), this)
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["departmentName"] = functionCallback.departmentName;
            }
            else {
                tmp["departmentName"] = "N/A";
            }

            Position_Control.checkPositionByID(new ObjectId(personel.positionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["positionName"] = functionCallback.positionName;
            }
            else {
                tmp["positionName"] = null;
            }
            Division_Control.checkDivisionByID(new ObjectId(personel.divisionId), this);
        }, function (code, err, functionCallback) {
            if (functionCallback) {
                tmp["divisionName"] = functionCallback.divisionName;
            }
            else {
                tmp["divisionName"] = null;
            }

            callback(tmp)
        }
    );
}