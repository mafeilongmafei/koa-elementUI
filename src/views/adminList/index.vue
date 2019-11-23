<template>
  <el-row type="flex">
    <el-col :span="6">
      <el-form ref="formName" :model="formName" label-width="80px" :rules="rules">
        <el-form-item label="name" prop="nickname">
          <el-input v-model="formName.nickname"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="formName.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formName.status" active-text="激活" inactive-text="关闭"></el-switch>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formName.RankDefault" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="fileName">
          <el-upload
            　　
            class="upload-demo"
            　　action
            　　:limit="1"
            　　:auto-upload="false"
            　　:on-change="onchange"
            　　:file-list="fileList"
            :on-exceed="goBeyond"
            　　list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
             <el-image :src="dialogImageUrl" fit="contain" lazy class="img"></el-image>
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="16" :offset="2">
      <el-table :data="adminList" border style="width: 100%">
        <el-table-column prop="avatar" label="头像" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.avatar" lazy :fit="'contain'" class="img"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="nickname" align="center"></el-table-column>
        <el-table-column prop="rank" label="权限等级" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="激活"
              inactive-text="关闭"
              :active-value="1"
              :inactive-value="0"
              @change="statusChange($event ,scope.row.id )"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="setting(scope.row)">编辑</el-button> -->
            <el-button type="danger" @click="centerDialogVisible(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="limt">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="4"
          @current-change="CurrentPage"
        ></el-pagination>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {
  getAdminList,
  addAmin,
  deleteAmin,
  settingAdmin
} from "../../untils/api";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      total: 0,
      formName: {
        nickname: "",
        password: "",
        fileName: "",
        RankDefault: "admin",
        avatar: {},
        status: true
      },
      fileList: [],
      adminList: [],
      options: [
        {
          value: "admin",
          label: "普通管理员"
        },
        {
          value: "super_editor",
          label: "超级管理员"
        }
      ],
      rules: {
        nickname: [
          { required: true, message: "请nickname", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        fileName: [
          { required: true, message: "请上传图片", trigger: "blur" },
          { min: 1, message: "请上传图片", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.getDataList();
  },
  methods: {
    async getDataList(size = 1) {
      let data = await getAdminList(size);
      let { rows, count } = data;
      this.adminList = rows;
      this.total = count;
    },
    onSubmit() {
      this.$refs["formName"].validate(async valid => {
        if (valid) {
          let {
            avatar,
            nickname,
            password,
            status,
            RankDefault
          } = this.formName;
          let fd = new FormData();
          fd.append("avatar", avatar.raw, avatar.name);
          fd.append("nickname", nickname);
          fd.append("password", password);
          fd.append("status", status - 0);
          fd.append("rank", RankDefault);
          let res = await addAmin(fd);
          let user = res.user;
          let isAdd = user[1];
          isAdd
            ? this.$message({ message: "添加成功", type: "success" })
            : this.$message({ message: "添加失败", type: "error" });
          //把上一次清空
          this.fileList = [];
          isAdd ? this.fileList.push({ url: user[0].avatar }) : "";
        } else {
          return false;
        }
      });
    },
    onchange(file) {
      this.formName.fileName = file.name;
      this.formName.avatar = file;
    },
    //beforeUpload=> return false 屏蔽了action的默认上传  有了这个不能加auto-upload  上传文件前
    goBeyond() {
      this.$message({
        message: "上传文件超出个数限制",
        type: "error"
      });
    },
    //编辑
    setting(data) {
      let { avatar, nickname, rank, status } = data;
    },
    //删除
    centerDialogVisible(data) {
      let id = data.id;

      MessageBox({
        title: "提示",
        message: `确定要删除${data.nickname}用户吗`,
        dangerouslyUseHTMLString: true,
        type: "error",
        showCancelButton: true
      }).then(() => {
        deleteAmin(id).then(res => {
          if (res.isDelete) {
            this.$message({ message: "删除成功", type: "success" });
            this.adminList = this.adminList.filter(item => {
              return item.id === id ? false : true;
            });
          } else {
            this.$message({ message: "删除失败", type: "error" });
          }
        });
      });
    },
    //改变用户的status状态
    async statusChange(status, id) {
      const isUpdate = await settingAdmin({ id, status, type: "status" });
      isUpdate
        ? this.$message({ message: "修改成功", type: "success" })
        : this.$message({ message: "修改失败", type: "error" });
    },
    CurrentPage(pageNumber) {
      this.getDataList(pageNumber);
    }
  }
};
</script>
<style  scoped>
.limt {
  display: flex;
  justify-content: center;
}
.img {
  max-width: 80px;
  min-height: 60px;
}
</style>