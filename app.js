// Module dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session    = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();

// =====================================================================
// Indstillinger, som f.eks. bodyParser, views, session, osv.

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'webintegrator',
  rolling: true, // Holder liv i funktionen, så længe der er aktivitet på siden
	resave: false,
	saveUninitialized: true,
	cookie: { 
    secure: false, // false = http, true = https
    maxAge: 5 * 60 * 1000 } // Hvis ikke man er aktiv vil man blive logget af efter 5 minutter
}));

// =====================================================================
// Routes

require('./routes/index')(app);
require('./routes/kontakt')(app);
require('./routes/produkt')(app);
require('./routes/admin')(app);
require('./routes/admin.produkterGetAll')(app);
require('./routes/admin.produkterCreateOne')(app);
require('./routes/admin.produkterUpdateOne')(app);
require('./routes/login')(app);

// =====================================================================
// Use 404 siden

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



const port = 3000;
console.log(`Serveren kører på http://localhost:${port}`);
app.listen(port);