var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Document = require('../model/document_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newDocument', function(req, res) {
    if (!req.body.docName ||
        !req.body.docFile ||
        !req.body.authorId ||
        !req.body.resourceTypeId ||
        !req.body.deptId ||
        !req.body.targetTypeId ||
        !req.body.divisionId
    ) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newDoc = new Document();
        newDoc.docName = req.body.docName;
        if (req.body.docCode) newDoc.docCode = req.body.docCode;
        if (req.body.docDetail) newDoc.docDetail = req.body.docDetail; 
        newDoc.docFile = req.body.docFile;
        newDoc.authorId = new ObjectId(req.body.authorId);
        newDoc.resourceTypeId = new ObjectId(req.body.resourceTypeId);
        newDoc.deptId = new ObjectId(req.body.deptId);
        newDoc.targetTypeId = new ObjectId(req.body.targetTypeId);
        newDoc.divisionId = new ObjectId(req.body.divisionId);
        if (req.body.tags) {
            var tagsArray = req.body.tags.split(',');
            for (var i=0; i<tagsArray.length; i++) tagsArray[i] = new ObjectId(tagsArray[i]);
            newDoc.tags = tagsArray;
        }
        if (req.body.showFlag) newDoc.showFlag = (req.body.showFlag == 'true');

        newDoc.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting document. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in inserting document.'
                });
        });
    }
});

router.post('/editDocument', function(req, res) {
    if (!req.body.docId) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var updateParams = {};
        if (req.body.docName) updateParams['docName'] = req.body.docName;
        if (req.body.docCode) updateParams['docCode'] = req.body.docCode;
        if (req.body.docDetail) updateParams['docDetail'] = req.body.docDetail;
        if (req.body.docFile) updateParams['docFile'] = req.body.docFile;
        if (req.body.authorId) updateParams['authorId'] = new ObjectId(req.body.authorId);
        updateParams['datetimeLastEdit'] = Date.now();
        if (req.body.resourceTypeId) updateParams['resourceTypeId'] = new ObjectId(req.body.resourceTypeId);
        if (req.body.deptId) updateParams['deptId'] = new ObjectId(req.body.deptId);
        if (req.body.targetTypeId) updateParams['targetTypeId'] = new ObjectId(req.body.targetTypeId);
        if (req.body.divisionId) updateParams['divisionId'] = new ObjectId(req.body.divisionId);
        if (req.body.tags) {
            var tagsArray = req.body.tags.split(',');
            for (var i=0; i<tagsArray.length; i++) tagsArray[i] = new ObjectId(tagsArray[i]);
            updateParams['tags'] = tagsArray;
        }
        if (req.body.showFlag) updateParams['showFlag'] = (req.body.showFlag == 'true');

        Document.findByIdAndUpdate(new ObjectId(req.body.docId), updateParams, function(err) {
                                    if (err)
                                        res.json({
                                            code: 'ERROR',
                                            message: '[ERROR] Error in editing document. >> ' + err.message
                                        });
                                    else
                                        res.json({
                                            code: '999999',
                                            message: '[SUCCESS] Success in editing document.'
                                        });
        });
    }
});

router.post('/deleteDocument', function(req, res) {
    if (!req.body.docId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Document.findByIdAndRemove(new ObjectId(req.body.docId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting document. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in deleting document.'
                });
        });
    }
});

router.post('/getDocumentsByTypes', function(req, res) {
    if (!req.body.resourceTypeId &&
        !req.boby.deptId &&
        !req.body.targetTypeId &&
        !req.body.divisionId &&
        !req.body.showFlag
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
        Document.find(findParams, function(err, docs) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding docs by types. >> ' + err.message
                });
            else if (docs.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No doc found.'
                });
            else
                res.json({
                    code: '999999',
                    message: docs
                });
        });
    }
});

router.post('/getDocumentById', function(req, res) {
    if (!req.body.docId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Document.findById(new ObjectId(req.body.docId), function(err, doc) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding doc "' + req.body.docId + '" >> ' + err.message
                });
            else if (!doc) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No doc found.'
                });
            else
                res.json({
                    code: '999999',
                    message: doc
                });
        });
    }
});

router.post('/getDocumentByCode', function(req, res) {
    if (!req.body.docCode) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Document.findOne({ 'formCode': req.body.docCode }, function(err, doc) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding doc code "' + req.body.docCode + '" >> ' + err.message
                });
            else if (!doc) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No doc found.'
                });
            else
                res.json({
                    code: '999999',
                    message: doc
                });
        });
    }
});

router.get('/getDocumentsAll', function(req, res) {
    Document.find(function(err, docs) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all docs >> ' + err.message
            });
        else if (docs.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No doc found.'
            });
        else
            res.json({
                code: '999999',
                message: docs
            });
    });
});

module.exports = router;