import axios from 'axios'
import Vue from 'vue'
const api=axios.create({
    baseURL:'http://sandbox_api.estudy.chanke.xyz'
})

api.defaults.headers.post['Content-Type']='application/json'

//拦截器
api.interceptors.response.use(response =>{
    console.log(response)
    return response.data.data
},error =>{
    // console.dir(error)
    const config=error.config
    const response=error.response
    if(!config._slient){
        Vue.$notification.error({
            message:'API error',
            description:response.data.errorMessage
        })
    }
    return Promise.reject(error)
  
})
export {api}