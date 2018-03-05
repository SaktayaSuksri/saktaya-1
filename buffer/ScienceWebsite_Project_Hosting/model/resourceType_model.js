var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourceType_Schema = new Schema({
    resourceName: { type: String, required: true },
    dateTime_create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResourceType', ResourceType_Schema);

// {
//     "_id": "_id","resourceName" : "resourceName","dateTime_create" : "dateTime_create"
// }