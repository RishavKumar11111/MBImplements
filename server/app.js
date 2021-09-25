const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fse = require('fs-extra');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const xFrameOptions = require('x-frame-options');
const device = require('express-device');
const cors = require('cors');
const bodyParser = require('body-parser');
const debug = require('debug')('server:server');
const http = require('http');
const favicon = require('serve-favicon');

// let indexRouter = require('./routes/index');

const aaeRouter = require('./routes/aae');
const adminRouter = require('./routes/admin');
const aeeRouter = require('./routes/aee');
const aoRouter = require('./routes/ao');
const authRouter = require('./routes/auth');
const eeRouter = require('./routes/ee');
const homeRouter = require('./routes/home');
const manufacturerRouter = require('./routes/manufacturer');
const oaicRouter = require('./routes/oaic');
const ofmrdcRouter = require('./routes/ofmrdc');
const osicRouter = require('./routes/osic');
const seRouter = require('./routes/se');
const superAdminRouter = require('./routes/superAdmin');

const app = express();

const sessionOptions = {
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: 'auto',
    sameSite: true
    // ,maxAge: 1800000
  },
  genid() {
    return uuidv4();
  }
};

app.use(session(sessionOptions));

const corsOptions = {
  origin: ['http://localhost:3600', 'http://localhost:4200'],
  methods: 'GET, POST',
  credentials: true
};

app.use(cors(corsOptions));
app.use(xFrameOptions());
app.use(device.capture());
app.use(express.json({
  limit: '100mb'
}));
app.use(express.urlencoded({
  limit: '100mb', extended: true
}));
app.use(bodyParser.json({
  limit: '100mb'
}));
app.use(bodyParser.urlencoded({
  limit: '100mb', extended: true
}));
app.disable('x-powered-by');

// static paths
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'landing-app')));
app.use('/users', express.static(path.join(__dirname, 'login-app')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser(crypto.randomBytes(64).toString('hex')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// app.use('/', indexRouter);

app.use('/aae', aaeRouter);
app.use('/admin', adminRouter);
app.use('/aee', aeeRouter);
app.use('/ao', aoRouter);
app.use('/auth', authRouter);
app.use('/ee', eeRouter);
app.use('/', homeRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/oaic', oaicRouter);
app.use('/ofmrdc', ofmrdcRouter);
app.use('/osic', osicRouter);
app.use('/se', seRouter);
app.use('/superAdmin', superAdminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
  };
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: err.message,
    error: err
  });
});

// Certificate
// const privateKey = fse.readFileSync('/etc/letsencrypt/live/odihortmarketing.nic.in/privkey.pem', 'utf8');
// const certificate = fse.readFileSync('/etc/letsencrypt/live/odihortmarketing.nic.in/cert.pem', 'utf8');
// const ca = fse.readFileSync('/etc/letsencrypt/live/odihortmarketing.nic.in/chain.pem', 'utf8');
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca
// };

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

// let app = require('../app');
// let https = require('https');

// http.createServer(function (req, res) {
//   res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//   res.end();
// }).listen(80);

// let httpServer = express.createServer();
// httpServer.get('*', function(req, res) {
//   res.redirect('https://' + req.headers.host + req.url);
// });

/**
 * Create HTTP server.
 */

// let server = https.createServer(credentials, app);
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;