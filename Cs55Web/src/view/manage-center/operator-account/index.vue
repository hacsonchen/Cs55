<template>
  <div>
    <Card class="box-card el_card" :dis-hover="true">
      <p slot="title">账号管理</p>
      <Row>
        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">用户编号：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="用户编号" v-model="search.userCode"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">用户名称：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="用户名" v-model="search.userName"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="6" class="label-right">
          <Row>
            <Col :span="6">
              <span class="search-lable span-line-height">手机号码：</span>
            </Col>
            <Col :span="17">
              <Input placeholder="手机号码" v-model="search.phone"></Input>
            </Col>
          </Row>
        </Col>

        <Col :span="4">
          <Button type="primary" @click="init">查询</Button>&nbsp;&nbsp;
          <Button @click="clear">重置</Button>
        </Col>
      </Row>
      <br>
      <Row class="el_row">
        <Col>
          <Button type="primary" @click="addUser">
            <i class="iconfont icon-jiahao" style="font-size: 10px;"></i>&nbsp; 新增账号
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
        <!-- 用户名称 -->
        <template slot="adminCode" slot-scope="props">
          <span class="adminCode" @click="getUserInfo(props.row.id,true)">{{props.row.adminCode}}</span>
        </template>
        <!-- 是否显示 -->
        <template slot="adminStatus" slot-scope="props">
          <i-switch
            v-model="props.row.adminStatus"
            size="small"
            @on-change="changeStatus(props.row.id,props.row.adminStatus)"
          ></i-switch>
        </template>
        <!-- 操作 -->
        <template slot="action" slot-scope="props">
          <a href="javascript:void(0)" @click="getUserInfo(props.row.id,false)">编辑</a>
          <!-- <Button type="primary" size="small" @click="getUserInfo(props.row.id,false)">编辑</Button> -->
          &nbsp;|&nbsp;
          <a
            href="javascript:void(0)"
            @click="auth(props.row.id,props.row.adminName)"
          >权限</a>
          <!-- <Button type="primary" size="small" @click="auth(props.row.id,props.row.adminName)">权限</Button> -->
          &nbsp;|&nbsp;
          <a
            href="javascript:void(0)"
            @click="delUserInfo(props.row.id)"
            class="deleteColor"
          >删除</a>
          <!-- <Button type="error" size="small" @click="delUserInfo(props.row.id)">删除</Button> -->
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

    <Modal :title="detailTitle" v-model="modal1" width="850">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100">
        <Row>
          <Col :span="8">
            <FormItem label="用户编号：" prop="adminCode">
              <Input :disabled="disable" v-model="ruleForm.adminCode" v-if="ruleForm.id===''"></Input>
              <label v-html="ruleForm.adminCode" v-if="ruleForm.id!=''"></label>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="用户名称：" prop="adminName">
              <Input :disabled="disable" v-model="ruleForm.adminName"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="登录密码：" prop="password">
              <Input :disabled="disable" v-model="ruleForm.password" type="password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="手机号码：" prop="phone">
              <Input :disabled="disable" v-model="ruleForm.phone"></Input>
            </FormItem>
          </Col>
          <Col :span="10">
            <FormItem label="电子邮箱：" prop="email">
              <Input type="email" :disabled="disable" v-model="ruleForm.email"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="创建人：">{{ruleForm.creatorName}}</FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="创建时间：">{{$moment(ruleForm.creationTime).format('YYYY/MM/DD HH:mm:ss')}}</FormItem>
          </Col>
          <Col :span="8" v-if="ruleForm.id!=''">
            <FormItem
              label="最近登录："
            >{{ ruleForm.lastLoginTime ==='0001-01-01T00:00:00'?'': $moment(ruleForm.lastLoginTime).format('YYYY/MM/DD HH:mm:ss')}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="所属角色：" prop="roles">
              <Select
                :disabled="disable"
                v-model="ruleForm.roleIds"
                multiple
                filterable
                placeholder="请选择"
              >
                <Option
                  v-for="item in roleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="onCancel">取消</Button>
        <Button v-if="!disable" type="primary" @click="onSubmit('ruleForm')">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>
<style >
.btn-right {
  text-align: right;
  float: right;
}
.adminCode {
  cursor: pointer;
  color: #3fb0ff;
}
</style>

