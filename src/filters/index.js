//导入 Vue
import Vue from 'vue'
//导入moment格式化日期的库
import moment from 'moment'
//创建一全局过滤器
Vue.filter('date', (input, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(input).format(formatStr)
})