<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <img src="../../assets/images/logo.png" alt="">
      <Card icon="log-in" title="用户登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" ref="headerChild"></login-form>

          <p class="login-tip">其他方式登陆: <img @click="wxLogina" src="../../assets/images/login/wechat_hover.png" alt=""> </p>
        </div>
      </Card>
    </div>
    <div class="mask" v-show="showLogin">
      <p>登陆中请稍后...</p>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      showLogin: false
    }
  },
  mounted() {
    this.checkUrl()
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo', 'wxLoginUrl', 'wxLogin']),
    wxLogina() {
      this.wxLoginUrl({
        appId: 'wx18093ea3b029bd73',
        callBackUrl: window.location.href
      }).then(res => {})
    },
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password })
        .then(res => {
          this.getUserInfo().then(res => {
            console.log(res)
            this.$router.push({
              name: this.$config.homeName
            })
          })
        })
        .catch(err => {
          this.$refs.headerChild.loading = false
          let msg = err.response.data.message
          this.$Message.error(msg)
        })
    },
    checkUrl() {
      if (this.$route.query.code && this.$route.query.code != '') {
        this.showLogin = true
        this.wxLogin({
          appId: 'wx18093ea3b029bd73',
          code: this.$route.query.code,
          state: this.$route.query.state
        }).then(res => {})
      }
    }
  }
}
</script>
