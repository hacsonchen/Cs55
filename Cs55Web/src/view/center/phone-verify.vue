<template>
  <div class="container">
    <Steps :current="0">
      <Step title="验证身份" content=""></Step>
      <Step title="修改手机号" content=""></Step>
      <Step title="完成" content=""></Step>
    </Steps>
    <i-col :offset="1">
      <Row class="label-center">
        <i-col :span="24">
          <h4>为了保护账号安全，需要验证手机有效性</h4>
        </i-col>
      </Row>
      <Row class="label-center username">
        <i-col :span="24">
          账号
          <span class="danger"> {{username}} </span>为确认是你本人操作，请完成以下验证
        </i-col>
      </Row>
      <Row class="label-right">
        <i-col :span="3" :offset="5">
          <span class="_label">手机号码：</span>
        </i-col>
        <i-col :span="6" style="text-align:left;">
          {{phone}}
        </i-col>
      </Row>
      <Row class="label-right">
        <i-col :span="3" :offset="5">
          <span class="_label">请填写登陆密码：</span>
        </i-col>
        <i-col :span="6">
          <Input v-model="password" type="password" />
        </i-col>
        <!-- <i-col :span="3">
          <Button>获取验证码</Button>
        </i-col> -->
      </Row>

      <!-- <p>验证码发送到你的手机，15分钟以内输入有效，验证码等同于密码，打死都不能告诉别人</p> -->
      <Row class="label-right">
        <i-col :span="3" :offset="5">
          <span class="_label">请填写验证码：</span>
        </i-col>
        <i-col :span="6">
          <Input v-model="imgCode" />
        </i-col>
        <i-col :span="6" class="code_wrap">
          <div class="code" @click="refreshCode">
            <Sidentify :identifyCode="identifyCode"></Sidentify>
          </div>

          看不清？
          <span @click="refreshCode" class="changcode">换一张</span>
        </i-col>
      </Row>
      <Row>
        <i-col :offset="8" :span="9">
          <Button @click="verify" style="width:100%" type="primary">确定</Button>
        </i-col>
      </Row>
    </i-col>

  </div>
</template>

<script>
import { ValPhone, GetPersonalCenterInfo } from '@/api/user'
import Sidentify from './identify'
let imgCode = false
let passWord = false
export default {
  name: 'phonebinding',
  data() {
    return {
      phone: '',
      password: '',
      imgCode: '',
      identifyCodes:
        '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM',
      identifyCode: '',
      clickFlag: true,
      username: ''
    }
  },
  components: { Sidentify },
  mounted() {
    this.getPersonalCenterInfo()
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    //  随机验证码相关
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
      console.log(this.identifyCode.toLowerCase())
    },

    // 获取数据
    getPersonalCenterInfo() {
      GetPersonalCenterInfo().then(res => {
        this.phone = res.data.phone
        this.username = res.data.adminName
      })
    },
    //校验密码
    cheackPassWord() {
      if (this.password == '') {
        this.$Message.warning('请输入密码')
        passWord = false
      } else {
        passWord = true
      }
      return passWord
    },
    // 校验图片验证码
    cheackImgCode() {
      if (this.imgCode == '') {
        this.$Message.warning('请输入图片验证码')
        imgCode = false
      } else if (this.imgCode != this.identifyCode.toLowerCase()) {
        this.$Message.warning('图片验证码错误')
        this.refreshCode()
        imgCode = false
      } else {
        imgCode = true
      }
      return imgCode
    },

    verify() {
      let data = {
        phone: this.phone,
        password: this.password
      }
      if (this.clickFlag) {
        if (this.cheackPassWord() && this.cheackImgCode()) {
          ValPhone(data)
            .then(res => {
              this.$router.push({ path: 'amend-phone' })
            })
            .catch(err => {
              this.$Message.warning(err.response.data.message)
            })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  text-align: center;
  padding: 100px 40px;
  background: #fff;
  .Row {
    margin: 20px;
  }

  .label-center {
    text-align: center;
    align-items: center;
    display: flex;
  }
  h4 {
    font-size: 16px;
    color: #262626;
    margin-top: 47px;
    margin-bottom: 24px;
  }
  .username {
    font-size: 14px;
    color: #595959;
    .danger {
      color: red;
    }
    margin: 24px 0;
  }
  .phone {
    color: rgba(0, 0, 0, 0.85);
  }
  .code {
    cursor: pointer;
    margin: 0 8px;
  }
  .changcode {
    color: #53b1ff;
    cursor: pointer;
  }
  .code_wrap {
    display: flex;
    align-items: center;
  }
  .label-right {
    margin: 24px 0;
  }
  .ivu-col {
    ._label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      min-width: 126px;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>
