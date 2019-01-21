<template>
  <div class="role_auth">
    <Card class="auth_card" :dis-hover="true">
      <p slot="title">
        <span style="color:#337AB7;font-weight:800;">{{roleName}}</span>&nbsp;&nbsp;权限清单
      </p>
      <Row>
        <Col>
          <zk-table
            ref="table"
            sum-text="sum"
            index-text="#"
            :data="dataTree"
            :columns="columns"
            :stripe="props.stripe"
            :border="props.border"
            :show-header="props.showHeader"
            :show-summary="props.showSummary"
            :show-row-hover="props.showRowHover"
            :show-index="props.showIndex"
            :tree-type="props.treeType"
            :is-fold="props.isFold"
            :expand-type="props.expandType"
            :selection-type="props.selectionType"
          >
            <template slot="hasPermission" slot-scope="scope">
              <div v-if="scope.row.children===undefined ||scope.row.buttons.length>0">
                <CheckboxCustom
                  :value="scope.row.hasPermission"
                  @on-change="checkChange(scope.row.id,scope.row.hasPermission)"
                ></CheckboxCustom>&nbsp;&nbsp;查看
              </div>
            </template>
            <template slot="buttons" slot-scope="scope">
              <div v-if="scope.row.buttons">
                <template v-for="item in scope.row.buttons">
                  <CheckboxCustom
                    :value="item.hasRight"
                    @on-change="checkAllGroupChange(scope.row.id,item.id,item.hasRight)"
                    :key="item.id"
                  ></CheckboxCustom>
                  &nbsp;{{item.buttonName}} &nbsp;&nbsp;
                </template>
              </div>
            </template>
            <template slot="isCheck" slot-scope="scope">
              <div v-if="scope.row.children===undefined ||scope.row.buttons.length>0">
                <CheckboxCustom
                  :value="scope.row.isCheck"
                  @on-change="checkSelectAll(scope.row.id,scope.row.isCheck)"
                ></CheckboxCustom>
              </div>
            </template>
          </zk-table>
        </Col>
      </Row>
      <br>
      <!-- <Row>
                <Col style="text-align:center;">
                <Button type="primary"
                        @click="onSave" >保存</Button>&nbsp;&nbsp;&nbsp;
                <Button @click="onCancel">取消</Button>
                </Col>
      </Row>-->
      <Row>
        <Col :span="24" class="search-lable">
          <Button type="primary" @click="selectAll(true)">全选</Button>&nbsp;&nbsp;
          <Button @click="selectAll(false)">取消全选</Button>
        </Col>
      </Row>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <card class="foot-card" :dis-hover="true">
      <Row>
        <Col style="text-align:right;">
          <Button @click="onCancel">返回</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" @click="onSave">保存</Button>
        </Col>
      </Row>
    </card>
  </div>
</template>

<script src="./auth.js">
</script>


<style lang="less">
.role_auth {
  position: relative;
  .auth_card {
    margin-bottom: 90px;
  }
}
</style>
