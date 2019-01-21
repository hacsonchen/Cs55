import axios from 'axios'
import store from '@/store'
import {
    getToken
} from './util'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
    const {
        statusText,
        status,
        request: {
            responseURL
        }
    } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) {
        store.dispatch('addErrorLog', info)
    }
}

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(
            config => {
                // 添加全局的loading...
                if (!Object.keys(this.queue).length) {
                    // Spin.show() // 不建议开启，因为界面不友好
                }
                this.queue[url] = true

                if (getToken()) {
                    // 让每个请求携带自定义token 请根据实际情况自行修改
                    config.headers['Authorization'] = 'Bearer ' + getToken()
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        // 响应拦截
        instance.interceptors.response.use(
            res => {
                this.destroy(url)
                // const { data, status } = res
                // return { data, status }
                return res.data
            },
            error => {
                this.destroy(url)
                addErrorLog(error.response)
                return Promise.reject(error)
            }
        )
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
