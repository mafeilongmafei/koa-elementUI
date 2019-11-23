class HttpException extends Error {
  constructor(msg = "服务异常", errorCode = 10000, code = 500) {
    super();
    this.errorCode = errorCode;
    this.code = code;
    this.msg = msg;
  }
}


class ParameterException extends HttpException {
    constructor(msg = "'参数错误'", errorCode = "10000" , code = 400) {
        super(msg , errorCode , code)
        
    }
}

class Success extends HttpException {
    constructor(msg = "ok", errorCode = 0 , code=200) {
        super(msg, errorCode, code);
    }
}

class AuthFailed extends HttpException {
  constructor(msg = "授权失败", errorCode =  "10004" ,  code = 401) {
   super(msg, errorCode, code);
  }
}

class Forbbiden extends HttpException {
  constructor(msg="禁止访问", errorCode="10006" , code=403) {
      super(msg, errorCode, code);

  }
}
 





module.exports = {
  HttpException,
  ParameterException,
  AuthFailed,
  Forbbiden,
  Success
};

