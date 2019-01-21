// 会员等级设置
import axios from '@/libs/api.request'
const baseSetUrl = '/api/rulesshow'

// 获取等级规则展示
export const getRules = type => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'get',
        params: {
            type
        }
    })
}

// 等级规则展示保存
export const postRules = data => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'post',
        data: data
    })
}
