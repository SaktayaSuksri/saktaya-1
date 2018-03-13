var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Personel_Schema = new Schema({
    personelName: { type: String, default: "N/A" },
    picture: { type: String, default: null },
    position: { type: String, default: "N/A" },
    education: { type: String, default: "N/A" },
    expertise: { type: String, default: "N/A" },
    subjects: { type: String, default: "N/A" },
    officeRoom: { type: String, default: "N/A" },
    email: { type: String, default: Date.now },
    datetime_create: { type: Date, default: Date.now },
    homepage: { type: String, default: "N/A" },
    telNumber: { type: String, default: "N/A" },
    positionId: { type: String, required: true },
    divisionId: { type: String, required: true },
    departmentId: { type: String, required: true }
});

module.exports = mongoose.model('Personel', Personel_Schema);

// {
// "_id": "_id","topicShort" : "topicShort","topicFull" : "topicFull","detailShort" : "detailShort","detailFull" : "detailFull","topicPicture" : "topicPicture"
// ,"datetimePost" : "datetimePost","datetimeEdit" : "datetimeEdit","author" : "author","readCount" : "readCount","isPinned" : "isPinned"
// ,"resourceId" : "resourceId","departmentId" : "departmentId","tagId" : "tagId"
// }