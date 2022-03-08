<template>
  <section class="preload">
    <div>加载中...{{ percent }}%</div>
  </section>
</template>

<script>
import { subdir } from '@/core/config';
console.log(subdir);
let imgs = [
  // subdir + 'images/home_cover.png',
  // subdir + 'images/xhome_cover.png',
  // subdir + 'images/loading.gif',
  // subdir + 'images/main_bg.jpg',
  // subdir + 'images/share_bg.jpg',
  // subdir + 'images/xhome_bg.jpg',
  // subdir + 'images/xprocess_bg.jpg',
  // subdir + 'images/xresult_bg.jpg',
  // subdir + 'images/home_bg.jpg',
];
export default {
  data() {
    return {
      percent: 0,
      count: 0,
    };
  },
  mounted() {
    this.preload();
  },
  methods: {
    preload() {
      for (let img of imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
          this.count++;
          this.percent = Math.floor((this.count / imgs.length) * 100);
        };
      }
    },
  },
  watch: {
    count(val) {
      if (val === imgs.length) {
        // 图片加载完成后跳转页面
        this.$emit('nextPage', 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.preload {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // background: url('@{subdir}images/loading_bg.jpg');
  background-size: 100% 100%;
  z-index: 100;
}
</style>
