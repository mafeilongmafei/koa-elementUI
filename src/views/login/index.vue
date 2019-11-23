<template>
  <div class="body_login clearfix">
    <div class="login_content">
      <h1>系统登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="auto"
        :rules="rules"
      >
        <el-form-item prop="nikname">
          <el-input
            type="text"
            v-model="ruleForm.nikname"
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
            placeholder="用户名user或者admin"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- keyup.enter.native回车触发事件 -->
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            prefix-icon="el-icon-s-goods"
            placeholder="密码:123456"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="width:100%"
            :loading="loading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validatorName, isEmpty } from "../../untils/validate";
export default {
  data() {
    return {
      ruleForm: {
        nikname: "",
        password: ""
      },
      rules: {
        nikname: [{ validator: validatorName, trigger: "blur" }],
        password: [{ validator: isEmpty, trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 变成加载状态
          this.loading = true;
          this.$store
            .dispatch("ByUsername", {
              username: this.ruleForm.nikname,
              password: this.ruleForm.password
            })
            .then(result => {
              this.$router.push({ path: "/home" });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.body_login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  color: #ffffff;
}
.login_content {
  width: 480px;
  height: 520px;
  margin: 200px auto;
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  content: "";

  display: table;

  clear: both;
}
.el-form-item--feedback .el-input__validateIcon {
  color: #67C23A;
}
</style>>
