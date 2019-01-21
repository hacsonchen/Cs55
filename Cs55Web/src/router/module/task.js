import Main from '@/components/main'
import parentView from '@/components/parent-view'

export const taskRouter = [{
    name: 'task',
    path: '/task',
    component: Main,
    meta: {
        title: '任务计划管理',
        icon: '_manage-center',
        access: ['4']
    },
    children: [{
        name: 'mission_plan',
        path: 'mission_plan',
        component: () =>
            import('@/view/task/mission-plan/index.vue'),
        meta: {
            title: '任务计划程序',
            icon: '',
            access: ['402'],
            logo: ''
        }
    }]
}]
