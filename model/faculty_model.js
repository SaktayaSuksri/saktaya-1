// app/models/faculty.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var facultySchema = mongoose.Schema({

    administrator:       { type: String },
    alumni:              { type: String },
    studentAffairs:      { type: String },
    board:               { type: String },
    contact:             { type: String }
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Faculty', facultySchema);