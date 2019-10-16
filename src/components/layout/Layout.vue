<template>
  <el-container>
    <!-- <v-header></v-header> -->
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="http://www.udbac.com/Public/imgs/udbac_logo.png" alt srcset />
        </el-col>
        <el-col :span="4" :offset="14">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item> -->
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color:white;">hello,{{userName}}</span>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <v-menu></v-menu>
      <router-view></router-view>
    </el-container>
    <el-footer>&copy;2009-2019 BeiJing UDBAC Co,.Ltd</el-footer>
  </el-container>
</template>
<script>
import vHeader from "./Header";
import vMenu from "./Menu";

export default {
  name: "AppLayout",

  components: {
    // "v-header": vHeader,
    "v-menu": vMenu
  },
  computed: {
    userName() {
      return this.$store.state.user.chinesename
    }
  },

  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.$store.commit("removeUser");
        this.$router.replace("/login");
      }
    }
  }
};
</script>
<style>
.el-header {
  /* //http://www.udbac.com/Public/imgs/udbac_logo.png */
  background-color: #b3c0d1;
  color: #333;
  height: 70px !important;
  line-height: 60px;
  text-align: right;
  background-image: url("http://www.udbac.com/Public/imgs/01.jpg");
}
.el-footer {
  background-color: #333333;
  color: white;
  text-align: center;
  line-height: 25px;
  height: 30px !important;
}
.el-dropdown {
  color: white !important;
}
</style>
