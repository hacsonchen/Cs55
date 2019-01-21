<template>
  <div class="success">
    <img src="../../assets/images/center/suc.png" alt="">

    <h3>恭喜修改成功</h3>
    <p>系统会在
      <span class="count">{{totalTime}}</span> 秒后自动跳转到个人信息页
      <span class="back" @click="back">返回个人信息页。</span>
    </p>

  </div>
</template>

<script>
export default {
  name: 'Success',
  data() {
    return {
      totalTime: 3
    }
  },
  mounted() {
    this.countDown()
  },
  methods: {
    countDown() {
      let clock = window.setInterval(() => {
        this.totalTime--
        if (this.totalTime <= 0) {
          window.clearInterval(clock)
          this.$router.push({ path: '/personal-center' })
        }
      }, 1000)
    },
    back() {
      this.$router.push({ path: '/personal-center' })
    }
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