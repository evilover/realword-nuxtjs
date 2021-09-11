import axios from 'axios'
const request = axios.create({
  baseURL:'http://realworld.api.fed.lagounews.com/',
})
// 请求拦截器
// 任何请求都要经过请求拦截器，
// 我们可以在请求拦截器中做一些公共的业务处理
// request.interceptors.request.use(function(config){
//   config.headers.Authorization = `Token `
//   return config
// },function(error){
//   // 请求失败，请求没发出去就会进入这里
//   return Promise.reject(error)
// })
// 相应拦截器
export default request