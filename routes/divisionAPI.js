var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Division = require('../model/division_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newDivision', function(req, res) {
    if (!req.body.divisionName) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        var newDivision = new Division();
        newDivision.divisionName = req.body.divisionName;

        newDivision.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting division doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in inserting division doc.'
                });
        });
    }
});

router.post('/editDivision', function(req, res) {
    if (!req.body.divisionId ||
        !req.body.divisionName) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var updateParams = {
            'divisionName': req.body.divisionName,
            'dateTime_edit': Date.now()
        };
        Division.findByIdAndUpdate(new ObjectId(req.body.divisionId), updateParams, function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in editing division doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in editing division doc.'
                });
        });
    }
});

router.post('/deleteDivision', function(req, res) {
    if (!req.body.divisionId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Division.findByIdAndRemove(new ObjectId(req.body.divisionId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting division doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in deleting division doc.'
                });
        });
    }
});

router.post('/getDivisionById', function(req, res) {
    if (!req.body.divisionId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Division.findById(new ObjectId(req.body.divisionId), function(err, div) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding division id "' + req.body.divisionId + '" >> ' + err.message
                });
            else if (!div) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No division found.'
                });
            else
                res.json({
                    code: '999999',
                    message: div
                });
        });
    }
});

router.post('/getDivisionsByName', function(req, res) {
    if (!req.body.divisionName) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Division.find({ 'divisionName': {'$regex': '.*' + req.body.divisionName + '.*'} }, function(err, divs) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding divisionName "' + req.body.divisionName + '" >> ' + err.message
                });
            else if (divs.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No divisions found.'
                });
            else
                res.json({
                    code: '999999',
                    message: divs
                });
        });
    }
});

router.get('/getDivisionsAll', function(req, res) {
    Division.find(function(err, divs) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all divisions >> ' + err.message
            });
        else if (divs.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No division found.'
            });
        else
            res.json({
                code: '999999',
                message: divs
            });
    });
});

module.exports = router;