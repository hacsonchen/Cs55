<template>
  <div>
    <Card :bordered="false" :dis-hover="true">
      <p slot="title">数据集管理</p>
      <Row>
        <Col span="6"
             class="label-right">
        <Row>
          <Col span="6">
          <span class="search-lable span-line-height">数据集编号：</span>
          </Col>
          <Col span="17">
          <Input placeholder="数据集编号"
                 v-model="search.code" />
          </Col>
        </Row>
        </Col>

        <Col span="6"
             class="label-right">
        <Row>
          <Col span="6">
          <span class="search-lable span-line-height">数据集名称：</span>
          </Col>
          <Col span="17">
          <Input placeholder="数据集名称"
                 v-model="search.name"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="4">
        <Button type="primary"
                @click="init">查询</Button>
        &nbsp;&nbsp;
        <Button @click="clear">重置</Button>

        </Col>
      </Row>
      <br>
      <Row class="el_row">
        <Col>
        <Button type="error"
                @click="deleteItems(multipleSelection,false)">批量删除</Button>
        </Col>
      </Row>
      <br>

      <Table border
             ref="myTable"
             @on-selection-change="handleSelectionChange"
             :loading="tableLoading"
             :columns="columns"
             :data="dataList">
        <!-- 操作 -->
        <template slot="action"
                  slot-scope="props">
          <!-- <Button type="primary" size="small" @click="viewDetail(props.id)">查看</Button> -->
          <a href="javascript:void(0)"
             @click="viewDetail(props.id,props.row.collectionName)">查看</a>
          &nbsp;|&nbsp;
          <!-- <Poptip @on-ok="viewDetail(props.id)" confirm title="Delete this item?" transfer> -->
          <a href="javascript:void(0)"
             @click="deleteItem(props.id)"
             class="deleteColor">删除</a>
          <!-- <Button type="warning" size="small" @click="deleteItem(props.id)">删除</Button> -->
          <!-- </Poptip> -->
        </template>
      </Table>
      <div style="text-align: right;margin-top:10px">
        <Page :total="pageTotal"
              :current="search.pageIndex"
              :page-size="search.pageSize"
              :page-size-opts=[10,20,50,100]
              @on-change="handlePage"
              @on-page-size-change="handlePageSize"
              show-elevator
              show-sizer
              show-total />
      </div>
    </Card>

    <Modal v-model="modal1"
           :title="detailTile"
           width="1440"
           @on-ok="okDetail"
           cancel-text="返回"
           @on-cancel="cancelDetail">

      <!-- <Form :inline="true" class="demo-form-inline">
                <Form-item>
                    <Button type="error" @click="deleteItemsDetail">删除</Button>
                </Form-item>
            </Form> -->
      <br>
      <Table border
             ref="myTableDetail"
             @on-selection-change="handleSelectionChangeDetail"
             :loading="tableLoading"
             :columns="columnsDetail"
             :data="dataListDetail">

      </Table>
      <div style="text-align: right;margin-top:10px">
        <Page :total="pageTotalDetail"
              :current="searchDetail.pageIndex"
              :page-size="searchDetail.pageSize"
              :page-size-opts=[10,20,50,100]
              @on-change="handlePageDetail"
              @on-page-size-change="handlePageSizeDetail"
              show-elevator
              show-sizer
              show-total />
      </div>

      <div slot="footer">
        <Button
                @click="cancelDetail">取消</Button>
        <Button type="error"
                @click="deleteItemsDetail">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js">
</script>
<style>
</style>
