<template>
  <el-main>
    <el-row>
      <el-col :span="2">
        <el-button
          size="mini"
          type="primary"
          @click="dialogFormVisible = true"
        >Create</el-button>
      </el-col>
    </el-row>
    <!-- <el-row> -->
    <el-table
      :data="tableData"
      style="width: 100%;height: 100%;"
      max-height="89%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <!-- 选择框 -->
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="username" label="登录名称" sortable width="180"></el-table-column>
      <el-table-column prop="chinesename" label="中文名称" sortable width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" sortable width="220"></el-table-column>
      <el-table-column prop="phone" label="手机号码" sortable width="150"></el-table-column>
      <el-table-column prop="province" label="所属省份" sortable width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="data">
          <el-link
            type="primary"
            @click="resetPassword(data)"
            style="margin-right:20px;"
          >Password reset?</el-link>
          <el-button size="mini" @click="openEdit(data)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteData(data)" icon="el-icon-delete">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.page + 1"
        :page-size="page.size"
        layout="prev, pager, next"
        :total="page.total"
        background
        :hide-on-single-page="true"
      ></el-pagination>
    </el-row>
    <!-- </el-row> -->
    <!-- 添加用户弹出框 -->
    <el-dialog
      title="用户管理"
      width="40%"
      :close-on-click-modal="false"
      :show-close="false"
      :visible="dialogFormVisible"
    >
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" close>
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入登录名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="登录密码" prop="password">
          <el-input v-model="userForm.password" show-password></el-input>
        </el-form-item>-->
        <el-form-item label="中文名称" prop="chinesename">
          <el-input v-model="userForm.chinesename" placeholder="请输入中文名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="province">
          <el-select v-model="userForm.province" placeholder="请选择所属省份" style="width:100%">
            <el-option v-for="p in provinces" :label="p.label" :value="p.value" :key="p.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template>
          <!-- <el-button type="primary" @click="updateVersion('userForm')">确定</el-button> -->
          <el-button type="primary" @click="submitForm('userForm')">确定</el-button>
          <el-button @click="closeForm('userForm')">取消</el-button>
        </template>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import provinces from "../data/provinces.js";
import userService from "../api/user";

export default {
  data() {
    return {
      provinces: provinces,
      rules: {},
      userForm: {},
      dialogFormVisible: false,
      tableData: [],
      // 页数
      page: {
        page: 0,
        size: 9,
        total: 0
      },
      // 表单验证
      rules: {
        username: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        chinesename: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: "change"
          }
        ],
        phone: [],
        province: [
          {
            required: true,
            message: "请选择所属省份",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {

    console.log(this.$store.state.user)
    this.findPage();
  },
  methods: {
    openEdit(user) {
      this.userForm = JSON.parse(JSON.stringify(user.row));
      this.dialogFormVisible = true;
    },
    resetPassword(data) {
      this.$confirm("此操作将重置此用户登录密码,默认为[123456].", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .resetPassword(data.row)
            .then(result => {
              let response = result.data;
              if (response.code) {
                this.findPage();
                // 弹出提示
                this.$message({
                  type: "success",
                  message: response.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    deleteData(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .delete(data.row)
            .then(result => {
              let response = result.data;
              if (response.code) {
                this.findPage();
                // 弹出提示
                this.$message({
                  type: "success",
                  message: response.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    formatter(row, column) {
      return row.address;
    },
    closeForm(formName) {
      this.$refs["userForm"].resetFields();
      this.userForm = {};
      // this.$refs[formName].clearValidate();
      this.dialogFormVisible = false;
    },
    // 查询分页
    findPage() {
      userService.findPage(this.page).then(result => {
        let response = result.data;
        if (response.code) {
          this.tableData = response.object.content;
          this.page.total = response.object.totalElements;
        } else {
          this.$message({
            type: "error",
            message: response.message
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.page.page = Number(`${val}`) - 1;
      this.findPage();
    },
    // 提交表单
    submitForm(formName) {
      console.log(this.userForm.id);
      // 表单创建
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          if (undefined == this.userForm.id || null == this.userForm.id) {
            userService.register(this.userForm).then(result => {
              let response = result.data;
              if (response.code) {
                this.findPage();
                this.closeForm(formName);
                this.$message({
                  type: "success",
                  message: response.message
                });
              } else {
                this.$message({
                  type: "error",
                  message: response.message
                });
              }
            });
          } else {
            userService.update(this.userForm).then(result => {
              let response = result.data;
              if (response.code) {
                // let response = result.object;
                // 刷新table
                this.findPage();
                this.closeForm(formName);
                this.$message({
                  type: "success",
                  message: response.message
                });
              } else {
                this.$message({
                  type: "error",
                  message: response.message
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>