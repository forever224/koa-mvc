const BaseCtr = require('./_bas.controller');
const AdminService = require('../services/admin.service'),
adminService = new AdminService();

class AdminCtr extends BaseCtr{
    constructor(){
        super('/admin');
        this.addRoute('post', this.login, '/login');
        this.addRoute('post', this.saveItem, '/create');
        this.addRoute('get', this.err1, '/err1')
    }
    login(ctx){
        // return adminService.login(ctx.data);
        throw( new Error('是错误的') )
    }
    saveItem(ctx){
        return adminService.createNew(ctx.data);
    }
    err1(){
        xxx
        return 'xxxx'
    }
}


module.exports = AdminCtr;
