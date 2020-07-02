import Vue from 'vue'
import App from './App.vue'
import store from './store'
//引入ant design组件库
import Antd from 'ant-design-vue'
import Notification from'ant-design-vue/lib/notification'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.$notification=Notification
// 引入验证 
import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
Validator.localize('zh_CN',zh_CN);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
