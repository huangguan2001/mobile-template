import Vue from 'vue';
import { util } from '@wnl/util';
import { wnlShare, wxShare } from '@wnl/share';
import { subdir, activeName } from '../core/config';

/**
 * 导航到某个路由
 */
Vue.prototype.$toURL = function (url) {
  this.$router.push(url);
};
Vue.prototype.$loading = function (msg = '加载中') {
  this.$toast.loading({
    mask: false,
    message: msg,
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
  });
};
/**
 * 简单深拷贝
 */
Vue.prototype.$deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 检测对象是否为空
 */
Vue.prototype.$checkNullObj = function (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * 返回
 */
Vue.prototype.$back = function (url) {
  let length = history.length;
  if (length == 2 || length == 1) return this.$router.push('/');
  else if (url) this.$router.push(url);
  else return this.$router.go(-1);
};

/**
 * 百度埋点自定义事件提交
 * @param String activeName 活动名称 JSJ2020
 * @param String eventName 事件名  start
 * @param String eventType 事件类型 click
 */
Vue.prototype.$hm = function (eventName, eventType) {
  let f = '_',
    clt = 'wx',
    OS = 'az';

  util.isWnl && (clt = 'wnl');
  util.isIOS && (OS = 'ios');

  let evn = ['_trackEvent', activeName + f + eventName + f + clt, eventType, OS];

  //百度统计
  window._hmt.push(evn);
  //cnzz
  // window._czc && window._czc.push(evn);
};

Vue.prototype.$share = function (share) {
  // share = {
  //   title: '主标题',
  //   text: '副标题',
  //   image: '分享图地址，与imgUrl相同',
  //   imgUrl: '分享图地址，与image相同',
  //   url: '分享页面地址',
  //   callback: () => {},
  // };
  if (util.isWnl) wnlShare.setShareData(share);
  if (util.isWeixin) new wxShare(share);
};
Vue.prototype.$upload2Qiniu = async function (base64) {
  const tokenUrl = 'https://msg.51wnl.com/api/Active/qintoken?bucket=wnlother';

  if (base64.indexOf('base64') > -1) base64 = base64.substr(base64.indexOf('base64,') + 7);

  const { token } = await this.$axios.get(tokenUrl);
  // const { token } = await getJSON(tokenUrl);

  const url = await uptoQiniu(token, base64);
  return url;
};
function uptoQiniu(token, base64) {
  return new Promise((resove) => {
    let url = 'https://upload.qiniup.com/putb64/-1'; //非华东空间需要根据注意事项 1 修改上传域名
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let resData = JSON.parse(xhr.responseText);
        resove('https://qiniu.other.cq-wnl.com/' + resData.key);
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Authorization', 'UpToken ' + token);
    xhr.send(base64);
  });
}

Vue.prototype.$getScreen = function () {
  let height = screen.height,
    width = screen.width,
    availHeight = document.documentElement.clientHeight,
    availWidth = document.documentElement.clientWidth;

  console.log('屏幕', height, width, height / width);
  console.log('可见区域', availHeight, availWidth, availHeight / availWidth);
};

Vue.prototype.$getVisitor = async function () {
  let res = await this.$axios.get(
    'https://r.51wnl-cq.com/api/CommonUserVisitCount/GetUserVisitCount?key=' + subdir
  );
  sessionStorage.visitNo = res.data;
};
/**
 * 返回给定数组随机一项数据
 * @param {Array} items 数组
 * @returns 数组中随机的一条数据
 */
Vue.prototype.$randomItem = function (items = []) {
  return items[Math.floor(Math.random() * items.length)];
};

Vue.prototype.$obj2qs = function (obj) {
  if (!obj && !Object.keys(obj).length) {
    return '';
  } else {
    let arr = [];
    for (let key in obj) {
      arr.push(key + '=' + obj[key]);
    }
    return arr.join('&');
  }
};

/**
 返回随机的 [from, to] 之间的整数(包括from，也包括to)
 */
Vue.prototype.$randomInt = function (from, to) {
  return parseInt(Math.random() * (to - from + 1) + from);
};

Vue.prototype.$toDateTime = function (date) {
  date = date || new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
