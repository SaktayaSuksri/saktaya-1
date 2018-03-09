// app/models/document_model.js

// load the things we need
var mongoose = require('mongoose');

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

// define the schema for our user model
var documentSchema = mongoose.Schema({

    docName:                { type: String, required: true, unique: true },
    docCode:                { type: String, default: null, unique: true },
    docDetail:              { type: String, default: null },
    docFile:                { type: String, required: true },
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
module.exports = mongoose.model('Document', documentSchema);