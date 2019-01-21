<template>
  <div class="business-notifications">
    <Card class="box-card">
      <p slot="title">业务通知设置</p>
      <Tabs type="card">
        <TabPane label="会员信息">
          <div class="table_default data_table">
            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>业务名称</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <p>
                  <span>通知方式</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>手机绑定通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>手机解绑通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>微信绑定通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>微信解绑通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>邮箱绑定通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>邮箱解绑通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>帐号冻结通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top border_bottom">
              <div class="text">
                <p>
                  <span>帐号启用通知</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top border_bottom">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="等级积分">
          <div class="table_default data_table">
            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>业务名称</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <p>
                  <span>通知方式</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>积分变更</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>积分清算</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top border_bottom">
              <div class="text">
                <p>
                  <span>等级变更</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top border_bottom">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="系统信息">
          <div class="table_default data_table">
            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>业务名称</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <p>
                  <span>通知方式</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>注册成功</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top">
              <div class="text">
                <p>
                  <span>修改密码</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_one border_left_top border_bottom">
              <div class="text">
                <p>
                  <span>首次登陆</span>
                </p>
              </div>
            </div>

            <!-- Unnamed (单元格) -->
            <div class="table_default table_cell table_td_two border_left_top border_bottom">
              <div class="text">
                <Checkbox v-model="checked">站内通知</Checkbox>
                <Checkbox v-model="checked">微信</Checkbox>
                <a herf class="text-a">邮件设置</a>
                <Checkbox v-model="checked">短信</Checkbox>
                <a herf class="text-a">短信设置</a>
                <Checkbox v-model="checked">邮件</Checkbox>
                <a herf class="text-a">邮件设置</a>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
.business-notifications {
  .table_default {
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  .data_table {
    width: 900px;
    height: 324px;
  }
  .table_td_one {
    width: 240px;
    height: 44px;
    float: left;
  }
  .table_td_two {
    width: 660px;
    height: 44px;
    float: left;
    border-right: 1px solid #ebeef5;
  }
  .table_cell {
    font-size: 14px;
  }
  .table_cell .text {
    line-height: 44px;
  }
  .table_cell .text .text-a {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #337ab7;
  }
  .border_left_top {
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
  }
  .border_bottom {
    border-bottom: 1px solid #ebeef5;
  }
}
</style>