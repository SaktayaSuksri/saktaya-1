// app/models/journal_model.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var journalSchema = mongoose.Schema({

    journalName:               { type: String, required: true, unique: true },
    journalSource:             { type: String, required: true },
    datetimeCreate:            { type: Date,   default: Date.now() }
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Journal', journalSchema);