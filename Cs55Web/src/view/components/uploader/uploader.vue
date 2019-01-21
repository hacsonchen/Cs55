<template>
  <div class="upload_div">
    <div class="input_div photo_div">
      <div v-if="thumbPicChild&&thumbPicChild.length>0">
        <div
          class="input_photo bg_cover"
          :style="frameSizeChild"
          v-for="(item, index) in thumbPicChild"
          :key="index"
        >
          <!-- :style="{backgroundImage: 'url('+ item.url +')'}" -->
          <!-- @mouseenter="enter(item, index)"
          @mouseleave="leave(item, index)"-->
          <img
            :src="item.url"
            @load="successLoadImg"
            @error="errorLoadImg"
            :class="item.id?'imgfull':''"
          >
          <i v-if="showClose" class="close" v-on:click="deletePhoto(index)"></i>
        </div>
      </div>
      <div
        :style="frameSizeChild"
        class="input_photo bg_cover"
        v-if="!thumbPicChild || thumbPicChild.length < minUploader"
      >
        <img src="../../../assets/images/imgadd.png" ref="regPhoto">
        <!-- multiple="multiple" -->
        <input
          v-if="!thumbPicChild || thumbPicChild.length < minUploader"
          type="file"
          accept="image/*"
          placeholder="请选择"
          name="thumbPicChild"
          ref="thumbPicChild"
          class="imgOne"
          @change="updata"
        >
      </div>
    </div>
    <Spin size="large" fix v-if="spinShowChild"></Spin>
  </div>
</template>

<script>
// import { Indicator, MessageBox } from "mint-ui";
import AuzreBlobUploader from "./uploader.js";
import config from "@/config";
import _ from "lodash";
export default {
  props: {
    minUploader: {
      // 最小上传数
      type: Number,
      default: 1
    },
    thumbPic: {
      // 图片数组
      type: Array,
      required: true
    },
    frameSize: {
      //上传框大小
      type: Object,
      default: function() {
        return {
          width: "160px",
          height: "160px"
        };
      }
    }
  },
  watch: {
    thumbPic(val) {
      this.thumbPicChild = val;
    },
    thumbPicChild(val) {
      this.$emit("on-result-change", val);
    }
  },
  data() {
    let url =
      process.env.NODE_ENV === "development"
        ? config.baseUrl.dev
        : config.baseUrl.pro;
    return {
      host: url, //"http://192.168.3.122:8181/api/", //"http://www.suibao-jiaozhu.com/api/",
      thumbPicChild: this.thumbPic,
      spinShowChild: false,
      frameSizeChild: this.frameSize,
      showClose: true //this.minUploader === 1 ? false : true
    };
  },
  created() {},
  components: {
    // Indicator
  },
  methods: {
    enter(item, index) {
      console.log(index);
      this.thumbPicChild.forEach((itemChild, indexChild) => {
        if (index === indexChild) {
          item.showClose = true;
        }
      });
    },
    leave(item, index) {
      this.thumbPicChild.forEach((itemChild, indexChild) => {
        if (index === indexChild) {
          item.showClose = false;
        }
      });
    },
    successLoadImg() {},
    errorLoadImg() {},
    initUploader: function(func, progressFun, errorFun, filecheckFun) {
      let options = {
        file: null,
        button: null,
        picPurpose: 1,
        autoUpload: true,
        isCreateThumb: false,
        checkMD5Url: this.host + "/api/Blob/CheckFileMD5",
        BlobTokenUrl: this.host + "/res/Blob/GetToken",
        mergeFileUrl: this.host + "/res/Blob/GetPutListToken",
        saveBlobUrl: this.host + "/api/Blob/SaveBlob",
        completeUrl: this.host + "/api/Blob/complete",
        setThumbSize: [50, 50],
        setLargeImgSize: [500, 500],
        thumbPreview: null,
        largeImgPreview: null,
        getThumb: null,
        getLargeImg: null,
        progress: progressFun,
        fileAdded: function() {
          return true;
        },
        fileMd5checking: filecheckFun,
        checkFileState: null,
        success: func,
        error: errorFun
      };
      return new AuzreBlobUploader(options);
    },
    updata: function(e) {
      let _this = this;
      this.handleUpload(
        e,
        function(data, id, url) {
          let item = {
            url: url,
            id: id,
            showClose: false
          };
          _this.thumbPicChild = _.concat(_this.thumbPicChild, [item]);
          // Indicator.close();
          _this.spinShowChild = false;
        },
        function() {
          // Indicator.open("上传中...");
          _this.spinShowChild = true;
        },
        function() {
          _this.spinShowChild = false;
          //Indicator.close();
          // MessageBox.alert("上传失败");
          _this.$Message.error("上传失败");
        },
        () => {
          _this.spinShowChild = true;
          // Indicator.open("上传中...");
        }
      );
    },
    handleUpload: function(e, func, progressFun, errorFun, filecheckFun) {
      let files = e.target.files;
      let uploader = this.initUploader(
        func,
        progressFun,
        errorFun,
        filecheckFun
      );
      uploader.setFilePrefix("quickcampaign/");
      uploader.setThumbprefix(this.thumbPrefix);
      uploader.uploadFile(files);
    },
    // 删除照片
    deletePhoto(index) {
      this.thumbPicChild.splice(index, 1);
    }
  }
};
</script>

<style type="text/css" scoped>
.mint-tab-container {
  background: #fff;
}
.upload_div {
  width: 100%;
  display: block;
  /* border-bottom: 1px solid #e8e8e8; */
  color: #333;
  font-size: 0.75rem;
  padding: 0.2rem 0;
  height: auto;
}

.promptData {
  width: 100%;
  padding-left: 5rem;
  box-sizing: border-box;
  display: block;
  color: red;
  clear: both;
}
.input_div {
  padding-bottom: 0.3125rem;
  box-sizing: border-box;
  width: 100%;
  /* height: 2.6rem; */
  display: block;
  line-height: 2.2rem;
  border: none;
  display: inline-block;
  color: #333;
  font-size: 0.75rem;
  position: relative;
}
.input_div a {
  color: #333;
}
.input_div > input {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  outline: none;
}
.input_photo i {
  font-style: normal;
  display: inline-block;
  font-weight: normal;
}

.input_div .errShow {
  padding-left: 0 !important;
}

.errShow {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  display: block;
  color: red;
  padding-left: 4.6rem;
  box-sizing: border-box;
  text-align: left;
  font-size: 0.2rem;
}

.hiden {
  display: none;
}

.change_photo {
  width: 100%;
  height: 1.2rem !important;
  display: block;
}

.input_photo {
  position: relative;
  margin-top: 0.2rem;
  margin-left: 2.5%;
  /* width: 160px;
  height: 160px; */
  float: left;
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  background-color: #fafafa;
}

.input_photo .close {
  background: url("../../../assets/images/close.png") center top no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -8px;
  margin-right: -8px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  /* background: #fff; */
  border-radius: 50%;
  /* border: 2px solid red; */
  color: #666;
  text-align: center;
  font-size: 0.6rem !important;
  font-weight: 600;
}

.input_photo img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-height: 100%;
  max-width: 100%;
  margin: auto auto;
  /* width: 100%;
  height: 100%; */
}

.imgfull {
  width: 100% !important;
  height: 100% !important;
}

.vertical {
  vertical-align: top;
}

.photo_div {
  /* height: 3rem !important; */
}

.imgOne {
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.error_photo {
  border: 1px solid red;
}
</style>
