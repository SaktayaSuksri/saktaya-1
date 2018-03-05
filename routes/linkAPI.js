var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Link = require('../model/link_model');

// Middleware for all routes
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions
router.post('/newLink', function(req, res) {
    if (!req.body.linkName ||
        !req.body.url ||
        !req.body.type) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newLink = new Link();
        newLink.linkName = req.body.linkName;
        newLink.url = req.body.url;
        newLink.typeName = req.body.type;

        newLink.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting link doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in inserting link doc.'
                });
        });
    }
});

router.post('/editLink', function(req, res) {
    if (!req.body.linkId ||
        !req.body.linkName ||
        !req.body.url ||
        !req.body.type) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {

        Link.findByIdAndUpdate(new ObjectId(req.body.linkId), 
                                { 'linkName': req.body.linkName,
                                    'url' : req.body.url,
                                    'typeName' : req.body.type }, function(err) {

                                    if (err)
                                        res.json({
                                            code: 'ERROR',
                                            message: '[ERROR] Error in editing link doc. >> ' + err.message
                                        });
                                    else
                                        res.json({
                                            code: 'SUCCESS',
                                            message: '[SUCCESS] Success in editing link doc.'
                                        });
        });
    }
});

router.post('/deleteLink', function(req, res) {
    if (!req.body.linkId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Link.findByIdAndRemove(new ObjectId(req.body.linkId), function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting link doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in deleting link doc.'
                });
        });
    }
});

router.post('/getLinksByType', function(req, res) {
    if (!req.body.type) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Link.find({ 'typeName': req.body.type }, function(err, links) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding links by type. >> ' + err.message
                });
            else if (links.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No link found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: links
                });
        });
    }
});

router.post('/getLinkById', function(req, res) {
    if (!req.body.linkId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Link.findById(new ObjectId(req.body.linkId), function(err, link) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding link id "' + req.body.linkId + '" >> ' + err.message
                });
            else if (!link) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No link found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: link
                });
        });
    }
});

router.get('/getLinksAll', function(req, res) {
    
    Link.find(function(err, links) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all links >> ' + err.message
            });
        else if (links.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No link found.'
            });
        else
            res.json({
                code: 'SUCCESS',
                message: links
            });
    });
});

module.exports = router;

