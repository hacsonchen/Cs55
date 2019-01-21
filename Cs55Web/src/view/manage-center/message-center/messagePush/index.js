import {

} from '@/api/manage-center/manage-center'
export default {
    name: 'sms_template',
    data() {
        return {
            title: '',
            modal: false,
            multipleSelection: [],
            pageTotal: 0,
            tableLoading: false,
            ruleForm: {},
            rules: {
                code: '',
                pushDate: ['2018-01-01', '2019-12-31']
            },
            search: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            columns: [{
                title: '推送编号',
                key: 'roleCode'
            }, {
                title: '推送名称',
                key: 'roleCode'
            }, {
                title: '推送类型',
                key: 'roleCode'
            }, {
                title: '推送时间',
                key: 'roleCode'
            }, {
                title: '推送范围',
                key: 'roleCode'
            }, {
                title: '触达人数',
                key: 'roleCode'
            }, {
                title: '创建人',
                key: 'roleCode'
            }, {
                title: '创建时间',
                key: 'roleCode'
            }],
            dataList: []
        }
    },
    methods: {
        clear() {},
        init() {},
        onCancel() {
            this.modal = false
        },
        addSms() {
            this.title = '新增短信推送'
            this.modal = true
        },
        onSubmit() {},
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
