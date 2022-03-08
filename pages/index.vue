<template>
  <div class="container" @touchstart="autoPlay">
    <topBar :playing="playing"></topBar>

    <preload v-if="step == 0" @nextPage="nextPage"></preload>
    <home v-if="step == 1" @nextPage="nextPage"></home>
    <process v-if="step == 2" @nextPage="nextPage"></process>
    <load v-if="step == 3" @nextPage="nextPage"></load>
    <result v-if="step == 4" @nextPage="nextPage"></result>
    <share v-if="step == 5"></share>
    <div>加密：{{ enc }}</div>
    <div>解密：{{ dec }}</div>
  </div>
</template>

<script>
import home from '@/components/home';
import process from '@/components/process';
import load from '@/components/loading';
import result from '@/components/result';
import share from '@/components/share';
import topBar from '@/components/music';
import preload from '@/components/preload';
import { subdir } from '../core/config';
import secret from '../core/secret';

let _this;
export default {
  head() {
    return {
      title: '测试首页 - 运营活动',
    };
  },
  computed: {
    //暗黑模式
    isDarkmode() {
      return this.$store.state.isDarkmode;
    },
  },
  components: { home, process, load, result, share, topBar, preload },
  data() {
    return {
      step: 1,
      playing: false,
      enc: '',
      dec: '',
      title: '这是一个示例页面 - 运营活动',
    };
  },
  mounted() {
    _this = this;
    _this.$hm('yemianfangwen', 'im');
    let _step = this.$route.query.step;
    if (_step != 5) this.createShare();
    else this.step = _step;

    _this.testScret();
  },
  methods: {
    createShare() {
      let share = {
        title: '主标题',
        text: '副标题',
        image: location.origin + subdir + 'shareIcon.jpg',
        imgUrl: location.origin + subdir + 'shareIcon.jpg',
        url: location.origin + subdir,
        callback: shareCallback,
      };
      this.$share(share);
    },
    nextPage(step) {
      this.step = step;
      console.log('step' + step);
    },
    autoPlay() {
      if (this.step == 1) {
        this.playing = true;
      }
    },
    testScret() {
      this.enc = secret.Encrypt('1');
      this.dec = secret.Decrypt(this.enc);
    },
  },
};
function shareCallback() {
  _this.$hm('shared', 'share');
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  div {
    line-height: 60px;
  }
}
/*长屏手机 */
@media only screen and (min-device-width: 360px) and (min-device-height: 780px) {
}
/* iPhone6/7/8 Plus*/
@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
}
/* 小手机 */
@media only screen and (min-device-width: 360px) and (max-device-height: 640px) {
}
/* iphone5 */
@media only screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
}
// iphone6，6s，7，8s
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
}
</style>
