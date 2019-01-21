<template>
  <div class="behavior">
    <Card :padding="20"
          class="level_explain">
      <p slot="title">行为活跃策略配置</p>
      <!-- <div class="_btn">
        <Button type="primary">保存当页</Button>
        <Button>重置</Button>
      </div> -->
      <tabs type="card">
        <tab-pane label="消费积分">
          <consume-credit></consume-credit>
        </tab-pane>
        <tab-pane label="基础信息积分">
          <basic-info />
        </tab-pane>
        <tab-pane label="内容参与积分">
          <content-join />
        </tab-pane>
        <tab-pane label="活动参与积分">
          <cam-join />
        </tab-pane>
        <tab-pane label="行为积分">
          <behavior-info />
        </tab-pane>
      </tabs>
    </Card>
  </div>
</template>

<script>
import consumeCredit from './credit-rules/consume-credit'
import basicInfo from './credit-rules/basic-info'
import contentJoin from './credit-rules/content-join'
import behaviorInfo from './credit-rules/behavior-info'
import camJoin from './credit-rules/cam-join'
export default {
  name: 'credit_rules_page',
  components: {
    consumeCredit,
    basicInfo,
    contentJoin,
    behaviorInfo,
    camJoin
  },
  data() {
    return {
      parentMsg: ' 成长值有效期',
      value1: true,
      value2: true,
      dialogVisible: false,
      ruleForm: {
        type: 0,
        user: 0
      },
      rules: {
        type: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    changeStatus() {
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less">
.behavior {
  .el-tabs {
    width: 95% !important;
    margin: 20px auto;
    position: relative;
    box-shadow: none;
    ._btn {
      position: absolute;
      z-index: 9999;
      top: 6px;
      right: 0;
    }
    .el-tabs__content {
      position: static;
    }
  }

  .behavior_name {
    display: inline-block;
    width: 100%;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-checkbox {
    color: rgba(0, 0, 0, 0.65);
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  .unit {
    width: 130px;
  }
  .el-input-number {
    line-height: 32px;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: #fff;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: rgba(0, 0, 0, 0.65);
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px 4px 0 0;
    margin-right: 2px;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #05cfa4;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
    border-bottom: none;
  }
  .main-container .el-input-number__increase,
  .main-container .el-input-number__decrease {
    top: 1px;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    bottom: 1px !important;
  }
}
</style>
