const router = require('koa-router')();

router.get('/', async (ctx) => {
  if (ctx.request.user !== undefined) {
    await ctx.render('village', {});
  } else {
    ctx.redirect('./users/login');
  }
});

router.get('/village', async (ctx) => {
  await ctx.render('village', {});
});

router.get('/road', async (ctx) => {
  await ctx.render('road', {});
});

module.exports = router;
