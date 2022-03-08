<template>
  <section class="result">
    <div>结果页</div>
    <div class="tips">长按保存图片</div>
    <div class="footer">
      <img src="@/assets/images/btn_reload.png" alt="" @click="onReload" />
      <img src="@/assets/images/btn_share.png" alt="" @click="onShare" />
    </div>
    <img :src="shareImg" class="shareImg" @click="$hm('changanbaocun', 'ck')" />
    <van-overlay :show="shareMaskShow" @click="shareMaskShow = false" z-index="10">
      <div class="mask"></div>
    </van-overlay>
  </section>
</template>

<script>
let _this;
import { subdir } from '../core/config';
import { util } from '@wnl/util';
import { wnlShare } from '@wnl/share';
export default {
  data() {
    return {
      shareImg: sessionStorage.shareImg,
      shareMaskShow: false,
    };
  },
  mounted() {
    _this = this;
  },
  methods: {
    setShare() {
      let img = encodeURIComponent(_this.shareImg);
      let share = {
        title: `跟我一起晒出老爸的英雄事迹吧`,
        text: '老爸，你是我的英雄',
        image: location.origin + subdir + 'shareIcon.jpg',
        imgUrl: location.origin + subdir + 'shareIcon.jpg',
        url: location.origin + subdir + `?step=6&img=${img}`,
        callback: () => {
          this.$toast('分享成功');
          _this.$hm('fenxiangchenggong', 'share');
          _this.shareMaskShow = false;
        },
      };
      this.$share(share);
      wnlShare.setShareData({ image: _this.shareImg });
    },
    onReload() {
      this.$hm('zaixuanyici', 'ck');
      this.$parent.createShare();
      this.$emit('nextPage', 3);
    },
    onShare() {
      this.$hm('xuanyaoyixia', 'ck');
      if (util.isWnl) wnlShare.showSharePlatform();
      else this.shareMaskShow = true;
    },
  },
};
window.shareCallback = () => {
  _this.$hm('shared', 'share');
};
</script>

<style lang="less" scoped>
.result {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/result_bg.jpg');
  background-size: 100% 100%;
  .mask {
    position: absolute;
    top: 0;
    right: 40px;
    width: 124px;
    height: 204px;
    background: url('../assets/images/share.png');
    background-repeat: no-repeat;
    background-size: 124px auto;
  }
  .shareImg {
    position: absolute;
    overflow: hidden;
    height: 100%;
    left: 0;
    top: 0;
    // z-index: 9;
    width: 100%;
    height: 82%;
    bottom: 0;
    opacity: 0;
  }
  .tips {
    color: #a5623d;
    font-size: 24px;
    position: absolute;
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    animation: scale 2s infinite;
  }
}
@keyframes scale {
  0% {
    transform: translateX(-50%) scale(0.8);
  }
  50% {
    transform: translateX(-50%) scale(1);
  }
  100% {
    transform: translateX(-50%) scale(0.8);
  }
}
</style>
