//导入尾部的element-tree-grid组件
//作用：配合el-table实现表格展开树形控件功能
import EleTreeGrid from 'element-tree-grid'
export default {
  created() {
    //渲染分类名称列表
    this.categoriesList()
    //渲染分类添加名称列表
    // this.categoriesAddList()
  },
  data() {
    return {
      //当前页面码
      pagenum: 1,
      //每页显示的条数
      pagesize: 10,
      //总条数
      total: 0,
      //  商品分类列表渲染
      categorieslist: [],
      //加载效果
      loading: true,
      //显示隐藏添加分类对话框
      dialogAddVisible: false,
      fatherAddList: {
        //添加分类输入的名称
        categoriesName: "",
        //添加分类选择的父级id
        cat_pid: "",
        //添加分类选择的层级
        cat_level: "",
        //添加分类父级分类渲染
        categoriesAddlist: [],
        //添加分类父级分类默认显示为空
        fatherUser: []
      }
    }
  },
  methods: {
    //商品分类列表渲染
    async categoriesList() {
      this.loading = true
      const res = await this.$http.get('categories', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.categorieslist = data.result
        this.loading = false
      }
      //总条数
      this.total = data.total
      //当前页码
      this.pagenum = data.pagenum
    },
    //分页
    page(currentPage) {
      this.pagenum = currentPage
      this.categoriesList()
    },
    //渲染父级添加分类
    async categoriesAddList() {
      this.dialogAddVisible = true
      const res = await this.$http.get('categories', {
        params: {
          type: [2]
        }
      })
      const { data, meta } = res.data
      this.fatherAddList.categoriesAddlist = data
    },
    //获取选择的名称和层级还有父级的id
    get(user) {
      //获取父级id
      this.fatherAddList.cat_pid = user[user.length - 1]
      //层级
      this.fatherAddList.cat_level = user.length
    },
    //添加分类
    async  addCategories() {
      // 判断用户是否进行选择
      const { categoriesName, cat_pid, cat_level } = this.fatherAddList
      if (categoriesName != "" && cat_pid != "" && cat_level != "") {
        const params = {
          cat_pid: cat_pid,//分类父 ID
          cat_name: categoriesName,//分类名称
          cat_level: cat_level//分类层级
        }
        // post传参只能是个对象
        const res = await this.$http.post('categories', params)
        const { data, meta } = res.data
        if (meta.status === 201) {
          this.categoriesList(this.pagenum)
          this.dialogAddVisible = false
          this.$message({
            type: "success",
            message: meta.msg
          })
        } else {
          this.$message({
            type: "error",
            message: meta.msg
          })
        }

      } else {
        this.$message({
          type: "error",
          message: "请选择"
        })
      }
    },
    //清空输入
    closeCategoriesAddDialog() {
      this.$refs.fatherAddList.resetFields()
    }
  },
  //注册为局部组件
  components: {
    //es6 中的属性名表达式
    [EleTreeGrid.name]: EleTreeGrid
    // 以上属性名表达式最终转化为以下形式：
    // 'el-table-tree-column': ElTreeGrid
  }
}