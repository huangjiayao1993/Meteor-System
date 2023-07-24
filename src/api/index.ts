import router from "@/routers"
import {GlobalStore} from "@/store"
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios"
import {message} from 'ant-design-vue';
import {cleanUserToken} from "@/utils/common";

// 默认请求地址
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// 设置超时时间
axios.defaults.timeout = 30000
// 跨域时允许携带凭证
axios.defaults.withCredentials = true

/**
 * @description: 请求拦截器
 * @return {*}
 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 全局store
    const {tokenInfo} = GlobalStore()
    const tokenValue = tokenInfo.tokenValue;
    if (tokenValue) {
      config.headers![`${tokenInfo.tokenName}`] = `Bearer ${tokenValue}`
    }
    return {...config, headers: {...config.headers}};
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

/**
 * @description: 响应拦截器
 * @return {*}
 */
axios.interceptors.response.use((response: AxiosResponse) => {
    const {data, status} = response;
    let msg: string = "请求失败"
    if (status === 200) {
      if (data) {
        msg = data.msg
        if (data.code === 0) {
          // 请求成功返回
          return data;
        }
        if (data.code === -100001) {
          cleanUserToken();
        }
      }
    }
    message.error(msg);
    return Promise.reject(data)
  },
  (error) => {
    return error;
  }
)

/**
 * @description: 常用请求方法
 * @return {*}
 */
const request = {
  GET: (url: string, params?: any) => {
    return axios.get(url, {params: params})
  },
  POST: (url: string, data?: any) => {
    return axios.post(url, data)
  },
  PUT: (url: string, data?: any) => {
    return axios.put(url, data)
  },
  DELETE: (url: string, data?: any) => {
    return axios.delete(url, {data: data})
  }
}

export default request
