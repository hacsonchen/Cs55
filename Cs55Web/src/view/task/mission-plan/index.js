export default {
    data() {
        return {
            tableLoading: false,
            libraryType: 'md-arrow-dropup',
            libraryShow: true,
            optionsType: 'md-arrow-dropup',
            optionsShow: true,
            taskTreeList: [{
                title: '任务计划程序库',
                expand: true,
                children: [{
                    title: 'Microsoft',
                    expand: true,
                    children: [{
                            title: 'office'
                        },
                        {
                            title: 'windows',
                            expand: true,
                            children: [{
                                    title: 'XP'
                                },
                                {
                                    title: 'w7'
                                },
                                {
                                    title: 'w10'
                                }
                            ]
                        }
                    ]
                }]
            }],
            triggerTableList: [{
                name: '登录时',
                information: '挡任何用户登录时触发',
                status: '已启用'
            }],
            taskTableList: [{
                name: 'Adobe Acr',
                status: '准备就绪',
                trigger: '已定义多个触发器',
                nextRunTime: '2019/01/31 12:23:24',
                lastRunTime: '2019/01/10 20:23:24',
                result: '任务尚未运行',
                creator: '庆森锅',
                creationTime: '2018/12/10 20:23:24',
                isSelect: false
            }],
            triggerColums: [{
                    title: '触发器',
                    key: 'name'
                },
                {
                    title: '详细信息',
                    key: 'information',
                    width: 500
                },
                {
                    title: '状态',
                    key: 'status'
                }
            ],
            taskColumns: [{
                    title: '名称',
                    key: 'name',
                    width: 200
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '触发器',
                    key: 'trigger',
                    width: 400
                },
                {
                    title: '下次运行时间',
                    key: 'nextRunTime',
                    width: 150
                },
                {
                    title: '上次运行时间',
                    key: 'lastRunTime',
                    width: 150
                },
                {
                    title: '运行结果',
                    key: 'result',
                    width: 200
                },
                {
                    title: '创建人',
                    key: 'creator',
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'creationTime',
                    width: 150
                }
            ]
        }
    },
    methods: {
        handleSelectionChange() {},
        treeChange() {},
        libraryClick() {
            this.libraryShow = !this.libraryShow
            if (this.libraryShow) {
                this.libraryType = 'md-arrow-dropup'
            } else {
                this.libraryType = 'md-arrow-dropdown'
            }
        },
        optionsClick() {
            this.optionsShow = !this.optionsShow
            if (this.optionsShow) {
                this.optionsType = 'md-arrow-dropup'
            } else {
                this.optionsType = 'md-arrow-dropdown'
            }
        }
    }
}
