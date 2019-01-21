<!-- 内容参与活跃度 -->
<template>
  <div class="basicInfo">
    <div class="ivu-table-wrapper">
      <div class="ivu-table ivu-table-default ivu-table-border">
        <div class="ivu-table-header">
          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
            <thead>
              <tr>
                <th class="ivu-table-cell">计分项目-标准项</th>
                <!-- <th class="ivu-table-cell">
                  单项计分上限
                </th>-->
                <th class="ivu-table-cell">总分计分上限</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="ivu-table-body">
          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
            <tbody class="ivu-table-body">
              <template v-for="(item,index) in standard">
                <template v-for="(row ,i) in item.uMSCoinStandardOneDtos">
                  <tr class="ivu-table-row" v-if="i==1" :key="i">
                    <td class="ivu-table-cell">
                      <Form :ref="'formDynamic1'+index+'-'+i" :model="row" :rules="rules" inline>
                        <form-item prop="isWork">
                          <i-switch
                            v-model="row.isWork"
                            @on-change="handleChange(row,'coinAmount')"
                          ></i-switch>
                        </form-item>
                        <form-item prop="coinAmount">
                          <span>{{row.itemName}}</span>
                          <input-number :disabled="!row.isWork" :min="0" v-model="row.coinAmount"></input-number>
                          <span>{{row.unit}}</span>
                        </form-item>
                      </Form>
                    </td>
                    <!-- <td class="ivu-table-cell">
                      <Form :ref="'formDynamic2'+index+'-2-'+i"
                            v-show="row.itemCode!=301"
                            :model="row"
                            :rules="rules"
                            inline>
                        <form-item>
                          <checkbox v-model="row.isOneLimit"
                                    @on-change="handleChange(row,'oneLimit')">上限</checkbox>
                        </form-item>
                        <form-item prop="oneLimit">
                          <input-number :disabled="!row.isOneLimit"
                                        :min='0'
                                        v-model="row.oneLimit"></input-number>
                          <span>分</span>
                        </form-item>
                      </Form>
                    </td>-->
                    <td class="ivu-table-cell" :rowspan="item.uMSCoinStandardOneDtos.length">
                      <!--{{}} -->
                      <Form :ref="'formDynamic3'+index" :model="item" :rules="rules" inline>
                        <form-item>
                          <checkbox
                            v-model="item.isAllLimit"
                            @on-change="handleChange(item,'limitAmount')"
                          >上限</checkbox>
                        </form-item>
                        <form-item prop="limitAmount">
                          <input-number
                            :disabled="!item.isAllLimit"
                            :min="0"
                            v-model="item.limitAmount"
                          ></input-number>
                          <span>分</span>
                        </form-item>
                      </Form>
                    </td>
                  </tr>
                  <tr class="ivu-table-row" v-else :key="i">
                    <td class="ivu-table-cell">
                      <Form :ref="'formDynamic4'+index+'-'+i" :model="row" :rules="rules" inline>
                        <form-item prop="isWork">
                          <i-switch
                            v-model="row.isWork"
                            @on-change="handleChange(row,'coinAmount')"
                          ></i-switch>
                        </form-item>
                        <form-item prop="coinAmount">
                          <span>{{row.itemName}}</span>
                          <input-number :disabled="!row.isWork" :min="0" v-model="row.coinAmount"></input-number>
                          <span>{{row.unit}}</span>
                        </form-item>
                      </Form>
                    </td>
                    <!-- <td class="ivu-table-cell">
                      <Form :ref="'formDynamic5'+index+'-'+i"
                            v-show="row.itemCode!=301"
                            :model="row"
                            :rules="rules"
                            inline>
                        <form-item>
                          <checkbox v-model="row.isOneLimit"
                                    @on-change="handleChange(row,'oneLimit')">上限</checkbox>
                        </form-item>
                        <form-item prop="oneLimit">
                          <input-number :disabled="!row.isOneLimit"
                                        :min='0'
                                        v-model="row.oneLimit"></input-number>
                          <span>分</span>
                        </form-item>
                      </Form>
                    </td>-->
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>

    <div class="ivu-table-wrapper body-bottom">
      <div class="ivu-table ivu-table-default ivu-table-border">
        <div class="ivu-table-header">
          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
            <thead>
              <tr>
                <th class="ivu-table-cell">计分项目-奖励项</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="ivu-table-body">
          <Form :model="tempFirst" ref="formDynamic6" :rules="rules" inline>
            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
              <tbody class="ivu-table-body">
                <tr class="ivu-table-row">
                  <td class="ivu-table-cell">
                    <form-item prop>
                      <i-switch
                        v-model="tempFirst.isWork"
                        @on-change="handleChangeFirst(tempFirst)"
                      ></i-switch>
                    </form-item>
                    <form-item prop="coinAmount">
                      <span>完善全部基础信息：</span>
                      <input-number
                        :disabled="!tempFirst.isWork"
                        :min="0"
                        v-model="tempFirst.coinAmount"
                      ></input-number>
                      <span>分</span>
                    </form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div class="toolbar toolbar-2 toolbar-bottom-2" style="bottom:auto">
      <Button type="default" :loading="spinShow" @click="handleReset">重置当页设置</Button>
      <Button type="primary" :loading="spinShow" @click="handleSave">保存当页设置</Button>
    </div>
  </div>
</template>

<script>
import { getCoinRule, postCoinStandardRule } from "@/api/credit/credit-rule";
import {
  validateNull,
  resetFieldsInPage,
  validateInPage
} from "@/libs/form-validate";
export default {
  name: "basic_info_page",
  components: {},
  data() {
    return {
      parentMsg: "消费激励策略配置",
      spinShow: true,
      itemBelong: 1,
      standard: [],
      first: {},
      tempFirst: {
        coinAmount: 0,
        isWork: false
      },
      commonAwards: [],
      rules: {
        limitAmount: [...validateNull()],
        oneLimit: [...validateNull()],
        coinAmount: [...validateNull()]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    const isMenu = this.$store.state.app.isMenu;
    if (isMenu) {
      this.fetchData();
    }
  },
  methods: {
    handleChangeFirst(first) {
      console.log(first);
      if (first.coinAmount == null) {
        first.coinAmount = 0;
      }
    },
    handleChange(r, p) {
      console.log(r, p);
      if (r[p] == null) {
        r[p] = 0;
      }
    },
    handleReset() {
      resetFieldsInPage(this.$refs);
      this.fetchData();
    },
    fetchData() {
      this.spinShow = true;
      getCoinRule(this.itemBelong)
        .then(res => {
          this.standard = res.data.coinAllCounts;
          this.first = res.data.coinAwards[0];
          this.tempFirst.coinAmount = this.first.uMSCoinAwardones[0].coinAmount;
          this.tempFirst.isWork = this.first.isWork;
          this.spinShow = false;
        })
        .catch(() => {
          this.spinShow = false;
          this.$Message.error("出现异常，请重试");
        });
    },
    handleSave() {
      let isValid = validateInPage(this.$refs);
      if (!isValid) {
        this.$Message.warning("请检查输入!");
        return false;
      }
      this.spinShow = true;
      this.first.isWork = this.tempFirst.isWork;
      this.first.uMSCoinAwardones[0].coinAmount = this.tempFirst.coinAmount;
      postCoinStandardRule({
        coinAllCounts: this.standard,
        coinAwards: [this.first]
        // commonAwards: this.commonAwards,
        // itemBelong: this.itemBelong
      })
        .then(res => {
          this.spinShow = false;
          if (res.code === 1) {
            this.$Message.success("保存成功");
          } else {
            this.$Message.error(res.message);
          }
        })
        .catch(() => {
          this.spinShow = false;
          this.$Message.error("出现异常，请重试");
        });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.basicInfo {
  position: relative;
  .setting_wrap {
    margin-left: 32px;
  }
  .el-table {
    width: 95% !important;
    margin: 20px auto;
  }
  .el-input {
    width: 88px;
    height: 32px;
  }
  .setting_wrap {
    margin-bottom: 19px;
  }
  p {
    margin-top: 19px;
    color: #595959;
    display: flex;
    align-items: center;
  }
  .el-switch {
    margin-right: 19px;
  }
}
</style>
