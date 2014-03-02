'use strict';

var express   = require('express'),
    adaro     = require('adaro'),
    http      = require('http'),
    path      = require('path');

/**
 * Require the controllers
 */
var index     = require('./controllers/index'),
    settings  = require('./controllers/settings');

var app = express();

// we're using PayPal's dustjs engine for Express
// https://github.com/paypal/adaro
app.engine('dust', adaro.dust());

app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'dust');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('9H4xOjkja#hyWn0Z&R9INTJrXdGVOp'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public/assets')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * Configure routes format
 */
app.get('/', index.index);
app.get('/settings/system', settings.system);
app.get('/settings', settings.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
