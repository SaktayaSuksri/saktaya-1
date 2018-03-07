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

router.get('/page', function(req, res) {
    

    console.log("test")
    res.render('template_front.ejs'); 
});

router.get('/', function(req, res) {
    

    console.log("test")
    res.sendfile('index.html'); 
});


module.exports = router;

