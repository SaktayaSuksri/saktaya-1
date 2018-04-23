var express = require('express');
var router = express.Router();

// DATABASE SETUP
var ObjectId = require('mongodb').ObjectId;

var User = require('../model/user_model');

//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("\n** Request detected >> " + JSON.stringify(req.body));
    next();
});

// Route Definitions 
router.post('/newUser', function(req, res) {
    if (!req.body.username ||
        !req.body.password ||
        !req.body.fullName ||
        !req.body.empId ||
        !req.body.tel ||
        !req.body.email ||
        !req.body.role) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.fullName = req.body.fullName;
        newUser.employeeId = req.body.empId;
        newUser.telNumber = req.body.tel;
        newUser.email = req.body.email;
        newUser.roleName = req.body.role;

        newUser.save(function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in inserting user doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in inserting user doc.'
                });
        });
    }
});

router.post('/editUser', function(req, res) {
    if (!req.body.userId ||
        !req.body.username ||
        !req.body.password ||
        !req.body.fullName ||
        !req.body.empId ||
        !req.body.tel ||
        !req.body.email ||
        !req.body.role) {
            res.json({
                code: 'FAILED',
                message: '[FAILED] Invalid request'
            });
    } else {
        User.findByIdAndUpdate(req.body.userId, {
                                    'username': req.body.username,
                                    'password': req.body.password,
                                    'fullName': req.body.fullName,
                                    'employeeId': req.body.empId,
                                    'telNumber': req.body.tel,
                                    'email': req.body.email,
                                    'roleName': req.body.role
                                    }, function(err) {
                                        if (err)
                                            res.json({
                                                code: 'ERROR',
                                                message: '[ERROR] Error in editing user doc. >> ' + err.message
                                            });
                                        else
                                            res.json({
                                                code: '999999',
                                                message: '[SUCCESS] Success in editing user doc.'
                                            });
        });
    }
});

router.post('/deleteUser', function(req, res) {
    if (!req.body.userId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        User.findByIdAndRemove(req.body.userId, function(err) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in deleting user doc. >> ' + err.message
                });
            else
                res.json({
                    code: '999999',
                    message: '[SUCCESS] Success in deleting user doc.'
                });
        });
    }
});

router.post('/getUserById', function(req, res) {
    if (!req.body.userId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        User.findById(req.body.userId, function(err, user) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding user id "' + req.body.userId + '" >> ' + err.message
                });
            else if (!user) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No user found.'
                });
            else
                res.json({
                    code: '999999',
                    message: user
                });
        });
    }
});

router.post('/getUsersByRole', function(req, res) {
    if (!req.body.role) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        User.find({ 'roleName': req.body.role }, function(err, users) {
            if (err)
                res.json({
                    code: 'ERROR',
                    message: '[ERROR] Error in finding "' + req.body.role + '" users >> ' + err.message
                });
            else if (users.length == 0) 
                res.json({
                    code: 'FAILED',
                    message: '[FAILED] No user found.'
                });
            else
                res.json({
                    code: '999999',
                    message: users
                });
        });
    }
});

router.get('/getUsersAll', function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.json({
                code: 'ERROR',
                message: '[ERROR] Error in finding all users >> ' + err.message
            });
        else if (users.length == 0) 
            res.json({
                code: 'FAILED',
                message: '[FAILED] No event found.'
            });
        else
            res.json({
                code: '999999',
                message: users
            });
    });
});

module.exports = router;