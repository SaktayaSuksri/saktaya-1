var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var  passport = require('passport');
var flash = require('connect-flash');

var config = require('./config/config'); //Server configuration file
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

// MongoDB Session Store Setup ===================================
var sessionStore = new MongoDBStore({
    uri: config.dbUrl,
    collection: 'sessionStore'
  });
// Catch errors
sessionStore.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
  });
// ===============================================================


var app = express();


mongoose.connect(config.dbUrl, function(err){
	if (err) {
    console.log("********************************!!! WARNING plzzz !!!*********************************");
    console.log("                          Can't connect to Database. naka e dok");
    console.log("             Please Start database first than restarting this program.");
    console.log("**************************************************************************************");


    console.log(err) }
});

//require('./passport')(passport); //Set authentification .
require('./config/passport')(passport); // pass passport for configuration
require('./routes/index.js')(app, passport); //Set routes load our routes and pass in our app and fully configured passpo


//-- api
var api = require('./routes/api');


//partial API

var resourceTypeAPI = require('./routes/resourceTypeAPI');
var newsAPI = require('./routes/newsAPI');
var departmentAPI = require('./routes/departmentAPI');
var tagAPI = require('./routes/tagAPI');
var personelAPI = require('./routes/personelAPI');
var positionAPI = require('./routes/positionAPI');
var eventAPI = require('./routes/eventAPI');
var facultyAPI = require('./routes/facultyAPI');
var formAPI = require('./routes/formAPI');
var linkAPI = require('./routes/linkAPI');
var userAPI =  require('./routes/userAPI');
var formInstanceAPI = require('./routes/formInstanceAPI');
var page = require('./routes/page');



// configuration ===============================================================

// view engine setup
app.set('views', path.join(__dirname, 'public'));
// set up our express application



app.set('view engine', 'ejs'); // set up ejs for templating


        
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));// log every request to the console
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
*/
//for limit file

app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));



// app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Required for passport
const cookieMaxAge = 1000 * 60 * 150000;  // 15 mins.
app.use(session({
    secret: config.sessionSecret,   // session secret
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: cookieMaxAge
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session





// routes ======================================================================
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/', page);
app.use('/api', resourceTypeAPI);
app.use('/api', newsAPI);
app.use('/api', departmentAPI);
app.use('/api', tagAPI);
app.use('/api', personelAPI);
app.use('/api', positionAPI);
app.use('/api', eventAPI);
app.use('/api', facultyAPI);
app.use('/api', formAPI);
app.use('/api', linkAPI);
app.use('/api', userAPI);
app.use('/api', formInstanceAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

/*
app.listen(config.port);
*/


module.exports = app;
