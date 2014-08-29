var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');

//var db = monk('localhost:20801/geolocationdb', {username: 'appUser', password: 'argh', auth: {authdb:'geolocation'}});
//var db = monk('localhost:20801/geolocationdb', {username: 'appUser', password: 'argh', auth: {authdb: 'admin'}});
//mongoose.connect("mongodb://[username_mongoadmin]:[passwort]@localhost:[port]/[datenbankname]",{auth:{authdb:"admin"}});
mongoose.connect("mongodb://appUser:argh@localhost:20801/geolocationdb",{auth:{authdb:"geolocationdb"}});
var billSchema = mongoose.Schema(
    {
        "serial" : String,
        "timestamp" : String,
        "latitude" : String,
        "longitude" : String
    }
);

var BillModel = mongoose.model('Bill', billSchema);

var routes = require('./routes/index');
var users = require('./routes/users');
var redirect = require('./routes/redirect');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// set pretty printing
app.locals.pretty = true;

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.mongoose = mongoose;
    req.BillModel = BillModel;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/',redirect);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
