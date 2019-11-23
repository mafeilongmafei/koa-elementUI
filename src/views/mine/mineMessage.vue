<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <span>通知中心</span>
      <el-button style="float : right" @click="allChangeStatus">全部标记已读</el-button>
    </div>
    <div v-for="item in msgList" :key="item.title" class="text item">
      <el-row>
        <el-col>
          <el-badge :is-dot="Boolean(item.status)" class="item">{{ item.title }}</el-badge>
        </el-col>
        <el-button
          style="float: right;"
          @click="changeStatus(item, item.status)"
        >{{ item.status ? "标记为已读" : "已读"}}</el-button>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="article">{{item.article}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </el-card>
</template>
<script>
import { getMessageList, settigMsgStatus } from "../../untils/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      msgList: []
    };
  },
  mounted() {
    this.getDataList(this.user.id);
  },
  methods: {
    async getDataList(id) {
      let res = await getMessageList(id);
      this.msgList = res;
    },
    async changeStatus(data, status) {
      if (status === 0) {
        return false;
      }
      data.status = 0;
      let obj = { arr: [data], key: "status" };
      let res = await settigMsgStatus(obj);
      res.isUpdate
        ? this.$message({ message: "成功", type: "success" })
        : this.$message({ message: "失败", type: "error" });
    },
    async allChangeStatus() {
      //判断satus 是否都是已读的
      let isupdateStatus = this.msgList.some(item => {
        return item.status === 1;
      });
      if (!isupdateStatus) {
        return false;
      }
      let arr = [];
      this.msgList.forEach(item => {
        item.status = 0;
        arr.push(item);
      });
      let obj = { arr, key: "status" };
      let res = await settigMsgStatus(obj);
      res.isUpdate
        ? this.$message({ message: "成功", type: "success" })
        : this.$message({ message: "失败", type: "error" });
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style lang="less" scoped>
.article {
  font-size: 14px;
  color: #636262;
}
</style>>