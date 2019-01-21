<template>
  <div class="creditBasic">
    <Card>
      <p slot="title">积分基础信息</p>
      <Form ref="coinRuleForm" :model="ruleForm" :label-width="100" :rules="rules" inline>
        <FormItem label="积分命名" prop="coinName">
          <Input placeholder :disabled="!isEditing" v-model="ruleForm.coinName"/>
        </FormItem>
        <br>
        <FormItem label="积分币值" prop="coinRate">
          <Input-number :min="1" :disabled="!isEditing" v-model="ruleForm.coinRate"/>
        </FormItem>
        <FormItem label="积分等价于" prop="rmbRate">
          <Input-number :min="1" :disabled="!isEditing" v-model="ruleForm.rmbRate"/>RMB
        </FormItem>
      </Form>
      <Spin size="large" fix v-show="spinShow"></Spin>
    </Card>

    <Card>
      <p slot="title">积分有效期</p>
      <div class="top_msg">
        <div class="left_part">
          <p>积分有效期设置完成后，必须保存后才生效；所有设置对新老会员同事生效；</p>
          <p></p>
        </div>
      </div>
      <Form :model="ruleForm" ref="coinDateForm" :label-width="100" :rules="rules" inline>
        <form-item label="积分有效期" prop="deadlineType">
          <radio-group v-model.number="ruleForm.deadlineType">
            <radio :label="1" :disabled="!isEditing" name="deadlineType">永久有效</radio>
            <br>
            <radio :label="2" :disabled="!isEditing" name="deadlineType">自然年月规则</radio>
          </radio-group>
        </form-item>
        <br>
        <template v-if="ruleForm.deadlineType==2">
          <form-item prop="dateType">
            <span>自积分获得之</span>
            <Select v-model.number="ruleForm.dateType" :disabled="!isEditing" style="width:100px">
              <Option :value="1">年</Option>
              <Option :value="2">月</Option>
            </Select>
          </form-item>
          <form-item prop="dateLong" style="margin-left:0px">
            <span>起算，</span>
            <input-number
              v-model="ruleForm.dateLong"
              :disabled="!isEditing"
              controls-position="right"
              :min="1"
            ></input-number>
            <span>{{ruleForm.dateType==1?'年':'月'}}后积分自动过期。</span>
          </form-item>
          <form-item>
            <span>清算日期:每{{ruleForm.dateType==1?'年':'月第'}}</span>
          </form-item>
          <form-item prop="resetDate" v-if="ruleForm.dateType==1">
            <date-picker
              :value="ruleForm.resetDate"
              :disabled="!isEditing"
              type="date"
              v-model="ruleForm.resetDate"
              placeholder="选择日期"
              :rules="rules.resetDate"
              @on-change="handleChangeRuleDate"
            ></date-picker>
          </form-item>
          <form-item prop="resetDay" v-else>
            <input-number
              v-model="ruleForm.resetDay"
              :disabled="!isEditing"
              :min="-28"
              :max="28"
              style="width:100px;"
            ></input-number>
            <span v-if="ruleForm.dateType===2">天</span>
          </form-item>
        </template>
      </Form>
      <div class="toast body-bottom">
        <p>示例：系统设置2年后清算，清算日期1月1日。</p>
        <p>如：2018年5月31日消费，系统将记录为2018年积分，到2020年1月1日将自动过期。</p>
      </div>
      <div class="toolbar toolbar-2">
        <Button type="primary" v-show="!isEditing" @click="isEditing=!isEditing">编辑</Button>
        <Button type="primary" :loading="spinShow" v-if="isEditing" @click="handleSaveConfirm">保存</Button>
      </div>
      <Spin size="large" fix v-show="spinShow"></Spin>
    </Card>
    <Modal
      v-model="confirmModal"
      title="启用新成长值有效期规则"
      okText="马上启用"
      cancelText="不，我再想想"
      @on-ok="handleSave"
    >
      <p>成长值有效期规则将应用所有等级会员，并且在确认开启后立刻生</p>
      <p>效，请慎重操作。</p>
      <p>
        <span style="color:red;">是否确认启用新的成长值规则</span>
      </p>
    </Modal>
  </div>
</template>

<script>
import { getCoinBaseRule, postCoinBaseRule } from "@/api/credit/credit-rule";
import {
  validateNumber,
  validateNull,
  validateInPage
} from "@/libs/form-validate";
export default {
  name: "credit_basic_page",
  data() {
    const validateResetDay = (rule, value, cb) => {
      if (value === null) {
        cb(new Error("请输入清空日期"));
      } else if (value > 28 || value < -28 || value === 0) {
        cb(new Error("请输入-28 ~ 28 之间的非0数字"));
      }
      cb();
    };
    return {
      spinShow: false,
      errorMsg: "出现错误，请重试",
      isEditing: false,
      confirmModal: false,
      ruleForm: {
        coinRate: 1,
        rmbRate: 1,
        resetDay: 0,
        dateType: 1,
        resetDate: ""
      },
      rules: {
        coinRate: [
          {
            required: true,
            type: "number",
            message: "币值不能为空",
            trigger: "change"
          },
          { validator: validateNumber(), trigger: "change" }
        ],
        coinName: [
          { required: true, message: "积分命名不能为空", trigger: "change" }
        ],
        rmbRate: [
          { validator: validateNumber("价值不能为空"), trigger: "change" }
        ],
        dateLong: [...validateNull()],
        resetDay: [
          { validator: validateResetDay, trigger: "blur" },
          { validator: validateResetDay, trigger: "change" }
        ],
        resetDate: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  activated() {
    const isMenu = this.$store.state.app.isMenu;
    if (isMenu) {
      this.isEditing = false;
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.spinShow = true;
      getCoinBaseRule()
        .then(res => {
          this.ruleForm = res.data;
          this.ruleForm.resetDay =
            this.ruleForm.dateType === 2 ? Number(this.ruleForm.resetDate) : 0;
          this.spinShow = false;
        })
        .catch(() => {
          this.spinShow = false;
          this.$Message.error(this.errorMsg);
        });
    },
    handleChangeRuleDate(v) {
      this.ruleForm.resetDate = v;
    },
    handleSaveConfirm() {
      if (this.ruleForm.deadlineType === 2) {
        // 月
        if (this.ruleForm.dateType === 2) {
          this.ruleForm.resetDate = this.ruleForm.resetDay;
        }
      }
      let valid = validateInPage(this.$refs);
      if (valid) {
        this.confirmModal = true;
        return false;
      } else {
        this.$Message.warning("请检查输入！");
      }
    },
    handleSave() {
      this.spinShow = true;
      postCoinBaseRule(this.ruleForm)
        .then(res => {
          this.spinShow = false;
          if (res.code === 1) {
            this.$Message.success("保存成功");
            this.isEditing = false;
          } else {
            this.$Message.error(res.message);
          }
        })
        .catch(() => {
          this.$Message.error(this.errorMsg);
          this.spinShow = false;
        });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
.creditBasic {
  .top_msg {
    border-bottom: 1px dashed #e9e9e9;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    p {
      margin-top: 12px;
    }
  }
}
</style>
