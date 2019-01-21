<template>
    <div class="parameter-configuration">
        <Card :bordered="false" :dis-hover="true">
            <p slot="title">系统参数配置</p>
            <Row>
                <Card :bordered="false" class="card_bq" :dis-hover="true">
                    <p slot="title">配置项目</p>
                    <Row>
                        <Col :span="24" class="label-right">
                        <Col :span="5">
                        <span class="search-lable span-line-height">配置名称：</span>
                        </Col>
                        <Col :span="16">
                        <Input placeholder="输入关键字进行过滤" v-model="filterText">
                        </Input>
                        </Col>
                        </Col>
                    </Row>
                    <div style="margin-top:20px;">
                        <Tree :data="treeList" @on-select-change="treeChange" ref="tree2">
                        </Tree>
                    </div>
                </Card>
                <Card :bordered="false" class="card_fw" :dis-hover="true">
                    <p slot="title" v-html="detailTitle"></p>
                    <Row>
                        <Col>
                        <Button type="primary" @click="addRow" style="float:right">
                            <i class="iconfont icon-jiahao" style="font-size: 10px;"></i>  新增配置项
                        </Button>
                        </Col>
                    </Row>
                    <br />
                    <Table border ref="myTable" @on-selection-change="handleSelectionChange" :loading="tableLoading" :columns="columns" :data="labelList">
                        <!-- 选项文本 -->
                        <template slot="value" slot-scope="props">
                            <!-- <Form :ref="'formDynamic'+ props.id" :model="props.row">
                                <FormItem prop="value" :rules="{required: true, message: '请输入选项文本', trigger: 'blur'}">  -->
                            <div v-if="props.row.isEditClick">
                                <Input v-model="props.row.value" size="small"></Input>
                            </div>
                            <div v-if="!props.row.isEditClick" v-html="props.row.value">

                            </div>

                            <!-- </FormItem>
                            </Form>  -->
                        </template>
                        <!-- 是否显示 -->
                        <template slot="isShow" slot-scope="props">
                            <i-switch v-model="props.row.isShow" :disabled="!props.row.isEditClick" size="small"></i-switch>
                        </template>
                        <!-- 操作 -->
                        <template slot="action" slot-scope="props">
                            <div v-if="props.id">
                                <div v-if="!props.row.isEditClick">
                                    <a href="javascript:void(0)" @click="editTableItem(props.row.number)">编辑</a>
                                    <!-- <Button type="primary" size="small" @click="editTableItem(props.row.number)">编辑</Button> -->
                                </div>
                                <div v-if="props.row.isEditClick">
                                    <a href="javascript:void(0)" @click="saveEditTableItem(props.row)">保存</a>
                                    <!-- <Button type="primary" size="small" @click="saveEditTableItem(props.row)">保存</Button> -->
                                    &nbsp;|&nbsp;
                                    <a href="javascript:void(0)" @click="cancelTableItem(props.row.number)">取消</a>
                                    <!-- <Button size="small" @click="cancelTableItem(props.row.number)">取消</Button> -->
                                </div>
                            </div>
                            <div v-if="!props.id">
                                <a href="javascript:void(0)" @click="saveAddTableItem(props.row)">保存</a>
                                <!-- <Button type="primary" size="small" @click="saveAddTableItem(props.row)">保存</Button> -->
                                &nbsp;|&nbsp;
                                <a href="javascript:void(0)" @click="delRow(props.row.number)" class="deleteColor">删除</a>
                                <!-- <Button type="error" size="small" @click="delRow(props.row.number)">删除</Button> -->
                            </div>
                        </template>
                    </Table>

                </Card>
            </Row>
        </Card>
    </div>
</template>
<script src="./index.js">
</script>
<style lang = "less">
.card_fw {
  width: 60%;
  margin-left: 24px;
  float: left;
  border: 1px solid #ccc;
}
.parameter-configuration {
  .card_bq {
    width: 35%;
    float: left;
    border: 1px solid #ccc;
  }
  .ivu-card.ivu-card-dis-hover:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-color: #ccc;
  }
}
</style>

