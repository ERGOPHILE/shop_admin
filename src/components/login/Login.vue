<template>
    <!-- 登录 -->
    <!-- 混合布局
    通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
      :span表示所占的比例
    -->
    <el-row type="flex" class="row-bg login" justify="center" align="middle">
        <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="6" class="login-content">
            <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script>
// 导入axios
// import axios from "axios";
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                //required 必填项
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 7,
                        message: "长度在 3 到 7 个字符",
                        trigger: "change"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 3,
                        max: 8,
                        message: "长度在 3 到 8 个字符",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        // 登录验证
        // 接口基准地址：http://localhost:8888/api/private/v1/
        // 请求路径：login
        login() {
            this.$http
                .post(
                    "http://localhost:8888/api/private/v1/login",
                    this.loginForm
                )
                .then(res => {
                    //es6中的解构 let {useanme,password} = obj
                    const { data, meta } = res.data;
                    if (meta.status === 200) {
                        // 登录成功后把成功的表识(token)存入localStorage
                        localStorage.setItem("token", data.token);
                        // 路由跳转注意：在Vue实例内部，您可以访问路由器实例$router。你可以打电话this.$router.push。
                        this.$router.push("/home");
                    } else {
                        this.$message({
                            showClose: true,
                            message: "登录失败:" + meta.msg,
                            type: "error",
                            duration: 1000
                        });
                    }
                });
        },
        submitForm() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.loginForm.resetFields();
        }
    }
};
</script>

<style>
.login {
    height: 100%;
    background-color: #2d434c;
}
.login-content {
    min-width: 240px;
    padding: 20px 35px;
    border-radius: 10px;
    background-color: #fff;
}
</style>
