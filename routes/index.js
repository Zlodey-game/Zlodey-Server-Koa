const router = require('koa-router')();

router.get('/', async (ctx) => {
  if (ctx.request.user !== undefined) {
    await ctx.render('road', {});
  } else {
    ctx.redirect('./users/login');
  }
});

module.exports = router;
