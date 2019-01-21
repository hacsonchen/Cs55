<template>
  <div class="success">
    <img src="../../assets/images/center/suc.png" alt="">

    <h3>{{msg}}</h3>
    <p v-if="msgShow">系统会在
      <span class="count">{{totalTime}}</span> 秒后自动跳转到个人信息页
      <span class="back" @click="back">返回个人信息页。</span>
    </p>

  </div>
</template>

<script>
import { EditEmail } from '@/api/user'
export default {
  name: 'Success',
  data() {
    return {
      totalTime: 3,
      msg: '恭喜绑定成功',
      msgShow: false
    }
  },
  mounted() {
    this.countDown()
  },
  methods: {
    countDown() {
      EditEmail({
        id: this.$route.params.id,
        email: this.$route.params.email
      })
        .then(res => {
          this.$Message.info('激活成功')
          this.msgShow = true
          let clock = window.setInterval(() => {
            this.totalTime--
            if (this.totalTime <= 0) {
              window.clearInterval(clock)
              this.$router.push({ path: '/personal-center' })
            }
          }, 1000)
        })
        .catch(err => {
          this.$Message.error(err.response.data.message)
          this.msg = err.response.data.message
        })
    },
    back() {}
  }
}
</script>

<style lang="less">
.success {
  text-align: center;
  padding: 100px 40px;
  h3 {
    margin: 20px 0;
  }
  .back {
    color: #05cfa4;
    cursor: pointer;
  }
}
</style>