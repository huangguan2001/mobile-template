export default function ({ $axios }) {
  const axios = $axios;

  axios.defaults.baseURL = '/api';
  axios.defaults.timeout = 10000;

  axios.onResponse(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log('遇到了错误：' + err);
    }
  );
}
