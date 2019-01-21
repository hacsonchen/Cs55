<template>
  <div class="amend-phone">
    <header/>
    <Row class="label-right">
      <i-col :span="3" :offset="5">
        <span class="_label">请输入旧密码：</span>
      </i-col>
      <i-col :span="6">
        <Input v-model="oldpassWord" type="password" />
      </i-col>
      <i-col :span="3">
        <span>忘记密码</span>
      </i-col>
    </Row>
    <Row class="label-right">
      <i-col :span="3" :offset="5">
        <span class="_label">请输入新密码：</span>
      </i-col>
      <i-col :span="6">
        <Input v-model="passWord" placeholder="密码长度8-16位" type="password" />
      </i-col>
    </Row>
    <Row class="label-right">
      <i-col :span="3" :offset="5">
        <span class="_label">确认新密码：</span>
      </i-col>
      <i-col :span="6">
        <Input placeholder="密码长度8-16位" v-model="repPassWord" type="password" />
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
import { EditPassWord } from '@/api/user'
import Sidentify from './identify'
import header from './user-header'
let imgCode = false
let passWord = false
let oldpassWord = false
let repPassWord = false
let password = /^(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{8,16}$/
export default {
  name: 'amend-password',
  data() {
    return {
      passWord: '',
      oldpassWord: '',
      repPassWord: '',
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

    //校验密码格式
    cheackOldPassWord() {
      if (this.oldpassWord == '') {
        this.$Message.warning('请输入旧密码')
        oldpassWord = false
      } else {
        oldpassWord = true
      }
      return oldpassWord
    },
    cheackPassWord() {
      if (this.passWord == '') {
        this.$Message.warning('请输入新密码')
        passWord = false
      } else if (!password.test(this.passWord)) {
        this.$Message.warning(
          '密码长度8~16位，支持英文字母大小写，下划线，数字至少需要其中两种组成'
        )
        passWord = false
      } else {
        passWord = true
      }
      return passWord
    },
    cheackRepPassWord() {
      if (this.repPassWord == '') {
        this.$Message.warning('请确认密码')
        repPassWord = false
      } else if (this.repPassWord != this.passWord) {
        this.$Message.warning('两次密码不一致')
        repPassWord = false
      } else {
        repPassWord = true
      }
      return repPassWord
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
        passWord: this.passWord,
        oldpassWord: this.oldpassWord
      }
      if (this.clickFlag) {
        if (
          this.cheackOldPassWord() &&
          this.cheackPassWord() &&
          this.cheackRepPassWord() &&
          this.cheackImgCode()
        ) {
          console.log(data)
          EditPassWord(data)
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
