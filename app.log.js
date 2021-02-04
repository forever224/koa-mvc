let log4js = require('log4js');
 
let logConfig = require('./config/log4js.config');
 
// 加载配置文件
log4js.configure(logConfig);
 
let logUtil = {};
// 调用预先定义的日志名称
let resLogger = log4js.getLogger('resLogger');
let reqLogger = log4js.getLogger('http');
let errorLogger = log4js.getLogger('errorLogger');
let consoleLogger = log4js.getLogger();
 
// 错误日志
logUtil.logError = function (ctx, error, resTime) {
  if (ctx && error) {
    let log = formatError(ctx, error, resTime)
    errorLogger.error(log);
    consoleLogger.info(log);
  }
};
 
// 请求日志
logUtil.logRequest = function (ctx, resTime) {
  if (ctx) {
    reqLogger.info(formatReq(ctx.request, resTime));
  }
};
// 响应日志
logUtil.logResponse = function (ctx, resTime) {
  if (ctx) {
    let log = formatRes(ctx, resTime);
    resLogger.info(log);
    consoleLogger.info(log);
  }
};
 
logUtil.log = function (info) {
  if (info) {
    consoleLogger.info(formatInfo(info));
  }
};
 
let formatInfo = function (info) {
  let logText = '';
  // 响应日志开始
  logText += '\n' + '================================================info log start ================================================' + '\n';
  // 响应内容
  logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
  // 响应日志结束
  logText += '================================================ info log end ================================================' + '\n';
  return logText;
};
  
// 格式化请求日志文本
let formatReq = function (req, resTime) {
  let logText = '';
  let method = req.method;
  // 访问方法
  logText += '\n' + 'request method: ' + method + '\n';
  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n';
  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n';
  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
  } else {
    logText += 'request body: ' + JSON.stringify(req.body) + '\n';
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n';
 
  return logText;
};

// 格式化响应日志文本
let formatRes = function (ctx, resTime) {
  let logText = '';
  // 添加请求日志
  logText += formatReq(ctx.request, resTime);
  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n';
  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
  // 响应日志结束
  logText += '================================================ response log end ================================================' + '\n';
  return logText;
};
 
// 格式化错误日志文本
let formatError = function (ctx, err, resTime) {
  let logText = '';
  // 添加请求日志
  logText += formatReq(ctx.request, resTime);
  // 错误名称
  logText += 'err name: ' + err.name + '\n';
  // 错误信息
  logText += 'err message: ' + (err.message || err) + '\n';
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n';
  // 错误信息结束
  logText += '================================================ error log end ================================================' + '\n';
  return logText;
};

 
module.exports = async (ctx, next) => {
  const start = new Date();
  ctx.logger = logUtil;
  // 记录请求日志
  ctx.logger.logRequest(ctx, 0);
  await next();
  ms = new Date() - start;
  if (ctx.body.isSuccess) {
    // 记录响应日志
    ctx.logger.logResponse(ctx, ms);
  }else{
    // 记录异常日志
    ctx.logger.logError(ctx, ctx.body.error, ms);
    let errorMessage = ctx.body.error.message || ctx.body.error;
    ctx.body.error = errorMessage;
  }
};