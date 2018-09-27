export default {
  created() {
    //获取地址栏的值
    const page = this.$route.params.page
    this.goodsList(page)
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
  //监听路由变化
  watch: {
    $route(to) {
      const page = to.params.page
      console.log(page);
      this.goodsList(page)
    }
  },
  methods: {
    //商品列表渲染
    async  goodsList(pagenum = 1) {
      const res = await this.$http.get('goods', {
        params: {
          //当前页面码
          pagenum: pagenum,
          //每页显示的条数
          pagesize: this.pagesize
        }
      })
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodslist = data.goods
        //总条数
        this.total = data.total
        //当前页码因为从服务器拿的数据都是字符串所以要转为数字类型
        this.pagenum = data.pagenum - 0
      }
    },
    //点击分页进行跳转
    page(currentPage) {
      this.$router.push(`/goods/${currentPage}`)
    }
  }
}