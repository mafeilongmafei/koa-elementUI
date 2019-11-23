const  { HttpException } = require("../core/http-exception.js")
const catchError = async (ctx , next)=>{
    try {
        await next()
    } catch (error) {
        let isHttpException = error instanceof HttpException;
        let isDev = global.config.environment === "development"
        //是未知错误 并且 是开发模式 就抛出错误
        if(!isHttpException && isDev) {
            throw error
        }

        //已知错误
        if (isHttpException) {
            ctx.status = error.code
            ctx.body = {
                msg : error.msg,
                error_code : error.errorCode,
                requestUrl : `${ctx.method}: ${ctx.url}`
            }
        }else {
            //未知错误
            ctx.body = {
                msg : "we made mistake.......",
                error_code : 999,
               requestUrl : `${ctx.method}: ${ctx.url}`
            }
            ctx.status = 500

        }

        
    }
}

module.exports = catchError