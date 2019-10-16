<template>
  <div class="editor">
    <!-- <el-col :span="12"> -->
    <textarea :value="input" @input="update"></textarea>
    <!-- </el-col> -->
    <!-- <el-col class="mark" :span="12"> -->
    <div class="mark" v-html="compiledMarkdown"></div>
    <!-- </el-col> -->
  </div>
</template>
<script>
import marked from "marked";
import "lodash";
// import readme from '../../README.md';
export default {
  data() {
    return {
      input: "# test"
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  }
};
</script>
<style>
html,
body,
.editor {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
.editor .mark {
  display: inline-block;
  width: 50%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
