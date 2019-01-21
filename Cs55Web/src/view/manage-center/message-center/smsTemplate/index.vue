<template>
  <div class="sms-template">
    <Card class="box-card el_card" :dis-hover="true">
      <p slot="title">短信消息模板</p>
      <Row>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">模板编号：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="模板编号" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">模板名称：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="模板名称" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Col :span="6">
            <span class="search-lable span-line-height">创建人：</span>
          </Col>
          <Col :span="17">
            <Input placeholder="创建人" v-model="search.code"></Input>
          </Col>
        </Col>
        <Col :span="3" class="el_col label-right">
          <Button type="primary" @click="init">查询</Button>&nbsp;&nbsp;
          <Button @click="clear">重置</Button>
        </Col>
      </Row>
      <br>
      <Row>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">第三方渠道：</span>
            </Col>
            <Col :span="17">
              <Select v-model="search.code">
                <Option label="不限" value="0"></Option>
                <Option label="短信易" value="1"></Option>
                <Option label="企业通" value="2"></Option>
                <Option label="三三得久" value="3"></Option>
                <Option label="阿里大于" value="3"></Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col :span="6" class="label-right">
          <Col :span="6">
            <span class="search-lable span-line-height">第三方编号：</span>
          </Col>
          <Col :span="17">
            <Input placeholder="第三方编号" v-model="search.code"></Input>
          </Col>
        </Col>
      </Row>
      <br>
      <Row class="el_row">
        <Col>
          <Button type="primary" @click="addSms">
            <i class="iconfont icon-jiahao" style="font-size: 10px;"></i> 新增短信模板
          </Button>
        </Col>
      </Row>
      <br>
      <Table
        border
        ref="myTable"
        @on-selection-change="handleSelectionChange"
        :loading="tableLoading"
        :columns="columns"
        :data="dataList"
      ></Table>
      <div style="text-align: right;margin-top:10px">
        <Page
          :total="pageTotal"
          :current="search.pageIndex"
          :page-size="search.pageSize"
          :page-size-opts="[10,20,50,100]"
          @on-change="handlePage"
          @on-page-size-change="handlePageSize"
          show-elevator
          show-sizer
          show-total
        />
      </div>
    </Card>

    <Modal :title="title" v-model="modal" width="800">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100">
        <Row>
          <Col :span="10">
            <FormItem label="模板编号：" prop="模板编号">
              <Input v-model="rules.code"></Input>
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem label="模板名称：" prop="模板名称">
              <Input v-model="rules.code"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="10">
            <FormItem label="第三方渠道：" prop="第三方渠道">
              <Input v-model="rules.code"></Input>
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem label="第三方编号：" prop="第三方编号">
              <Input v-model="rules.code"></Input>
            </FormItem>
          </Col>
          <Col :span="4">
            <Button style="margin-left:20px;" type="primary" class @click="onSubmit">测试</Button>
          </Col>
        </Row>
        <Row>
          <Col :span="20" class="textarea">
            <FormItem label="备注：" prop="备注">
              <Input type="textarea" v-model="rules.code"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="onCancel">取消</Button>
        <Button type="primary" @click="onSubmit('ruleForm')">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
</style>