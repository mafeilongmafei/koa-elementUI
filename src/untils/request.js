import axios from "axios";
import { getUfo } from "./auth.js";
import { Message } from "element-ui";
const http = {};
import { Base64  } from "js-base64";

var instance = axios.create({
  timeout: 5000
});
//base64加密
function encode(token) {
  const base64 = Base64.encode(token + ":");
  //格式是 Authorization:Basic base(account:password)
  return "Basic " + base64

}

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 请求头添加token
    let hastoken = getUfo().token;
    if (hastoken) {
      config.headers.Authorization =encode(hastoken);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    if (err && err.response) {
      let data = err.response.data;
      Message.error({
        message: data.msg  || "服务器异常"
      });
    }
    return Promise.reject(err.response);
  }
);

http.get = function(url, options) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log(e);
      });
  });
};

http.post = function(url, data, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log(e);
      });
  });
};

export default http;
