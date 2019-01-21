<template>
  <div class="news-edition">
    <Poptip trigger="hover" v-model="visible">
      <span class="news">
        <i class="iconfont icon-xiaoxi" style="font-size: 15px;"></i>
        <span class="msg_toast" v-if="this.$store.state.msgData.allcount !== 0">{{this.$store.state.msgData.allcount}}</span>
      </span>
      <div slot="title">
        <span class="msg">消息
          <span v-if="this.$store.state.msgData.allcount">({{this.$store.state.msgData.allcount}})</span>
        </span>
        <span class="sign" @click="mark" v-if="this.$store.state.msgData.allcount !== 0">标记全部已读</span>
      </div>
      <div slot="content">
        <div class="empty" v-if="this.$store.state.msgData.allcount === 0">
          <img src="../../../../assets/images/center/empty.png" alt="">
          <p>暂无任何消息</p>
        </div>
        <ul class="msg_list" v-if="this.$store.state.msgData.allcount !== 0">
          <li class="list" v-if="this.$store.state.msgData.sys.firstMsg">
            <div class="img_wrap"><img src="../../../../assets/images/center/news.png" alt=""></div>
            <div class="_msg">
              <div class="top">
                <h4>{{this.$store.state.msgData.sys.type}} ({{this.$store.state.msgData.sys.count}})</h4>
                <span class="times">{{this.$store.state.msgData.sys.firstMsg.creationTime |timeago }}
                </span>
              </div>
              <p>{{this.$store.state.msgData.sys.firstMsg.messageWord}}</p>
            </div>
          </li>

          <li class="list" v-if="this.$store.state.msgData.task.firstMsg">
            <div class="img_wrap"><img src="../../../../assets/images/center/news.png" alt=""></div>
            <div class="_msg">
              <div class="top">
                <h4>{{this.$store.state.msgData.task.type}} ({{this.$store.state.msgData.task.count}})</h4>
                <span class="times">{{this.$store.state.msgData.task.firstMsg.creationTime | timeago }}
                </span>
              </div>
              <p>{{this.$store.state.msgData.task.firstMsg.messageWord}}</p>
            </div>
          </li>
          <li class="list" v-if="this.$store.state.msgData.bill.firstMsg">
            <div class="img_wrap"><img src="../../../../assets/images/center/news.png" alt=""></div>
            <div class="_msg">
              <div class="top">
                <h4>{{this.$store.state.msgData.bill.type}} ({{this.$store.state.msgData.bill.count}})</h4>
                <span class="times">{{this.$store.state.msgData.bill.firstMsg.creationTime | timeago }}
                </span>
              </div>
              <p>{{this.$store.state.msgData.bill.firstMsg.messageWord}}</p>
            </div>
          </li>
          <li class="list" v-if="this.$store.state.msgData.sysNotice.firstMsg">
            <div class="img_wrap"><img src="../../../../assets/images/center/news.png" alt=""></div>
            <div class="_msg">
              <div class="top">
                <h4>{{this.$store.state.msgData.sysNotice.type}} ({{this.$store.state.msgData.sysNotice.count}})</h4>
                <span class="times">{{this.$store.state.msgData.sysNotice.firstMsg.creationTime| timeago }}
                </span>
              </div>
              <p>{{this.$store.state.msgData.sysNotice.firstMsg.messageWord}}</p>
            </div>
          </li>
          <router-link to="/message-center">
            <p class="all" @click="hidden">查看全部信息</p>
          </router-link>

        </ul>
      </div>
    </Poptip>

  </div>
</template>

<script>
import { GetAllMsg, SetAllRead } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'NewsEdition',
  data() {
    return {
      visible: false,
      msgTime: ''
    }
  },
  computed: {
    countComputed() {}
  },
  filters: {
    timeago(furTime) {
      var now = new Date().getTime(),
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24
      if (now < furTime) {
        return dayjs(furTime).format('YYYY/MM/DD')
      }
      var diffValue = now - furTime

      var _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute

      if (_day >= 1) result = dayjs(furTime).format('YYYY/MM/DD')
      else if (_hour >= 1) result = parseInt(_hour) + '个小时前'
      else if (_min >= 1) result = parseInt(_min) + '分钟前'
      else result = '刚刚'
      return result
    }
  },

  mounted() {
    this.GetMsg()
  },
  methods: {
    GetMsg() {
      GetAllMsg().then(res => {
        this.$store.dispatch('actionsMsgData', res.data)
        // console.log(this.$store.state.msgData)
      })
    },
    mark() {
      SetAllRead().then(res => {
        this.GetMsg()
        window.location.reload()
      })
    },
    hidden() {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.news-edition {
  margin: 0 24px;
  .news {
    img {
      width: 13px;
      height: auto;
      vertical-align: middle;
    }
    position: relative;
    .msg_toast {
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 10px;
      background: #fd6b6d;
      border-radius: 50%;
      color: #fff;
      top: -14px;
      left: 3px;
      text-align: center;
    }
  }
  .ivu-poptip-content {
    width: 100%;
  }
  .ivu-poptip-title {
    padding: 0 16px;
    line-height: 42px;
    .msg {
      display: inline-block;
      height: 42px;
      color: #05cfa4;
      &:after {
        content: '';
        display: block;
        height: 3px;
        position: absolute;
        left: 8px;
        width: 50px;
        bottom: 0;
        background-color: #05cfa4;
      }
    }
    &:after {
      left: 0;
      right: 0;
    }
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .sign {
    cursor: pointer;
  }
  .msg_list {
    .list {
      display: flex;
      padding: 8px;
      border-bottom: 1px solid #e8e8e8;
      .img_wrap {
        img {
          width: 32px;
          height: auto;
        }
      }
      ._msg {
        margin-left: 16px;
        width: 100%;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        p {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .empty {
    text-align: center;
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
  .all {
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    padding-top: 12px;
    cursor: pointer;
  }
}
</style>
