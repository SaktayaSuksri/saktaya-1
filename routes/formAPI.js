var express = require('express');
var multer = require('multer');
//var upload = multer({ dest: 'uploaded_forms/' });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/file')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

var router = express.Router();


var flow = require('../services/flow.js')
var ReturnCode = require('../model/returnCode.js');

var Form = require('../model/form_model');
var ObjectId = require('mongodb').ObjectId;

var Validate = require("../controller/validation_controller.js");
var ResourceType_Control = require("../controller/resourceType_control.js");
var Department_Control = require('../controller/department_control.js');
var Tag_Control = require("../controller/tag_control.js");
var News_Control = require("../controller/news_control.js");
var Position_Control = require('../controller/position_control.js');
var Personel_Control = require('../controller/personel_control.js');
var TargetType_Control = require('../controller/targetType_control.js');
var Division_Control = require('../controller/division_control.js');
var Form_Control = require('../controller/form_control.js');
var Return_Control = require('../controller/return_control.js');

// Route Definitions
router.post('/multer', upload.single('file'));

router.post('/newForm', function (request, response) {
    var methodCode = "45";

    var requiredData = [];
    requiredData.push(request.body.formName);
    requiredData.push(request.body.formSource);
    requiredData.push(request.body.sourceType);
    requiredData.push(request.body.authorId);
    requiredData.push(request.body.resourceTypeId);
    requiredData.push(request.body.deptId);
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.divisionId);
    requiredData.push(request.body.docFlag);
    var requiredReady = Validate.requiredData_Check(requiredData);

    var objectIdData = [];
    requiredData.push(request.body.resourceTypeId);
    requiredData.push(request.body.deptId);
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.divisionId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                TargetType_Control.checkTargetTypeByID(new ObjectId(request.body.targetTypeId), this)
            }, function (code, err, functionCallback) {
                if (code != "362") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Department_Control.checkDepartmentByID(new ObjectId(request.body.deptId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "112") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(request.body.resourceTypeId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "052") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Division_Control.checkDivisionByID(new ObjectId(request.body.divisionId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "322") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var form = new Form();

                    form.formName = request.body.formName;
                    form.formSource = request.body.formSource;
                    form.sourceType = request.body.sourceType;
                    form.authorId = request.body.authorId;
                    form.resourceTypeId = request.body.resourceTypeId;
                    form.deptId = request.body.deptId;
                    form.targetTypeId = request.body.targetTypeId;
                    form.divisionId = request.body.divisionId;
                    form.docFlag = request.body.docFlag;
                    form.formCode = request.body.formCode;
                    form.formDetail = request.body.formDetail;
                    form.tags = request.body.tags;
                    form.showFlag = request.body.showFlag;

                    Form_Control.newForm(form, this);
                }
            }, function (code, err, functionCallback) {
                if (code != "262") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCodeAndData(ReturnCode.success, "New Publication was saved successfully as _id defined", functionCallback._id, response);
                }
            }
        );
    }
});

router.post('/editForm/', function (request, response) {
    var methodCode = "46";

    var requiredData = [];
    requiredData.push(request.body.formId);
    requiredData.push(request.body.formName);
    requiredData.push(request.body.formSource);
    requiredData.push(request.body.sourceType);
    requiredData.push(request.body.authorId);
    requiredData.push(request.body.resourceTypeId);
    requiredData.push(request.body.deptId);
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.divisionId);
    requiredData.push(request.body.docFlag);
    requiredData.push(request.body.formCode);
    requiredData.push(request.body.showFlag);
    var requiredReady = Validate.requiredData_Check(requiredData);

    var objectIdData = [];
    requiredData.push(request.body.resourceTypeId);
    requiredData.push(request.body.deptId);
    requiredData.push(request.body.targetTypeId);
    requiredData.push(request.body.divisionId);
    var objectIdReady = Validate.objectIDData_Check(objectIdData)

    if (!requiredReady) {
        var alert = "Input Not Valid, check if some data is required."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "001", alert, response)
    }
    else if (!objectIdReady) {
        var alert = "Input Not Valid, check if some data is not ObjectID for MongoDB."
        console.log(alert);
        Return_Control.responseWithCode(ReturnCode.clientError + methodCode + "003", alert, response)
    }
    else {
        flow.exec(
            function () {
                Form_Control.checkFormByID(new ObjectId(request.body.formId), this)
            }, function (code, err, functionCallback) {
                if (code != "282") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    TargetType_Control.checkTargetTypeByID(new ObjectId(request.body.targetTypeId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "362") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Department_Control.checkDepartmentByID(new ObjectId(request.body.deptId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "112") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    ResourceType_Control.checkResourceTypeByID(new ObjectId(request.body.resourceTypeId), this)
                }
            }, function (code, err, functionCallback) {
                if (code != "052") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Division_Control.checkDivisionByID(new ObjectId(request.body.divisionId), this)
                }
            }, function (code, err, result) {
                if (code != "322") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    var publication = new Publication();
                    publication.researcherId = request.body.researcherId;
                    publication.publicationName = request.body.publicationName;
                    publication.publishLocation = request.body.publishLocation;
                    publication.publishYear = request.body.publishYear;
                    publication.publishType = request.body.publishType;
                    publication.scholarType = request.body.scholarType;
                    publication.address = request.body.address;
                    publication.publicationDatabase = request.body.publicationDatabase;
                    publication.impactFactor = request.body.impactFactor;
                    publication.quartile = request.body.quartile;
                    publication.weight = request.body.weight;
                    publication.detail = request.body.detail;
                    publication.studentName = request.body.studentName;
                    publication.bachelorDepartment = request.body.bachelorDepartment;
                    publication.masterDepartment = request.body.masterDepartment;
                    publication.doctoryDepartment = request.body.doctoryDepartment;
                    Publication_Control.updatePublicationByID(new ObjectId(request.body.publicationId), publication, this);
                }
            }, function (code, err, result) {
                if (code != "452") {
                    Return_Control.responseWithCode(ReturnCode.serviceError + methodCode + code, err, response);
                }
                else {
                    Return_Control.responseWithCode(ReturnCode.success, "Publication with _id: " + request.body.publicationId + " has updated successfully.", response);
                }
            }
        );
    }
});

//----------------*-*-*-*-*----------------------------------------

router.post('/deleteForm', function(req, res) {
    if (!req.body.formId) {
        res.json({
            code: 'FAILED',
            message: '[FAILED] Invalid request'
        });
    } else {
        Form.findByIdAndRemove(req.body.formId, function(err) {
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
        if (req.body.docFlag) findParams['docFlag'] = req.body.docFlag;
        if (req.body.isFavorite) findParams['isFavorite'] = req.body.isFavorite;
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
        Form.findById(req.body.formId, function(err, form) {
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