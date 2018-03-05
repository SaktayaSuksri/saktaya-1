var Personel = require('../model/personel_model.js');

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
    getPersonel: function (positionId, departmentId, isPreview, callback) {
        var myquery = { $and: [{ "positionId": positionId }, { "departmentId": departmentId }] };
        var projection = {}

        if (positionId == "0" && departmentId == "0")
            myquery = {}
        else if (positionId == "0")
            myquery = { "departmentId": departmentId }
        else if (departmentId == "0")
            myquery = { "positionId": positionId }

        if (isPreview == "true") {
            projection = { "personelName": true, "picture": true, "position": true, "departmentId": true, "positionId": true };
        }

        Personel.find(myquery, projection, function (error, personelCallback) { 	// return error into 'err' and response into 'bear'
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
    }
};