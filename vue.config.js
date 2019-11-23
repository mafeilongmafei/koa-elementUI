module.exports = {
  publicPath: "/",
  devServer: {
    port: 8888, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/v1": {
        //匹配所有已'/api'开头的请求路径
        target: process.env.VUE_APP_BASE_URL, // 代理目标的基础路径process.env.VUE_APP_BASE_URL
        changOrigin: true //是否跨域
      }
    }
  },
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
  },
  lintOnSave : false//关闭eslint
};

