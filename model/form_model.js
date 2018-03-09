// app/models/form.js

// load the things we need
var mongoose = require('mongoose');

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

// define the schema for our user model
var formSchema = mongoose.Schema({

    formName:               { type: String, required: true, unique: true },
    formCode:               { type: String, default: null, unique: true },
    formDetail:             { type: String, default: null },
    formSource:             { type: String, required: true },
    sourceType:             { type: String, required: true, default: 'link' },      // 'link' or 'upload' or 'generate'
    authorId:               { type: ObjectId, required: true },
    datetimeCreate:         { type: Date,   default: Date.now() },
    datetimeLastEdit:       { type: Date,   default: Date.now() },
    resourceTypeId:         { type: ObjectId, required: true },
    deptId:                 { type: ObjectId, required: true },
    targetTypeId:           { type: ObjectId, required: true },
    divisionId:             { type: ObjectId, required: true },
    tags:                   { type: [ObjectId], default: [] },
    showFlag:               { type: Boolean, default: true }
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Form', formSchema);