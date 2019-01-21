import {
    addConfig,
    editConfig,
    // DeleteDiItemConfig,
    getConfigTags,
    getConfig
} from '@/api/manage-center/manage-center'
export default {
    data() {
        return {
            detailTitle: '配置内容',
            tableLoading: false,
            selectDataTag: {},
            treeList: [],
            dataList: [],
            filterText: '',
            parCtrl: {
                editDLShow: false
            },
            parForm: {
                number: '',
                name: '',
                delivery: false,
                listLoading: false
            },
            searchTags: {
                name: ''
            },
            search: {
                // 查询
                number: '',
                name: ''
            },
            columns: [{
                    title: '序号',
                    key: 'number'
                },
                {
                    title: '选项文本',
                    key: 'value',
                    render: (h, params) => {
                        this.labelList[params.index] = params.row
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.value({
                                row: params.row,
                                id: params.row.id
                            })
                        )
                    }
                },
                {
                    title: '显示',
                    key: 'isShow',
                    render: (h, params) => {
                        this.labelList[params.index] = params.row
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.isShow({
                                row: params.row,
                                id: params.row.id
                            })
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 110,
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
            labelList: [],
            pageTotal: 0,
            multipleSelection: []
        }
    },
    watch: {
        filterText(val) {
            this.filterName(val)
        }
    },
    methods: {
        filterName(val) {
            this.treeList = []
            if (val !== '') {
                let data = JSON.parse(
                    JSON.stringify(
                        this.dataList.filter(item => {
                            return item.columnCnName.indexOf(val) > -1
                        })
                    )
                )
                this.treeList = this.buildTree(data)
            } else {
                let data = JSON.parse(JSON.stringify(this.dataList))
                this.treeList = this.buildTree(data)
            }
        },
        Trim(str) {
            return str.replace(/(^\s*)|(\s*$)/g, '')
        },
        saveEditTableItem(item) {
            let trimValue = this.Trim(item.value)
            if (trimValue === '') {
                this.$Message.warning('请输入选项文本')
                return false
            }
            let data = {
                columnEnName: item.columnEnName,
                columnCnName: item.columnCnName,
                isShow: item.isShow,
                id: item.id,
                value: item.value,
                valueKey: item.valueKey
            }
            editConfig(data)
                .then(res => {
                    if (res.code === 1) {
                        this.treeChange([this.selectDataTag])
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        saveAddTableItem(item) {
            let trimValue = this.Trim(item.value)
            if (trimValue === '') {
                this.$Message.warning('请输入选项文本')
                return false
            }
            let data = {
                    columnEnName: item.columnEnName,
                    columnCnName: item.columnCnName,
                    isShow: item.isShow,
                    value: item.value
                }
                // console.log()
            addConfig(data)
                .then(res => {
                    if (res.code === 1) {
                        this.treeChange([this.selectDataTag])
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editTableItem(number) {
            let index = number - 1
            this.labelList[index].isEditClick = true
        },
        cancelTableItem(number) {
            let index = number - 1
            this.labelList[index].isEditClick = false
        },
        /** 删除行 */
        delRow(number) {
            let index = number - 1
            this.labelList.splice(index, 1)
            let i = 1
            this.labelList.forEach(function(item) {
                item.number = i
                if (item.id === '') {
                    item.isEditClick = true
                } else {
                    item.isEditClick = false
                }
                i++
            })
        },
        /** 添加行 */
        addRow() {
            let length = this.labelList.length
            this.labelList.push({
                columnCnName: this.selectDataTag.columnCnName,
                columnEnName: this.selectDataTag.columnEnName,
                number: length + 1,
                isEditClick: true,
                value: '',
                id: '',
                isShow: true
            })

            // this.$nextTick(() => {
            //   this.labelList = !this.labelList
            // })
        },
        init() {
            this.dataList = []
            getConfigTags(this.searchTags)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        this.dataList = JSON.parse(JSON.stringify(data))
                        this.treeList = this.buildTree(data)
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
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
                    if (item.fId != null) {
                        // map[item.fId]为该元素的父级元素
                        map[item.fId].children
                            ? map[item.fId].children.push(item)
                            : (map[item.fId].children = [item])
                    }
                })
                // 过滤后仅剩下根节点
            let treeList = list.filter(function(item) {
                if (item.fId === null) {
                    item.expand = true
                    item.title = item.columnCnName
                    return item
                }
            })

            let tree = []
            treeList.forEach(function(item) {
                let newItem = {
                    id: item.id,
                    expand: true,
                    columnEnName: item.columnEnName,
                    title: item.columnCnName
                }

                if (item.children) {
                    item.children.forEach(function(itemChildren) {
                        let newItemChildren = {
                            id: itemChildren.id,
                            columnEnName: itemChildren.columnEnName,
                            title: itemChildren.columnCnName
                        }
                        if (newItem.children) {
                            newItem.children.push(newItemChildren)
                        } else {
                            newItem.children = [newItemChildren]
                        }
                    })
                }
                tree.push(newItem)
            })

            return tree
        },
        treeChange(data) {
            this.selectDataTag = data[0]
            let name = this.selectDataTag.columnEnName
            this.detailTitle = this.selectDataTag.title

            getConfig(name)
                .then(res => {
                    if (res.code === 1) {
                        let data = res.data
                        let i = 1
                        data.forEach(function(item) {
                            item.number = i
                            item.isEditClick = false
                            i++
                        })
                        this.labelList = data
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        ok() {},
        cancel() {},
        handleSelectionChange(data) {
            var list = []
            for (let v of data) {
                list.push(v.id)
            }
            this.multipleSelection = list
        },
        handlePage(value) {
            this.search.pageIndex = value
            this.init(this.search)
        },
        handlePageSize(value) {
            this.search.pageSize = value
            this.init(this.search)
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        }
    },
    created() {
        this.init()
    }
}
