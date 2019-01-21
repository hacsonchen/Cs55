<template>
  <div class="rules">
    <Card :padding="20"
          class="level_explain">
      <p slot="title">{{parentMsg}}</p>
      <show-detail type='3'></show-detail>
    </Card>
  </div>
</template>

<script>
import showDetail from '@/view/level/level-setting/rules-show/show-detail'
// import levelFuture from './level-future'
export default {
  name: 'rules_show_page',
  components: {
    showDetail
    // levelFuture
  },
  data() {
    return {
      parentMsg: '积分规则展示'
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.rules {
  .el-table {
    width: 95% !important;
    margin: 20px auto;
  }
}
</style>
