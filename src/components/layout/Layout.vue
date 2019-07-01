<template>
  <div>
    <v-header></v-header>
    <el-container style="solid #eee" direction="horizontal">
      <v-menu></v-menu>
      <!-- <Siderbar></Siderbar> -->
      <el-main>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import VHeader from "./Header";
import vMenu from "./Menu";
// import Siderbar from './Sidebar';
export default {
  name: "AppLayout",

  components: {
    VHeader,
    vMenu,
    // Siderbar
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
