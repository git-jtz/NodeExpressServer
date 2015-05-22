var express = require('express');
var layouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var https = require('https');
var routes = require('./routes/index');//controllers
var users = require('./routes/users');
var auth = require('./routes/auth');
var posts = require('./routes/posts');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', '_layout');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

// use session
/* app.use(session({
	secret: settings.cookieSecret,
	store: new MongoStore({
		db: settings.db
	})
})); */

app.use('/', routes);
//app.use('/users', users);
app.use('/post', posts);
//app.use('/reg', auth);
//app.use('/login', auth);
//app.use('/logout', auth);
app.use('/auth', auth);
app.use('/sf', auth);
//app.use('/hello', routes);
app.use('/users/:userid', users);
//app.use('/list', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

var options = {
  pfx: fs.readFileSync('api.pfx'),
  passphrase: 'admin',
  requestCert:        true,
  rejectUnauthorized: false
};

app.listen(1314);
https.createServer(options, app).listen(443);

module.exports = app;
