const router = require('koa-router')();

router.prefix('/items');

const ItemModel = require('../model/items');
const InventoryModel = require('../model/inventorys');

router.get('/', async (ctx) => {
  ctx.body = await ItemModel.findOne({ itemID: ctx.request.query.itemID });
});

router.post('/all', async (ctx) => {
  ctx.body = await ItemModel.updateOne({ userID: ctx.request.user.userID }, ctx.request.body);
});

router.get('/inventory', async (ctx) => {
  let temp = {};
  const or = [];

  const inventory = await InventoryModel.findOrCreate({ userID: ctx.request.user.userID });
  for (let i = 1; i <= 9; i++) {
    if (inventory.doc[i] !== 0) {
      temp.itemID = inventory.doc[i];
      or.push(temp);
      temp = {};
    }
  }

  ctx.body = await ItemModel.find({ $or: or });
});

module.exports = router;
