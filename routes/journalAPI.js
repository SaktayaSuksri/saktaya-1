var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Journal = require('../model/journal_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newJournal', function(req, res) {
    if (!req.body.journalName ||
        !req.body.journalSource
    ) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newJournal = new Journal();
        newJournal.journalName = req.body.journalName;
        newJournal.journalSource = req.body.journalSource;
        newJournal.datetimeCreate = new Date();

        newJournal.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting journal doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in inserting journal doc.'
                });
        });
    }
});

router.post('/editJournal', function(req, res) {
    if (!req.body.journalId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var updateParams = {};
        if (req.body.journalName) updateParams['journalName'] = req.body.journalName;
        if (req.body.journalSource) updateParams['journalSource'] = req.body.journalSource;

        Journal.findByIdAndUpdate(new ObjectId(req.body.journalId), updateParams, function(err) {
                                    if (err)
                                        res.json({
                                            code: 'ERROR',
                                            message: '[ERROR] Error in editing journal doc. >> ' + err.message
                                        });
                                    else
                                        res.json({
                                            code: '999999',
                                            message: '[SUCCESS] Success in editing journal doc.'
                                        });
        });
    }
});

router.post('/deleteJournal', function(req, res) {
    if (!req.body.journalId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Journal.findByIdAndRemove(new ObjectId(req.body.journalId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting journal doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in deleting journal doc.'
                });
        });
    }
});

router.post('/getJournalById', function(req, res) {
    if (!req.body.journalId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Journal.findById(new ObjectId(req.body.journalId), function(err, journal) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding journal "' + req.body.journalId + '" >> ' + err.message
                });
            else if (!journal) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No journal found.'
                });
            else
                res.json({
                    code: '999999',
                    message: journal
                });
        });
    }
});

router.get('/getJournalsAll', function(req, res) {
    Journal.find(function(err, journals) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all journals >> ' + err.message
            });
        else if (journals.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No journals found.'
            });
        else
            res.json({
                code: '999999',
                message: journals
            });
    });
});

module.exports = router;