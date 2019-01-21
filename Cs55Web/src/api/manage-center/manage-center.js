import axios from '@/libs/api.request'
const dataSetUrl = '/api/DataCollection/'
const configUrl = '/api/Background/'
const userUrl = '/api/UserManager/'
const roleUrl = '/api/RoleManager/'
    /** **********************数据集***************************/
export const dataSetPageList = data => {
    return axios.request({
        url: dataSetUrl + 'DataCollectionNames',
        method: 'post',
        data
    })
}

export const dataSetDetailPageList = data => {
    return axios.request({
        url: dataSetUrl + 'UserMemberCollections',
        method: 'post',
        data
    })
}

export const deleteDataSet = data => {
    return axios.request({
        url: dataSetUrl + 'RemoveDataCollectionName',
        method: 'post',
        data
    })
}

export const deleteDataSetDetail = data => {
    return axios.request({
        url: dataSetUrl + 'RemoveUserMemberItem',
        method: 'post',
        data
    })
}

/** ***************************系统参数配置*****************************/
export const addConfig = data => {
    return axios.request({
        url: configUrl + 'AddDiConfiguration',
        method: 'post',
        data
    })
}

export const editConfig = data => {
    return axios.request({
        url: configUrl + 'UpdateDiConfiguration',
        method: 'post',
        data
    })
}

export const DeleteDiItemConfig = data => {
    return axios.request({
        url: configUrl + 'DeleteDiItem',
        method: 'post',
        data
    })
}

export const getConfigTags = data => {
    return axios.request({
        url: configUrl + 'GetConfigurationTags',
        method: 'post',
        data
    })
}

export const getConfig = data => {
    return axios.request({
        url: configUrl + 'GetConfigurations?name=' + data,
        method: 'post'
    })
}

/** ***************************用户管理***********************************/
export const addUser = data => {
    return axios.request({
        url: userUrl + 'AddUserWithRoles',
        method: 'post',
        data
    })
}

export const editUser = data => {
    return axios.request({
        url: userUrl + 'UpdateUserWithRoles',
        method: 'post',
        data
    })
}

export const getSystemRoles = data => {
        return axios.request({
            url: userUrl + 'GetSystemRoles?name=' + data,
            method: 'get'
        })
    } //

export const getRolesPermissions = data => {
    return axios.request({
        url: userUrl + 'GetRolesPermissions',
        method: 'post',
        data
    })
}

export const getUserPermissions = data => {
    return axios.request({
        url: userUrl + 'GetUserPermissions?userId=' + data,
        method: 'post'
    })
}

export const getUserList = data => {
    return axios.request({ url: userUrl + 'GetUserList', method: 'post', data })
}

export const delUser = data => {
        return axios.request({
            url: userUrl + 'DelOneUser?userId=' + data,
            method: 'post'
        })
    } //

export const getUserById = data => {
    return axios.request({
        url: userUrl + 'GetOneUser?userId=' + data,
        method: 'post'
    })
}

export const setUserPermissions = data => {
    return axios.request({
        url: userUrl + 'SetUserPermissions',
        method: 'post',
        data
    })
}

export const upateUserStatus = data => {
    return axios.request({
        url: userUrl + 'UpateUserStatus',
        method: 'post',
        data
    })
}

/** ******************************角色管理***************************************/
export const addRole = data => {
    return axios.request({
        url: roleUrl + 'AddNewRole',
        method: 'post',
        data
    })
}

export const updateRole = data => {
    return axios.request({
        url: roleUrl + 'UpdateRole',
        method: 'post',
        data
    })
}

export const getRoleList = data => {
    return axios.request({
        url: roleUrl + 'GetRoleList',
        method: 'post',
        data
    })
}

export const delRole = data => {
    return axios.request({
        url: roleUrl + 'DelOneRole?roleId=' + data,
        method: 'post'
    })
}

export const setDefaultRole = data => {
    return axios.request({
        url: roleUrl + 'SetDefaultRole',
        method: 'post',
        data
    })
}

export const upateRoleStatus = data => {
    return axios.request({
        url: roleUrl + 'UpateRoleStatus',
        method: 'post',
        data
    })
}

export const getRole = data => {
    return axios.request({
        url: roleUrl + 'GetOneRole?roleId=' + data,
        method: 'post'
    })
}

export const setRolePermissions = data => {
    return axios.request({
        url: roleUrl + 'SetRolePermissions',
        method: 'post',
        data
    })
}
