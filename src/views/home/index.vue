<template>
  <div style="width:100%">
    <el-row :gutter="20" type="flex">
      <el-col :span="6" v-for="item in eachrt.orderNum" :key="item.name">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="card_title">
              <i :class="item.img + ' card_img'"></i>
              <div class="content_card">
                <p class="num">{{item.name}}</p>
                <p>{{item.num}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      
    </el-row>

    <el-row>
      <el-card class="box-card" style="width:100%;margin-bottom:20px">
        <div slot="header" class="clearfix">
          <span>待办事务</span>
        </div>
        <el-row :gutter="10" v-for="(item , index) in eachrt.commission" :key="index">
          <el-col :md="8" :lg="8" :xl="8" v-for="v in item.row" :key="v.name">
            <div class="grid-content bg-purple-light">
              <span>{{v.name}}</span>
              <span class="grid_num">{{v.num}}</span>
            </div>
          </el-col>
          
        </el-row>

      </el-card>
      <el-card class="box-card" style="width:100%">
        <div slot="header" class="clearfix">
          <span>订单统计</span>
        </div>

        <Ecart :ser="eachrt.series"/>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import Ecart from "../../components/echart";
import { mapActions  , mapState} from "vuex"
export default {
  data() {
    return {};
  },
  created(){
    this.getEchsData()
  },
  components: {
    Ecart
  },
  methods : {
    ...mapActions(['getEchsData'])
  },
  computed : {
    ...mapState(['eachrt'])
  }
};
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 380px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.card_title {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card_img {
    font-size: 60px;
    color: #409eff;
  }
  .content_card {
    margin-left: 15px;
    .num {
      font-size: 16px;
      color: #909399;
    }
  }
}
.grid_num {
  color: red;
}
</style>