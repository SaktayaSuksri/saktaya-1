var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag_Schema = new Schema({
    tagName: { type: String, required: true, unique: true },
    dateTime_create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', Tag_Schema);

// {
//     "_id": "_id","tagName" : "tagName","dateTime_create" : "dateTime_create"
// }