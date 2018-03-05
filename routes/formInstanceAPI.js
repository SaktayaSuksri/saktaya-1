var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var FormInstance = require('../model/formInstance_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newFormInstance', function(req, res) {
    if (!req.body.formId ||
        !req.body.inputData) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newFormInstance = new FormInstance();
        newForm.formId = new ObjectId(req.body.formId);
        newForm.formInput = req.body.inputData;

        newFormInstance.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting form instance doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in inserting form instance doc.'
                });
        });
    }
});

router.post('/editFormInstance', function(req, res) {
    if (!req.body.formInstanceId ||
        !req.body.inputData) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {

        FormInstance.findByIdAndUpdate(new ObjectId(req.body.formInstanceId), 
                            {   'formInput': req.body.inputData
                                }, function(err) {
                                    if (err)
                                        res.json({
                                            code: 'ERROR',
                                            message: '[ERROR] Error in editing form instance doc. >> ' + err.message
                                        });
                                    else
                                        res.json({
                                            code: 'SUCCESS',
                                            message: '[SUCCESS] Success in editing form instance doc.'
                                        });
        });
    }
});

router.post('/deleteFormInstance', function(req, res) {
    if (!req.body.formInstanceId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        FormInstance.findByIdAndRemove(new ObjectId(req.body.formInstanceId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting form instance doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in deleting form instance doc.'
                });
        });
    }
});

router.post('/getFormInstancesByForm', function(req, res) {
    if (!req.body.formId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        FormInstance.find({ 'formId': new ObjectId(req.body.formId) }, function(err, forms) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding form instances by form id "' + req.body.formId + '" >> ' + err.message
                });
            else if (forms.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No form instances found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: forms
                });
        });
    }
});

router.post('/getFormInstanceById', function(req, res) {
    if (!req.body.formInstanceId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        FormInstance.findById(new ObjectId(req.body.formInstanceId), function(err, form) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding form instance "' + req.body.formInstanceId + '" >> ' + err.message
                });
            else if (!form) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No form instance found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: form
                });
        });
    }
});

router.get('/getFormInstancesAll', function(req, res) {
    FormInstance.find(function(err, forms) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all form instances >> ' + err.message
            });
        else if (forms.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No form instances found.'
            });
        else
            res.json({
                code: 'SUCCESS',
                message: forms
            });
    });
});

module.exports = router;