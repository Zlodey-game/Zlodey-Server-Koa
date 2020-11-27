const router = require('koa-router')();

const InventoryModel = require('../model/inventorys');
const StatusModel = require('../model/status');
const ItemModel = require('../model/items');

router.get('/', async (ctx) => {
  if (ctx.request.user !== undefined) {
    const { userID } = ctx.request.user;
    const inventory = await InventoryModel.findOrCreate({ userID });
    const status = await StatusModel.findOrCreate({ userID });
    const items = await ItemModel.find({});

    await ctx.render('road', {
      inventory: inventory.doc,
      status: status.doc,
      items,
    });
  } else {
    ctx.redirect('./users/login');
  }
});

module.exports = router;
