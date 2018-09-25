export default {
  created() {
    this.goodsList()
  },
  data() {
    return {
      //当前页面码
      pagenum: 1,
      //每页显示的条数
      pagesize: 5,
      //总条数
      total: 0,
      //  商品列表渲染
      goodslist: []
    }
  },
  methods: {
    //商品列表渲染
    async  goodsList() {
      const res = await this.$http.get('goods', {
        params: {
          //当前页面码
          pagenum: this.pagenum,
          //每页显示的条数
          pagesize: this.pagesize
        }
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodslist = data.goods
      }
      //总条数
      this.total = data.total
      //当前页码
      this.pagenum = data.pagenum
    },
    //分页
    page(currentPage) {
      this.pagenum = currentPage
      this.goodsList()
    },

  }
}