import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

import Vant from 'vant'
import 'vant/lib/index.less'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import zh from 'dayjs/locale/zh-cn.js'

dayjs.extend(relativeTime)
dayjs.locale(zh)

Vue.use(Vant)
Vue.filter('dateFormat', function(dt) {
  return dayjs().to(dt)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
