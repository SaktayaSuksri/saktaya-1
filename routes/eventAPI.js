var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;

var Event = require('../model/event_model');

// Route Definitions
router.post('/newEvent', function(req, res) {
    if (!req.body.name ||
        !req.body.detail ||
        !req.body.start ||
        !req.body.finish ||
        !req.body.location) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newEvent = new Event();
        newEvent.eventName = req.body.name;
        newEvent.eventDetail = req.body.detail;
        newEvent.datetimeStart = req.body.start;
        newEvent.datetimeFinish = req.body.finish;
        newEvent.eventLocation = req.body.location;

        newEvent.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting event doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in inserting event doc.'
                });
        });
    }
});

router.post('/editEvent', function(req, res) {
    if (!req.body.eventId ||
        !req.body.name ||
        !req.body.detail ||
        !req.body.start ||
        !req.body.finish ||
        !req.body.location ||
        !req.body.isApproved) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        Event.findByIdAndUpdate(req.body.eventId, {
                                    'eventName': req.body.name,
                                    'eventDetail': req.body.detail,
                                    'datetimeStart': req.body.start,
                                    'datetimeFinish': req.body.finish,
                                    'eventLocation': req.body.location,
                                    'isApproved': req.body.isApproved
                                    }, function(err) {
                                        if (err)
                                            res.json({
                                                code: 'ERROR',
                                                message: '[ERROR] Error in editing event doc. >> ' + err.message
                                            });
                                        else
                                            res.json({
                                                code: 'SUCCESS',
                                                message: '[SUCCESS] Success in editing event doc.'
                                            });
        });
    }
});

router.post('/deleteEvent', function(req, res) {
    if (!req.body.eventId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Event.findByIdAndRemove(req.body.eventId, function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting event doc. >> ' + err.message
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: '[SUCCESS] Success in deleting event doc.'
                });
        });
    }
});

router.post('/getEventsApprovedComingSoon', function(req, res) {
    if (!req.body.numLimit) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Event.find({ 'isApproved': 'pass', 'datetimeStart': { '$gt': Date.now() } })
            .sort({ 'datetimeStart': 1 })
            .limit(parseInt(req.body.numLimit))
            .then(function(events) {
                if (events.length == 0) 
                    res.json({
                        code: 'FAILED',
                        message: '[FAILED] No event found.'
                    });
                else
                    res.json({
                        code: 'SUCCESS',
                        message: events
                    });
            }).catch(function(err) {
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding latest approved events >> ' + err.message
                });
            });
    }
});

router.post('/getEventsByApproveStatus', function(req, res) {
    if (!req.body.approveStatus) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Event.find({ 'isApproved': req.body.approveStatus }, function(err, events) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding "' + req.body.approveStatus + '" events >> ' + err.message
                });
            else if (events.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No event found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: events
                });
        });
    }
});

router.post('/getEventById', function(req, res) {
    if (!req.body.eventId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Event.findById(req.body.eventId, function(err, event) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding event id "' + req.body.eventId + '" >> ' + err.message
                });
            else if (!event) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No event found.'
                });
            else
                res.json({
                    code: 'SUCCESS',
                    message: event
                });
        });
    }
});

router.get('/getEventsAll', function(req, res) {
    Event.find(function(err, events) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all events >> ' + err.message
            });
        else if (events.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No event found.'
            });
        else
            res.json({
                code: 'SUCCESS',
                message: events
            });
    });
});

module.exports = router;