import {
    dataSetPageList,
    dataSetDetailPageList,
    deleteDataSet,
    deleteDataSetDetail
} from '@/api/manage-center/manage-center'
export default {
    data() {
        return {
            self: this,
            tableLoading: false,
            tableDetailLoading: false,
            modal1: false,
            detailTile: '',
            search: {
                // 查询
                name: '',
                code: '',
                pageIndex: 1,
                pageSize: 10
            },
            multipleSelection: [],
            pageTotal: 0,
            columns: [
                { type: 'selection', width: 60, align: 'center' },
                { title: '数据集编号', key: 'collectionCode' },
                { title: '数据集名称', key: 'collectionName' },
                { title: '数据集记录条数', key: 'collectionNumbers' },
                { title: '创建时间', key: 'createTime' },
                {
                    title: '操作',
                    key: 'action',
                    width: 120,
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
            dataList: [], // 弹框
            idDetail: '',
            tableLoadingDetail: false,
            searchDetail: {
                // 查询
                collcetionId: '',
                pageIndex: 1,
                pageSize: 10
            },
            columnsDetail: [
                { type: 'selection', width: 60, align: 'center' },
                { title: '会员编号', align: 'center', key: 'memberCode' },
                { title: '昵称', align: 'center', key: 'nickname' },
                { title: '手机号码', align: 'center', key: 'phone' },
                { title: '等级', align: 'center', key: 'levelName' },
                { title: '剩余积分', align: 'center', key: 'allScore' },
                { title: '注册日期', align: 'center', key: 'registerDate' }
            ],
            dataListDetail: [],
            multipleSelectionDetail: [],
            pageTotalDetail: 0
        }
    },
    methods: {
        viewDetail(id, name) {
            this.searchDetail.collcetionId = id
            this.detailTile = `数据集：${name}`
            this.detaliList()
            this.modal1 = true
        },
        detaliList() {
            this.searchDetail.pageIndex = 1
            dataSetDetailPageList(this.searchDetail)
                .then(res => {
                    if (res.code === 1) {
                        const data = res.data
                        data.rows.forEach(item => {
                            if (item.registerDate === '0001-01-01T00:00:00') {
                                item.registerDate = ''
                            } else {
                                item.registerDate = this.$moment(
                                    item.registerDate
                                ).format('YYYY/MM/DD HH:mm:ss')
                            }
                        })
                        this.dataListDetail = data.rows
                        this.pageTotalDetail = data.totalCount
                        this.tableLoadingDetail = false
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoadingDetail = false
                    this.$Message.warning(err.response.data.message)
                })
        },
        okDetail() {},
        cancelDetail() {
            this.modal1 = false
        },
        deleteItemsDetail() {
            if (this.multipleSelectionDetail.length === 0) {
                this.$Message.warning('请选择要删除的记录')
                return
            }
            deleteDataSetDetail(this.multipleSelectionDetail)
                .then(res => {
                    if (res.code === 1) {
                        this.detaliList()
                    } else {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    this.$Message.warning(err.response.data.message)
                })
        },
        handleSelectionChangeDetail(data) {
            var list = []
            for (let v of data) {
                list.push(v.id)
            }
            this.multipleSelectionDetail = list
        },
        handlePageDetail(value) {
            this.searchDetail.pageIndex = value
            this.detaliList()
        },
        handlePageSizeDetail(value) {
            this.searchDetail.pageSize = value
            this.detaliList()
        },
        deleteItem(id) {
            let ids = [id]
            this.deleteItems(ids, true)
        },
        deleteItems(ids, single) {
            this.tableLoading = true
            if (!single) {
                ids = this.multipleSelection
                if (ids.length === 0) {
                    this.tableLoading = false
                    this.$Message.warning('请选择要删除的记录')
                    return
                }
            }
            deleteDataSet(ids)
                .then(res => {
                    if (res.code === 1) {
                        this.init()
                    } else {
                        this.tableLoading = false
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    this.tableLoading = false
                    this.$Message.warning(err.response.data.message)
                })
        },
        clear() {
            this.search.code = ''
            this.search.name = ''
        },
        init() {
            this.tableLoading = true
            dataSetPageList(this.search)
                .then(res => {
                    if (res.code === 1) {
                        const data = res.data
                        data.rows.forEach(item => {
                            if (item.createTime === '0001-01-01T00:00:00') {
                                item.createTime = ''
                            } else {
                                item.createTime = this.$moment(
                                    item.createTime
                                ).format('YYYY/MM/DD HH:mm:ss')
                            }
                        })

                        this.dataList = data.rows
                        this.pageTotal = data.totalCount
                        this.tableLoading = false
                    } else {
                        this.tableLoading = false
                        console.log(data.message)
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
        }
    },
    created() {
        this.init()
    }
}
