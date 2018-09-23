export default {
  created() {
    this.rolosList()
  },
  data() {
    return {
      // loading: true,
      // 是否显示编辑框
      dialogRolesVisible: false,
      roloslist: [
        {
          roleName: "",
          roleDesc: ""
        }
      ],
      editorlist: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    //角色数据渲染
    async rolosList() {
      const res = await this.$http.get('roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.roloslist = data
        console.log(this.roloslist);
      }
    },
    // 角色编辑
    async editorList(id) {
      // 显示编辑框
      this.dialogRolesVisible = true
      const res = await this.$http.get(`roles/${id}`)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.editorlist = data;
      }
    },
    // 角色更新
    async updateList() {
      const id = this.editorlist.roleId
      const res = await this.$http.put(`roles/${id}`, this.editorlist)
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: "更新成功"
        })
        // 隐藏编辑框
        this.dialogRolesVisible = false;
        this.roloseList()
      } else {
        this.$message({
          type: error,
          message: "更新失败"
        });
      }

    },
    // 角色删除
    async roloseDel(id) {
      console.log(id);
      try {
        // 等待用户点击确认那妞后取消按钮
        await this.$confirm('此你确认删除该角色吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 如果点击确认按钮就会执行下面的代码
        const res = await this.$http.delete(`roles/${id}`)
        console.log(this.roloslist);
        if (res.data.meta.status === 200) {
          const index = this.roloslist.findIndex(item => {
            item.id === id
          })
          this.roloslist.splice(index, 1)
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
    }
  }
}
