<template>
  <div class="container">
    <h3 class="title">{{ title }}</h3>
    <div class="links">
      <van-button @click="onHm" plain type="primary">埋个点</van-button>
      <van-button @click="createShare" plain type="primary">分享下</van-button>
      <van-button @click="onGet" plain type="primary">GET一下</van-button>
    </div>
  </div>
</template>

<script>
let _this;
export default {
  head() {
    return {
      title: '测试首页 - 常规h5',
    };
  },
  computed: {
    //暗黑模式
    isDarkmode() {
      return this.$store.state.isDarkmode;
    },
  },
  data() {
    return {
      title: '这是一个示例页面 - 常规h5',
    };
  },
  mounted() {
    _this = this;
  },
  methods: {
    onHm() {
      this.$hm('start', 'click');
    },
    onGet() {
      this.$axios.get('gamedata/indexdata?gameid=c4e76bae-e5d4-4cc5-ba41-a3668a78031d').then((res) => {
        console.log(res);
      });
    },
    createShare() {
      let share = {
        title: '主标题',
        text: '副标题',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        url: location.origin + '/thanksgiving2020',
        callback: () => {
          this.$toast('分享成功');
        },
      };
      this.$share(share);
    },
    async getVisitor() {
      let res = await _this.$axios.get(
        'https://r.51wnl-cq.com/api/CommonUserVisitCount/GetUserVisitCount?key=TG2020'
      );
      this.visitNo = res.data;
      this.setVisitNo(this.visitNo);
    },
  },
};
window.shareCallback = () => {
  _this.$hm('shared', 'share');
};
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  div {
    line-height: 60px;
  }
}
</style>
