const router = require('koa-router')();

router.prefix('/items');

const ItemModel = require('../model/items');

router.get('/', async (ctx) => {
  ctx.body = await ItemModel.findOne({ itemID: ctx.request.query.itemID });
});

router.post('/all', async (ctx) => {
  ctx.body = await ItemModel.updateOne({ userID: ctx.request.user.userID }, ctx.request.body);
});

module.exports = router;