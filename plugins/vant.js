import Vue from 'vue';
import vant from 'vant';
import 'vant/lib/index.css';

import 'babel-polyfill';

Vue.use(vant);

Vue.config.errorHandler = function (err, vm, info) {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    // 只上报线上错误
    const obj = {
      w_file: window.location.href, // 发生错误页面
      stack: err.stack.toString(), // 错误栈
      w_msg: err.message, // 错误信息
    };
    window.__wpk.sendError(obj);
  }
  console.error(err);
};

/**
 * cnzz埋点
 */
// document.write(
//   unescape(
//     "%3Cspan style='display:none;' id='cnzz_stat_icon_1280091761'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D1280091761' type='text/javascript'%3E%3C/script%3E"
//   )
// );
