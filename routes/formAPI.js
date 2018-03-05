var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Form = require('../model/form_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newForm', function(req, res) {
    if (!req.body.formName ||
        !req.body.source ||
        !req.body.sourceType ||
        !req.body.author ||
        !req.body.resourceTypeId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newForm = new Form();
        newForm.formName = req.body.formName;
        newForm.formSource = req.body.source;
        newForm.sourceType = req.sourceType;
        newForm.author = req.body.author;
        newForm.resourceTypeId = new ObjectId(req.body.resourceTypeId);

        newForm.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting form doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in inserting form doc.'
                });
        });
    }
});

router.post('/editForm', function(req, res) {
    if (!req.body.formId ||
        !req.body.formName ||
        !req.body.source ||
        !req.body.sourceType ||
        !req.body.author ||
        !req.body.resourceTypeId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {

        Form.findByIdAndUpdate(new ObjectId(req.body.formId), 
                            {   'formName': req.body.formName,
                                'formSource' : req.body.source,
                                'sourceType' : req.body.sourceType,
                                'author' : req.body.author,
                                'resourceTypeId' : new ObjectId(req.body.resourceTypeId),
                                'datetimeEdit' : Date.now() 
                                }, function(err) {
                                    if (err)
                                        res.json({
                                            code: 'ERROR',
                                            message: '[ERROR] Error in editing form doc. >> ' + err.message
                                        });
                                    else
                                        res.json({
                                            code: 'SUCCESS',
                                            message: '[SUCCESS] Success in editing form doc.'
                                        });
        });
    }
});

router.post('/deleteForm', function(req, res) {
    if (!req.body.formId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Form.findByIdAndRemove(new ObjectId(req.body.formId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting form doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in deleting form doc.'
                });
        });
    }
});

router.post('/getFormsByType', function(req, res) {
    if (!req.body.resourceTypeId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Form.find({ 'resourceTypeId': new ObjectId(req.body.resourceTypeId) }, function(err, forms) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding forms by resource type. >> ' + err.message
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
    }
});

router.post('/getFormById', function(req, res) {
    if (!req.body.formId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Form.findById(new ObjectId(req.body.formId), function(err, form) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding form "' + req.body.formId + '" >> ' + err.message
                });
            else if (!form) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No form found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: form
                });
        });
    }
});

router.get('/getFormsAll', function(req, res) {
    Form.find(function(err, forms) {
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