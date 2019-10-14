<template>
  <el-main>
    <el-row>
      <!-- <el-col :span="6">
        <el-input size="mini" placeholder="输入关键字搜索" />
      </el-col>-->
      <el-col :span="2">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-circle-plus"
          @click="editOpen(null)"
        >Create</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" height="90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="更新说明">
              <span>{{ props.row.notes }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="版本号" prop="versionNumber" sortable></el-table-column>
      <el-table-column label="版本日期" prop="versionDate" sortable></el-table-column>
      <el-table-column label="省份" prop="branch.province" sortable></el-table-column>
      <el-table-column label="DCSID" prop="branch.dcsid" sortable></el-table-column>
      <el-table-column label="渠道" prop="branch.name" sortable></el-table-column>
      <el-table-column label="操作用户" prop="user.username" sortable></el-table-column>
      <el-table-column label="下载">
        <template slot-scope="prop">
          <!-- <el-button type="text" @click="downloadJs(prop.row)">download</el-button> -->
          <!-- download只支持同源下载 -->
          <a :href="downloadJs(prop.row)" download>download</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini" @click="editOpen(props)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteDate(props)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page + 1"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
        background
        :hide-on-single-page="true"
      ></el-pagination>
    </el-row>

    <el-dialog
      title="版本管理"
      width="40%"
      :close-on-click-modal="false"
      :show-close="false"
      :visible="dialogFormVisible"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" close>
        <el-form-item label="版本名称" prop="versionNumber">
          <el-input v-model="ruleForm.versionNumber" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属省份" prop="province">
          <el-select v-model="ruleForm.province" placeholder="请选择所属省份" style="width:100%">
            <el-option v-for="p in provinces" :label="p.label" :value="p.value" :key="p.value"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="所属渠道" prop="branch">
          <el-select
            v-model="ruleForm.branch"
            value-key="id"
            placeholder="请选择所属渠道"
            style="width:100%"
          >
            <el-option v-for="p in branchs" :label="p.name" :value="p" :key="p.id">
              <span style="float: left">{{ p.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ p.province }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本日期" required>
          <!-- <el-col :span="11"> -->
          <el-form-item prop="versionDate">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="ruleForm.versionDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <!-- </el-col> -->
          <!-- <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>-->
        </el-form-item>
        <el-form-item label="更新内容" prop="notes">
          <el-input type="textarea" v-model="ruleForm.notes"></el-input>
        </el-form-item>
        <el-form-item label="脚本文件" prop="jsFile">
          <el-upload
            class="upload-demo"
            action="string"
            ref="upload"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            :http-request="uploadFile"
            accept=".js"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>-->
            <span slot="tip" class="el-upload-tip">只能上传js文件</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template>
          <el-button v-if="status" type="primary" @click="updateVersion('ruleForm')">确定</el-button>
          <el-button v-else type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button @click="closeForm('ruleForm')">取消</el-button>
        </template>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
import version from "../api/version.js";
import provinces from "../data/provinces.js";
import branchApi from "../api/branch";
import httpConfig from "../config/axios.config";
// import axios from "axios";
export default {
  data() {
    return {
      status: false,
      tableData: [],
      dialogFormVisible: false,
      ruleForm: {},
      provinces: provinces,
      branchs: {},
      page: {
        page: 0,
        size: 9,
        total: 0
      },
      rules: {
        versionNumber: [
          { required: true, message: "请输入版本号码", trigger: "change" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        branch: [
          { required: true, message: "请选择所属渠道", trigger: "change" }
        ],
        versionDate: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        notes: [{ required: true, message: "请填写更新内容", trigger: "blur" }]
        // jsFile:[{
        //   required: true,
        //   message: "请选择脚本文件",
        // }]
      }
    };
  },
  mounted() {
    this.findPage();
  },
  methods: {
    downloadJs(param) {
      if (param.uploadDir != null) {
        return httpConfig.baseURL + param.uploadDir;
      }
    },
    // 自定义上传脚本文件
    uploadFile(param) {
      // 获取文件
      let file = param.file;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("version", JSON.stringify(this.ruleForm));
      version.upload(formData);
    },
    // 分页查询
    findPage() {
      // this.page.currentPage -= 1;
      version
        .findPage(this.page)
        .then(result => {
          let response = result.data;
          if (response.code) {
            // this.page.currentPage = data.number + 1;
            // this.page.total = data.totalElements;
            // this.tableData = data.content;
            this.tableData = response.object.content;
            this.page.total = response.object.totalElements;
          }
        })
        .catch(err => {
          // console.log(err);
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.page = Number(`${val}`) - 1;
      this.findPage();
    },
    editOpen(props) {
      if (props != null) {
        this.status = true;
        this.ruleForm = JSON.parse(JSON.stringify(props.row));
      }
      // 获取省份渠道
      branchApi
        .findByProvince()
        .then(result => {
          let response = result.data;
          if (response.code) {
            this.branchs = response.object;
          }
        })
        .catch(err => {});
      this.dialogFormVisible = true;
    },
    updateVersion(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          version
            .updateVersion(this.ruleForm)
            .then(result => {
              this.$refs.upload.submit();
              
              this.closeForm(formName);
              this.$message({
                type: "success",
                message: "更新成功！"
              });
              this.findPage();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          version
            .createVersion(this.ruleForm)
            .then(result => {
              let response = result.data;
              if (response.code) {
                // 重新给表单赋值
                this.ruleForm = response.object;
                // 创建成功之后上传脚本
                this.$refs.upload.submit();
                this.findPage();
                this.$message({
                  type: "success",
                  message: "创建成功！"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    closeForm(formName) {
      this.status = false;
      this.$refs[formName].resetFields();
      this.ruleForm = {};
      // this.$refs[formName].clearValidate();
      this.dialogFormVisible = false;
    },
    resetForm(formName) {
      // console.log(formName);
      this.$refs[formName].resetFields();
    },
    getData: function() {
      version
        .findAll()
        .then(result => {
          this.tableData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteDate(data) {
      // console.log(data.row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          version
            .deleteVersion(data.row)
            .then(result => {
              if (result.status == 200) {
                // 弹出提示
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                // 刷新列表
                // this.getData();
                this.findPage();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    }
  },
  computed: {}
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.header {
  float: left;
}
/* .pagination {
  text-align: left;
  margin-top: 20px;
} */
.upload-demo {
  text-align: left;
}
.el-upload-tip {
  margin-left: 2em;
}
</style>
