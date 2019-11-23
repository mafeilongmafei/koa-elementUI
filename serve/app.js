const Koa = require("koa")
const path = require("path")
const staic = require("koa-static");
const InitManager = require("./core/init.js")
const formidable = require("koa-formidable");
const catchError = require("./middleware/exception.js")
const requireDirectory = require("require-directory")
const config = require("./config/config")


let app = new Koa()





app.use(staic(path.join(__dirname , "/static/")))
app.use(
  formidable({
    // 设置上传目录，否则在用户的temp目录下
    uploadDir: config.uploadDir,
    // 默认根据文件算法生成hash字符串（文件名），无后缀
    keepExtensions: true
  })
);
app.use(catchError);
InitManager.initCore(app);
app.listen(3000 , ()=>{
    console.log("This is start serve");
})


