<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
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
              console.log('this'+this);
              const response = result.data;
              // 如果登录成功
              if (response.code) {
                const token = response.object;

                // 设置token
                this.$store.commit("setToken", token);
                // 消息提示
                this.$message({
                  type: "success",
                  message: "欢迎使用！",
                  showClose: true
                });
                // 跳转路由
                this.$router.push({'path':'/dashboard'});
              } else {
                this.$message({
                  type: "error",
                  message: "用户名或密码错误",
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

