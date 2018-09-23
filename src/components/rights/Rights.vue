<template>
  <div v-loading="loading" class="rightList">
    <!-- //面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表展示 -->
    <el-table :data="rightslist" style="width: 100%" height="100%">
      <!-- fixed -->
      <el-table-column fixed type="index" :index="indexMethod" width="50">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="150" v-model="rightslist.authName">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="120" v-model="rightslist.path">
      </el-table-column>
      <el-table-column prop="level" label="层级" width="120" v-model="rightslist.level">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    // 添加数据之前调用这里面的方法
    created() {
        this.rightsList();
    },
    data() {
        return {
            loading: true,
            rightslist: [
                {
                    authName: "",
                    level: "",
                    path: ""
                }
            ]
        };
    },
    methods: {
        // 表格编号
        indexMethod(index) {
            return index * 2;
        },
        async rightsList() {
            this.loading = true;
            const res = await this.$http.get("rights/list");
            const { data, meta } = res.data;
            if (meta.status === 200) {
                let arrList = res.data.data;
                arrList.forEach((item, i) => {
                    switch (item.level) {
                        case "0":
                            item.level = "一级";
                            break;
                        case "1":
                            item.level = "二级";
                            break;
                        case "2":
                            item.level = "三级";
                            break;
                    }
                });
                this.rightslist = arrList;
                this.loading = false;
            }
        }
    }
};
</script>

<style>
.rightList {
    width: 100%;
    height: 100%;
}
</style>
