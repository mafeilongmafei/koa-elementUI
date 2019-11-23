const requireDirectory = require("require-directory");
const Router = require("koa-router")
const cors = require("koa2-cors");

class InitManager {
  //入口函数
  static initCore(app) {
    InitManager.loadConfig();
    InitManager.app = app;
    InitManager.initLoadRouters()
    InitManager.yesAccess()
  }
  //实现动态加载路由
  static initLoadRouters() {
      // 第一个固定参数 , path , 回调函数
      let apiDirectory = process.cwd() + "/app/api"
      requireDirectory(module, apiDirectory, {
        visit: whenLoadModule
      });

      function whenLoadModule(obj) {
          if(obj instanceof Router) {
              InitManager.app.use(obj.routes())
          }
      }
      
  }

  //初始化配置文件
  static loadConfig(path = "") {
    const configPath = path || process.cwd() + "/config/config.js";

    const config = require(configPath);

    global.config = config;
  }
  //允许跨域
  static yesAccess() {
    // InitManager.app.use(
    //   cors({
    //     origin: function(ctx) {
    //       /*return 'http://localhost:8080';*/ //*
    //       return "127.0.0.1:8080";
    //       /* ctx.set("Access-Control-Allow-Origin", "http://localhost:8080/");
		// ctx.set("Access-Control-Allow-Credentials", true); */
    //     },
    //     exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    //     maxAge: 5,
    //     credentials: true,
    //     allowMethods: ["GET", "POST", "DELETE"],
    //     allowHeaders: ["Content-Type", "Authorization", "Accept"]
    //   })
    // );
  }
}

module.exports = InitManager;