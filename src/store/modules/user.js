import {api} from "../../utils/api"
// const estudy=JSON.parse(localStorage.getItem("kstudy")) || {}
const state={
    loggedIn: false,
    info:{}
}
const mutations={
    login(state,data){
        state.loggedIn=true
        state.info=data
        //登陆后保存token
        api.defaults.headers.common["Token"]=state.info.token;
        // localStorage.setItem("kstudy",JSON.stringify({loggedIn:true,info:JSON.stringify(data)}))
    },
    updateToken(state,token){
        state.info.token=token

    },
    logout(state){
        state.info={}
        state.loggedIn=false
        api.defaults.headers.common["Token"]=''
    }
}
const getters={
   
}
const actions={
    login({commit},form){
        api.post("/auth/login",form).then( result =>{
            commit("login",result)
        })
    },
    checkedLogin({commit,state,dispatch}){
        //刷新时保存token 续期token
        api.defaults.headers.common["Token"]=state.info.token;
        //成功续期token后 成功执行then 失败执行catch
        api.post("/auth/refreshToken",{},{_slient:true}).then( (token)=> {
            commit("updateToken",token)
        }).catch(err=>{
            dispatch("logout")
        })
    },
    logout({commit}){
        commit("logout")
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    getters,
    actions
}