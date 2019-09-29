<template>
  <div class="">
    <el-aside width="200px">
      <el-menu :default-active="this.$route.path" router>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航一
          </template>
          <el-menu-item-group>
            <el-menu-item :index="version">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>-->
        <el-menu-item v-for="(item) in navList" :key="item.name" :index="item.path">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  background-color: cornflowerblue;
  height: 100%;
}
.el-aside{
  overflow: hidden;
  height: 100%;
}
</style>

<script>
import MenuData from "../../data/menu";
export default {
  data() {
    return {
      navList: MenuData,
      version: "/dashboard/version",
      isCollapse: true
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>