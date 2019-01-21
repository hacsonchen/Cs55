<template>
  <div class="consume">
    <Card :padding="20" :dis-hover="true" class="level_explain body-bottom">
      <p slot="title">{{parentMsg}}</p>

      <div class="setting_wrap">
        <Form :ref="basic" :model="basic" :rules="rules" inline>
          <p>
            <FormItem prop="moneyAmount">
              <span>*基本规则：每消费&nbsp;&nbsp;</span>
              <input-number v-model="basic.moneyAmount" :min="0" placeholder="请输入"></input-number>
            </FormItem>
            <FormItem prop="growValue">
              <span>元，获得&nbsp;</span>
              <input-number v-model="basic.growValue" :min="0" placeholder="请输入"></input-number>积分
            </FormItem>
          </p>

          <p>
            <i-switch
              v-model="isWork"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @on-change="handleChangeAll(rows,'moneyAmount','coinAmount')"
            ></i-switch>
            <span>额外奖励规则：最多设置5个额外奖励规则，多个规则间不叠加，优先级别从上至下。</span>
          </p>
        </Form>
        <div class="rows">
          <Row v-for="(item,index) in rows" :key="index">
            <Form :ref="'formDynamic'+index" :model="rows[index]" :rules="rules" inline>
              <FormItem prop="moneyAmount">
                <span>消费满</span>
                <Input-number :disabled="!isWork" :min="0" v-model="item.moneyAmount"></Input-number>元，
              </FormItem>
              <FormItem prop="coinType">额外获得
                <Select :disabled="!isWork" style="width:100px;" v-model="item.coinType">
                  <Option v-for="opt in coinTypes" :value="opt.value" :key="opt.value">{{opt.label}}</Option>
                </Select>
              </FormItem>
              <FormItem prop="coinAmount">
                <Input-number :disabled="!isWork" :min="0" v-model="item.coinAmount"></Input-number>积分
              </FormItem>
              <FormItem v-show="isWork">
                <Icon
                  v-if="rows.length<5"
                  type="ios-add-circle-outline"
                  style="margin-right:10px;"
                  size="20"
                  @click="addRow"
                />
                <Icon
                  v-if="rows.length>1"
                  type="ios-remove-circle-outline"
                  size="20"
                  @click="delRow(index)"
                />
              </FormItem>
            </Form>
          </Row>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <div class="toolbar toolbar-bottom-2">
      <Button type="default" :loading="spinShow" @click="handleReset">重置当页设置</Button>
      <Button type="primary" :loading="spinShow" @click="handleSave()">保存当页设置</Button>
    </div>
  </div>
</template>

<script>
import { getCoinRule, postCoinConsumeRule } from "@/api/credit/credit-rule";
import {
  validateNumber,
  validateNull,
  resetFieldsInPage,
  validateInPage
} from "@/libs/form-validate";
export default {
  name: "consume_credit_page",
  components: {},
  data() {
    return {
      coinTypes: [
        {
          value: 1,
          label: "数值"
        },
        {
          value: 2,
          label: "百分比"
        }
      ],
      coinType: 0,
      spinShow: false,
      act: false, // 用于触发渲染
      isWork: true, // 额外奖励是否开启
      rowCount: 3,
      parentMsg: "消费激励策略配置",
      value: true,
      basic: {},
      rows: [],
      rules: {
        moneyAmount: [...validateNull()],
        coinAmount: [...validateNull()]
      }
    };
  },
  computed: {},
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
    /**
     * 当切换是否启用时，
     * 判断输入框是否为空，为空则设置0
     * 避免disable后为空验证
     */
    handleChangeAll(r, p1, p2) {
      r.forEach(c => {
        if (c[p1] == null) {
          c[p1] = 0;
        }
        if (c[p2] == null) {
          c[p2] = 0;
        }
      });
    },
    handleReset() {
      resetFieldsInPage(this.$refs);
      this.fetchData();
    },
    fetchData() {
      this.spinShow = true;
      getCoinRule(this.coinType)
        .then(res => {
          this.basic = res.data.find(c => c.ruleType === 1);
          this.rows = res.data.filter(c => c.ruleType === 2);
          this.isWork = this.rows.length > 0 ? this.rows[0].isWork : true;
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
        this.$Message.warning("请检查输入！");
        return false;
      }
      this.rows.forEach(c => (c.isWork = this.isWork));
      const data = [...this.rows, this.basic];
      this.spinShow = true;
      postCoinConsumeRule(data)
        .then(res => {
          if (res.code === 1) {
            this.$Message.success("保存成功");
          } else {
            this.$Message.error(res.message);
          }
          this.spinShow = false;
        })
        .catch(() => {
          this.spinShow = false;
          this.$Message.error("出现异常，请重试");
        });
    },

    delRow(idx) {
      this.rows.splice(idx, 1);
      this.$nextTick(() => {
        this.act = !this.act;
      });
    },
    /** 添加行 */
    addRow() {
      if (this.rows.length === 5) {
        return false;
      }
      this.rows.push({
        coinType: 1,
        isWork: this.isWork,
        growValue: 1,
        moneyAmount: 100,
        coinAmount: 100,
        ruleType: 2 // 额外奖励规则
      });

      this.$nextTick(() => {
        this.act = !this.act;
      });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.consume {
  position: relative;

  .setting_wrap {
    margin-left: 32px;
  }
  .rows {
    margin-left: 50px;
  }
  // .item-row {
  //   padding-top: 5px;
  // }
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
