<template>
  <Form ref="loginForm" :model="form" :rules="ruleValidate" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入账号">
      <span slot="prepend">
        <Icon :size="16" type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14" type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem class="login_btn">
      <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>

    </FormItem>
    <div class="btn_wrap">
      <span>
        <Checkbox v-model="remember" @on-change="handleRemember">&nbsp;&nbsp;记住密码</Checkbox>
      </span>
      <span class="forget" @click="warning">忘记密码</span>
    </div>
  </Form>
</template>
<script>
let password = /^(?!^\d+$)(?!^[A-Za-z]+$)(?!^_+$)^\w{8,16}$/
export default {
  name: 'LoginForm',

  data() {
    const validatePass = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('请输入密码'))
        this.loading = false
      } else if (!password.test(value)) {
        this.loading = false
        callback(
          new Error(
            '密码长度8~16位，支持英文字母大小写，下划线，数字至少需要其中两种组成'
          )
        )
      } else {
        callback()
      }
    }

    return {
      loading: false,
      form: {
        userName: localStorage.userName,
        password: localStorage.password
      },
      remember: false,
      ruleValidate: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.checkRemember()
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
        if (this.remember === true) {
          localStorage.setItem('userName', this.form.userName)
          localStorage.setItem('password', this.form.password)
        } else {
          localStorage.removeItem('userName')
          localStorage.removeItem('password')
        }
      })
    },
    handleRemember() {
      if (this.remember === true) {
        localStorage.setItem('userName', this.form.userName)
        localStorage.setItem('password', this.form.password)
      } else {
        localStorage.removeItem('userName')
        localStorage.removeItem('password')
      }
    },
    checkRemember() {
      if (localStorage.userName) {
        this.remember = true
      } else {
        this.remember = false
      }
    },
    warning() {
      this.$Message.warning('请联系管理员重置密码')
    }
  }
}
</script>
