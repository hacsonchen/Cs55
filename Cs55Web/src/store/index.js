import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msgData: {} // 消息对象
    },
    mutations: {
        mutationsMsgData(state, data) {
            state.msgData = data
        }
    },
    actions: {
        actionsMsgData(context, data) {
            context.commit('mutationsMsgData', data)
        }
    },
    modules: {
        user,
        app
    }
})
