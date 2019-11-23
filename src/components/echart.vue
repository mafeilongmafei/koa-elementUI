<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="main" style="width: 100%;height:600px;"></div>
</template>
<script>
// var echarts = require("echarts");

var echarts = require("echarts/lib/echarts");
//导入线
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("zrender/lib/svg/svg");
require("echarts/lib/chart/pie");

require("echarts/lib/component/legendScroll");

require("echarts/lib/component/tooltip");
 var option = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
         
        ]
      };
export default {
  props : ['ser'],
  mounted() {
    this.init_echart();
  },
  methods: {
    init_echart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
     

      myChart.setOption(option);
    }
  },
  watch : {
    'ser' : function (newValue , oldValue) {
      option.series = newValue
      this.init_echart();
      
    }
  }
};
</script>
<style>
</style>