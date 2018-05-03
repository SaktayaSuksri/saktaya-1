// app/models/form.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var formSchema = mongoose.Schema({

    formName:               { type: String, required: true, unique: true },
    formCode:               { type: String, default: null},
    formDetail:             { type: String, default: null },
    formSource:             { type: String, required: true },
    sourceType:             { type: String, required: true, default: 'link' },      // 'link' or 'upload' or 'generate'
    authorId:               { type: String, required: true },
    datetimeCreate:         { type: Date,   default: Date.now() },
    datetimeLastEdit:       { type: Date,   default: Date.now() },
    resourceTypeId:         { type: String, required: true },
    deptId:                 { type: String, required: true },
    targetTypeId:           { type: String, required: true },
    divisionId:             { type: String, required: true },
    tags:                   { type: [String], default: [] },
    showFlag:               { type: Boolean, default: true },
    docFlag:                { type: Boolean, required: true },
    isFavorite:             { type: Boolean, default: false }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Form', formSchema);
