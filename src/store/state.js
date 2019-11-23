import { getUfo } from "@/untils/auth";


export default {
  user: {
    token: getUfo().token,
    rank: "admin"
  },
  routerTable : [],
  shop: {
    shopInfo: [],
    shopList: []
  },
  eachrt: {}
};