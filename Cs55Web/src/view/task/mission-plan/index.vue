<template>
  <div class="mission-plan">
    <Card :bordered="false" :dis-hover="true">
      <p slot="title">任务计划程序</p>
      <Row>
        <Card :bordered="false" class="card_task" :dis-hover="true">
          <p slot="title">任务计划程序</p>
          <div>
            <Tree :data="taskTreeList" @on-select-change="treeChange" ref="tree2"></Tree>
          </div>
        </Card>
        <Card :bordered="false" class="card_list" :dis-hover="true">
          <p slot="title">任务列表</p>
          <div>
            <Table
              border
              ref="myTable"
              @on-selection-change="handleSelectionChange"
              :loading="tableLoading"
              :columns="taskColumns"
              :data="taskTableList"
              highlight-row
            ></Table>
            <br>
            <Tabs type="card">
              <TabPane label="常规">
                <div class="tabs routine">
                  <Row>
                    <Col :span="2">
                      <span class="tab-lable span-line-height">名称：</span>
                    </Col>
                    <Col :span="21">
                      <Input disabled value="OfficeTelemetryAgentFallBack"></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col :span="2">
                      <span class="tab-lable span-line-height">创建人：</span>
                    </Col>
                    <Col :span="21">
                      <Input disabled value="庆森锅"></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col :span="2">
                      <span class="tab-lable span-line-height">描述：</span>
                    </Col>
                    <Col :span="21">
                      <!--  -->
                      <Input disabled value="庆森锅" type="textarea" :rows="10"></Input>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane label="触发器">
                <div class="tabs trigger">
                  <span>创建任务时，可以指定触发该任务的条件。若要更改这些触发器，使用“属性”命令打开任务属性页</span>
                  <br>
                  <Table
                    border
                    ref="myTable"
                    @on-selection-change="handleSelectionChange"
                    :loading="tableLoading"
                    :columns="triggerColums"
                    :data="triggerTableList"
                    highlight-row
                  ></Table>
                </div>
              </TabPane>
              <TabPane label="操作">
                 <div class="tabs trigger">
                  <span>创建任务时，可以指定触发该任务的条件。若要更改这些触发器，使用“属性”命令打开任务属性页</span>
                  <br>
                  <Table
                    border
                    ref="myTable"
                    @on-selection-change="handleSelectionChange"
                    :loading="tableLoading"
                    :columns="triggerColums"
                    :data="triggerTableList"
                    highlight-row
                  ></Table>
                </div>
              </TabPane>
              <TabPane label="条件">标签三的内容</TabPane>
              <TabPane label="设置">标签三的内容</TabPane>
              <TabPane label="历史记录">标签三的内容</TabPane>
            </Tabs>
          </div>
        </Card>
        <Card :bordered="false" class="card_operation" :dis-hover="true">
          <p slot="title">操作</p>
          <div class="program-library">
            <span class="library" @click="libraryClick">任务计划诚信库
              <Icon :type="libraryType" class="icon-right" size="24"/>
            </span>
            <div v-if="libraryShow">
              <a href="javascript:void(0)">
                <Icon type="ios-alarm-outline"  size="24"/>创建基本任务
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>创建任务
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>导入任务
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>显示所有正在运行的任务
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>启用所有任务历史记录
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>新建文件夹
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>查看
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>刷新
              </a>
              <a>
                <Icon type="ios-alarm-outline" size="24"/>帮助
              </a>
            </div>
          </div>
          <div class="program-library">
            <span class="library" @click="optionsClick">所选项
              <Icon :type="optionsType" class="icon-right" size="24"/>
            </span>
            <div v-if="optionsShow">
              <span>
                <Icon type="ios-alarm-outline" size="24"/>运行
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>结束
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>禁用
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>导出
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>属性
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>删除
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>帮助
              </span>
            </div>
          </div>
        </Card>
      </Row>
    </Card>
  </div>
</template>
<script src="./index.js">
</script>


<style lang = "less">
.mission-plan {
  .card_task {
    width: 15%;
    float: left;
    border: 1px solid #ccc;
    .ivu-card-body {
      padding: 16px !important;
    }
  }
  .card_list {
    width: 60%;
    margin-left: 1%;
    float: left;
    border: 1px solid #ccc;

    .tabs {
      width: 100%;
      span {
        display: block;
      }
      .ivu-row {
        margin-top: 16px;
      }
    }
    /* .ivu-table-row-highlight {
      background-color: #0078d7;
    } */
  }
  .card_operation {
    width: 23%;
    margin-left: 1%;
    float: left;
    border: 1px solid #ccc;
    .program-library {
      width: 100%;
      margin-bottom: 16px;
      span {
        display: block;
        cursor:pointer;
      }
      a{
        display: block;
        color:#515a6e;
      }
      .library {
        width: 100%;
        background-color: #9eb8d5;
        .icon-right {
          float: right;
        }
      }
    }
  }
  .tab-lable {
    float: left;
  }
  .ivu-card.ivu-card-dis-hover:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-color: #ccc;
  }
}
</style>