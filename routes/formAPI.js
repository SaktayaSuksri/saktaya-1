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
        !req.body.sourceType ||
        !req.body.authorId ||
        !req.body.resourceTypeId ||
        !req.body.deptId ||
        !req.body.targetTypeId ||
        !req.body.divisionId ||
        !req.body.docFlag
    ) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });

    } else if ((req.body.sourceType == 'link' || req.body.sourceType == 'generate') && !req.body.formSource) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( NO formSource !!! )'
        });
    } else if (!req.files){
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( NO file uploaded !!! )'
        });
    } else if (!req.files.formSource) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( expected file var. NOT found !!! )'
        });
    } else {
        var newForm = new Form();
        newForm.formName = req.body.formName;
        if (req.body.formCode) newForm.formCode = req.body.formCode;
        if (req.body.formDetail) newForm.formDetail = req.body.formDetail;
        newForm.sourceType = req.sourceType;
        newForm.authorId = new ObjectId(req.body.authorId);
        newForm.resourceTypeId = new ObjectId(req.body.resourceTypeId);
        newForm.deptId = new ObjectId(req.body.deptId);
        newForm.targetTypeId = new ObjectId(req.body.targetTypeId);
        newForm.divisionId = new ObjectId(req.body.divisionId);
        newForm.docFlag = (req.body.docFlag == 'true');
        if (req.body.tags) {
            var tagsArray = req.body.tags.split(',');
            for (var i=0; i<tagsArray.length; i++) tagsArray[i] = new ObjectId(tagsArray[i]);
            newForm.tags = tagsArray;
        }
        if (req.body.showFlag) newForm.showFlag = (req.body.showFlag == 'true');
        if (req.body.isFavorite) newForm.isFavorite = (req.body.isFavorite == 'true');

        if (req.body.sourceType == 'link') {
            newForm.formSource = req.body.formSource;
            newForm.save(function(err) {
                if (err)
                    res.json({
                        code: 'ERROR',
                        message: '[ERROR] Error in inserting form doc. >> ' + err.message
                    });
                else
                    res.json({
                        code: '999999',
                        message: '[SUCCESS] Success in inserting form doc.'
                    });
            });
        } else if (req.body.sourceType == 'generate') {
            try {
                var formJSON = JSON.parse(req.body.formSource);
                newForm.formSource = req.body.formSource;
                newForm.save(function(err) {
                    if (err)
                        res.json({
                            code: 'ERROR',
                            message: '[ERROR] Error in inserting form doc. >> ' + err.message
                        });
                    else
                        res.json({
                            code: '999999',
                            message: '[SUCCESS] Success in inserting form doc.'
                        });
                });
            } catch (err) {
                res.json({
                    code: 'ERROR',
                    message: 'Error parsing "formSource" value to JSON >> ' + err.message
                });
            }
        } else {
            let formFile = req.files.formSource;
            let formFilePath = '/uploaded_forms/' + formFile.name;
            formFile.mv(formFilePath, function(err) {
                if (err) {
                    res.json({
                        code: 'ERROR',
                        message: 'Error moving uploaded file >> ' + err.message
                    });
                } else {
                    newForm.formSource = formFilePath;
                    newForm.save(function(err) {
                        if (err)
                            res.json({
                                code: 'ERROR',
                                message: '[ERROR] Error in inserting form doc. >> ' + err.message
                            });
                        else
                            res.json({
                                code: '999999',
                                message: '[SUCCESS] Success in inserting form doc.'
                            });
                    });
                }
            });
        }
    }
});

router.post('/editForm', function(req, res) {
    if (!req.body.formId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else if ((req.body.sourceType == 'link' || req.body.sourceType == 'generate') && !req.body.formSource) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( NO formSource !!! )'
        });
    } else if (!req.files){
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( NO file uploaded !!! )'
        });
    } else if (!req.files.formSource) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request ( expected file var. NOT found !!! )'
        });
    } else {
        var updateParams = {};
        if (req.body.formName) updateParams['formName'] = req.body.formName;
        if (req.body.formCode) updateParams['formCode'] = req.body.formCode;
        if (req.body.formDetail) updateParams['formDetail'] = req.body.formDetail;
        if (req.body.authorId) updateParams['authorId'] = new ObjectId(req.body.authorId);
        updateParams['datetimeLastEdit'] = Date.now();
        if (req.body.resourceTypeId) updateParams['resourceTypeId'] = new ObjectId(req.body.resourceTypeId);
        if (req.body.deptId) updateParams['deptId'] = new ObjectId(req.body.deptId);
        if (req.body.targetTypeId) updateParams['targetTypeId'] = new ObjectId(req.body.targetTypeId);
        if (req.body.divisionId) updateParams['divisionId'] = new ObjectId(req.body.divisionId);
        if (req.body.docFlag) updateParams['docFlag'] = (req.body.docFlag == 'true');
        if (req.body.tags) {
            var tagsArray = req.body.tags.split(',');
            for (var i=0; i<tagsArray.length; i++) tagsArray[i] = new ObjectId(tagsArray[i]);
            updateParams['tags'] = tagsArray;
        }
        if (req.body.showFlag) updateParams['showFlag'] = (req.body.showFlag == 'true');
        if (req.body.isFavorite) updateParams['isFavorite'] = (req.body.isFavorite == 'true');

        if (req.body.sourceType) {
            updateParams['sourceType'] = req.body.sourceType;
            if (req.body.sourceType == 'link') {
                updateParams['formSource'] = req.body.formSource;
                Form.findByIdAndUpdate(new ObjectId(req.body.formId), updateParams, function(err) {
                    if (err)
                        res.json({
                            code: 'ERROR',
                            message: '[ERROR] Error in editing form doc. >> ' + err.message
                        });
                    else
                        res.json({
                            code: '999999',
                            message: '[SUCCESS] Success in editing form doc.'
                        });
                });
            } else if (req.body.sourceType == 'generate') {
                try {
                    var formJSON = JSON.parse(req.body.formSource);
                    updateParams['formSource'] = req.body.formSource;
                    Form.findByIdAndUpdate(new ObjectId(req.body.formId), updateParams, function(err) {
                        if (err)
                            res.json({
                                code: 'ERROR',
                                message: '[ERROR] Error in editing form doc. >> ' + err.message
                            });
                        else
                            res.json({
                                code: '999999',
                                message: '[SUCCESS] Success in editing form doc.'
                            });
                    });
                } catch (err) {
                    res.json({
                        code: 'ERROR',
                        message: 'Error parsing "formSource" value to JSON >> ' + err.message
                    });
                }
            } else {
                let formFile = req.files.formSource;
                let formFilePath = '/uploaded_forms/' + formFile.name;
                formFile.mv(formFilePath, function(err) {
                    if (err) {
                        res.json({
                            code: 'ERROR',
                            message: 'Error moving uploaded file >> ' + err.message
                        });
                    } else {
                        updateParams['formSource'] = formFilePath;
                        Form.findByIdAndUpdate(new ObjectId(req.body.formId), updateParams, function(err) {
                            if (err)
                                res.json({
                                    code: 'ERROR',
                                    message: '[ERROR] Error in editing form doc. >> ' + err.message
                                });
                            else
                                res.json({
                                    code: '999999',
                                    message: '[SUCCESS] Success in editing form doc.'
                                });
                        });
                    }
                });
            }
        } else {
            Form.findByIdAndUpdate(new ObjectId(req.body.formId), updateParams, function(err) {
                if (err)
                    res.json({
                        code: 'ERROR',
                        message: '[ERROR] Error in editing form doc. >> ' + err.message
                    });
                else
                    res.json({
                        code: '999999',
                        message: '[SUCCESS] Success in editing form doc.'
                    });
            });
        }
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
                    code: '999999',
                    message: '[SUCCESS] Success in deleting form doc.'
                });
        });
    }
});

router.post('/getFormsByTypes', function(req, res) {
    if (!req.body.resourceTypeId &&
        !req.boby.deptId &&
        !req.body.targetTypeId &&
        !req.body.divisionId &&
        !req.body.showFlag &&
        !req.body.docFlag &&
        !req.body.isFavorite
    ) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        var findParams = {};
        if (req.body.resourceTypeId) findParams['resourceTypeId'] = req.body.resourceTypeId;
        if (req.body.deptId) findParams['deptId'] = req.body.deptId;
        if (req.body.targetTypeId) findParams['targetTypeId'] = req.body.targetTypeId;
        if (req.body.divisionId) findParams['divisionId'] = req.body.divisionId;
        if (req.body.showFlag) findParams['showFlag'] = req.body.showFlag;
        if (req.body.docFlag) findParams['docFlag'] = (req.body.docFlag == 'true');
        if (req.body.isFavorite) findParams['isFavorite'] = (req.body.isFavorite == 'true');
        Form.find(findParams, function(err, forms) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding forms by types. >> ' + err.message
                });
            else if (forms.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No form found.'
                });
            else
                res.json({
                    code: '999999',
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
                    code: '999999',
                    message: form
                });
        });
    }
});

router.post('/getFormByCode', function(req, res) {
    if (!req.body.formCode) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Form.findOne({ 'formCode': req.body.formCode }, function(err, form) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding form code "' + req.body.formCode + '" >> ' + err.message
                });
            else if (!form) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No form found.'
                });
            else
                res.json({
                    code: '999999',
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
                code: '999999',
                message: forms
            });
    });
});

module.exports = router;