<template>
    <div class="user_list">

        <!-- //面包屑导航 -->
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- //搜索功能 -->
        <!-- Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0。 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="queryList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <!-- 添加用户 -->
                <el-button type="success" plain @click="dialogTableVisible = true">添加用户</el-button>
            </el-col>
        </el-row>
        <el-dialog title="添加用户" :visible.sync="dialogTableVisible">
            <el-form :model="addUser" :rules="rules" ref="addUser">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="addUser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="addUser.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="addUser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="addUsers">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 用户数据渲染 -->
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。scope.row.mg_state -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="isOn(scope.row.id,scope.row.mg_state)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="updateOne" plain size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" plain size="mini"></el-button>
                    <el-button type="success" plain size="mini" @click="updateTwo">
                        <i class="el-icon-check"></i>分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="totalpage" :page-size="pagesize" :current-page="currentPage" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    created() {
        this.userList();
    },
    data() {
        return {
            // 存放 渲染数据
            tableData: [],
            //当前页
            currentPage: 1,
            //每页显示的条数
            pagesize: 3,
            //总条数
            totalpage: 0,
            //查询的参数
            query: "",
            //添加的数据
            addUser: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            // 控制用户添加对话框的展示和隐藏
            dialogTableVisible: false,
            formLabelWidth: "120px",
            //表单验证
            rules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "change"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        message: "邮箱格式不正确",
                        trigger: "change"
                    }
                ],
                mobile: [
                    {
                        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: "手机号码格式不正确",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        //用户数据渲染
        userList(query) {
            this.$http
                .get("users", {
                    params: {
                        //当前页
                        pagenum: this.currentPage,
                        //每页显示的条数
                        pagesize: this.pagesize,
                        //要搜索的内容
                        query: query || ""
                    }
                })
                .then(res => {
                    const { data, meta } = res.data;
                    //判断是否拿到数据
                    if (meta.status === 200) {
                        this.tableData = data.users;
                        //当前页
                        this.currentPage = data.pagenum;
                        //总页数
                        this.totalpage = data.total;
                    }
                });
        },
        //分页
        changePage(current) {
            //    console.log(current);
            this.currentPage = current; //改变当前页数
            this.userList(); //重新渲染
        },
        //搜索
        queryList() {
            this.currentPage;
            this.userList(this.query);
            this.query = "";
        },
        //取消
        resetForm() {
            this.$refs.addUser.resetFields();
            this.dialogTableVisible = false;
        },
        //添加用户
        addUsers() {
            //先判断验证是否通过 valid 代表成功或者不成功
            this.$refs.addUser.validate(valid => {
                if (valid) {
                    this.$http.post("users", this.addUser).then(res => {
                        const { data, meta } = res.data;
                        console.log(res);

                        if (meta.status === 201) {
                            this.userList();
                            this.currentPage = 1;
                            this.$message({
                                message: "恭喜你，添加成功",
                                type: "success"
                            });
                            this.$refs.addUser.resetFields();
                            this.dialogTableVisible = false;
                        } else {
                            this.$message({
                                message: "添加失败，请查看数据是否正确",
                                type: "error"
                            });
                        }
                    });
                }
            });
        },
        //切换用户状态
        async isOn(id, type) {
            const res = await this.$http.put(`/users/${id}/state/${type}`);
            const { data, meta } = res.data;
            if (meta.status === 200) {
                this.$message({
                    type: "success",
                    message: data.mg_state === 0 ? "禁用成功" : "启用成功",
                    duration: 1000
                });
            } else {
                this.$message({
                    type: "error",
                    message: meta.msg,
                    duration: 1000
                });
            }
        },
        //编辑用户
        updateOne() {},
        //删除用户
        del(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$http.delete(`users/${id}`).then(res => {
                        const { meta } = res.data;
                        if (meta.status === 200) {
                            // this.currentPage = 1
                            // this.userList()
                            //获取需要删除的下标
                            const index = this.tableData.findIndex(
                                res => res.id == id
                            );



                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        } else {
                            this.$message({
                                type: "info",
                                message: "删除成功!"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //分配角色
        updateTwo() {}
    }
};
</script>

<style   lang="less">
.user_list {
    .breadcrumb {
        height: 40px;
        line-height: 40px;
        background-color: #d4dae0;
        font-size: 16px;
        padding-left: 10px;
    }
}
</style>
