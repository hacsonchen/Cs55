<template>
  <div class="app-main box">
    <div class="box1">
      <div>
        <Row class="setting-pic">
          <Avatar :src="baseInfo.picture
        ? baseInfo.picture
        : 'data:image/png;base64,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'" />
        </Row>

        <Row class="setting-per">
          <label>{{baseInfo.adminName}}</label>
        </Row>

        <Row class="setting-per">
          <!-- <span>ID：{{baseInfo.id}}</span> -->
        </Row>

        <Row class="setting-per">
          <router-link :to="{path:'amend-password'}">
            <Button>修改密码</Button>
          </router-link>
        </Row>
      </div>
    </div>
    <div class="box2">
      <h4>通知设置</h4>
      <div class="setting-role">
        <div class="setting-role-box1">
          <Row>
            <i-col :span="5">
              <span class="labl-left">手机号码：</span>
            </i-col>
            <i-col :span="15">
              <Input v-model="baseInfo.phone" :disabled="!baseInfo.isBindingPhone" />
            </i-col>
          </Row>
          <Row>
            <i-col :span="19" :offset="5"> 短信通知：
              <span @click="disablePhone">
                <i-switch v-model="baseInfo.smsSwitch" @on-change="changePhone" :disabled="baseInfo.isBindingPhone">
                </i-switch>
              </span>开启后，站内通知会以短信形式同步通知。
            </i-col>
          </Row>
        </div>

        <div class="setting-role-box2">
          <template v-if="!baseInfo.isBindingPhone">
            <img class="hint_icon" src="../../assets/images/center/succeed.png" alt="">
            <Button class="color-green ">已验证</Button>
            <span class="border-col"></span>
            <Button class="color-bule" @click="clickPhoneEdit">修改</Button>
          </template>
          <template v-else>
            <img class="hint_icon" src="../../assets/images/center/warn.png" alt="">
            <Button class="color-orange">未验证</Button>
            <span class="border-col"></span>
            <Button class="color-bule" @click="clickPhoneBinding">设置
            </Button>
          </template>

        </div>
      </div>

      <div class="setting-role">
        <div class="setting-role-box1">
          <Row>
            <i-col :span="5">
              <span class="labl-left">邮箱地址：</span>
            </i-col>
            <i-col :span="15">
              <Input v-model="baseInfo.email" :disabled="EmailType===1 || EmailType===3" />
            </i-col>
          </Row>
          <Row>
            <i-col :span="19" :offset="5">
              邮件通知：
              <span @click="disableEmail">
                <i-switch v-model="baseInfo.emailSwitch" :disabled="baseInfo.isBindingEmail" @on-change=changeEmail>
                </i-switch>
              </span>
              开启后，站内通知会以短信形式同步通知。
            </i-col>
          </Row>
        </div>
        <div class="setting-role-box2">
          <template v-if="!baseInfo.isBindingEmail">
            <img class="hint_icon" src="../../assets/images/center/succeed.png" alt="">
            <Button class="color-green ">已验证</Button>
            <span class="border-col"></span>
            <Button class="color-bule" @click="clickEmailEdit">解绑</Button>
          </template>
          <template v-else>
            <img class="hint_icon" src="../../assets/images/center/warn.png" alt="">
            <Button class="color-orange">{{EmailBtnMsg}}</Button>
            <span class="border-col"></span>
            <Button class="color-bule" :disabled="EmailType===3" @click="clickEmailBinding">绑定</Button>
          </template>
        </div>
      </div>

      <div class="setting-role">
        <div class="setting-role-box1">
          <Row>
            <i-col :span="5">
              <span class="labl-left">微信：</span>
            </i-col>
            <i-col :span="15">
              <Input v-model="baseInfo.weChat" disabled />
            </i-col>
          </Row>
          <Row>
            <i-col :span="19" :offset="5">
              微信通知：
              <span @click="disableWeChat">
                <i-switch v-model="baseInfo.weChatSwitch" :disabled="baseInfo.isBindingWeChat" @on-change="changeWechat" size="small">
                </i-switch>
              </span> 开启后，站内通知会以短信形式同步通知。
            </i-col>
          </Row>
        </div>
        <div class="setting-role-box2">
          <template v-if="!baseInfo.isBindingWeChat">
            <img class="hint_icon" src="../../assets/images/center/succeed.png" alt="">
            <Button class="color-green ">已验证</Button>
            <span class="border-col"></span>
            <Button class="color-bule" @click="clickWechatEdit">修改</Button>
          </template>
          <template v-else>
            <img class="hint_icon" src="../../assets/images/center/warn.png" alt="">
            <Button class="color-orange">未验证</Button>
            <span class="border-col"></span>
            <Button class="color-bule" @click="clickWechatBinding">设置</Button>
          </template>
        </div>
      </div>
    </div>
    <Modal v-model="relieveEmail" title="解绑邮箱" @on-ok="ok">
      <p>解除绑定后，您的邮箱将无法用作登录、接收通知、修改密码和忘记密码的凭证。</p>
      <p>是否确认解除绑定？</p>
    </Modal>
    <Modal v-model="emailTosat" @on-visible-change="emailTosatClose" title="已发送验证邮件">
      <p>已发送验证邮件至：{{baseInfo.email}}</p>
      <p>验证邮件24小时内有效，请尽快登录您的邮箱点击验证链接完成验证。</p>
    </Modal>
  </div>
</template>
<script>
import {
  GetPersonalCenterInfo,
  setSwitch,
  SendEmail,
  UnBindingEmail
} from '@/api/user'
export default {
  name: 'personalcenter',
  components: {},
  data() {
    return {
      baseInfo: {},
      EmailBtnMsg: '未验证',
      // 1.绑定邮箱 2.未绑定邮箱 3.绑定中
      EmailType: 1,
      relieveEmail: false,
      emailTosat: false
    }
  },
  mounted() {
    this.getPersonalCenterInfo()
  },
  methods: {
    clickPasswordEdit() {
      // this.$router.push({ path: 'passwordEdit' })
    },
    clickPhoneEdit() {
      this.$router.push({ path: 'phone-verify' })
    },
    ok() {
      UnBindingEmail().then(res => {
        this.$Message.info('解绑成功')
        this.baseInfo.email = ''
        this.baseInfo.isBindingEmail = true
        this.EmailType = 2
      })
    },
    clickEmailEdit() {
      this.relieveEmail = true

      // this.$router.push({ path: 'phone-verify' })
    },
    clickWechatEdit() {},
    clickPhoneBinding() {
      this.$router.push({ path: 'phone-verify' })
    },
    clickEmailBinding() {
      let data = {
        email: this.baseInfo.email
      }
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (this.baseInfo.email && re.test(this.baseInfo.email)) {
        SendEmail(data).then(res => {
          this.emailTosat = true
          this.$Message.info('请登录邮箱激活')
        })
      } else {
        this.$Message.info('请输入正确格式邮箱')
      }
    },
    clickWechatBinding() {},
    disablePhone() {
      if (this.baseInfo.isBindingPhone) {
        this.$Message.info('未绑定电话，无法开启短信')
      }
    },
    changePhone(status) {
      let data = {
        type: 1,
        tswitch: status
      }
      setSwitch(data).then(res => {})
    },

    disableEmail() {
      if (this.baseInfo.isBindingEmail) {
        this.$Message.info('未绑定邮箱，无法开启邮箱通知')
      }
    },
    changeEmail(status) {
      let data = {
        type: 2,
        tswitch: status
      }
      setSwitch(data).then(res => {})
    },

    disableWeChat() {
      if (this.baseInfo.isBindingWeChat) {
        this.$Message.info('未绑定微信，无法开启微信通知')
      }
    },

    changeWechat(status) {
      let data = {
        type: 3,
        tswitch: status
      }
      SetSwitch(data).then(res => {})
    },
    handlewechatDialogClose(done) {
      done()
    },
    getPersonalCenterInfo() {
      GetPersonalCenterInfo().then(res => {
        this.baseInfo = res.data
        if (this.baseInfo.isBindingEmail) {
          this.EmailType = 2
        } else {
          this.EmailType = 1
        }
        // console.log(this.EmailType)
      })
    },
    emailTosatClose(type) {
      if (!type) {
        this.EmailBtnMsg = '验证中'
        this.EmailType = 3
      }
    }
  }
}
</script>

<style scoped  lang="less">
.app-main {
  border-radius: 2px;
  background: #fff;
  padding-top: 35px;
  h4 {
    font-size: 14px;
    color: #262626;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 8px;
    margin-left: 12px;
  }
  .ivu-switch {
    width: 28px;
    height: 16px;
    margin-right: 16px;
  }
  .ivu-switch:after {
    content: '';
    width: 16px;
    height: 16px;
    // left: 12px;
    top: -1px;
    border-radius: 100%;
  }
  .ivu-switch-checked:after {
    left: 10px;
  }
}
.labl-left {
  line-height: 32px;
}
.box {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-box;
  justify-content: space-between;
}
.box1 {
  width: 200px;
  border-right: 1px solid #d9d9d9;
}
.box2 {
  -webkit-box-flex: 1;
  padding-left: 30px;
  height: 532px;
  margin-right: 40px;
  .ivu-btn {
    border: none;
    padding: 5px !important;
  }
}
.labl-left {
  color: #262626;
}
.ivu-col {
  margin-top: 10px;
}
.msg-time {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.setting-per {
  text-align: center;
  margin-top: 10px;
}
.hint_icon {
  width: 24px;
  height: auto;
  vertical-align: middle;
  margin-right: 26px;
}
.setting-pic {
  text-align: center;
  margin-bottom: 24px;
  .ivu-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.setting-role {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-box;
  justify-content: space-between;
  padding: 25px 0;
  border-bottom: 1px dashed #e9e9e9;
}
.setting-role-box1 {
  width: 500px;
}
.setting-role-box2 {
  -webkit-box-flex: 1;
  text-align: right;
}
.icon-size {
  font-size: 24px;
  margin-right: 10px;
}
.color-orange {
  color: #faad14;
  cursor: auto;
}
.color-bule {
  color: #409eff;
  margin-left: 5px;
}
.color-green {
  color: #51c41a;
  cursor: auto;
}
.border-col {
  border-style: none none none dashed;
  border-width: 1px;
  border-color: #d9d9d9;
}
.qr-div {
  text-align: center;
}
.img-head {
  width: 100%;
}
</style>