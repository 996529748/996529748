import { Interceptors } from "./interceptors";

/**
 * 导出一个实例对象
 *
 * @param {Object} options 用户自定义配置
 * @return {Axios} 返回 axios 实例
 * @memberof HttpRequest
 */
class HttpRequest {
  // 设置默认值为空方便使用 devServer 代理
  // 获取axios实例
  constructor(config) {
    this.axios = new Interceptors(config).instance;
  }
  //请求封装
  request(config) {
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default HttpRequest;
