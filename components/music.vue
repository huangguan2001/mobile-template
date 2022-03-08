<template>
  <section class="topbar">
    <div v-if="showIcon" class="logo"></div>
    <div v-if="showMusic" :class="['music', isplay ? 'playing' : '']" @click="onPlay()">
      <audio id="audio" preload="auto" :autoplay="autoplay" :loop="loop" :src="bgm"></audio>
    </div>
  </section>
</template>

<script>
let _this;
import bgm from '@/assets/music/bgm.mp3';
import { util } from '@wnl/util';
export default {
  name: 'top-bar',
  props: {
    showIcon: {
      type: Boolean,
      default: true,
    },
    showMusic: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    playing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bgm,
      isplay: false,
      audio: '',
    };
  },
  watch: {
    // 控制音乐
    playing(newValue) {
      let audio = document.getElementById('audio');
      if (newValue) {
        this.isplay = true;
        audio.play();
      } else {
        this.isplay = false;
        audio.pause();
      }
    },
  },
  mounted() {
    this.isPageLeave();
    if (util.isAndroid) {
      let voice = document.getElementById('audio');
      voice.play();
      _this.isplay = true;
    }
  },
  methods: {
    init() {
      if (this.autoplay) {
        let voice = document.getElementById('audio');
        voice.play();
        this.isplay = true;
        let iosplay = false;
        voice.addEventListener('ended', (_) => {}, false);
        document.addEventListener('touchstart', function (e) {
          if (iosplay === false) {
            voice.play();
            iosplay = true;
          }
        });
        document.addEventListener(
          'WeixinJSBridgeReady',
          function () {
            voice.play();
          },
          false
        );
      }
    },
    onPlay() {
      let audio = document.getElementById('audio');

      console.log(this.isplay);
      if (audio.paused) {
        audio.play();
        this.isplay = true;
      } else {
        audio.pause();
        this.isplay = false;
      }
    },
    isPageLeave() {
      let audio = document.getElementById('audio');

      let hiddenProperty =
        'hidden' in document
          ? 'hidden'
          : 'webkitHidden' in document
          ? 'webkitHidden'
          : 'mozHidden' in document
          ? 'mozHidden'
          : null;
      let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
      let onVisibilityChange = () => {
        if (document[hiddenProperty] && audio.played) {
          audio.pause();
          this.isplay = false;
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
  },

  created() {
    _this = this;
  },
};
</script>

<style lang="less">
.topbar {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 5;
  .logo {
    position: absolute;
    top: 20px;
    left: 40px;
    height: 70px;
    width: 200px;
    background: url('../assets/images/logo.png') no-repeat center center;
    background-size: contain;
  }
  .music {
    position: fixed;
    top: 20px;
    right: 30px;
    height: 60px;
    width: 60px;
    background: url('../assets/images/music.png') no-repeat center center;
    background-size: contain;
  }
}

@keyframes playing {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playing {
  animation: playing 3s linear infinite;
}
</style>
