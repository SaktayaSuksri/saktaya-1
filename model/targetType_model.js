var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var targetType_Schema = new Schema({
    targetTypeName:      { type: String, required: true, unique: true },
    dateTime_create:     { type: Date, default: Date.now() },
    dateTime_edit:       { type: Date, default: Date.now() }
});

module.exports = mongoose.model('TargetType', targetType_Schema);
