<template>
  <div class="message">
    <h4>消息中心</h4>
    <div class="box2">
      <div class="box2-0">
        <div class="box2-1">
          <Menu active-name="1" @on-select="handleSelect" ref="active">
            <MenuItem name="1"> <img src="../../assets/images/center/xiaoxi.png" alt="" srcset=""> 系统通知
            <span v-if="megList.count1">({{megList.count1 }})</span>
            <span slot="title"></span>
            </MenuItem>
            <MenuItem name="2"><img src="../../assets/images/center/renwu.png" alt="" srcset=""> 任务消息
            <span v-if="megList.count2">({{megList.count2 }})</span>
            <i class="el-icon-message"></i>
            <span slot="title"></span>
            </MenuItem>
            <MenuItem name="3"><img src="../../assets/images/center/gondan.png" alt="" srcset=""> 工单消息
            <span v-if="megList.count3">({{megList.count3 }})</span>
            <span slot="title"></span>
            </MenuItem>
            <MenuItem name="4"><img src="../../assets/images/center/xitong.png" alt="" srcset=""> 系统公告
            <span v-if="megList.count4">({{megList.count4 }})</span>
            <span slot="title"></span>
            </MenuItem>
          </Menu>
        </div>
        <div class="box2-2">
          <div class="memu-title">
            <span>{{divTitle}}</span>
          </div>
          <div class="empty" v-if="!List.length">
            <img src="../../assets/images/center/empty.png" alt="">
            <p>暂无任何消息</p>
          </div>
          <template v-if="List.length" v-for="item in List">
            <div class="msg-box" :key="item.id">
              <div class="msg-box-1 msg-box-title">
                <i :class=GetIcon(item.messageIco)></i>
              </div>
              <div class="msg-box-2">
                <div class="msg-box-title">
                  <span>{{item.title}}</span>
                  <span style="color:#D9D9D9;">{{item.creationTime}}</span>
                </div>
                <template v-if="SetContentBtn(item.messageWord)">
                  <div class="msg-box-content" v-if="item.isShow">
                    {{ item. messageWord }}
                  </div>
                  <div class="msg-box-content" v-else>
                    {{ SetContent(item. messageWord) }}
                  </div>
                </template>
                <template v-else>
                  <div class="msg-box-content">
                    {{ item. messageWord }}
                  </div>
                </template>
                <div class="msg-box-footer">
                  <template v-if="SetContentBtn(item. messageWord)">
                    <Button type="text" class="color-bule" v-on:click="item.isShow = true" v-if=!item.isShow>展开</Button>
                    <Button type="text" class="color-bule" v-on:click="item.isShow = false" v-if=item.isShow>收起</Button>
                  </template>
                </div>
                <div class="msg-box-footer-btn">
                  <Button type="text" class="color-bule" v-on:click="handleSetRead(item.id)" v-if=!item.isRead>设置为已读></Button>
                  <Button type="text" class="color-bule" v-on:click="handleSetdispose(item.id)" v-if=!item.isHandle>点击马上处理></Button>
                  <Button type="text" v-else style="color:#D9D9D9;">已处理></Button>
                </div>
              </div>
              <div v-if="item.isClose" class="msg-box-3" v-on:click="handleClose(item.id)">
                <Icon type="ios-close" />
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetMessageInfo,
  DeleteMessage,
  SetProcessed,
  SetRead,
  GetAllMsg
} from '@/api/user'
export default {
  name: 'messagecenter',
  data() {
    return {
      divTitle: '系统通知',
      divTitleList: ['系统通知', '任务消息', '工单消息', '系统公告'],
      megList: '',
      List: [],
      value: '1',
      IconList: [
        'el-icon-message color-bule',
        'el-icon-message color-green',
        'el-icon-message color-red',
        'el-icon-message color-red'
      ]
    }
  },
  created() {
    this.getMsgList(this.value)
  },
  mounted() {
    this.GetMsg()
  },
  methods: {
    handleSelect(key) {
      this.divTitle = this.divTitleList[key - 1]
      this.value = key
      this.List = this.megList['list' + key]
    },
    GetMsg() {
      GetAllMsg().then(res => {
        this.$store.dispatch('actionsMsgData', res.data)
      })
    },
    handleClose(id) {
      let data = {
        id: id
      }
      DeleteMessage(data).then(res => {
        this.getMsgList(this.value)
        this.GetMsg()
      })
    },
    handleSetRead(id) {
      let data = {
        id: id
      }
      SetRead(data).then(res => {
        this.getMsgList(this.value)
        this.GetMsg()
      })
    },
    handleSetdispose(id) {
      let data = {
        id: id
      }
      SetProcessed(data).then(res => {
        this.getMsgList(this.value)
      })
    },
    GetIcon(type) {
      return this.IconList[type]
    },
    getMsgList(value) {
      GetMessageInfo().then(res => {
        this.megList = res.data

        this.List = this.megList['list' + value]
      })
    },
    SetContent(msg) {
      // 多余的内容显示省略号
      if (msg.length > 60) return msg.substr(0, 60) + '...'
    },
    SetContentBtn(msg) {
      // 是否显示展开按钮
      if (msg.length > 60) return true
      else return false
    }
  }
}
</script>
<style lang="less">
.message {
  border-radius: 2px;
  background: #fff;
  padding-bottom: 16px;
  h4 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 56px;
    height: 56px;
    border-bottom: 1px solid #e9e9e9;
    margin-left: 32px;
  }
  .ivu-menu {
    height: 100%;
    width: 200px !important;
  }
  .empty {
    padding: 30px 50px;
    img {
      width: 80px;
      height: auto;
    }
    p {
      font-size: 14px;
      color: #8c8c8c;
      margin-top: 20px;
    }
  }
  .box2 {
    -webkit-box-flex: 1;
    height: 100%;
  }
  .box2-0 {
    display: flex;
    // justify-content: space-around;
  }
  .box2-1 {
    .ivu-menu {
      min-height: 500px;
    }
  }
  .box2-2 {
    width: 100%;
  }
  .msg-box {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin: 15px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    justify-content: space-between;
  }
  .msg-box-1 {
    width: 30px;
    text-align: center;
  }

  .msg-box-2 {
    -webkit-box-flex: 1;
  }
  .msg-box-3 {
    width: 13px;
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  li.MenuItem {
    height: 37px;
    line-height: 37px;
  }
  .ivu-menu-item {
    img {
      vertical-align: middle;
      margin-right: 16px;
    }
  }
  .ivu-menu-vertical .ivu-menu-item,
  .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 6px 24px 6px 32px;
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: rgba(0, 0, 0, 0.65);
    background: #e6fff6;
    z-index: 2;
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background: #dcdee2;
  }
  .box2-1 .el-menu {
    border-right: 0;
  }
  .color-bule {
    color: #409eff;
    padding: 0 !important;
    /* margin-right: 10px; */
    margin-left: 5px;
  }
  .color-green {
    color: #51c41a;
    padding: 0 !important;
  }
  .color-red {
    color: #fd6b6d;
    padding: 0 !important;
  }
  .memu-title {
    border-bottom: 1px solid #d9d9d9;
    padding: 15px 18px;
  }
  .msg-box-title {
    font-size: 16px;
    margin: 10px 0;
  }
  .msg-box-content {
    color: #8c8c8c;
  }
  .msg-box-footer {
    text-align: center;
  }
  .msg-box-footer-btn {
    text-align: right;
  }
  .ivu-menu-vertical .ivu-menu-item,
  .ivu-menu-vertical .ivu-menu-submenu-title {
    margin-bottom: 4px;
  }
}
</style>
