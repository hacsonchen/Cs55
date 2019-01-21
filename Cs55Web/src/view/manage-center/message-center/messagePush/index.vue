<template>
  <div>
    <Card class="box-card el_card" :dis-hover="true">
      <p slot="title">消息推送</p>
      <Row>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">推送编号：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="推送编号" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">推送名称：</span>
            </Col>
            <Col :span="16">
              <Input placeholder="推送名称" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">创建人：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="创建人" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="3" class="el_col">
          <Button type="primary">查询</Button>&nbsp;&nbsp;
          <Button>重置</Button>
        </Col>
      </Row>
      <br>
      <Row>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">触达人数：</span>
            </Col>
            <Col :span="17">
              <Row>
                <Col :span="11">
                  <InputNumber style="width: 100%;"></InputNumber>
                </Col>
                <Col class="line" span="2">-</Col>
                <Col :span="11">
                  <InputNumber style="width: 100%;"></InputNumber>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <label for>推送类型：</label>
            </Col>
            <Col :span="16">
              <Select v-model="search.code">
                <Option label="类型1" value="0"></Option>
                <Option label="类型2" value="1"></Option>
              </Select>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Col :span="6">
            <label for>推送时间：</label>
          </Col>
          <Col :span="16">
            <DatePicker
              :value="search.pushDate"
              format="yyyy/MM/dd"
              type="daterange"
              placement="bottom-end"
              placeholder="推送时间"
              style="width: 100%"
            ></DatePicker>
          </Col>
        </Col>
      </Row>
      <br>
      <Row class="el_row">
        <Col>
          <Button type="primary" @click="onSubmit">
            <i class="iconfont icon-jiahao" style="font-size: 10px;"></i>新建短信推送
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
  </div>
</template>
<script src="./index.js"></script>