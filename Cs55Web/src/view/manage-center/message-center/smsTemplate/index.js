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
                code: ''
            },
            search: {
                pageIndex: 1,
                pageSize: 10
            },
            columns: [{
                title: '短信模板编号',
                key: 'roleCode'
            }, {
                title: '模板名称',
                key: 'roleCode'
            }, {
                title: '第三方渠道',
                key: 'roleCode'
            }, {
                title: '第三方短信编号',
                key: 'roleCode'
            }, {
                title: '备注',
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
            this.title = '新增短信模板'
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
