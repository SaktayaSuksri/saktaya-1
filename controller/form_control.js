var Form = require('../model/form_model.js');

module.exports = {
    newForm: function (form, callback) {
        console.log("Saving Form: " + form.formName_TH);
        form.save(function (error, saveResponse) {
            console.log("Saving Form >> COMPLETED ");
            if (error) {
                let errCode = "261";
                var alert = "Saving Form fail, Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null);
            }
            else {
                callback("262", null, saveResponse)
            }
        });
    },
    updateFormByID: function (formId, form, callback) {
        var myquery = { "_id": formId };
        var newvalues = { $set: { "formName_TH": form.formName_TH, "formName_EN": form.formName_EN, "editedDate": Date.now() } };
        Form.updateOne(myquery, newvalues, function (error, updateResponse) {
            if (error) {
                let errCode = "271";
                var alert = "Error in updating Form with _id: " + formId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else
                callback("272", null, updateResponse);
        });
    },
    checkFormByID: function (formId, callback) {
        Form.findOne({ "_id": formId }, function (error, functionCallback) {
            if (error) {
                let errCode = "281";
                var alert = "Error in finding Form with _id: " + formId + "\nError: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                callback("282", null, functionCallback)
            }
            else {
                let errCode = "283";
                var alert = "Form with _id: " + formId + " not found";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, functionCallback)
            }
        });
    },
    getAllForm: function (callback) {
        Form.find({}, {}, function (error, functionCallback) {
            if (error) {
                let errCode = "291";
                var alert = "Error in getAllForm , Error : " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else if (functionCallback) {
                let errCode = "292";
                var alert = "Get All Form Completed! " + JSON.stringify(functionCallback);
                //console.log(alert);
                callback(errCode, null, functionCallback)
            }
            else {
                let errCode = "293";
                var alert = "No Form Founded";
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
        });
    },
    deleteFormByID: function (formId, callback) {
        Form.remove({ "_id": formId }, function (error, newsCallback) {
            if (error) {
                let errCode = "301";
                var alert = "Error in deleting Form with _id " + formId + " Error: " + error.message;
                console.log("ERROR Code: " + errCode + " " + alert);
                callback(errCode, alert, null)
            }
            else {
                callback("302", null, newsCallback)
            }
        });
    }
};