<template>
  <div>
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 15px;" class="el-col-6 el-col-2 sou_suo">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>

</template>

<script>
export default {
   data(){
     return{
       input:""
     }
   }
};
</script>

<style lang="less">
.el-breadcrumb {
    height: 40px;
    line-height: 40px;
    background-color: #d4dae0;
    font-size: 16px;
    padding-left: 10px;
}
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.sou_suo{
  height: auto !important;
  line-height:0 !important;
}
</style>
