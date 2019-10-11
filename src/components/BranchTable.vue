<template>
  <el-main>
    <el-row>
      <el-col :span="2">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-circle-plus"
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
      <el-table-column prop="dcsid" label="DCSID" sortable width="280"></el-table-column>
      <el-table-column prop="name" label="渠道名称" sortable width="180"></el-table-column>
      <el-table-column prop="province" label="所属省份" sortable width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="data">
          <el-button size="mini" @click="openEdit(data)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteData(data)">Delete</el-button>
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
      title="渠道管理"
      width="40%"
      :close-on-click-modal="false"
      :show-close="false"
      :visible="dialogFormVisible"
    >
      <el-form :model="branch" :rules="rules" ref="branch" label-width="100px" close>
        <el-form-item label="DCSID" prop="dcsid">
          <el-input v-model="branch.dcsid" placeholder="请输入dcsid"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称" prop="name">
          <el-input v-model="branch.name" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="province">
          <el-select v-model="branch.province" placeholder="请选择所属省份" style="width:100%">
            <el-option v-for="p in provinces" :label="p.label" :value="p.value" :key="p.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template>
          <el-button type="primary" @click="submitForm('userForm')">确定</el-button>
          <el-button @click="closeForm('userForm')">取消</el-button>
        </template>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import provinces from "../data/provinces.js";
import branchApi from "../api/branch.js";

export default {
  data() {
    return {
      provinces: provinces,
      rules: {},
      branch: {},
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
        dcsid: [
          {
            required: true,
            message: "请输入dcsid",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入渠道名称",
            trigger: "change"
          }
        ],

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
    this.findPage();
  },
  methods: {
    openEdit(data) {
      this.branch = JSON.parse(JSON.stringify(data.row));
      this.dialogFormVisible = true;
    },
    deleteData(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          branchApi
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
      this.branch = {};
      this.$refs.branch.resetFields();
      this.dialogFormVisible = false;
    },
    // 查询分页
    findPage() {
      branchApi.findPage(this.page).then(result => {
        let response = result.data;
        console.log(response);
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
      // 表单创建
      this.$refs.branch.validate(valid => {
        if (valid) {
          // 创建
          if (undefined == this.branch.id || null == this.branch.id) {
            branchApi.insert(this.branch).then(result => {
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
            // 更新
            branchApi.update(this.branch).then(result => {
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