import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  //第三方插件存localStorage 保存loggedIn和info
  plugins:[
    createPersistedState({
        key:"kstudy",
        paths:["user"],
        //钩子函数 订阅模式 订阅localStorage和mutations的关系 每次刷新都执行一次
        subscriber(store){
          //触发actions里的checkedLogin
          store.dispatch("user/checkedLogin")
            return function(handler){
                return store.subscribe(handler)
            }
        }

    })
  ]  
})
