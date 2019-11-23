import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import store from "./store/index";
import router from "./router/index";
import "./assets/css/comm.css";

import "./mock/index";






import "./permission.js"


//是否开启警告模式
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
