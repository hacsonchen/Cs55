<template>
  <Card class="box-card">
    <p slot="title">短信推送</p>
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100">
      <Row>
        <FormItem label="推送名称：" prop="推送名称">
          <Row>
            <Col :span="5">
              <Input v-model="ruleForm.nunber"></Input>
            </Col>
            <Col :span="12" class="mg-l-20">推送名称仅供记录查询，您推送的会员将不会看到此信息。</Col>
          </Row>
        </FormItem>
        <FormItem label="选择模板：" prop="选择模板">
          <Row>
            <Col :span="5" class="text-align-center">双十一打折促销</Col>
            <Col :span="12" class="mg-l-20">
              <el-button type="primary" class @click="onSubmit">选择短信模板</el-button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="推送时间：" prop="推送时间">
          <Row>
            <Col :span="5">
              <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
            </Col>
            <Col :span="12" class="mg-l-20">不指定推送时间即编辑完成后立马推送。</Col>
          </Row>
        </FormItem>
        <FormItem label="推送范围：" prop="推送范围">
          <Row>
            <Col :span="5">
              <el-radio-group v-model="ruleForm.radio">
                <el-radio :label="3">全体推送</el-radio>
                <el-radio :label="6">精准推送</el-radio>
              </el-radio-group>
            </Col>
            <Col :span="12" class="mg-l-20">预计触达用户数量 2000</Col>
          </Row>
        </FormItem>
        <div class="transverse-line"></div>
        <FormItem label="门店标签：" prop="门店标签">
          <Row>
            <Col :span="24">
              <el-tag>选择困难</el-tag>
              <el-tag>技术男</el-tag>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="会员标签：" prop="会员标签">
          <Row>
            <Col :span="24">
              <el-tag type="success">隐形贫困户</el-tag>
              <el-tag type="success">大叔</el-tag>
              <el-tag type="success">老客户</el-tag>
              <el-tag type="success">网红</el-tag>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="活动标签：" prop="活动标签">
          <Row>
            <Col :span="24">
              <el-tag type="warning">520活动</el-tag>
              <el-tag type="warning">双11活动</el-tag>
            </Col>
          </Row>
        </FormItem>

        <div class="transverse-line"></div>
        <FormItem label="数据集：" prop="数据集">
          <Row>
            <Col :span="12">
              <el-select v-model="ruleForm.dateSet" multiple filterable placeholder="请选择">
                <el-option
                  v-for="item in orleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </Col>
          </Row>
        </FormItem>

        <div class="transverse-line"></div>

        <div class>短信推送仅推送已绑定手机号码的会员，预计触达用户数量为当前条件下已绑定会员的数据信息。</div>
        <div class="color-red" style="margin-top:10px;">每个消费者每天可收到的统一模版短信数量有限，请勿重复频繁向同一用户群体推送同一模版短信。</div>
        <div class="sms-label">
          <el-checkbox v-model="ruleForm.checked">本次推送为***公司自发行为，发放内容遵守国家相关法律法规的规定。</el-checkbox>
        </div>
        <div class="sms-btn">
          <el-button type="infor" @click="onSubmit">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </Row>
    </Form>
  </Card>
</template>