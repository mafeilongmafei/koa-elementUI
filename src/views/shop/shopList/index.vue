<template>
  <!-- 编辑sku区域 -->
  <div>
    <el-dialog :visible.sync="centerDialogVisible" width="45%" center>
      <el-row :gutter="30">
        <el-col :span="4">
          <h3>编辑货品信息</h3>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">商品货号:{{Skuid}}</el-col>

        <el-col :span="10">
          <el-input v-model="input.sku" placeholder="按sku编号搜索"></el-input>
        </el-col>
        <el-col :span="2" :offset="0" :pull="1">
          <el-button icon="el-icon-search" class="el-button-z" @click="search_key_SKU"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="SearchSKU.children2.arr" style="width: 100%" border>
          <el-table-column prop="sku" label="SKU编号" width="140" align="center"></el-table-column>
          <el-table-column prop="color" label="颜色" width="140" align="center"></el-table-column>
          <el-table-column prop="capacity" label="容量" align="center"></el-table-column>
          <el-table-column prop="price" label="销售价格" width="140" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="inventory" label="商品库存" width="140" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.inventory"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存预警值" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.guard"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="header_search">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div>
        <el-button size="mini" round @click="remove_data">重置</el-button>
        <el-button type="primary" size="small" @click="filter_shop">查询结果</el-button>
      </div>
    </div>

    <div class="select_search">
      <div>
        输入搜索：
        <el-input v-model="input.name" placeholder="商品名称" class="search_input"></el-input>
      </div>
      <div>
        商品货号:
        <el-input v-model="input.id" placeholder="商品货号" prefix="商品货号：" class="search_input"></el-input>
      </div>

      <div class="search_op">
        <span>商品品牌:</span>
        <el-select v-model="input.brand" clearable placeholder="请选择">
          <el-option
            v-for="item in shop.shopInfo.brand"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="jshop.shopList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        lazy
      >
        <el-table-column type="selection" width="85" align="center"></el-table-column>
        <el-table-column prop="id" label="货号" width="200" align="center"></el-table-column>
        <el-table-column label="商品图片" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.name}}</div>
            <div>{{scope.row.brand}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="标签" align="center">
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.tag.putaway" inactive-color="#ccc" inactive-text="上架">></el-switch>
            </div>
            <div>
              <el-switch v-model="scope.row.tag.newShop" inactive-color="#ccc" inactive-text="新品">></el-switch>
            </div>
            <div>
              <el-switch
                v-model="scope.row.tag.recommend"
                inactive-color="#ccc"
                inactive-text="推荐"
              >></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="120" align="center"></el-table-column>
        <el-table-column prop="sales" label="销量" width="120" align="center"></el-table-column>
        <el-table-column label="sku库存" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="()=>{popupSku(scope.row.id)}"
              circle
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="header_pagi">
      <div class="footer_batch">
        <el-select v-model="batch" multiple clearable placeholder="批量操作">
          <el-option
            v-for="item in jshop.select"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="primary" class="btn">确定</el-button>
      </div>

      <el-pagination
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="20"
        @current-change="Newrequest"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { filter_empty, search_key } from "@/untils/validate.js";
import { MessageBox } from "element-ui";

export default {
  mounted() {
    this.$store.dispatch("getByShop").then(() => {
      this.jshop = this.shop;
    });
  },
  data() {
    return {
      Skuid: "",
      SearchSKU: {
        children1: {},
        children2: {}
      },
      rg: true,
      jshop: {},
      input: {
        name: "",
        id: "",
        brand: "",
        sku: ""
      },
      centerDialogVisible: false,
      batch: ""
    };
  },
  methods: {
    ...mapActions(["getByShop"]),
    filter(obj, callBack) {
      return obj.filter(item => {
        return callBack(item);
      });
    },
    filter_shop() {
      let obj = filter_empty(this.input);
      let arr = this.filter(this.jshop.shopList, item => {
        let reg = search_key(item, obj);
        return reg;
      });
      this.jshop.shopList = arr;
    },
    Newrequest() {
      this.$store.dispatch("getByShop").then(() => {
        this.jshop = this.shop;
      });
    },
    first(arr) {
      return arr[0];
    },
    popupSku(id) {
      this.centerDialogVisible = true;
      this.Skuid = id;
      let arr = this.filter(this.jshop.shopList, v => {
        return v.id === id;
      });
      this.SearchSKU.children1 = this.first(arr).children;
      this.SearchSKU.children2 = this.first(arr).children;
    },
    search_key_SKU() {
      let sku = this.input.sku;

      let arr = this.filter(this.SearchSKU.children1.arr, item => {
        return item.sku === sku;
      });
      this.SearchSKU.children2.arr = arr;
    },
    remove_data() {
      this.input.name = this.input.id = this.input.brand = "";
    },
    handleDelete(index, row) {
      this.Skuid = row.id;
      MessageBox({
        title : "提示",
        message : "确定要删除吗",
        dangerouslyUseHTMLString : true,
        type : 'warning',
        showCancelButton : true

      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    ...mapState(["shop"])
  }
};
</script>
<style scoped>
.header_search {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
}
.search_input {
  width: 200px;
  margin: 25px;
}
.select_search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-right: 30px;
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}
.header_pagi {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.el-row {
  display: flex;
  align-items: center;
}
.el-button-z {
  background-color: #f5f7fa;
}
.search_op {
  width: 320px;
  margin: 25px;
}
.search_op > span {
  display: inline-block;
  margin-right: 25px;
}
.btn {
  margin-left: 20px;
}
.footer_batch {
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
