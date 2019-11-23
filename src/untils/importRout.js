export default {
  layout: () => import("../views/layout/index.vue"),
  shopAdd: () => import("../views/shop/shopAdd/index.vue"),
  shopList: () => import("../views/shop/shopList/index.vue"),
  shopRegister: () => import("../views/shop/shopRegister/index.vue"),
  orderList: () => import("../views/order/orderList/index.vue"),
  orderSetting: () => import("../views/order/orderSetting/index.vue"),
  home: () => import("../views/home/index.vue"),
  adminList: () => import("../views/adminList/index.vue"),
  mine: () => import("../views//mine/mine.vue"),
  message: () => import("../views//mine//mineMessage.vue"),
  notFound :()=>import("../views/notFound/index.vue")
};
