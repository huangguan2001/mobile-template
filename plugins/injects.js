import Vue from 'vue';
import 'lib-flexible';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.min.css';
import VueClipboard from 'vue-clipboard2';
import VConsole from 'vconsole/dist/vconsole.min.js';
import { isDebug } from '../core/config';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueAwesomeSwiper);
Vue.use(VueClipboard);

export default ({ query }) => {
  if ((query && query.debug == 1) || isDebug) new VConsole();
};
