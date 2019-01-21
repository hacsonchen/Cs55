<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.btn-right {
  text-align: right;
  float: right;
}
.span-line-height {
  line-height: 32px;
}
.line {
  line-height: 32px;
  text-align: center;
}
.search-lable {
  float: right;
}
.zk-checkbox--checked .zk-checkbox__inner,
.ivu-page-item-active {
  background-color: #05cfa4 !important;
  border-color: #05cfa4 !important;
}

.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: #ffffff !important;
}
.deleteColor {
  color: red;
}
</style>
