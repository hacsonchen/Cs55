import axios from '@/libs/api.request'
const baseapiUrl = '/api/PersonalCenter/'
const baseresUrl = '/res/SysLogin/'
const sysUrl = '/api/SysMessage/'
export const login = ({
    userName,
    password
}) => {
    const data = {
        adminCode: userName,
        password: password
    }
    return axios.request({
        url: baseresUrl + 'AdminCodeLoginForId4',
        // url: `api/user/login`,
        data,
        method: 'post'
    })
}

export const getUserInfo = token => {
    return axios.request({
        url: baseapiUrl + 'GetAdmin',
        // url: 'api/user/get_info',
        method: 'get'
    })
}

export const logout = token => {
    return axios.request({
        url: baseapiUrl + 'LoginOut',
        method: 'post'
    })
}

export const wxLoginUrl = data => {
    return axios.request({
        url: baseresUrl + 'GetQRConnectUrl',
        method: 'post',
        data
    })
}

export const wxLogin = data => {
    return axios.request({
        url: baseresUrl + 'GetWeChatUser',
        method: 'post',
        data
    })
}

export const GetMessageInfo = data => {
    return axios.request({
        url: sysUrl + 'GetSysMessagePageData',
        method: 'get'
    })
}

export const GetPersonalCenterInfo = data => {
    return axios.request({
        url: baseapiUrl + 'GetPersonalCenterPageData',
        method: 'get'
    })
}

export const setSwitch = data => {
    return axios.request({
        url: baseapiUrl + 'SetNotice',
        method: 'post',
        data
    })
}

export const SendEmail = data => {
    return axios.request({
        url: baseapiUrl + 'SendValEmail',
        method: 'post',
        data
    })
}

export const ValPhone = data => {
    return axios.request({
        url: baseapiUrl + 'ValPhone',
        method: 'post',
        data
    })
}

export const EditEmail = data => {
    return axios.request({
        url: baseapiUrl + 'EditEmail',
        method: 'post',
        data
    })
}

export const UnBindingEmail = () => {
    return axios.request({
        url: baseapiUrl + 'UnBindingEmail',
        method: 'post'
    })
}

export const EditPhone = data => {
    return axios.request({
        url: baseapiUrl + 'EditPhone',
        method: 'post',
        data
    })
}

export const EditPassWord = data => {
    return axios.request({
        url: baseapiUrl + 'EditPassWord',
        method: 'post',
        data
    })
}

export const DeleteMessage = data => {
    return axios.request({
        url: sysUrl + 'DelMsg',
        method: 'post',
        data
    })
}

export const SetProcessed = data => {
    return axios.request({
        url: sysUrl + 'SetProcessed',
        method: 'post',
        data
    })
}

export const SetRead = data => {
    return axios.request({
        url: sysUrl + 'SetRead',
        method: 'post',
        data
    })
}

export const GetAllMsg = data => {
    return axios.request({
        url: sysUrl + 'GetSysMessageCanReadPageData',
        method: 'post'
    })
}

export const SetAllRead = data => {
    return axios.request({
        url: sysUrl + 'SetAllRead',
        method: 'post'
    })
}
