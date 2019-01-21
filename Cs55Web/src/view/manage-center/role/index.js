import {
    getRoleList,
    delRole,
    getRole,
    addRole,
    updateRole,
    setDefaultRole,
    upateRoleStatus
} from '@/api/manage-center/manage-center'
let chinese = /^[\u4e00-\u9fa5]+$/
export default {
    name: 'RoleList',
    data() {
        let validateChineseCheck = (rule, value, callback) => {
            if (value !== '' && chinese.test(value)) {
                callback(new Error('角色编号不能为汉字'))
            } else {
                callback()
            }
        }
        return {
            title: '',
            modal1: false,
            multipleSelection: [],
            pageTotal: 0,
            tableLoading: false,
            ruleForm: {},
            rules: {
                roleCode: [{
                        required: true,
                        message: '请输入角色编号',
                        trigger: 'blur'
                    },
                    { validator: validateChineseCheck, trigger: 'blur' }
                ], // }], //     trigger: 'blur' //     message: '请输入角色编号', //     required: true, // roleCode: [{
                roleName: [{
                    required: true,
                    message: '请输入角色名称',
                    trigger: 'blur'
                }]
            },
            search: {
                code: '',
                name: '',
                createrName: '',
                modifiName: '',
                pageIndex: 1,
                pageSize: 10
            },
            columns: [
                // { type: 'selection', width: 60, align: 'center' },
                { title: '角色编号', key: 'roleCode' },
                { title: '角色名称', key: 'roleName' },
                {
                    title: '默认角色',
                    key: 'isDefault',
                    width: 90,
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.isDefault({
                                row: params.row
                            })
                        )
                    }
                },
                { title: '修改人', key: 'lastModifierName' },
                { title: '修改时间', key: 'lastModificationTime' }, //     key: 'roleStatus', //     title: '状态', // {
                //     render: (h, params) => {
                //         return h(
                //             'div',
                //             this.$refs.myTable.$scopedSlots.roleStatus({
                //                 row: params.row
                //             })
                //         )
                //     }
                // },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.action({
                                row: params.row,
                                id: params.row.id,
                                roleName: params.row.roleName
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
            this.search.code = ''
            this.search.name = ''
            this.search.modifiName = ''
        },
        changeDefaultRole(id, isDefault) {
            this.tableLoading = true
            let data = { roleId: id, isDefault: isDefault }
            setDefaultRole(data)
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
        changeStatus(id, status) {
            this.tableLoading = true
            let st = 0
            console.log(status)
            if (status === true) {
                st = 1
            } else if (status === false) {
                st = 0
            }
            let data = { roleId: id, status: st }
            upateRoleStatus(data)
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
        getroleInfo(id) {
            this.$refs['ruleForm'].resetFields()
            this.title = '编辑角色信息'
            getRole(id)
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
        auth(roleId, roleName) {
            this.$router.push({
                path: `/manageCenter/role/auth/${roleId}/${roleName}`
            })
        },
        addRole() {
            this.title = '新增角色信息'
            this.initRuleForm()
            this.modal1 = true
        },
        delRoleInfo(id) {
            delRole(id)
                .then(res => {
                    if (res.code === 1) {
                        this.$Message.success('删除成功')
                        this.init()
                    } else {
                        this.$Message.warning(res.message)
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.$Message.warning(err.response.data.message)
                    console.log(res.message)
                })
        },
        initRuleForm() {
            this.ruleForm = {
                roleCode: '',
                roleName: '',
                roleStatus: 1,
                memo: '',
                creatorName: this.$store.state.user.userName,
                lastModifierName: '',
                creationTime: '',
                lastModificationTime: '',
                isDelete: false,
                isDefault: false,
                id: ''
            }
        },
        init() {
            this.tableLoading = true
            getRoleList(this.search)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        data.rows.forEach(item => {
                            if (item.roleStatus === 1) {
                                item.roleStatus = true
                            } else {
                                item.roleStatus = false
                            }
                            if (
                                item.lastModificationTime ===
                                '0001-01-01T00:00:00'
                            ) {
                                item.lastModificationTime = ''
                            } else {
                                item.lastModificationTime = this.$moment(
                                    item.lastModificationTime
                                ).format('YYYY/MM/DD HH:mm:ss')
                            }
                        })
                        this.dataList = data.rows
                        this.pageTotal = data.totalCount
                        this.tableLoading = false
                    } else {
                        this.tableLoading = false
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    console.log(err)
                })
        },
        onCancel() {
            this.modal1 = false
        },
        onSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.ruleForm.id) {
                        updateRole(this.ruleForm)
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
                        addRole(this.ruleForm)
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
        handleClick(row) {
            this.$router.push({
                path: 'role-auth'
            })
        },
        handleEdit(row) {
            this.roleCtrl.editDLShow = true
            console.log(row)
        },
        handelDel(row) {
            this.$confirm('确定删除该数据？', {
                    type: 'warning'
                })
                .then(_ => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                })
                .catch(_ => {
                    this.$message({
                        message: '操作已取消',
                        type: 'warning'
                    })
                })
        }
    },
    computed: {},
    created() {
        this.init()
    }
}
