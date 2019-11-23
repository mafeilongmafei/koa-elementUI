import {
  SET_TOKEN,
  GET_BY_USERINFO,
  GET_SHOPINFO,
  GET_ECHARTS_DATA
} from "./muations-Type";
import Vue from "vue";
import router from "../router/index";
import { filerRouter, filterRouterTable } from "../filters/filters";

export default {
  [SET_TOKEN](state, { user }) {
    state.user.token = user.token;
    state.user.rank = user.rank;
    Vue.set(state.user, "id", user.id);
    Vue.set(state.user, "nickname", user.nickname);
    Vue.set(state.user, "status", user.status);
    Vue.set(state.user, "avatar", user.avatar);
  },
  [GET_BY_USERINFO](state, { RouteTable }) {
    let initRoutes = router.options.routes;
    let arr = filterRouterTable(filerRouter(RouteTable));
    state.routerTable = arr;
    console.log([...arr, ...initRoutes]);
    router.addRoutes([...arr, ...initRoutes]);
  },
  [GET_SHOPINFO](state, shopInfo) {
    state.shop = shopInfo;
  },
  [GET_ECHARTS_DATA](state, { data }) {
    state.eachrt = data;
  }
};
