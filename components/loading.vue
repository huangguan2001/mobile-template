<template>
  <section class="loading">
    <div>加载中...</div>
    <div>一般在此处生成图片</div>
    <div id="shareImg">
      <result-content></result-content>
    </div>
    <van-button @click="onClick" plain type="primary">去结果页</van-button>
  </section>
</template>

<script>
let _this;
import html2canvas from 'html2canvas';
import resultContent from '@/components/resulting.vue';
export default {
  components: { resultContent },
  data() {
    return {};
  },
  mounted() {
    _this = this;
  },
  methods: {
    onClick() {
      _this.$emit('nextPage', 4);
    },
    getShareImg() {
      setTimeout(() => {
        html2canvas(document.getElementById('shareImg')).then(async (canvas) => {
          // 裁剪-有兼容问题
          // let s = document.createElement('canvas');
          // s.width = 750;
          // s.height = 1200;

          // let height = window.innerHeight,
          //   cutBeginHeght = 0;
          // console.log('height', height);
          // if (height > 780) cutBeginHeght = 180;
          // let x = s.getContext('2d');
          // x.drawImage(canvas, 0, cutBeginHeght, canvas.width, (canvas.width / 5) * 8, 0, 0, 750, 1200);

          //背景图片容易模糊，img图片标签更适合
          let path = canvas.toDataURL('image/jpeg', 1);
          let res = await this.$upload2Qiniu(path);
          sessionStorage.shareImg = res;
          console.log(res);
          // this.$emit('nextPage', 4);
        });
      }, 200);
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/loading_bg.jpg');
  background-size: 100% 100%;
  #shareImg {
    position: absolute;
    left: -1000px;
    // left: 0;
    // top: 0;

    // width: 660px;
    margin: auto;
    z-index: 100;
  }
}
</style>
