var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var News_Schema = new Schema({
    topicShort: { type: String, default: null },
    topicFull: { type: String, required: true },
    detailShort: { type: String, default: null },
    detailFull: { type: String, required: true },
    topicPicture: { type: String, default: null },
    datetimePost: { type: Date, default: Date.now },
    datetimeEdit: { type: Date, default: Date.now },
    author: { type: String, default: "N/A" },
    readCount: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    resourceId: { type: String, required: true },
    targetTypeId: { type: String, required: true },
    departmentId: { type: String, required: true },
    tagId: { type: [String] }
});

module.exports = mongoose.model('News', News_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }