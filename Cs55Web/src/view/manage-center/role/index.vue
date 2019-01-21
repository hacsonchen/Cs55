<template>
  <div class="sms-template">
    <Card class="box-card el_card" :dis-hover="true">
      <p slot="title">角色管理</p>
      <Row>
        <Col :span="6" class="label-right">
          <Row style="width:100%">
            <Col :span="6">
              <span class="search-lable span-line-height">角色编号：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="角色编号" v-model="search.code"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row style="width:100%">
            <Col :span="6">
              <span class="search-lable span-line-height">角色名称：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="角色名称" v-model="search.name"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row style="width:100%">
            <Col :span="6">
              <span class="search-lable span-line-height">修改人：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="修改人" v-model="search.modifiName"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="4">
          <Button type="primary" @click="init">查询</Button>&nbsp;&nbsp;
          <Button @click="clear">重置</Button>
        </Col>
      </Row>
      <br>
      <Row>
        <Col>
          <Button type="primary" @click="addRole">
            <i class="iconfont icon-jiahao" style="font-size: 10px;"></i>
            新增角色
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
      >
        <!-- 默认角色 -->
        <template slot="isDefault" slot-scope="props">
          <i-switch
            v-model="props.row.isDefault"
            size="small"
            @on-change="changeDefaultRole(props.row.id,props.row.isDefault)"
          ></i-switch>
        </template>
        <!-- 状态 -->
        <!-- <template slot="roleStatus" slot-scope="props">
                  <i-switch v-model="props.row.roleStatus" size="small" @on-change="changeStatus(props.row.id,props.row.roleStatus)"></i-switch>
        </template>-->
        <!-- 操作 -->
        <template slot="action" slot-scope="props">
          <!-- <Button type="primary" size="small" @click="getroleInfo(props.row.id)">编辑</Button> -->
          <a href="javascript:void(0)" @click="getroleInfo(props.row.id)">编辑</a>
          &nbsp;|&nbsp;
          <!-- <Button type="primary" size="small" @click="auth(props.row.id,props.row.roleName)">权限</Button> -->
          <a href="javascript:void(0)" @click="auth(props.row.id,props.row.roleName)">权限</a>
          &nbsp;|&nbsp;
          <!-- <Button type="error" size="small" @click="delRoleInfo(props.row.id)">删除</Button> -->
          <a href="javascript:void(0)" @click="delRoleInfo(props.row.id)" class="deleteColor">删除</a>
        </template>
      </Table>
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

    <Modal :title="title" v-model="modal1" width="1000">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100">
        <Row>
          <Col :span="12">
            <FormItem label="角色编号：" prop="roleCode">
              <Input v-model="ruleForm.roleCode"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="角色名称：" prop="roleName">
              <Input v-model="ruleForm.roleName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <FormItem label="默认角色：" prop="isDefault">
              <Checkbox v-model="ruleForm.isDefault"></Checkbox>
              <span style="color:red">注：所有新建角色默认为该用户组。每个用户最多可以有一个默认角色。</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <FormItem label="备注：" prop="memo">
              <Input v-model="ruleForm.memo"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="创建人：" prop="creatorName">{{ruleForm.creatorName}}</FormItem>
          </Col>
          <Col :span="12" v-if="ruleForm.id!==''">
            <FormItem
              label="创建时间："
              prop="creationTime"
            >{{$moment(ruleForm.creationTime).format('YYYY/MM/DD HH:mm:ss')}}</FormItem>
          </Col>
        </Row>
        <Row v-if="ruleForm.id!==''">
          <Col :span="12">
            <FormItem label="修改人：" prop="lastModifierName">{{ruleForm.lastModifierName}}</FormItem>
          </Col>
          <Col :span="12">
            <FormItem
              label="修改时间："
              prop="lastModificationTime"
            >{{$moment(ruleForm.lastModificationTime).format('YYYY/MM/DD HH:mm:ss')}}</FormItem>
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

<style scoped>
</style>
