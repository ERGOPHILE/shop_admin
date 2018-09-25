<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8" class="logo">
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
            <!-- //default-active 当前激活菜单的 index -->
            <el-aside width="200px" class="aside">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router :unique-opened="true">
                    <el-submenu :index="list.id +''" v-for=" list in menu" :key="list.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{list.authName}}</span>
                        </template>
                        <el-menu-item :index="list2.path" v-for="list2 in list.children" :key="list2.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{list2.authName}}</span>
                            </template>
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
    created() {
        this.menusRoles();
    },
    data() {
        return {
            menu: []
        };
    },
    methods: {
        //退出登录
        loginOut() {
            //清除浏览器存储的localStorage数据
            this.$confirm("此操作将退出登录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "退出成功!"
                    });
                    localStorage.removeItem("token");
                    this.$router.push("/login");
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消退出"
                    });
                });
        },
        // 左侧菜单权限
        async menusRoles() {
            const res = await this.$http.get("menus");
            const { data, meta } = res.data;
            if (meta.status === 200) {
                this.menu = data;
            }
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
        text-align: right;
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
    background-color: rgb(84, 92, 100);
    height: 100%;
    span {
        font-size: 14px;
    }
}
.el-main {
    background-color: #e9eef3;
    color: #333;
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
.logo {
    text-align: left;
}
</style>
