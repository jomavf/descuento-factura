const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
app.use(cors());

const usuarios = require('./api/usuarios');
const deudores = require('./api/deudores');
const bancos = require('./api/bancos');
const facturas = require('./api/facturas');
const contratos = require('./api/contratos');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 app.use('/api/v1/usuarios',usuarios);
 app.use('/api/v1/deudores',deudores);
 app.use('/api/v1/bancos',bancos);
 app.use('/api/v1/facturas',facturas);
 app.use('/api/v1/contratos',contratos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
