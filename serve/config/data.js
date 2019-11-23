module.exports = [{
        path: "/home",
        component: "layout",
        name: "首页",
        iconfont: "iconfont icon-shouye",
        meta: {
            name: "首页",
            rank: ["admin", "super_editor"],
            path: "/home"
        },
        children: null
    },
    {
        path: "/shop",
        name: "商品",
        component: "layout",
        iconfont: "iconfont icon-shangpin",
        meta: {
            name: "商品",
            rank: ["admin", "super_editor"],
            path: "/shop"
        },
        children: [{
                path: "list",
                component: "shopList",
                name: "商品列表",
                iconfont: "iconfont icon-shangpinliebiao",
                meta: {
                    name: "商品列表",
                    rank: ["admin", "super_editor"],
                    path: "/shop/list"
                },
                children: null
            },
            {
                path: "add",
                component: "shopAdd",
                name: "添加商品",
                iconfont: "iconfont icon-tianjiashangpin",
                meta: {
                    name: "添加商品",
                    rank: ["admin", "super_editor"],
                    path: "/shop/add"
                },
                children: null
            },
            {
                path: "register",
                component: "shopRegister",
                name: "商品分类",
                iconfont: "iconfont icon-shangpinfenlei",
                meta: {
                    name: "商品分类",
                    rank: ["admin", "super_editor"],
                    path: "/shop/register"
                },
                children: null
            }
        ]
    },

    {
        path: "/order",
        name: "订单",
        component: "layout",
        iconfont: "iconfont icon-dingdan",
        meta: {
            name: "订单",
            rank: ["admin", "super_editor"],
            path: "/order"
        },
        children: [{
                path: "list",
                component: "orderList",
                name: "订单列表",
                iconfont: "iconfont icon-dingdanliebiao1",
                meta: {
                    name: "订单列表",
                    rank: ["admin", "super_editor"],
                    path: "/order/list"
                },
                children: null
            },
            {
                path: "setting",
                component: "orderSetting",
                name: "订单设置",
                iconfont: "iconfont icon-shezhi",
                meta: {
                    name: "订单设置",
                    rank: ["super_editor"],
                    path: "/order/setting"
                },
                children: null
            }
        ]
    },
    {
        path: "/admin",
        name: "用户",
        component: "layout",
        iconfont: "iconfont icon-yonghu",
        meta: {
            name: "用户",
            rank: ["super_editor"],
            path: "/user"
        },
        children: [{
            path: "list",
            name: "管理列表",
            component: "adminList",
            iconfont: "iconfont icon-xingzhuang",
            meta: {
                name: "管理列表",
                rank: ["super_editor"],
                path: "/dmin/list"
            },
            children : null
        }]
    }

];



