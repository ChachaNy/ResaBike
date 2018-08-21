var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');

var session = require('express-session');

//var index = require('./routes/index');
var superadmin = require('./routes/superadmin');
var zoneadmin = require('./routes/zoneadmin');
var chauffeur = require('./routes/chauffeur');
var login = require('./routes/login');
var client = require('./routes/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use session
app.use(session({
    secret:'badger badger badger mushroom',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Authenticated middleware
var isAuthenticated = (req, res, next) => {

    // If we have a session and authenticated is true, continue,
    // else redirect to the index page
    if(req.session && req.session.authenticated === true)
        next();
    else
        res.redirect('/grp17/client/client_horaire');

};

app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["fr","en", "de"],
    textsVarName: 'translation',
}));


//app.use('/', index);
/*app.use('/grp17', login);
app.use('/grp17/client', client);
app.use('/grp17/superadmin', isAuthenticated, superadmin);
app.use('/grp17/zoneadmin', isAuthenticated, zoneadmin);
app.use('/grp17', isAuthenticated, chauffeur);*/
app.use('/', login);
app.use('/client', client);
app.use('/superadmin', isAuthenticated, superadmin);
app.use('/zoneadmin', isAuthenticated, zoneadmin);
app.use('/', isAuthenticated, chauffeur);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
