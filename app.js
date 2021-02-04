const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require("koa-static-router");
const app = new Koa();
const router = require('./controllers').router;
const config = require('./app.config.js');
const logger = require('./app.log.js');

//请求参数格式化
app.use(bodyParser());

// 日志
app.use(logger);
//路由
app.use(router.routes()).use(router.allowedMethods());

//后台静态资源
app.use(static( { dir:"./images", router:'/images' } ));

// 404
app.use(ctx=>{
    ctx.status = 404;
    ctx.body = { isSuccess: false, error: '什么都没找不到!' };
})
app.listen(config.getClineProt(),() => {
    console.log(`localhost:${config.getClineProt()}`);
});
