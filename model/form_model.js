// app/models/form.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var formSchema = mongoose.Schema({

    formName:               { type: String, required: true, unique: true },
    formSource:             { type: String, required: true },
    sourceType:             { type: String, required: true, default: 'link' },
    author:                 { type: String, required: true },
    datetimeCreate:         { type: Date,   required: true },
    datetimeLastEdit:       { type: Date,   required: true },
    resourceTypeId:         { type: String, required: true }
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Form', formSchema);