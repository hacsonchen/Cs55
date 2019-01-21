import axios from '@/libs/api.request'
const baseSetUrl = '/api/ContentManagement'

// 获取pgc文章
export const getPgcList = data => {
    return axios.request({
        url: `${baseSetUrl}/GetPgcArticle`,
        method: 'post',
        data
    })
}

/**
 * 更新pgc状态
 * @param {参数} data
 */
export const pgcChangeStatus = data => {
    return axios.request({
        url: `${baseSetUrl}/UpatePgcStatus`,
        method: 'post',
        data
    })
}

/**
 * 获取一个pgc内容
 * @param {参数} params
 */
export const getPgcById = params => {
    return axios.request({
        url: `${baseSetUrl}/GetOnePgcArticle`,
        method: 'get',
        params
    })
}

/**
 * 获取板块选择下拉框
 * @param {板块所属类别} params
 */
export const getBlockOpt = params => {
    return axios.request({
        url: `${baseSetUrl}/GetBlockSelectOpt`,
        method: 'get',
        params
    })
}

/**
 * 获取标签选择下拉框
 */
export const getTags = () => {
    return axios.request({
        url: `${baseSetUrl}/GetTagsSelectOpt`,
        method: 'get'
    })
}

/**
 * 保存pgc
 * @param {参数} data
 */
export const addPgc = data => {
    return axios.request({
        url: `${baseSetUrl}/AddPgcArticle`,
        method: 'post',
        data
    })
}

/**
 * 查询pgc评论列表
 * @param {传入参数} data
 */
export const getCommentList = (data) => {
    return axios.request({
        url: `${baseSetUrl}/GetComments`,
        method: 'post',
        data
    })
}

/**
 * 查询ugc列表数据
 * @param {传入参数} data
 */
export const getUgcList = (data) => {
    return axios.request({
        url: `${baseSetUrl}/GetUgcArticle`,
        method: 'post',
        data
    })
}
