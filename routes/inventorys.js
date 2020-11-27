const router = require('koa-router')();

router.prefix('/inventorys');

const InventoryModel = require('../model/inventorys');

router.post('/', async (ctx) => {
  const inventory = {};

  for (let i = 1; i <= Object.keys(ctx.request.body).length; i++) {
    inventory[i] = ctx.request.body[i];
  }

  ctx.body = await InventoryModel.updateOne({ userID: ctx.request.user.userID }, inventory);
});

module.exports = router;
