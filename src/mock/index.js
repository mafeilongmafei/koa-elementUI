import Mock from "mockjs";

const Random = require("mockjs").Random;

let arr = [];
for (let i = 0; i < 7; i++) {
  arr.push({
    id: "@id",
    name: "@sentence(3, 4)",
    img: Random.image("60x60"),
    tag: {
      putaway: true,
      newShop: true,
      recommend: true
    },
    inventory: Random.integer(100, 500),
    sales: Random.integer(30, 300),
    price: Random.integer(1000, 7000),
    brand: ["oppo", "vivo", "格力", "七匹狼"][Random.natural(0, 3)],
    children: {
      "arr|4": [
        {
          sku: "@id",
          color: ["金色", "银色", "黑色", "白色"][Random.natural(0, 3)],
          capacity: ["16G", "64G", "128G", "32G"][Random.natural(0, 3)],
          price: Random.integer(300, 9000),
          inventory: Random.integer(100, 5000),
          guard: ""
        }
      ]
    }
  });
}

Mock.mock("/shopInfo", {
  shopInfo: {
    register: [
      {
        label: "服装",
        value: 1,
        id: 1,
        children: [
          { value: "外套", label: "外套" },
          { value: "T恤", label: "T恤" },
          { value: "休闲裤", label: "休闲裤" }
        ]
      },
      {
        label: "手机数码",
        value: 2,
        id: 2,
        children: [
          { value: "手机配件", label: "手机配件" },
          { value: "智能设备", label: "智能设备" },
          { value: "数码配件", label: "数码配件" }
        ]
      },
      {
        label: "汽车用品",
        value: 3,
        id: 3,
        children: [
          { value: "车载电器", label: "车载电器" },
          { value: "维修保养", label: "维修保养" },
          { value: "汽车装饰", label: "汽车装饰" }
        ]
      },
      {
        label: "家具家装",
        value: 4,
        id: 4,
        children: [
          { value: "客厅家具", label: "客厅家具" },
          { value: "厨房卫浴", label: "厨房卫浴" },
          { value: "五金工具", label: "五金工具" }
        ]
      }
    ],
    brand: [
      {
        name: "小米",
        evaluate: 90,
        shop: 100,
        upper: "M",
        logo: "",
        img: "",
        description: "小米故事"
      },
      {
        name: "七匹狼",
        evaluate: 90,
        shop: 100,
        upper: "S",
        logo: "",
        img: "",
        description: "七匹狼故事"
      },
      {
        name: "vivo",
        evaluate: 90,
        shop: 100,
        upper: "V",
        logo: "",
        img: "",
        description: "vivo故事"
      },
      {
        name: "格力",
        evaluate: 90,
        shop: 100,
        upper: "G",
        logo: "",
        img: "",
        description: "格力故事"
      }
    ]
  },
  shopList: [...arr],
  select: [
    { id: "1", name: "商品上架" },
    { id: "2", name: "商品下架" },
    { id: "3", name: "设为推荐" },
    { id: "4", name: "取消推荐" },
    { id: "5", name: "设为新品" },
    { id: "6", name: "取消新品" },
    { id: "7", name: "一键回收" }
  ]
});

Mock.mock("/token", {
  token: "@sentence(3, 5)",
  "rank|4-5": 4,
});

Mock.mock("/eachart", {
  data: {
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: "视频广告",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: "直接访问",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: "搜索引擎",
        type: "line",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "top"
          }
        },
        areaStyle: { normal: {} },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
    orderNum: [
      {
        num: 400,
        name: "今日订单",
        img: "iconfont icon-dingdanzongshu"
      },
      {
        num: 350,
        name: "昨日日订单",
        img: "iconfont icon-dingdanzongshu"
      },
      {
        num: 5000,
        name: "昨日销售总额",
        img: "iconfont icon-xiaoshouzonge"
      },
      {
        num: 6000,
        name: "今日销售总额",
        img: "iconfont icon-zuorixiaoshouzonge"
      }
    ],
    commission: [
      {
        row: [
          {
            name: "待付款订单",
            num: Random.integer(10, 500)
          },
          {
            name: "已完成订单",
            num: Random.integer(10, 500)
          },
          {
            name: "待确认收货订单",
            num: Random.integer(10, 500)
          }
        ]
      },
      {
        row: [
          {
            name: "待发货订单",
            num: Random.integer(10, 500)
          },
          {
            name: "新缺货登记",
            num: Random.integer(10, 500)
          },
          {
            name: "待处理退款申请",
            num: Random.integer(10, 500)
          }
        ]
      },
      {
        row: [
          {
            name: "已发货订单",
            num: Random.integer(10, 500)
          },
          {
            name: "待处理退货订单",
            num: Random.integer(10, 500)
          },
          {
            name: "广告位即将到期",
            num: Random.integer(10, 500)
          }
        ]
      }
    ]
  }
});
