<template>
  <div class="sms-setting">
    <Card class="box-card" :dis-hover="true">
      <p slot="title">节点短信设置</p>
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100">
        <Row>
          <FormItem label="事件节点：" prop="事件节点">手机解绑提醒</FormItem>
          <FormItem label="业务场景：" prop="业务场景">当会员解绑手机号码，系统将向会员发送该短信，提醒用户手机已经解除绑定。
            <br>
            以下为默认短信，可以在本地进行编辑后，讲文本复制到短信平台的模版内。{}内为短信参数，编辑时请勿修改。
          </FormItem>
          <FormItem label="短信模板：" prop="短信模板">
            <textarea style="width:50%;height:130px;float:left">
            亲爱的会员${UserName}，您的手机已经成功解除绑定，以后将不再受到系统通知。如需短信通知，请重新绑定手机号码。
            </textarea>
            <div class="sms-btm">
              <Button @click="onSubmit">重置默认短信</Button>
              <Button type="primary" @click="onSubmit">复制文本</Button>
              <Button type="primary" @click="onSubmit">编剧</Button>
            </div>
            <div style="clear:both;"></div>
            <div>
              ${UserName}=会员名称
              <span style="color:red;">｛｝内为固定参数内容，请勿改动。</span>
            </div>
          </FormItem>
          <div class="transverse-line"></div>
          <div class="sms-label">请将上方短信内容复制到短信模版内。保证短信平台与该模版一致。</div>
          <FormItem label="短信模板编号" prop="短信模板编号">
            <Row>
              <Col :span="6">
                <Input v-model="ruleForm.nunber"></Input>
              </Col>
              <Col :span="6">
                <Button style="margin-left:20px;" type="primary" class @click="onSubmit">测试</Button>
              </Col>
            </Row>
            <Row>
              还没有模版？
              <a herf class="sms-text-a">马上设置</a>
            </Row>
          </FormItem>
          <div class="sms-label color-red">短信模版审核需要一定时间，如果短信测试不成功，请先确认短信模版是否已经审核通过。</div>
        </Row>
      </Form>
      <div class="toolbar toolbar-bottom">
        <Button @click="onSubmit">取消</Button>
        <Button type="primary" @click="onSubmit">保存</Button>
      </div>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style  lang="less">
.sms-setting {
  .sms-btm {
    button {
      margin-left: 16px;
    }
  }

  .transverse-line {
    width: 100%;
    height: 1px;
    border: 1px solid #ebeef5;
  }
  .sms-label {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .color-red {
    color: red;
  }
  .sms-text-a {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #337ab7;
  }
}
</style>


