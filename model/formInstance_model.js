// app/models/formInstance.js

// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var formInstanceSchema = mongoose.Schema({

    formId:                 { type: String, required: true },
    datetimeCreate:         { type: Date,   required: true, default: Date.now() },
    formInput:              { type: String, required: true, 
                                get: function(data) {
                                        try { 
                                            return JSON.parse(data);
                                        } catch(error) { 
                                            return data;
                                        }
                                    },
                                set: function(data) {
                                        return JSON.stringify(data);
                                    } 
                            }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('FormInstance', formInstanceSchema);