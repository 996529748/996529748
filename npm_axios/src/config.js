export default {
  method: "get",
  // 请求头信息
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 2000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: "json",
  retry: 4,
  retryDelay: 1000,
  showLoading: true
};
