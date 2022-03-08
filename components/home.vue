<template>
  <section class="home">
    <div>首页</div>
    <van-button @click="onClick" plain type="primary">去过程页</van-button>
  </section>
</template>

<script>
let _this;
export default {
  data() {
    return {};
  },
  mounted() {
    _this = this;
  },
  methods: {
    onClick() {
      _this.$emit('nextPage', 2);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  // height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/home_bg.png');
  background-size: 100% 100%;
}
</style>
