import axios from 'axios'
export const request = axios.create({
  baseURL:'http://realworld.api.fed.lagounews.com',
  // baseURL: 'https://conduit.productionready.io/'
})
// 插件导出函数必须作为default
// 通过插件机制获取上下文对象（query,params,req.res,app,store）
export default ({store}) =>{
  // 请求拦截器
// 任何请求都要经过请求拦截器，
// 我们可以在请求拦截器中做一些公共的业务处理
request.interceptors.request.use(function(config){
  const {user} = store.state
  if(user&&user.token){
    config.headers.Authorization = `Token ${user.token}`
  }
  return config
},function(error){
  // 请求失败，请求没发出去就会进入这里
  return Promise.reject(error)
})
}

// 相应拦截器
