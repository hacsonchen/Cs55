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
                title: '账号管理',
                icon: '',
                access: ['401']
            },
            children: [{
                    name: 'operator_account_search',
                    path: 'search',
                    component: () =>
                        import('@/view/manage-center/operator-account/index.vue'),
                    meta: {
                        title: '账号管理',
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
        }
    ]
}]
