import axios from '@/libs/api.request'
const baseSetUrl = '/api/BenefitOrder'

// 用户列表
export const getUserList = (data) => {
    return axios.request({
        url: `${baseSetUrl}/user-list`,
        method: 'post',
        data
    })
}

// 权益订单列表
export const getOrderList = data => {
    return axios.request({
        url: `${baseSetUrl}/order-list`,
        method: 'post',
        data
    })
}

// 权益订单详情
export const getOrderDetail = params => {
    return axios.request({
        url: `${baseSetUrl}/order-detail`,
        method: 'get',
        params
    })
}

// 新增权益订单
export const postBenefitOrder = data => {
    return axios.request({
        url: `${baseSetUrl}/add-benefit-order`,
        method: 'post',
        data
    })
}

// 批量审核订单
export const postCheckBenefitOrders = data => {
    console.log(data)
    return axios.request({
        url: `${baseSetUrl}/check-benefit-orders`,
        method: 'post',
        data
    })
}

// 审核订单
export const postCheckBenefitOrder = data => {
    return axios.request({
        url: `${baseSetUrl}/check-benefit-order`,
        method: 'post',
        data
    })
}
