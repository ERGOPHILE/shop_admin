export default {
  created() {
    this.rolosList()
  },
  data() {
    return {
      // 是否显示编辑框
      dialogRolesVisible: false,
      // 是否显示分配权限
      permissionsVisible: false,
      //角色列表数据
      roloslist: [
        {
          roleName: "",
          roleDesc: ""
        }
      ],
      //角色编辑数据
      editorlist: {
        roleName: "",
        roleDesc: ""
      },
      //分配权限参数
      permissionsList: [],
      defaultProps: {
        // label	指定节点标签为节点对象的某个属性值
        // children	指定子树为节点对象的某个属性值
        children: 'children',
        label: 'authName'
      },
      // 加载中
      loading: true
    };
  },
  methods: {
    //角色数据渲染
    async rolosList() {
      const res = await this.$http.get('roles')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.roloslist = data
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
      else {
        this.dialogRolesVisible = false
        this.$message({
          type: "warning",
          message: meta.msg
        })
      }
    },
    // 角色更新
    async updateList() {
      const id = this.editorlist.roleId
      const res = await this.$http.put(`roles/${id}`, this.editorlist)
      const { meta } = res.data
      console.log(res);

      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg
        })
        this.rolosList()
        // 隐藏编辑框
        this.dialogRolesVisible = false;
      } else {
        this.dialogRolesVisible = false;
        this.$message({
          type: "error",
          message: meta.msg
        });
      }

    },
    // 角色删除
    async roloseDel(id) {
      try {
        // 等待用户点击确认那妞后取消按钮
        await this.$confirm('此你确认删除该角色吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 如果点击确认按钮就会执行下面的代码
        const res = await this.$http.delete(`roles/${id}`)
        if (res.data.meta.status === 200) {
          const index = this.roloslist.findIndex(item => {
            item.id === id
          })
          this.roloslist.splice(index, 1)
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '删除失败'
        });
      }
    },
    //删除角色指定权限
    async roledDel(roleId, rightId) {
      try {
        // 等待用户点击确认那妞后取消按钮
        await this.$confirm('此你确认删除该角色这个权限吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 如果点击确认按钮就会执行下面的代码
        const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
        const { data, meta } = res.data

        if (meta.status === 200) {
          //先遍历查看是在哪那个角色名称中
          const newRolse = this.roloslist.find(v => v.id === roleId)
          // 重新赋值
          newRolse.children = data
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '删除失败'
        });
      }
    },
    //分配权限渲染
    async permissions(id) {
      this.loading = true
      // 显示编辑框
      this.permissionsVisible = true
      const res = await this.$http.get('rights/tree')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.permissionsList = data
        this.loading = false
        const list = this.roloslist.find(item => item.id === id)
        // 用于存放属于该角色的自己的权限id用于编辑是自动显示它自带的权限也就是树叶
        const arrId = [];
        list.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              arrId.push(item3.id)
            })
          })
        })
        //分配权限显示本身含有的权限
        this.$refs.tree.setCheckedKeys(arrId);
      }
    },
    //分配权限更新
    async permissionsUpdate() {
      //分配权限渲染
    }
  }
}
