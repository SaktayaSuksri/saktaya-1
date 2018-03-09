var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var division_Schema = new Schema({
    divisionName:           { type: String, required: true, unique: true },
    dateTime_create:        { type: Date, default: Date.now() },
    dateTime_edit:          { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Division', division_Schema);
