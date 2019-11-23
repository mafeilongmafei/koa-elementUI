const basic = require("basic-auth");
const jwt = require("jsonwebtoken");
let { Forbbiden } = require("../core/http-exception.js");
let config = require("../config/config.js");

class Auth {
  constructor(level) {
    //权限的开关
    this.level = level || 1;
    Auth.super_editor = 2;
    Auth.admin = 1;
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basic(ctx.req);
      // ctx.req 获取得是node.js中原生的ctx.request 对象
      let errMsg = "token不合法";
      //判断用户没有传token或者是乱传
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg);
      }
      try {
        //校验用户传过来的token
        var decode = jwt.verify(userToken.name, config.security.secretKey);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          errMsg = "token已过期";
        }
        throw new Forbbiden(errMsg);
      }
     
      if (Auth[decode.scope] < this.level) {
        errMsg = "权限不足";
        throw new Forbbiden(errMsg);
      }
      ctx.auth = {
        uid: decode.id,
        scope: decode.scope
      };
      await next();
    };
  }
  //判断token是否合法
  static verifyToken(token) {
    try {
      //校验用户传过来的token
      var decode = jwt.verify(token, config.security.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = {
  Auth
};
