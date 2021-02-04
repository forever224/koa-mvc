/**
 * 所有服务连接地址配置
 */

const config = require('./config/config.json');

class Config {
    static get(key) {
        return key ? config[key] : config;
    }

    static getDBPath() {
        return this.get('DB_HOST') + ':' + this.get('DB_POST') + '/' + this.get('DB_DATABASE');
    }
    static getClineProt() {
        return this.get('CLIENT_PORT');
    }
}

module.exports = Config;