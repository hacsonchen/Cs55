// 等级权益设置

import axios from '@/libs/api.request'
const baseSetUrl = '/api/LevelBenefitSet'
const baseGetUrl = '/api/LevelBenefitGet'

// 等级权益设置列表
export const getLevelBenefit = (status) => {
    return axios.request({
        url: `${baseSetUrl}/list`,
        method: 'get',
        params: {
            status
        }
    })
}

// 等级权益设置列表
export const getLevelBenefitsSelOpt = params => {
    return axios.request({
        url: `${baseGetUrl}/select-opt`,
        method: 'get',
        params
    })
}

// 等级权益设置列表保存
export const postLevelBenefit = (data) => {
    return axios.request({
        url: `${baseSetUrl}/save`,
        method: 'post',
        data: data
    })
}

// 等级权益设置列表
export const getLevelBenefitById = (id) => {
    return axios.request({
        url: `${baseSetUrl}/edit-init/${id}`,
        method: 'get'
    })
}

// 根据等级id获取权益列表
export const getBenefitsByLevelId = (id) => {
    return axios.request({
        url: `${baseGetUrl}`,
        method: 'get',
        params: {
            id
        }
    })
}

// 检测是否有未来版本等级权益
export const checkFutureLevelShow = () => {
    return axios.request({
        url: `${baseSetUrl}/check-future-level-show`
    })
}
