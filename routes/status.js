const router = require('koa-router')();

router.prefix('/status');

const StatusModel = require('../model/status');

router.post('/', async (ctx) => {
  ctx.body = await StatusModel.updateOne({ userID: ctx.request.user.userID }, ctx.request.body);
});

router.post('/all', async (ctx) => {
  ctx.body = await StatusModel.updateOne({ userID: ctx.request.user.userID }, ctx.request.body);
});

module.exports = router;
