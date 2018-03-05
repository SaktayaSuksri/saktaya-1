var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Position_Schema = new Schema({
    positionName: { type: String, required: true, unique: true },
    dateTime_create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Position', Position_Schema);

// {
//     "_id": "_id","positionName" : "positionName","dateTime_create" : "dateTime_create"
// }