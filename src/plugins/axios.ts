// 添加请求拦截器
import axios from 'axios'
import { OpenAPI } from '@/generated'

// 携带凭证
OpenAPI.WITH_CREDENTIALS = true

// 打包后自动切换环境
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8101'
    : 'http://localhost:8101' // 生产环境地址 todo 上线后修改

OpenAPI.BASE = baseUrl

/**
 * 全局响应拦截器
 */
axios.interceptors.request.use(
  function(config) {
    // 获取token
    const token: any = localStorage.getItem('satoken')
    // 在请求头中携带名字为satoken的token
    if (token) {
      config.headers['satoken'] = token
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    //console.log("response", response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
