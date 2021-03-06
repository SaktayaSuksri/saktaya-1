var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploaded_journals/' });

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Journal = require('../model/journal_model');

// Route Definitions
router.post('/newJournal', upload.single('journalSource'), function(req, res) {
    if (!req.body.journalName) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else if (!req.file) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request (No file uploaded !!!)'
        });
    } else {
        var newJournal = new Journal();
        newJournal.journalName = req.body.journalName;
        newJournal.datetimeCreate = new Date();

        let journalFile = req.file;
        newJournal.journalSource = journalFile.path;
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

router.post('/editJournal', upload.single('journalSource'), function(req, res) {
    if (!req.body.journalId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var updateParams = {};
        if (req.body.journalName) updateParams['journalName'] = req.body.journalName;
        if (req.file) {
            let journalFile = req.file;
            updateParams['journalSource'].journalSource = journalFile.path;
            Journal.findByIdAndUpdate(req.body.journalId, updateParams, function(err) {
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
        } else {
            Journal.findByIdAndUpdate(req.body.journalId, updateParams, function(err) {
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
    }
});

router.post('/deleteJournal', function(req, res) {
    if (!req.body.journalId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Journal.findByIdAndRemove(req.body.journalId, function(err) {
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
        Journal.findById(req.body.journalId, function(err, journal) {
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