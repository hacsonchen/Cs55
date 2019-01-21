import axios from '@/libs/api.request'
const baseSetUrl = '/api/UMSGainCoinRule'

// 积分基础信息
export const getCoinBaseRule = () => {
    return axios.request({
        url: `${baseSetUrl}/GetCoinBaseRule`,
        method: 'get'
    })
}

// 积分基础信息保存
export const postCoinBaseRule = data => {
    return axios.request({
        url: `${baseSetUrl}/SaveCoinBaseRule`,
        method: 'post',
        data: data
    })
}

// 获取积分规则信息
export const getCoinRule = (type) => {
    return axios.request({
        url: `${baseSetUrl}/GetCoinRule`,
        method: 'get',
        params: {
            type
        }
    })
}

// 保存积分消费信息
export const postCoinConsumeRule = (data) => {
    return axios.request({
        url: `${baseSetUrl}/SaveCoinConsumeRule`,
        method: 'post',
        data: data
    })
}

// 保存标准积分规则
export const postCoinStandardRule = (data) => {
    return axios.request({
        url: `${baseSetUrl}/SaveCoinStandardRule`,
        method: 'post',
        data: data
    })
}

// 保存奖励项积分规则
export const postCoinAwardRule = (data) => {
    return axios.request({
        url: `${baseSetUrl}/AddCoin`,
        method: 'post',
        data: data
    })
}
