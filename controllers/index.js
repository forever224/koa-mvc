const Router = require('koa-router');
let AdminCtr = require('./admin.controller'),
    adminCtr = new AdminCtr();


class IndexCtr{
    constructor(){
        this.router = new Router();
        this.router.disallow = [];
        this.routerBuild('/admin', adminCtr.router);
        // 其他路由配置

        
    }
    routerBuild(namespace, ctr){
        this.router.use(namespace, ctr.routes(), ctr.allowedMethods());
    }
}


module.exports = new IndexCtr();
