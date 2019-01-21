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
              <span>
                <Icon type="ios-alarm-outline"  size="24"/>创建基本任务
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>创建任务
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>导入任务
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>显示所有正在运行的任务
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>启用所有任务历史记录
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>新建文件夹
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>查看
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>刷新
              </span>
              <span>
                <Icon type="ios-alarm-outline" size="24"/>帮助
              </span>
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
<script>
export default {
  data() {
    return {
      tableLoading:false,
      libraryType:'md-arrow-dropup',
      libraryShow:true,
      optionsType:'md-arrow-dropup',
      optionsShow:true,
      taskTreeList: [
        {
          title: "任务计划程序库",
          expand: true,
          children: [
            {
              title: "Microsoft",
              expand: true,
              children: [
                {
                  title: "office"
                },
                {
                  title: "windows",
                  expand: true,
                  children: [
                    {
                      title: "XP"
                    },
                    {
                      title: "w7"
                    },
                    {
                      title: "w10"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      triggerTableList: [
        {
          name: "登录时",
          information: "挡任何用户登录时触发",
          status: "已启用"
        }
      ],
      taskTableList: [
        {
          name: "Adobe Acr",
          status: "准备就绪",
          trigger: "已定义多个触发器",
          nextRunTime: "2019/01/31 12:23:24",
          lastRunTime: "2019/01/10 20:23:24",
          result: "任务尚未运行",
          creator: "庆森锅",
          creationTime: "2018/12/10 20:23:24",
          isSelect: false
        }
      ],
      triggerColums: [
        { title: "触发器", key: "name" },
        { title: "详细信息", key: "information", width: 500 },
        { title: "状态", key: "status"}
      ],
      taskColumns: [
        { title: "名称", key: "name", width: 200 },
        { title: "状态", key: "status", width: 100 },
        { title: "触发器", key: "trigger", width: 400 },
        { title: "下次运行时间", key: "nextRunTime", width: 150 },
        { title: "上次运行时间", key: "lastRunTime", width: 150 },
        { title: "运行结果", key: "result", width: 100 },
        { title: "创建人", key: "creator", width: 100 },
        { title: "创建时间", key: "creationTime", width: 100 }
      ]
    };
  },
  methods: {
    handleSelectionChange(){},
    treeChange() {},
    libraryClick(){
      this.libraryShow = !this.libraryShow
      if(this.libraryShow){
        this.libraryType = 'md-arrow-dropup'
      } else{
        this.libraryType = 'md-arrow-dropdown'
      }
    },
    optionsClick(){
      this.optionsShow = !this.optionsShow
      if(this.optionsShow){
        this.optionsType = 'md-arrow-dropup'
      } else{
        this.optionsType = 'md-arrow-dropdown'
      }
    }
  }
};
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