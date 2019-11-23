import {
  SET_TOKEN,
  GET_BY_USERINFO,
  GET_SHOPINFO,
  GET_ECHARTS_DATA
} from "./muations-Type";
import { set , get } from "@/untils/auth";
import { cookieName } from "@/untils/eunm.js";

import { getUserInfo, getShop, getEchData, getRouterTable } from "@/untils/api";

export default {
  ByUsername({ commit, state }, userInfo) {
    const username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      getUserInfo(username, userInfo.password)
        .then(res => {
          //把用户信息放到session中
          set("user", res.user);
          commit(SET_TOKEN, res);
          resolve(res);
        })
        .catch(error => {
          
          reject(error);
        });
    });
  },
  async getByRoutes({ commit }) {
    // 获取到token后,根据token获取用信息,包括权限等级 , 所有能访问的路由
    let res = await getRouterTable();
    commit(GET_BY_USERINFO, res);
  },
  async getByShop({ commit }) {
    await getShop().then(res => {
      commit(GET_SHOPINFO, res);
    });
  },

  async getEchsData({ commit }) {
    let data = await getEchData();
    commit(GET_ECHARTS_DATA, data);
  }
};
