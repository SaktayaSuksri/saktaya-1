var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Faculty = require('../model/faculty_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/editFaculty', function(req, res) {
    if (!req.body.admin ||
        !req.body.alumni ||
        !req.body.stdAff ||
        !req.body.board ||
        !req.body.contact) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        Faculty.findOneAndUpdate({}, {
                                    'administrator': req.body.admin,
                                    'alumni': req.body.alumni,
                                    'studentAffairs': req.body.stdAff,
                                    'board': req.body.board,
                                    'contact': req.body.contact
                                    }, function(err) {
                                        if (err)
                                            res.json({
                                                code: 'ERROR',
                                                message: '[ERROR] Error in editing faculty doc. >> ' + err.message
                                            });
                                        else
                                            res.json({
                                                code: 'SUCCESS',
                                                message: '[SUCCESS] Success in editing faculty doc.'
                                            });
        });
    }
});

router.get('/getFaculty', function(req, res) {
    Faculty.find(function(err, faculty) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all forms >> ' + err.message
            });
        else if (forms.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No form found.'
            });
        else
            res.json({
                code: 'SUCCESS',
                message: forms
            });
    });
});
    
module.exports = router;

