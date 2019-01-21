// 会员等级设置
import axios from '@/libs/api.request'
const baseSetUrl = '/api/LevelSet'

// 会员等级列表
export const getLevels = status => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'get',
        params: {
            status
        }
    })
}

// 会员等级列表
export const getLevelsSelOpt = status => {
    return axios.request({
        url: `${baseSetUrl}/select-opt`,
        method: 'get',
        params: {
            status
        }
    })
}

// 会员等级保存
export const postLevels = data => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'post',
        data: data
    })
}

// 删除等级
export const delLevels = () => {
    return axios.request({
        url: `${baseSetUrl}`,
        method: 'delete'
    })
}
