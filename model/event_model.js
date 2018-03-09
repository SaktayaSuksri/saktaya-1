// app/models/event.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var eventSchema = mongoose.Schema({

    eventName:          { type: String, required: true, unique: true },
    eventDetail:        { type: String, required: true },
    datetimeStart:      { type: Date,   required: true },
    datetimeFinish:     { type: Date,   required: true },
    eventLocation:      { type: String, required: true },
    isApproved:         { type: String, required: true, default: 'pending' }     // 'pending' or 'pass' or 'fail'
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Event', eventSchema);