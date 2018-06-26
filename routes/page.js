var express = require('express');
var router = express.Router();

// ObjectId type for mongodb documents
var ObjectId = require('mongodb').ObjectId;
var querystring = require('querystring');
var request = require('request');
var Link = require('../model/link_model');

// Route Definitions

router.get('/page', function(req, res) {
    

    console.log("test")
    res.render('template_front.ejs'); 
});


router.get('/department/', function(req, res) {
    

  
    res.sendfile('public/department.html'); 
});

router.get('/graduate/', function(req, res) {
    

  
    res.render('template_graduate.ejs'); 
});

router.get('/graduate_from/', function(req, res) {
    
    res.render('template_graduate_from.ejs'); 
});

router.get('/sciencedays/', function(req, res) {
    
    res.render('scienceDays.ejs'); 
});

router.get('/page/', function(req, res) {
    

    console.log("test")
    res.render('template_front.ejs'); 
});



router.get('/page/news_container/:resourceId/:departmentId', function(request, response) {
    const resourceId = request.params.resourceId 
    const departmentId = request.params.departmentId 

    console.log(resourceId + departmentId);
    response.render('news_container.ejs', {'resourceId':resourceId,"departmentId":departmentId}); // load the index.ejs file
   
    
 });

router.get('/graduate', function(req, res) {
    

    console.log("graduate")
    res.render('template_graduate.ejs'); 
});

router.get('/graduate_from', function(req, res) {
    

    console.log("graduate_from")
    res.render('template_graduate_from.ejs'); 
});



router.get('/form_each/:form_id', function(req, res) {
    
 
     console.log("---"+req.params.form_id)
     console.log("testststs");
 
   var form = {  formId : req.params.form_id };
   var formData = querystring.stringify(form);
   console.log("To new : getFormSourceById   = " +formData);
   var contentLength = formData.length;
   request({
     header : {
       'User-Agent':       'Super Agent/0.0.1',
       'Content-Type':     'application/x-www-form-urlencoded'
   },
     uri: 'http://www.science.kmitl.ac.th/api/getFormSourceById/',
     form: formData,
     method: 'POST'
   }, function (err, res2, body1) {
     //it works!
     if(err){
         console.log("[ERROR] = "+err);
     }
     else{      
     //    console.log(body1);
         body1 = JSON.parse(body1);
 
         if(body1.code != "999999")
         {
             res.send(body1); 
         }
         else{
 


            console.log("To new : getFormById   = " +formData);
            var contentLength = formData.length;
            request({
              header : {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            },
              uri: 'http://www.science.kmitl.ac.th/api/getFormById/',
              form: formData,
              method: 'POST'
            }, function (err, res2, body2) {
              //it works!
              if(err){
                  console.log("[ERROR] = "+err);
              }
              else{      
                  console.log(body2);
                  body2 = JSON.parse(body2);
          
                  if(body2.code != "999999")
                  {
                      res.send(body2); 
                  }
                  else{
          
                    
                   res.render('form_each.ejs',{formName:body2.message.formName,file_src:body1.data}); 
         
                }
                
                  
                       // body = JSON.parse(body);
                    
                     
                      }
                  });
          
         }
 
   
        // body = JSON.parse(body);
     
      
       }
   });
 
 
     
 });
 
router.get('/news_each/:news_id', function(req, res) {
   

    console.log("---"+req.params.news_id)
    console.log("testststs");

  var form = {  newsID : req.params.news_id ,readCount :false};
  var formData = querystring.stringify(form);
  console.log("To new : news_each   = " +formData);
  var contentLength = formData.length;
  request({
    header : {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  },
    uri: 'http://www.science.kmitl.ac.th/api/getNewsfromID/',
    form: formData,
    method: 'POST'
  }, function (err, res2, body) {
    //it works!
    if(err){
        console.log("[ERROR] = "+err);
    }
    else{      
        console.log(body);
        body = JSON.parse(body);

        if(body.code != "999999")
        {
            res.send(body); 
        }
        else{

          res.render('news_each.ejs',{data:body.message}); 
        }

  
       // body = JSON.parse(body);
    
     
      }
  });


    
});

router.get('/', function(req, res) {
    

    console.log("test")
    res.sendfile('index.html'); 
});


router.route('/old')
.get(function (req, res){
    
    proxy_url = 'http://localhost:8080/main.php';
    request.get({url: proxy_url}).pipe(res);
});

router.route('/main.php')
.get(function (req, res){
    proxy_url = 'http://localhost:2001';
    request.get({url: proxy_url}).pipe(res);
});


module.exports = router;

