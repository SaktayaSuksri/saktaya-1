var Department = require('../model/department_model.js');

module.exports = {
    newDepartment: function (resourceType, callback) {
        resourceType.save(function (error, saveResponse) {
            if (error) {
                var alert = "Saving Resource fail, Error: " + error;
                console.log(alert);
                callback("101", alert, null);
            }
            else {
                callback("102", null, saveResponse)
            }
        });
    },
    checkDepartmentByID: function (departmentId, callback) {
        Department.findOne({ "_id": departmentId }, function (error, departmentResponse) {
            if (error) {
                var alert = "Error in finding Department with _id: " + departmentId + "\nError: " + error;
                callback("111", alert, null)
            }
            else if (departmentResponse) {
                callback("112", null, departmentResponse)
            }
            else {
                var alert = "Department with _id: " + departmentId + " not found";
                callback("113", alert, departmentResponse)
            }
        });
    }
};