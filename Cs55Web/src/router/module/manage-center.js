import Main from '@/components/main'
import parentView from '@/components/parent-view'

export const manageCenterRouter = [{
    name: 'manageCenter',
    path: '/manageCenter',
    component: Main,
    meta: {
        title: '管理中心',
        icon: '_manage-center',
        access: ['4']
    },
    children: [{
            name: 'operator_account',
            path: 'operator_account',
            component: parentView,
            meta: {
                title: '运营者账号管理',
                icon: '',
                access: ['401']
            },
            children: [{
                    name: 'operator_account_search',
                    path: 'search',
                    component: () =>
                        import('@/view/manage-center/operator-account/index.vue'),
                    meta: {
                        title: '运营者账号管理',
                        icon: '',
                        access: ['401'],
                        logo: '运营账号设置.svg'
                    }
                },
                {
                    name: 'user_auth',
                    path: 'auth/:userId/:userName',
                    component: () =>
                        import('@/view/manage-center/operator-account/auth.vue'),
                    meta: {
                        title: '用户权限管理',
                        hideInMenu: true,
                        notCache: true,
                        access: ['401']
                    }
                }
            ]
        },
        {
            name: 'role',
            path: 'role',
            component: parentView,
            meta: {
                title: '角色管理',
                icon: '',
                access: ['402']
            },
            children: [{
                    name: 'role_search',
                    path: 'search',
                    component: () =>
                        import('@/view/manage-center/role/index.vue'),
                    meta: {
                        title: '角色管理',
                        icon: '',
                        access: ['402'],
                        logo: '角色管理.svg'
                    }
                },
                {
                    name: 'role_auth',
                    path: 'auth/:roleId/:roleName',
                    component: () =>
                        import('@/view/manage-center/role/auth.vue'),
                    meta: {
                        title: '角色权限管理',
                        hideInMenu: true,
                        notCache: true,
                        access: ['402']
                    }
                }
            ]
        },
        {
            name: 'data_set',
            path: 'data_set',
            component: parentView,
            meta: {
                title: '数据集管理',
                icon: '',
                access: ['403']
            },
            children: [{
                name: 'data_set_search',
                path: 'search',
                component: () =>
                    import('@/view/manage-center/data-set/index.vue'),
                meta: {
                    title: '数据集管理',
                    icon: '',
                    access: ['403'],
                    logo: '数据集管理.svg'
                }
            }]
        },
        // {
        //     name: 'message_center',
        //     path: 'message_center',
        //     component: parentView,
        //     meta: {
        //         title: '消息中心',
        //         icon: '',
        //         access: ['403']
        //     },
        //     children: [{
        //         name: 'business_notifications',
        //         path: 'businessNotifications',
        //         component: () =>
        //             import('@/view/manage-center/message-center/businessNotifications/index.vue'),
        //         meta: {
        //             title: '业务通知设置',
        //             icon: '',
        //             access: ['403'],
        //             logo: ''
        //         }
        //     }, {
        //         name: 'sms_settings',
        //         path: 'smsSettings',
        //         component: () =>
        //             import('@/view/manage-center/message-center/smsSettings/index.vue'),
        //         meta: {
        //             title: '短信设置',
        //             icon: '',
        //             access: ['403'],
        //             logo: ''
        //         }
        //     }, {
        //         name: 'sms_template',
        //         path: 'smsTemplate',
        //         component: () =>
        //             import('@/view/manage-center/message-center/smsTemplate/index.vue'),
        //         meta: {
        //             title: '短信消息模板',
        //             icon: '',
        //             access: ['403'],
        //             logo: ''
        //         }
        //     }, {
        //         name: 'message_push',
        //         path: 'messagePush',
        //         component: () =>
        //             import('@/view/manage-center/message-center/messagePush/index.vue'),
        //         meta: {
        //             title: '消息推送',
        //             icon: '',
        //             access: ['403'],
        //             logo: ''
        //         }
        //     }]
        // },
        {
            name: 'configuration_management',
            path: 'configuration_management',
            component: parentView,
            meta: {
                title: '配置管理',
                icon: '',
                access: ['403']
            },
            children: [{
                name: 'configuration_management_parameter',
                path: 'parameter',
                component: () =>
                    import('@/view/manage-center/configuration-management/index.vue'),
                meta: {
                    title: '系统参数配置',
                    icon: '',
                    access: ['40503'],
                    logo: '自定义字段管理.svg'
                }
            }]
        }
        // {
        //     name: 'uploader',
        //     path: 'uploader',
        //     component: parentView,
        //     meta: {
        //         title: '上传测试',
        //         icon: '',
        //         access: ['403']
        //     },
        //     children: [{
        //         name: 'uploader_test',
        //         path: 'test',
        //         component: () =>
        //             import('@/view/manage-center/test.vue'),
        //         meta: {
        //             title: '上传测试',
        //             icon: '',
        //             access: ['40503']
        //         }
        //     }]
        // }
    ]
}]
