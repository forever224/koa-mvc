let schema = require('../models/admin.schema');
let BasService = require('./_bas.service');
class AdminService extends BasService {
    constructor() {
        super('admin', schema);
    }

    /**
     * 通过用户名和用户密码登录
     * @param {Object} user 用户信息
     */
    async login(user) {
        let userData = await this.findOne({
            phone: user.phone
        });
        if (!userData) {
            throw '用户名或密码不正确！';
        }
        if (user.password !== userData.password) {
            throw '用户名或密码不正确！';
        }
        return '登录成功';
    }

    /**
     * 创建管理员
     * @param { Object } user
     */
    createNew(user){
        if(!user.phone) throw '电话不能为空';
        if(!user.password) throw '密码不能为空';
        return this.update(user);
    }
}

module.exports = AdminService;
