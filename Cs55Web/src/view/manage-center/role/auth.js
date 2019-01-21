import {
    getRolesPermissions,
    setRolePermissions
} from '@/api/manage-center/manage-center'
import ZkTable from 'vue-table-with-tree-grid'
import CheckboxCustom from '@/components/Checkbox/Checkbox.vue'
import _ from 'lodash'
export default {
    components: {
        ZkTable,
        CheckboxCustom
    },
    data() {
        return {
            roleId: '',
            roleName: '',
            dataTree: [],
            result: [],
            spinShow: false,
            props: {
                stripe: false,
                border: true,
                showHeader: true,
                showSummary: false,
                showRowHover: true,
                showIndex: false,
                treeType: true,
                isFold: false,
                expandType: false,
                selectionType: false
            },
            columns: [{
                    label: '菜单名称',
                    prop: 'menuName',
                    width: '400px'
                },
                {
                    label: '页面权限',
                    prop: 'hasPermission',
                    type: 'template',
                    minWidth: '100px',
                    template: 'hasPermission'
                },
                {
                    label: '按钮权限',
                    prop: 'buttons',
                    minWidth: '600px',
                    type: 'template',
                    template: 'buttons'
                },
                {
                    label: '选择',
                    prop: 'isCheck',
                    width: '50px',
                    type: 'template',
                    template: 'isCheck'
                }
            ]
        }
    },
    methods: {
        // 全选/全不选按钮
        selectAll(isCheck) {
            _.forEach(this.dataTree, item => {
                // 树第一级
                item.isCheck = isCheck // 修改选择列字段
                item.hasPermission = isCheck // 修改页面权限
                if (item.buttons) {
                    // 修改按钮权限
                    _.forEach(item.buttons, itemButton => {
                        itemButton.hasRight = isCheck
                    })
                }
                if (item.children) {
                    // 树第二级
                    _.forEach(item.children, children1 => {
                        children1.isCheck = isCheck
                        children1.hasPermission = isCheck
                        if (children1.buttons) {
                            _.forEach(children1.buttons, itemButton => {
                                itemButton.hasRight = isCheck
                            })
                        }

                        if (children1.children) {
                            // 树第三级
                            _.forEach(children1.children, children2 => {
                                children2.isCheck = isCheck
                                children2.hasPermission = isCheck
                                if (children2.buttons) {
                                    _.forEach(children2.buttons, itemButton => {
                                        itemButton.hasRight = isCheck
                                    })
                                }

                                if (children2.children) {
                                    // 树第四级
                                    _.forEach(children2.children, children3 => {
                                        children3.isCheck = isCheck
                                        children3.hasPermission = isCheck
                                        if (children3.buttons) {
                                            _.forEach(
                                                children3.buttons,
                                                itemButton => {
                                                    itemButton.hasRight = isCheck
                                                }
                                            )
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        // 列表选择列的全选/全不选
        checkSelectAll(id, isCheck) {
            _.forEach(this.dataTree, item => {
                if (item.id === id) {
                    // 树第一级
                    item.isCheck = !isCheck // 修改选择列
                    this.checkChange2(id, isCheck) // 修改对应行的页面权限列和按钮权限列
                } else {
                    if (item.children) {
                        // 树第二级
                        _.forEach(item.children, children1 => {
                            if (children1.id === id) {
                                children1.isCheck = !isCheck
                                this.checkChange2(id, isCheck)
                            } else {
                                if (children1.children) {
                                    // 树第三级
                                    _.forEach(children1.children, children2 => {
                                        if (children2.id === id) {
                                            children2.isCheck = !isCheck
                                            this.checkChange2(id, isCheck)
                                        } else {
                                            if (children2.children) {
                                                // 树第四级
                                                _.forEach(
                                                    children2.children,
                                                    children3 => {
                                                        if (
                                                            children3.id === id
                                                        ) {
                                                            children3.isCheck = !isCheck
                                                            this.checkChange2(
                                                                id,
                                                                isCheck
                                                            )
                                                        } else {}
                                                    }
                                                )
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
        // 修改页面权限列
        checkChange(id, hasPermission) {
            // _.forEach(this.result, item => {
            //     if (item.id === id) {
            //         console.log(hasPermission)
            //         item.hasPermission = hasPermission
            //     }
            // })
            _.forEach(this.dataTree, item => {
                if (item.id === id) {
                    item.hasPermission = !hasPermission
                    if (!hasPermission) {
                        if (item.buttons) {
                            let btnPer = true
                            item.buttons.forEach(function(btn) {
                                if (!btn.hasRight) {
                                    btnPer = false
                                }
                            })
                            if (btnPer) {
                                item.isCheck = true
                            }
                        }
                    } else {
                        item.isCheck = !hasPermission
                    }
                } else {
                    if (item.children) {
                        _.forEach(item.children, children1 => {
                            if (children1.id === id) {
                                children1.hasPermission = !hasPermission
                                if (!hasPermission) {
                                    if (children1.buttons) {
                                        let btnPer = true
                                        children1.buttons.forEach(function(
                                            btn
                                        ) {
                                            if (!btn.hasRight) {
                                                btnPer = false
                                            }
                                        })
                                        if (btnPer) {
                                            children1.isCheck = true
                                        }
                                    }
                                } else {
                                    children1.isCheck = !hasPermission
                                }
                            } else {
                                if (children1.children) {
                                    _.forEach(children1.children, children2 => {
                                        if (children2.id === id) {
                                            children2.hasPermission = !hasPermission
                                            if (!hasPermission) {
                                                if (children2.buttons) {
                                                    let btnPer = true
                                                    children2.buttons.forEach(
                                                        function(btn) {
                                                            if (!btn.hasRight) {
                                                                btnPer = false
                                                            }
                                                        }
                                                    )
                                                    if (btnPer) {
                                                        children2.isCheck = true
                                                    }
                                                }
                                            } else {
                                                children2.isCheck = !hasPermission
                                            }
                                        } else {
                                            if (children2.children) {
                                                _.forEach(
                                                    children2.children,
                                                    children3 => {
                                                        if (
                                                            children3.id === id
                                                        ) {
                                                            children3.hasPermission = !hasPermission
                                                            if (!hasPermission) {
                                                                if (
                                                                    children3.buttons
                                                                ) {
                                                                    let btnPer = true
                                                                    children3.buttons.forEach(
                                                                        function(
                                                                            btn
                                                                        ) {
                                                                            if (!btn.hasRight) {
                                                                                btnPer = false
                                                                            }
                                                                        }
                                                                    )
                                                                    if (
                                                                        btnPer
                                                                    ) {
                                                                        children3.isCheck = true
                                                                    }
                                                                }
                                                            } else {
                                                                children3.isCheck = !hasPermission
                                                            }
                                                        } else {}
                                                    }
                                                )
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
        // 修改对应行的页面权限列和按钮权限列
        checkChange2(id, hasPermission) {
            _.forEach(this.dataTree, item => {
                if (item.id === id) {
                    item.hasPermission = !hasPermission
                    if (item.buttons) {
                        _.forEach(item.buttons, itemButton => {
                            itemButton.hasRight = !hasPermission
                        })
                    }
                } else {
                    if (item.children) {
                        _.forEach(item.children, children1 => {
                            if (children1.id === id) {
                                children1.hasPermission = !hasPermission
                                if (children1.buttons) {
                                    _.forEach(children1.buttons, itemButton => {
                                        itemButton.hasRight = !hasPermission
                                    })
                                }
                            } else {
                                if (children1.children) {
                                    _.forEach(children1.children, children2 => {
                                        if (children2.id === id) {
                                            children2.hasPermission = !hasPermission
                                            if (children2.buttons) {
                                                _.forEach(
                                                    children2.buttons,
                                                    itemButton => {
                                                        itemButton.hasRight = !hasPermission
                                                    }
                                                )
                                            }
                                        } else {
                                            if (children2.children) {
                                                _.forEach(
                                                    children2.children,
                                                    children3 => {
                                                        if (
                                                            children3.id === id
                                                        ) {
                                                            children3.hasPermission = !hasPermission
                                                            if (
                                                                children3.buttons
                                                            ) {
                                                                _.forEach(
                                                                    children3.buttons,
                                                                    itemButton => {
                                                                        itemButton.hasRight = !hasPermission
                                                                    }
                                                                )
                                                            }
                                                        } else {}
                                                    }
                                                )
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
        // 修改按钮列
        checkAllGroupChange(menuid, id, hasRight) {
            // _.forEach(this.result, item => {
            //     if (item.id === menuid) {
            //         _.forEach(item.buttons, itemButton => {
            //             if (itemButton.id === id) {
            //                 console.log(hasPermission)
            //                 itemButton.hasRight = hasPermission
            //             }
            //         })
            //     }
            // })
            _.forEach(this.dataTree, item => {
                if (item.id === menuid) {
                    if (item.buttons) {
                        _.forEach(item.buttons, itemButton => {
                            if (itemButton.id === id) {
                                itemButton.hasRight = !hasRight
                            }
                        })
                        if (!hasRight) {
                            if (item.hasPermission) {
                                let btnPer = true
                                item.buttons.forEach(function(btn) {
                                    if (!btn.hasRight) {
                                        btnPer = false
                                    }
                                })
                                if (btnPer) {
                                    item.isCheck = true
                                }
                            } else {
                                item.isCheck = false
                            }
                        } else {
                            item.isCheck = !hasRight
                        }
                    }
                } else {
                    if (item.children) {
                        _.forEach(item.children, children1 => {
                            if (children1.id === menuid) {
                                if (children1.buttons) {
                                    _.forEach(children1.buttons, ibuttons0 => {
                                        if (ibuttons0.id === id) {
                                            ibuttons0.hasRight = !hasRight
                                        }
                                    })
                                    if (!hasRight) {
                                        if (children1.hasPermission) {
                                            let btnPer = true
                                            children1.buttons.forEach(function(
                                                btn
                                            ) {
                                                if (!btn.hasRight) {
                                                    btnPer = false
                                                }
                                            })
                                            if (btnPer) {
                                                children1.isCheck = true
                                            }
                                        } else {
                                            children1.isCheck = false
                                        }
                                    } else {
                                        children1.isCheck = !hasRight
                                    }
                                }
                            } else {
                                if (children1.children) {
                                    _.forEach(children1.children, children2 => {
                                        if (children2.id === menuid) {
                                            if (children2.buttons) {
                                                _.forEach(
                                                    children2.buttons,
                                                    ibuttons => {
                                                        if (
                                                            ibuttons.id === id
                                                        ) {
                                                            ibuttons.hasRight = !hasRight
                                                        }
                                                    }
                                                )
                                                if (!hasRight) {
                                                    if (
                                                        children2.hasPermission
                                                    ) {
                                                        let btnPer = true
                                                        children2.buttons.forEach(
                                                            function(btn) {
                                                                if (!btn.hasRight) {
                                                                    btnPer = false
                                                                }
                                                            }
                                                        )
                                                        if (btnPer) {
                                                            children2.isCheck = true
                                                        }
                                                    } else {
                                                        children2.isCheck = false
                                                    }
                                                } else {
                                                    children2.isCheck = !hasRight
                                                }
                                            }
                                        } else {
                                            if (children2.children) {
                                                _.forEach(
                                                    children2.children,
                                                    children3 => {
                                                        if (
                                                            children3.id ===
                                                            menuid
                                                        ) {
                                                            if (
                                                                children3.buttons
                                                            ) {
                                                                _.forEach(
                                                                    children3.buttons,
                                                                    ibuttons2 => {
                                                                        if (
                                                                            ibuttons2.id ===
                                                                            id
                                                                        ) {
                                                                            ibuttons2.hasRight = !hasRight
                                                                        }
                                                                    }
                                                                )
                                                                if (!hasRight) {
                                                                    if (
                                                                        children3.hasPermission
                                                                    ) {
                                                                        let btnPer = true
                                                                        children3.buttons.forEach(
                                                                            function(
                                                                                btn
                                                                            ) {
                                                                                if (!btn.hasRight) {
                                                                                    btnPer = false
                                                                                }
                                                                            }
                                                                        )
                                                                        if (
                                                                            btnPer
                                                                        ) {
                                                                            children3.isCheck = true
                                                                        }
                                                                    } else {
                                                                        children3.isCheck = false
                                                                    }
                                                                } else {
                                                                    children3.isCheck = !hasRight
                                                                }
                                                            }
                                                        } else {}
                                                    }
                                                )
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        },
        getList(treeList) {
            treeList.forEach(item => {
                if (item.children !== undefined) {
                    let newButtonsList = []
                    _.forEach(item.buttons, itemButton => {
                        let newB = {
                            id: itemButton.id,
                            hasRight: itemButton.hasRight
                        }
                        newButtonsList.push(newB)
                    })
                    let newItem = {
                        id: item.id,
                        hasPermission: item.hasPermission,
                        buttons: newButtonsList
                    }
                    this.result.push(newItem)
                    this.getList(item.children)
                } else {
                    let newButtonsList = []
                    _.forEach(item.buttons, itemButton => {
                        let newB = {
                            id: itemButton.id,
                            hasRight: itemButton.hasRight
                        }
                        newButtonsList.push(newB)
                    })
                    let newItem = {
                        id: item.id,
                        hasPermission: item.hasPermission,
                        buttons: newButtonsList
                    }

                    this.result.push(newItem)
                }
            })
        },
        onSave() {
            this.spinShow = true
            this.result = []
            this.getList(this.dataTree)
            let data = {
                roleId: this.roleId,
                menus: this.result
            }
            setRolePermissions(data)
                .then(res => {
                    if (res.code === 1) {
                        this.$Message.success('保存成功')
                        this.init()
                    } else {
                        this.spinShow = false
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.spinShow = false
                    console.log(err)
                })
        },
        onCancel() {
            this.$router.push({
                path: `/manageCenter/role/search`
            })
        },
        buildTree(list) {
            // 数组转换成树形
            // 创建一个对象命名为map
            var map = {}
                // 通过遍历把list中的元素放到map对象中
            list.forEach(function(item) {
                    if (!map[item.id]) {
                        // 核心步骤1：map中的'item.id'属性指向list数组中的对象元素
                        map[item.id] = item
                    }
                }) // 再次遍历为了对map属性所指的对象进行处理
            list.forEach(function(item) {
                    // 过滤父级id不是null的元素
                    if (item.fatherMenuId != null) {
                        // map[item.fId]为该元素的父级元素
                        item.isCheck = false
                        if (item.hasPermission) {
                            if (item.buttons.length === 0) {
                                item.isCheck = true
                            } else {
                                let btnPer = true
                                item.buttons.forEach(function(btn) {
                                    if (!btn.hasRight) {
                                        btnPer = false
                                    }
                                })
                                if (btnPer) {
                                    item.isCheck = true
                                }
                            }
                        }
                        map[item.fatherMenuId].children
                            ? map[item.fatherMenuId].children.push(item)
                            : (map[item.fatherMenuId].children = [item])
                    }
                })
                // 过滤后仅剩下根节点
            let tree = list.filter(function(item) {
                if (item.fatherMenuId === null) {
                    item.isCheck = false
                    if (item.hasPermission) {
                        if (item.buttons.length === 0) {
                            item.isCheck = true
                        } else {
                            let btnPer = true
                            item.buttons.forEach(function(btn) {
                                if (!btn.hasRight) {
                                    btnPer = false
                                }
                            })
                            if (btnPer) {
                                item.isCheck = true
                            }
                        }
                    }
                    return item
                }
            })
            return tree
        },
        init() {
            this.spinShow = true
            let parameters = [this.roleId]

            getRolesPermissions(parameters)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data

                        this.dataTree = this.buildTree(data)
                        console.log(this.dataTree)
                        this.spinShow = false
                            // this.getList(this.dataTree)
                            // this.dataTree = [dataTree[0].children[0].children[0]]
                    } else {
                        this.spinShow = false
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.spinShow = false
                    console.log(err)
                })
        }
    },
    computed: {},
    created() {
        this.roleId = this.$route.params.roleId
        this.roleName = this.$route.params.roleName

        this.init()
    }
}
