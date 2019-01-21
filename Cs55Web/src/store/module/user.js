import {
    login,
    logout,
    getUserInfo,
    wxLoginUrl,
    wxLogin
} from '@/api/user'
import {
    setToken,
    getToken
} from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false
    },
    mutations: {
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        }
    },
    actions: {
        // 登录
        handleLogin({
            commit
        }, {
            userName,
            password
        }) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                login({
                        userName,
                        password
                    })
                    .then(res => {
                        console.log(res)
                        const data = res.data
                        commit('setToken', data.access_token)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 退出登录
        handleLogOut({
            state,
            commit
        }) {
            return new Promise((resolve, reject) => {
                logout(state.token)
                    .then(() => {
                        commit('setToken', '')
                        commit('setAccess', [])
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                // commit('setToken', '')
                // commit('setAccess', [])
                // resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({
            state,
            commit
        }) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token)
                        .then(res => {
                            const data = res.data
                            commit('setAvator', data.avator)
                            commit('setUserName', data.name)
                            commit('setUserId', data.user_id)
                            commit('setAccess', data.access)
                            commit('setHasGetInfo', true)
                            resolve(data)
                        })
                        .catch(err => {
                            reject(err)
                        })
                } catch (error) {
                    reject(error)
                }
            })
        },

        // 微信登陆
        wxLoginUrl({
            commit
        }, {
            appId,
            callBackUrl
        }) {
            return new Promise((resolve, reject) => {
                wxLoginUrl({
                        appId,
                        callBackUrl
                    })
                    .then(res => {
                        const data = res.data
                        console.log(data.url)
                        window.location.href = res.data.url
                        commit('setToken', data.access_token)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        // 微信登陆
        wxLogin({
            commit
        }, {
            appId,
            code,
            state
        }) {
            return new Promise((resolve, reject) => {
                wxLogin({
                        appId,
                        code,
                        state
                    })
                    .then(res => {
                        const data = res.data
                        console.log(data.url)
                        // window.location.href = res.data.url
                        commit('setToken', data.access_token)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
