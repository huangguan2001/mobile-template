import { subdir } from './core/config';
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      { httpEquiv: 'X-UA-Compatible', name: 'IE=edge, chrome=1' },
      // { httpEquiv: 'Cache-Control', name: 'no-cache, must-revalidate' }, //酌情开启，强制不缓存
      { name: 'format-detection', content: 'telphone=no, email=no' }, //忽略页面中的数字识别为电话，忽略email识别
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }, //苹果工具栏颜色
      { name: 'apple-mobile-web-app-capable', content: 'yes' }, //启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
      { name: 'msapplication-tap-highlight', content: 'no' }, //windows phone 点击无高光
      { name: 'HandheldFriendly', content: 'true' }, //针对手持设备优化
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'prefetch', href: 'shareIcon.jpg' }, //预加载
    ],
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?427c3e9ab87e442121e9cb39aca7231f', //运营活动百度统计埋点
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.less', 'normalize.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vant',
    '@/plugins/injects',
    '@/plugins/utils',
    '@/plugins/axios',
    '@/plugins/darkmode',
  ],
  generate: {
    fallback: true, // 在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：mode:'spa'。 主要是这个api的作用 打包生成404文件
    interval: 150, // 两个渲染周期之间的间隔，以避免使用来自Web应用程序的API调用互相干扰
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  router: {
    base: subdir,
    fallback: true,
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],
  styleResources: {
    less: './assets/css/var.less',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true,
    credentials: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        'postcss-pxtorem': {
          rootValue: 75,
          // propList: ['*', '!font-size'],
          propList: ['*'],
          selectorBlackList: ['van-'],
        },
        autoprefixer: {},
        // 'postcss-pxtorem': false
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: true,
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      });
    },
  },
};
