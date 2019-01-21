<template>
  <div class="amend-phone">
    <Steps :current="1">
      <Step title="验证身份" content=""></Step>
      <Step title="修改手机号" content=""></Step>
      <Step title="完成" content=""></Step>
    </Steps>
    <Row class="label-right">
      <i-col :span="3" :offset="5">
        <span class="_label">手机号码：</span>
      </i-col>
      <i-col :span="6">
        <Input v-model="phone" />
      </i-col>
    </Row>
    <Row class="label-right">
      <i-col :span="3" :offset="5">
        <span class="_label">验证码：</span>
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
  </div>
</template>

<script>
let phone = false
let imgCode = false
let mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ //手机号格式校验
import { EditPhone } from '@/api/user'
import Sidentify from './identify'

export default {
  name: 'amend-phone',
  data() {
    return {
      phone: '',
      imgCode: '',
      identifyCodes:
        '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM',
      identifyCode: '',
      clickFlag: true
    }
  },
  components: { Sidentify },
  mounted() {
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
    // 数据校验相关
    // 校验手机号
    cheackPhone() {
      if (this.phone == '') {
        this.$Message.warning('请输入手机号')
        phone = false
      } else if (!mobile.test(this.phone)) {
        this.$Message.warning('请输入正确格式手机号')
        phone = false
      } else {
        phone = true
      }
      return phone
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
    //  登陆相关
    verify() {
      if (this.clickFlag) {
        let data = {
          phone: this.phone
        }
        if (this.cheackPhone() && this.cheackImgCode()) {
          this.clickFlag = false
          EditPhone(data)
            .then(res => {
              this.$router.push({ path: 'success' })
            })
            .catch(err => {
              this.$Message.warning(err.response.data.message)
            })
        }
      } else {
        this.clickFlag = true
      }
    }
  }
}
</script>

<style lang="less">
.amend-phone {
  text-align: center;
  padding: 100px 40px;
  background: #fff;
  .label-right {
    margin: 24px 0;
  }
  .code {
    cursor: pointer;
    margin: 0 8px;
  }
  .changcode {
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
  .changcode {
    color: #53b1ff;
    cursor: pointer;
  }
  .ivu-steps {
    margin: 40px 0;
  }
  .code_wrap {
    display: flex;
    align-items: center;
  }
}
</style>
