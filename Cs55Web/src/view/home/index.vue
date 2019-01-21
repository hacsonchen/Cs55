<template>
  <div class="workbench">
    <Card class="card-info">
      <div class="navigation"><span class="shouye">首页</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span>工作台</span></div>
      <div class="head-portrait">
        <div class="img">
          <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D60%2C60%2C50/sign=d650b04bd639b6004d9b5cf78f6d031a/0d338744ebf81a4c92915f61d42a6059242da6f3.jpg">
        </div>
        <div class="written-words">
          <span class="greetings">{{userName}}，祝你开心每一天</span>
          <br>
          <span class="introduce">交互专家&nbsp;|&nbsp;任职于米可公司</span>
        </div>
      </div>
    </Card>

    <Card class="card-project">
      <p slot="title">进行中的项目</p>
      <div class="body">
        <div class="modular add"
             @click="openModal">
          <span>+&nbsp;&nbsp;新增项目</span>
        </div>
        <!--   -->
        <div class="modular list"
             :class="item.isShowShadow?'box-shadow':''"
             v-for="(item,index) in memulist"
             @mouseenter="enter(index)"
             @mouseleave="leave()"
             :key="index">
          <!--  -->
          <div @click="jumpURL(item.path)">
            <i class="close"
               @click="deletes(index)"
               v-if="item.isShowShadow">X</i>
            <img class="icon"
                 :src="basePath+item.logo">
            <div class="text">
              <span class="name"
                    v-html="item.name"></span>
              <span class="explain"
                    v-html="item.explain"></span>
            </div>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
    </Card>

    <!-- <Button type="primary"
            @click="modalMenu = true">快速入口管理</Button> -->
    <Modal v-model="modalMenu"
           title="快速入口管理">
      <Tree :data="menuData"
            :render="renderContent"></Tree>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import { setFastNav, getFastNav } from '@/libs/util'
import _ from 'lodash'
export default {
  mounted() {
    this.menuData = this.$store.getters.homeMenuTree
    this.getList(this.menuData)
    // console.log(this.memulist)
  },
  data() {
    return {
      basePath: '/menulogo/',
      modalMenu: false,
      menuData: [],
      memulist: [],
      userName: this.$store.state.user.userName,
      avatorImgPath: this.$store.state.user.avatorImgPath
    }
  },
  methods: {
    enter(n) {
      _.forEach(this.list, (item, index) => {
        if (n === index) {
          item.isShowShadow = true
        } else {
          item.isShowShadow = false
        }
      })
    },
    leave() {
      _.forEach(this.list, (item, index) => {
        item.isShowShadow = false
      })
    },
    openModal() {
      this.modalMenu = true
    },
    deletes(index) {
      this.list.splice(index, 1)
    },
    renderContent(h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h(
              'span',
              {
                style: {
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    // this.handleEdit(data)
                  }
                }
              },
              data.title
            )
          ]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            },
            [
              h('i-switch', {
                props: {
                  value: data.isOpen
                },
                style: {
                  marginRight: '4px',
                  display: data.isMenu ? 'inline-block' : 'none'
                },
                on: {
                  'on-change': args => {
                    // console.log(args, data)
                    if (args) {
                      this.addNav(data)
                    } else {
                      this.removeNav(data)
                    }
                  }
                }
              })
            ]
          )
        ]
      )
    },
    addNav(data) {
      let navs = []
      if (getFastNav()) {
        navs = getFastNav().split(',')
      }

      if (navs.indexOf(data.id) === -1) {
        navs.push(data.id)
        data.isOpen = true
        setFastNav(navs.join())
        this.memulist = []
        this.getList(this.menuData)
      }
    },
    removeNav(data) {
      let navs = []
      if (getFastNav()) {
        navs = getFastNav().split(',')
      }

      if (navs.indexOf(data.id) > -1) {
        navs.splice(navs.indexOf(data.id), 1)
        data.isOpen = false
        setFastNav(navs.join())
        this.memulist = []
        this.getList(this.menuData)
      }
    },
    jumpURL(url) {
      this.$router.push({ path: url })
    },
    getList(treeList) {
      treeList.forEach(item => {
        if (item.children !== undefined) {
          this.getList(item.children)
        } else {
          let newItem = {
            name: item.title,
            explain: '魔方平台',
            id: item.id,
            path: item.path,
            isShowShadow: false,
            logo: item.logo
          }
          let navs = []
          if (getFastNav()) {
            navs = getFastNav().split(',')
          }
          if (_.indexOf(navs, newItem.id) >= 0) {
            this.memulist.push(newItem)
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.workbench {
  // position: relative;
  .card-info {
    // margin-top: 30px;
    // position: absolute;
    width: 100%;
    padding-left: 20px;
    .navigation {
      font-size: 14px;
      color: #000000;
      opacity: 0.45;
      height: 40px;
      line-height: 22px;
      span {
        display: inline-block;
      }
    }
    .head-portrait {
      height: 80px;
      display: flex;
      .img {
        float: left;
        width: 72px;
        height: 72px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .written-words {
        float: left;
        margin-left: 20px;
        padding-top: 5px;
        .greetings {
          display: inline-flex;
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
        }
        .introduce {
          display: inline-flex;
          padding-top: 10px;
          font-size: 14px;
          opacity: 0.45;
        }
      }
    }
  }
  .card-project {
    width: 96%;
    height: auto;
    margin: 24px auto;
    .modular {
      float: left;
      width: 274px;
      height: 112px;
      border: 1px #e9e9e9 solid;
      margin-right: 12px;
      margin-bottom: 16px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    .add {
      border: 1px #e9e9e9 dashed;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      span {
        line-height: 112px;
      }
    }
    .list {
      display: flex;
      position: relative;
      font-size: 14px;
      padding-top: 24px;
      padding-left: 24px;
      .close {
        position: absolute;
        right: 0;
        top: -3px;
        right: 3px;
      }
      .icon {
        float: left;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background-color: #05cfa4;
      }
      .text {
        float: left;
        margin-left: 16px;
        padding-top: 10px;
        span {
          display: block;
          margin-bottom: 5px;
        }
        span.name {
          color: #000000;
          font-weight: 600;
        }
        span.explain {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
    .box-shadow {
      box-shadow: 0 2px 6px 0 #d9d9d9;
    }
  }
}
</style>

