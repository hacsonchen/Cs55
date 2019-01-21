<template>
  <div>
    <uploader
      :thumbPic="thumbPic"
      :minUploader="minUploader"
      :frameSize="frameSize"
      @on-result-change="onResultChange"
    ></uploader>
  </div>
</template>
<script>
import uploader from "../components/uploader/uploader.vue";
export default {
  components: {
    uploader
  },
  data() {
    return {
      thumbPic: [],
      frameSize: {
        // 上传图片框默认大小 160* 160 如果是默认可以不传这个参数
        width: "160px",
        height: "160px"
      },
      minUploader: 1 // 最小上传数默认为1，只上传一张图片可以不传这个参数
    };
  },
  methods: {
    onResultChange(val) {
      console.log(val);
      this.thumbPic = val;
    }
  }
};
</script>