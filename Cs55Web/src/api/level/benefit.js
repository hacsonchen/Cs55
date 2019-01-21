import axios from '@/libs/api.request'
const baseSetUrl = '/api/Benefit'

// 权益类型列表
export const getBenefitType = (params) => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'get',
        params
    })
}

// 权益类型下拉框数据源
export const getBenefitTypeSelOpt = (params) => {
    return axios.request({
        url: `${baseSetUrl}/select-opt`,
        method: 'get',
        params
    })
}

// 权益类型列表保存
export const postBenefitType = data => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'post',
        data: data
    })
}
