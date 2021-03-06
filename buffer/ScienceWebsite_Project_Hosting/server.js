var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config/config'); //Server configuration file
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

mongoose.connect(config.dbUrl, function (err) {
    if (err) {
        console.log("********************************!!! WARNING plzzz !!!*********************************");
        console.log("                          Can't connect to Database.");
        console.log("               Please Start database first then restart this program.");
        console.log("**************************************************************************************");
        console.log(err)
    }
    else{
        console.log("Database has been connected successfully");
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("\n** DB connection alive");
});

//require('./passport')(passport); //Set authentification
require('./config/passport')(passport); // pass passport for configuration

//-- api
var api = require('./routes/api');

// configuration ===============================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//for limit file 
/*
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }));
*/

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// required for passport
app.use(session({ secret: config.sessionSecret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', api);

require('./routes/index.js')(app, passport); //Set routes load our routes and pass in our app and fully configured passpo



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
    next();
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);

module.exports = app;