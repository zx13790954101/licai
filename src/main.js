import Vue from 'vue'
import App from './App'
import router from './router'

// 重置样式
import '@/assets/css/reset.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
Vue.use(iView);
Vue.use(ElementUI);

import global from './lib/global'
Vue.prototype.$global = global

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
