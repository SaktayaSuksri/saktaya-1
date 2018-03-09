// app/models/link.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var linkSchema = mongoose.Schema({

    linkName:      { type: String, required: true, unique: true },
    url:           { type: String, required: true },
    typeName:      { type: String, required: true, default: 'in'}    // 'in' or 'out'
    
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Link', linkSchema);