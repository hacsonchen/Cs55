import {
    getUserList,
    addUser,
    editUser,
    delUser,
    getUserById,
    getSystemRoles,
    upateUserStatus
} from '@/api/manage-center/manage-center'
let passwordCh = /^(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{8,16}$/
let phoneCheck = /^1(3|4|5|6|7|8|9)\d{9}$/
let emailCheck = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
let chinese = /^[\u4e00-\u9fa5]+$/
export default {
    data() {
        let validatePassCheck = (rule, value, callback) => {
            if (value !== '' && !passwordCh.test(value)) {
                callback(
                    new Error(
                        '密码长度8~16位，支持英文字母大小写，下划线，数字至少需要其中两种组成'
                    )
                )
            } else {
                callback()
            }
        }
        let validateChineseCheck = (rule, value, callback) => {
            if (value !== '' && chinese.test(value)) {
                callback(new Error('用户编号不能为汉字'))
            } else {
                callback()
            }
        }

        let validatePhoneCheck = (rule, value, callback) => {
            if (value !== '' && !phoneCheck.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }

        let validateEmailCheck = (rule, value, callback) => {
            if (value !== '' && !emailCheck.test(value)) {
                callback(new Error('请输入正确的邮箱'))
            } else {
                callback()
            }
        }

        return {
            modal1: false,
            multipleSelection: [],
            pageTotal: 0,
            tableLoading: false,
            detailTitle: '',
            ruleForm: {},
            disable: false,
            rules: {
                adminCode: [{
                        required: true,
                        message: '请输入用户编号',
                        trigger: 'blur'
                    },
                    { validator: validateChineseCheck, trigger: 'blur' }
                ],
                adminName: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                }],
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    },
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    },
                    { validator: validatePhoneCheck, trigger: 'blur' }
                ],
                email: [{ validator: validateEmailCheck, trigger: 'blur' }]
            },
            roleList: [],
            search: {
                // 查询 // }], //     trigger: 'blur' //     message: '请输入用户编号', //     required: true, // adminCode: [{ // }], //     trigger: 'blur' //     message: '请输入手机号码', // }], //     trigger: 'blur' //     message: '请输入登录密码', //     required: true, // password: [{ //     required: true, // phone: [{
                // email: [
                //     { required: true, message: '请输入邮箱', trigger: 'blur' }
                // ]
                userCode: '',
                userName: '',
                phone: '',
                pageIndex: 1,
                pageSize: 10
            },
            columns: [
                // { type: 'selection', width: 60, align: 'center' },
                {
                    title: '用户编号',
                    key: 'adminCode',
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.adminCode({
                                row: params.row
                            })
                        )
                    }
                },
                { title: '用户名称', key: 'adminName' },
                { title: '手机号码', key: 'phone' },
                { title: '创建人', key: 'creatorName' },
                { title: '创建时间', key: 'creationTime' },
                {
                    title: '状态',
                    key: 'adminStatus',
                    width: 70,
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.adminStatus({
                                row: params.row
                            })
                        )
                    }
                },
                { title: '最近登录', key: 'lastLoginTime' },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.action({
                                row: params.row,
                                id: params.row.id
                            })
                        )
                    }
                }
            ],
            dataList: []
        }
    },
    methods: {
        clear() {
            this.search.userCode = ''
            this.search.userName = ''
            this.search.phone = ''
        },
        changeStatus(id, status) {
            this.tableLoading = true
            let st = 0
            if (status === true) {
                st = 1
            } else if (status === false) {
                st = 0
            }
            let data = { userId: id, status: st }
            upateUserStatus(data)
                .then(res => {
                    if (res.code === 1) {
                        this.init()
                    } else {
                        console.log(res.message)
                        this.tableLoading = false
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
        },

        auth(userId, userName) {
            this.$router.push({
                path: `/manageCenter/operator_account/auth/${userId}/${userName}`
            })
        },
        delUserInfo(id) {
            delUser(id)
                .then(res => {
                    if (res.code === 1) {
                        this.$Message.success('删除成功')
                        this.init()
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
        },
        getUserInfo(id, disable) {
            let validatePassCheck = (rule, value, callback) => {
                if (value !== '') {
                    if (!passwordCh.test(value)) {
                        callback(
                            new Error(
                                '密码长度8~16位，支持英文字母大小写，下划线，数字至少需要其中两种组成'
                            )
                        )
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            this.rules.password = [
                { validator: validatePassCheck, trigger: 'blur' }
            ]
            this.disable = disable
            this.$refs['ruleForm'].resetFields()
            if (disable) {
                this.detailTitle = '查看账号信息'
            } else {
                this.detailTitle = '编辑账号信息'
            }
            getUserById(id)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        this.ruleForm = data
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
            this.modal1 = true
        },
        initRuleForm() {
            this.ruleForm = {
                id: '',
                roleIds: [],
                adminCode: '',
                adminName: '',
                password: '',
                picture: '',
                phone: '',
                smsSwitch: '',
                sex: 0,
                num: '',
                birthday: '',
                email: '',
                emailSwitch: true,
                nativePlace: '',
                address: '',
                isMarriage: true,
                education: 0,
                weChat: '',
                weChatSwitch: true,
                department: '',
                adminStatus: 1,
                creationTime: new Date(),
                // creatorId: '',
                creatorName: this.$store.state.user.userName
            }
            let ids = []

            this.roleList.forEach(item => {
                if (item.isDefault) {
                    ids.push(item.value)
                }
            })
            this.ruleForm.roleIds = ids
        },
        initRoleList(name) {
            getSystemRoles(name)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        let newData = []
                        data.forEach(item => {
                            let newItem = {
                                value: item.id,
                                label: item.roleName,
                                isDefault: item.isDefault
                            }
                            newData.push(newItem)
                        })
                        this.roleList = newData
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
        },
        init() {
            this.tableLoading = true
            getUserList(this.search)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        data.rows.forEach(item => {
                            if (item.adminStatus === 1) {
                                item.adminStatus = true
                            } else {
                                item.adminStatus = false
                            }
                            item.creationTime = this.$moment(
                                item.creationTime
                            ).format('YYYY/MM/DD HH:mm:ss')
                            if (item.lastLoginTime === '0001-01-01T00:00:00') {
                                item.lastLoginTime = ''
                            } else {
                                item.lastLoginTime = this.$moment(
                                    item.lastLoginTime
                                ).format('YYYY/MM/DD HH:mm:ss')
                            }
                        })
                        this.dataList = data.rows
                        this.pageTotal = data.totalCount
                        this.tableLoading = false
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
        },
        handleSelectionChange(data) {
            var list = []
            for (let v of data) {
                list.push(v.id)
            }
            this.multipleSelection = list
        },
        handlePage(value) {
            this.search.pageIndex = value
            this.init()
        },
        handlePageSize(value) {
            this.search.pageSize = value
            this.init()
        },
        onSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.ruleForm.id) {
                        editUser(this.ruleForm)
                            .then(res => {
                                if (res.code === 1) {
                                    // this.initRuleForm()
                                    this.modal1 = false
                                    this.$Message.success('保存成功')
                                    this.init()
                                } else {
                                    console.log(res.message)
                                }
                            })
                            .catch(err => {
                                this.$Message.warning(err.response.data.message)
                            })
                    } else {
                        addUser(this.ruleForm)
                            .then(res => {
                                if (res.code === 1) {
                                    this.modal1 = false
                                    this.$Message.success('保存成功')
                                    this.initRuleForm()
                                    this.init()
                                } else {
                                    console.log(res.message)
                                }
                            })
                            .catch(err => {
                                this.$Message.warning(err.response.data.message)
                            })
                    }
                } else {
                    this.$Message.error('请按要求填写信息')
                }
            })
        },
        onCancel() {
            this.modal1 = false
        },
        addUser() {
            console.log(this.$refs['ruleForm'])
            this.$refs['ruleForm'].resetFields()
            this.detailTitle = '新增账号信息'
            let validatePassCheck = (rule, value, callback) => {
                if (value !== '' && !passwordCh.test(value)) {
                    callback(
                        new Error(
                            '密码长度8~16位，支持英文字母大小写，下划线，数字至少需要其中两种组成'
                        )
                    )
                } else {
                    callback()
                }
            }
            this.rules.password = [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { validator: validatePassCheck, trigger: 'blur' }
            ]
            this.disable = false
            this.initRuleForm()
            this.modal1 = true
        }
    },
    created() {
        this.init()
        this.initRoleList('')
    }
}
