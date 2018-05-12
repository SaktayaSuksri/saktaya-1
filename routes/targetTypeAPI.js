var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var TargetType = require('../model/targetType_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newTargetType', function(req, res) {
    if (!req.body.targetTypeName) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        var newTargetType = new TargetType();
        newTargetType.targetTypeName = req.body.targetTypeName;

        newTargetType.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting targetType doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in inserting targetType doc.'
                });
        });
    }
});

router.post('/editTargetType', function(req, res) {
    if (!req.body.targetTypeId ||
        !req.body.targetTypeName) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var updateParams = {
            'targetTypeName': req.body.targetTypeName,
            'dateTime_edit': Date.now()
        };
        TargetType.findByIdAndUpdate(req.body.targetTypeId, updateParams, function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in editing targetType doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in editing targetType doc.'
                });
        });
    }
});

router.post('/deleteTargetType', function(req, res) {
    if (!req.body.targetTypeId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        TargetType.findByIdAndRemove(req.body.targetTypeId, function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting targetType doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in deleting targetType doc.'
                });
        });
    }
});

router.post('/getTargetTypeById', function(req, res) {
    if (!req.body.targetTypeId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        TargetType.findById(req.body.targetTypeId, function(err, target) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding targetType id "' + req.body.targetTypeId + '" >> ' + err.message
                });
            else if (!target) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No targetType found.'
                });
            else
                res.json({
                    code: '999999',
                    message: target
                });
        });
    }
});

router.post('/getTargetTypesByName', function(req, res) {
    if (!req.body.targetTypeName) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        TargetType.find({ 'targetTypeName': {'$regex': '.*' + req.body.targetTypeName + '.*'} }, function(err, targets) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding targetTypeName "' + req.body.targetTypeName + '" >> ' + err.message
                });
            else if (targets.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No targetTypes found.'
                });
            else
                res.json({
                    code: '999999',
                    message: targets
                });
        });
    }
});

router.get('/getTargetTypesAll', function(req, res) {
    TargetType.find(function(err, targets) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all targetTypes >> ' + err.message
            });
        else if (targets.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No targetType found.'
            });
        else
            res.json({
                code: '999999',
                message: targets
            });
    });
});

module.exports = router;