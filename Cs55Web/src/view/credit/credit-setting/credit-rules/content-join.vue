<!-- 内容参与活跃度 -->
<template>
  <div class="contentJoin">
    <div class="ivu-table-wrapper">
      <div class="ivu-table ivu-table-default ivu-table-border">
        <div class="ivu-table-header">
          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
            <thead>
              <tr>
                <th class="ivu-table-cell">计分项目-标准项</th>
                <th class="ivu-table-cell">单项计分上限</th>
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
                  <tr class="ivu-table-row" v-if="i==1" :key="row.id">
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
                    <td class="ivu-table-cell">
                      <Form
                        :ref="'formDynamic2'+index+'-'+i"
                        v-show="row.itemCode!=301"
                        :model="row"
                        :rules="rules"
                        inline
                      >
                        <form-item>
                          <checkbox
                            v-model="row.isOneLimit"
                            @on-change="handleChange(row,'oneLimit')"
                          >上限</checkbox>
                        </form-item>
                        <form-item prop="oneLimit">
                          <input-number :disabled="!row.isOneLimit" :min="0" v-model="row.oneLimit"></input-number>
                          <span>分</span>
                        </form-item>
                      </Form>
                    </td>
                    <td class="ivu-table-cell" :rowspan="item.uMSCoinStandardOneDtos.length">
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
                  <tr class="ivu-table-row" v-else :key="row.id">
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
                    <td class="ivu-table-cell">
                      <Form
                        :ref="'formDynamic5'+index+'-'+i"
                        v-show="row.itemCode!=301"
                        :model="row"
                        :rules="rules"
                        inline
                      >
                        <form-item>
                          <checkbox
                            v-model="row.isOneLimit"
                            @on-change="handleChange(row,'oneLimit')"
                          >上限</checkbox>
                        </form-item>
                        <form-item prop="oneLimit">
                          <input-number :disabled="!row.isOneLimit" :min="0" v-model="row.oneLimit"></input-number>
                          <span>分</span>
                        </form-item>
                      </Form>
                    </td>
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
          <Form :model="tempAwardType1" :rules="rules" ref="tempAwardType1" inline>
            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
              <tbody class="ivu-table-body">
                <tr class="ivu-table-row">
                  <td class="ivu-table-cell">
                    <form-item prop>
                      <i-switch
                        v-model="tempAwardType1.isWork"
                        @on-change="handleChange(tempAwardType1,'coinAmount')"
                      ></i-switch>
                    </form-item>
                    <form-item prop="coinAmount">
                      <span>首次发表文章：</span>
                      <input-number
                        :disabled="!tempAwardType1.isWork"
                        :min="0"
                        v-model="tempAwardType1.coinAmount"
                      ></input-number>
                      <span>分</span>
                    </form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>

          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
            <tbody class="ivu-table-body">
              <template v-for="(row,i) in awardType2.uMSCoinAwardones">
                <tr class="ivu-table-row" :key="i+'-1'">
                  <td class="ivu-table-cell">
                    <Form :model="row" :rules="rules" :ref="'formDynamic6'+i" inline>
                      <Row>
                        <form-item prop v-if="i===0">
                          <i-switch
                            v-model="awardType2.isWork"
                            @on-change="handleChangeAll(awardType2, 'dayAmount','coinAmount')"
                          ></i-switch>
                        </form-item>
                        <form-item :style="{marginLeft:i===0?0:'52px'}" prop="dayAmount">
                          <span>连续</span>
                          <input-number
                            :disabled="!awardType2.isWork"
                            :min="0"
                            v-model="row.dayAmount"
                          ></input-number>
                          <span>天发表文章</span>
                        </form-item>
                        <form-item prop="coinAmount">
                          <input-number
                            :disabled="!awardType2.isWork"
                            :min="0"
                            v-model="row.coinAmount"
                          ></input-number>
                          <span>分</span>
                        </form-item>
                        <form-item v-show="awardType2.isWork">
                          <Icon
                            v-if="awardType2.uMSCoinAwardones.length<5"
                            type="ios-add-circle-outline"
                            style="margin-right:10px;"
                            size="20"
                            @click="handleAddRow(awardType2.awardType)"
                          />
                          <Icon
                            v-if="awardType2.uMSCoinAwardones.length>1"
                            type="ios-remove-circle-outline"
                            size="20"
                            @click="handleRemoveRow(awardType2.awardType,i)"
                          />
                        </form-item>
                      </Row>
                    </Form>
                  </td>
                </tr>
              </template>
              <template v-for="(row,i) in awardType3.uMSCoinAwardones">
                <tr class="ivu-table-row" :key="i+'-'+'2'">
                  <td class="ivu-table-cell">
                    <Form :model="row" :rules="rules" :ref="'formDynamic7'+i" inline>
                      <Row>
                        <form-item prop v-if="i===0">
                          <i-switch
                            v-model="awardType3.isWork"
                            @on-change="handleChangeAll(awardType3, 'dayAmount','coinAmount')"
                          ></i-switch>
                        </form-item>
                        <form-item :style="{marginLeft:i===0?0:'52px'}" prop="dayAmount">
                          <span>累计发表</span>
                          <input-number
                            :disabled="!awardType3.isWork"
                            :min="0"
                            v-model="row.dayAmount"
                          ></input-number>
                          <span>篇文章</span>
                        </form-item>
                        <form-item prop="coinAmount">
                          <input-number
                            :disabled="!awardType3.isWork"
                            :min="0"
                            v-model="row.coinAmount"
                          ></input-number>
                          <span>分</span>
                        </form-item>
                        <form-item v-show="awardType3.isWork">
                          <Icon
                            v-if="awardType3.uMSCoinAwardones.length<5"
                            type="ios-add-circle-outline"
                            style="margin-right:10px;"
                            size="20"
                            @click="handleAddRow(awardType3.awardType)"
                          />
                          <Icon
                            v-if="awardType3.uMSCoinAwardones.length>1"
                            type="ios-remove-circle-outline"
                            size="20"
                            @click="handleRemoveRow(awardType3.awardType,i)"
                          />
                        </form-item>
                      </Row>
                    </Form>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div class="toolbar toolbar-2 toolbar-bottom-2" style="position:relative;">
      <Button type="default" :loading="spinShow" @click="handleReset">重置当页设置</Button>
      <Button type="primary" :loading="spinShow" @click="handleSave">保存当页设置</Button>
    </div>
  </div>
</template>

<script>
import { getCoinRule, postCoinStandardRule } from "@/api/credit/credit-rule";
import {
  validateNumber,
  resetFieldsInPage,
  validateInPage
} from "@/libs/form-validate";
export default {
  name: "content_join_page",
  components: {},
  data() {
    return {
      parentMsg: "消费激励策略配置",
      itemBelong: 2,
      spinShow: false,
      first: {},
      standard: [],
      awardType1: {},
      tempAwardType1: {
        isWork: false,
        coinAmount: 0
      },
      awardType2: [],
      awardType3: [],
      rules: {
        limitAmount: [
          { validator: validateNumber(), trigger: "change" },
          { validator: validateNumber(), trigger: "blur" }
        ],
        oneLimit: [
          { validator: validateNumber(), trigger: "change" },
          { validator: validateNumber(), trigger: "blur" }
        ],
        coinAmount: [
          { validator: validateNumber(), trigger: "change" },
          { validator: validateNumber(), trigger: "blur" }
        ],
        dayAmount: [
          { validator: validateNumber(), trigger: "change" },
          { validator: validateNumber(), trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    handleChangeAll(r, p1, p2) {
      r.uMSCoinAwardones.forEach(c => {
        if (c[p1] == null) {
          c[p1] = 0;
        }
        if (c[p2] == null) {
          c[p2] = 0;
        }
      });
    },
    handleChange(r, p) {
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
          const awards = res.data.coinAwards;
          this.awardType1 = awards.find(c => c.awardType === 1);
          this.awardType2 = awards.find(c => c.awardType === 2);
          this.awardType3 = awards.find(c => c.awardType === 3);
          this.tempAwardType1.isWork = this.awardType1.isWork;
          this.tempAwardType1.coinAmount = this.awardType1.uMSCoinAwardones[0].coinAmount;
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
      this.awardType1.isWork = this.tempAwardType1.isWork;
      this.awardType1.uMSCoinAwardones[0].coinAmount = this.tempAwardType1.coinAmount;
      this.spinShow = true;
      postCoinStandardRule({
        coinAllCounts: this.standard,
        coinAwards: [this.awardType1, this.awardType2, this.awardType3]
        // commonAwards: this.commonAwards,
        // itemBelong: this.itemBelong
      })
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
    // 奖励项部分
    handleAddRow(type) {
      console.log(this.awardType2);
      let item =
        type === 2
          ? this.awardType2.uMSCoinAwardones
          : this.awardType3.uMSCoinAwardones;
      console.log(item);
      item.push({
        dayAmount: 1,
        coinAmount: 1
      });
    },
    handleRemoveRow(type, index, i) {
      if (type === 2) {
        this.awardType2.uMSCoinAwardones.splice(i, 1);
      } else {
        this.awardType3.uMSCoinAwardones.splice(i, 1);
      }
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.contentJoin {
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
