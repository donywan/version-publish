<template>
  <el-row class="index" type="flex" align="middle">
    <el-col :span="6" :offset="14">
      <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
        <el-form-item class="login_label" label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item class="login_label" label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="login_register">还没有账号?立即注册</span>
          <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// import store from "../store";
import userApi from "../api/user";
export default {
  data: function() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //   验证通过请求后台api
          userApi
            .login(this.user)
            .then(result => {
              const response = result.data;
              // 如果登录成功
              if (response.code) {
                const user = response.object;
                // 清空之前得用户
                this.$store.commit('removeUser')
                // 设置token
                // this.$store.commit("setToken", user.token);
                this.$store.commit("setUser", user);
                // 跳转路由
                this.$router.push({ path: "/dashboard" });
                // 消息提示
                this.$message({
                  type: "success",
                  message: "欢迎使用！",
                  showClose: true
                });
              } else {
                this.$message({
                  type: "error",
                  message: response.message,
                  showClose: true
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          localStorage.setItem("ms_username", this.ruleForm.username);
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.index {
  height: 100%;
  background: url("http://www.udbac.com/Public/imgs/03.jpg") no-repeat;
  background-size: cover;
}
.login_label,
.login_register {
  color: white;
}
.login_register {
  padding-right: 80px;
}
</style>
