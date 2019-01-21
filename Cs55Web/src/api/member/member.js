import axios from '@/libs/api.request'
const baseapiUrl = '/api/Member/'
const tagjobapiUrl = '/api/TagJob/'
const tagapiUrl = '/api/Tag/'
const tagJobapiUrl = '/api/TagJob/'

export const pageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberPageList',
        method: 'post',
        data
    })
}

export const selectInit = data => {
    return axios.request({
        url: baseapiUrl + 'MemberSearchSelectInit',
        method: 'get'
    })
}

export const setBulkRole = data => {
    return axios.request({
        url: baseapiUrl + 'SetMemberBulkRole',
        method: 'post',
        data
    })
}

export const setStatus = data => {
    return axios.request({
        url: baseapiUrl + 'SetMemberStatus',
        method: 'post',
        data
    })
}

export const userSetbulkTag = data => {
    return axios.request({
        url: baseapiUrl + 'MemberUserSetbulkTag',
        method: 'post',
        data
    })
}

export const setbulkTag = data => {
    return axios.request({
        url: baseapiUrl + 'MemberSetbulkTag',
        method: 'post',
        data
    })
}

export const saveData = data => {
    return axios.request({
        url: baseapiUrl + 'MemberSaveData',
        method: 'post',
        data
    })
}

export const addTagJob = data => {
    return axios.request({
        url: tagjobapiUrl + 'AddTagJob',
        method: 'post',
        data
    })
}

export const detailById = data => {
    return axios.request({
        url: baseapiUrl + 'MemberDetailById',
        method: 'post',
        data
    })
}

export const consumeRecordList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberConsumeRecordPageList',
        method: 'post',
        data
    })
}

export const memberTagsDelById = data => {
    return axios.request({
        url: baseapiUrl + 'MemberTagsDelById',
        method: 'post',
        data
    })
}

export const suggestionSalePageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberSuggestionAndAfterSalePageList',
        method: 'post',
        data
    })
}

export const rightPageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberRightPageList',
        method: 'post',
        data
    })
}

export const actPageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberActPageList',
        method: 'post',
        data
    })
}

export const contentPageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberContentPageList',
        method: 'post',
        data
    })
}

export const growPageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberGrowList',
        method: 'post',
        data
    })
}

export const pointPageList = data => {
    return axios.request({
        url: baseapiUrl + 'MemberPointPageList',
        method: 'post',
        data
    })
}

export const subtractBindingWeChat = data => {
    return axios.request({
        url: baseapiUrl + 'SubtractBindingWeChat',
        method: 'post',
        data
    })
}

export const subtractBindingPhone = data => {
    return axios.request({
        url: baseapiUrl + 'SubtractBindingPhone',
        method: 'post',
        data
    })
}

export const subtractBindingEmail = data => {
    return axios.request({
        url: baseapiUrl + 'SubtractBindingEmail',
        method: 'post',
        data
    })
}

export const tagsSelect = data => {
    return axios.request({
        url: tagapiUrl + 'InitTagsSelect',
        method: 'get'
    })
}

export const addLOneTag = data => {
    return axios.request({
        url: tagapiUrl + 'AddLOneTag',
        method: 'post',
        data
    })
}

export const addLTwoTag = data => {
    return axios.request({
        url: tagapiUrl + 'AddLTwoTag',
        method: 'post',
        data
    })
}

export const delTag = data => {
    return axios.request({
        url: tagapiUrl + 'DelTag',
        method: 'post',
        data
    })
}

export const getTagTree = data => {
    return axios.request({
        url: tagapiUrl + 'GetTagTree',
        method: 'get'
    })
}

export const tagById = data => {
    return axios.request({
        url: tagapiUrl + 'SingleTagById',
        method: 'post',
        data
    })
}

export const editLOneTag = data => {
    return axios.request({
        url: tagapiUrl + 'EditLOneTag',
        method: 'post',
        data
    })
}

export const editLTwoTag = data => {
    return axios.request({
        url: tagapiUrl + 'EditLTwoTag',
        method: 'post',
        data
    })
}

export const tagTaskPageList = data => {
    return axios.request({
        url: tagJobapiUrl + 'TagTaskPageList',
        method: 'post',
        data
    })
}

export const selectTagsData = data => {
    return axios.request({
        url: tagJobapiUrl + 'SelectTagsData',
        method: 'get'
    })
}

export const setTagJob = data => {
    return axios.request({
        url: tagJobapiUrl + 'SetTagJob',
        method: 'post',
        data
    })
}

export const delTagJob = data => {
    return axios.request({
        url: tagJobapiUrl + 'DelTagJob',
        method: 'post',
        data
    })
}

export const getTagsQueryByID = data => {
    return axios.request({
        url: tagJobapiUrl + 'GetTagsQueryByID',
        method: 'post',
        data
    })
}

export const editTagJobQuery = data => {
    return axios.request({
        url: tagJobapiUrl + 'EditTagJobQuery',
        method: 'post',
        data
    })
}

export const UploadExcelVal = data => {
    return axios.request({
        url: baseapiUrl + 'UploadExcelVal',
        method: 'post',
        data
    })
}

export const UploadExcelConfirm = data => {
    return axios.request({
        url: baseapiUrl + 'UploadExcelConfirm',
        method: 'post',
        data
    })
}
