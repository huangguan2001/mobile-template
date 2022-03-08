<template>
  <section class="process">
    <div>过程页</div>
    <van-button @click="onClick" plain type="primary">去加载页</van-button>
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
      _this.$emit('nextPage', 3);
    },
  },
};
</script>

<style lang="less" scoped>
.process {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/process_bg.jpg');
  background-size: 100% 100%;
}
</style>
