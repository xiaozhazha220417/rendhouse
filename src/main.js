import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 vant 组件
import '@/vant'
import 'vant/lib/index.less'
import '@/assets/fonts/iconfont.css'

// 使用响应式rem包
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
