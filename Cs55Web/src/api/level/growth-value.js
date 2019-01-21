import axios from '@/libs/api.request'
const baseSetUrl = '/api/GrowthValueSet'

// 成长值规则
export const getRule = () => {
    return axios.request({
        url: `${baseSetUrl}/rule`,
        method: 'get'
    })
}

// 成长值规则保存
export const postRule = (data) => {
    return axios.request({
        url: `${baseSetUrl}/rule`,
        method: 'post',
        data: data
    })
}

// 成长值有效期
export const getLife = () => {
    return axios.request({
        url: `${baseSetUrl}/life`,
        method: 'get'
    })
}

// 成长值有效期
export const postLife = (data) => {
    return axios.request({
        url: `${baseSetUrl}/life`,
        method: 'post',
        data: data
    })
}

// 获取消费策略配置
export const getConsumeStrategy = () => {
    return axios.request({
        url: `${baseSetUrl}/consume-strategy`,
        method: 'get'
    })
}

// 获取消费策略配置
export const postConsumeStrategy = data => {
    return axios.request({
        url: `${baseSetUrl}/add-consume-strategy`,
        method: 'post',
        data: data
    })
}

// rfm模型策略配置
export const getRfm = rfmType => {
    return axios.request({
        url: `${baseSetUrl}/rfm`,
        method: 'get',
        params: {
            rfmType
        }
    })
}

// rfm模型策略配置保存
export const postRfm = data => {
    return axios.request({
        url: `${baseSetUrl}/rfm`,
        method: 'post',
        data: data
    })
}

// 根据行为活跃度类型获取计分项目
export const getActionStrategy = itemBelong => {
    return axios.request({
        url: `${baseSetUrl}/action-strategy`,
        method: 'get',
        params: {
            itemBelong
        }
    })
}

// 修改行为活跃度相关配置
export const postActionStrategy = data => {
    return axios.request({
        url: `${baseSetUrl}/action-strategy`,
        method: 'post',
        data: data
    })
}
