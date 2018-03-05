var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Department_Schema = new Schema({
    departmentName: { type: String, required: true, unique: true },
    dateTime_create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Department', Department_Schema);

// {
//     "_id": "_id","departmentName" : "departmentName","dateTime_create" : "dateTime_create"
// }