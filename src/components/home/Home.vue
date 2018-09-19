<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="@/assets/logo.png" alt="黑马logo">
        </el-col>
        <el-col :span="8" class="header_conter">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="login_out">
          <span>欢迎上海前端25期星曜会员</span>
          <a href="javascript:;" @click.prevent="loginOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
      <!-- 用户自路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        loginOut() {
           //清除浏览器存储的localStorage数据
           localStorage.removeItem('token');
           this.$router.push('/login');
        }
    }
};
</script>
// scoped 指定这个样式只在本组件有用
<style scoped lang="less">
.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    .header_conter {
        .title {
            margin: 0;
            padding: 0;
            margin: 0;
            text-align: center;
            font-size: 36px;
            color: #fff;
        }
    }
    .login_out {
      text-align:right;
        span {
            font-weight: 700;
        }
        a {
            color: #b07a17;
            text-decoration: none;
        }
    }
}
.el-aside {
    background-color: #d3dce6;
    color: #333;
    span {
        font-size: 15px;
    }
}
.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.el-container {
    height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
