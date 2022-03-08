<template>
  <section class="share">
    <img :src="imgSrc" alt="分享图片" />
  </section>
</template>

<script>
let _this;
export default {
  data() {
    return { imgSrc: '' };
  },
  mounted() {
    _this = this;
    let img = _this.$route.query.img;
    img && (_this.imgSrc = decodeURIComponent(img));
  },
};
</script>

<style lang="less" scoped>
.share {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@{subdir}images/loading_bg.jpg');
  background-size: 100% 100%;
  // position: absolute;
  // top: 0;
  // left: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
