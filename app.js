/* eslint-disable no-console */
const Koa = require('koa');

const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const cors = require('@koa/cors');

const { jwtMiddleware } = require('./model/token');

const index = require('./routes/index');
const users = require('./routes/users');
const inventorys = require('./routes/inventorys');
const items = require('./routes/items');
const status = require('./routes/status');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(`${__dirname}/public`));

app.use(views(`${__dirname}/views`, {
  extension: 'html',
}));

// jwt
app.use(jwtMiddleware);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(inventorys.routes(), inventorys.allowedMethods());
app.use(items.routes(), items.allowedMethods());
app.use(status.routes(), status.allowedMethods());

// cors
app.use(cors());

// error-handling
app.on('error', (err) => {
  console.error('server error', err);
});

// database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/Zlodey', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = app;
