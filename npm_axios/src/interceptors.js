import axios from "axios";
import utils from "@foxit/utils";
import "element-ui/lib/theme-chalk/index.css";
import { Message, Loading } from "element-ui";
import { Toast, Notify } from "vant";
import { config } from "./config";

let requestCount = 0;
let loadingInstance;
let loadingInstanceArr = [];
let deviceType = utils.browse.deviceType();

export class Interceptors {
  constructor(config) {
    this.instance = axios.create(config);
    this.init();
  }

  //初始化拦截器
  init() {
    //请求拦截器
    this.instance.interceptors.request.use(
      config => {
        if (config.headers.showLoading) {
          if (deviceType === "pc") {
            loadingInstance = Loading.service(config.headers.loadingConfig);
            loadingInstanceArr.push(loadingInstance);
          } else {
            Toast.loading();
          }
          requestCount += 1;
        }
        if (config.formData) {
          config.data = config.formData;
        }
        return config;
      },
      error => {
        if (config.showLoading) requestCount -= 1;
        return Promise.reject(error);
      }
    );
    //响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.config.headers.showLoading) requestCount -= 1;
        loadingClose();
        if (response.status === 200 || response.status === 201) {
          switch (response.data.ret) {
            case 400:
              return Promise.reject(response.data.msg);
            case 500:
              return Promise.reject(response.data.msg);
            default:
              return response.data;
          }
        }
        return response.data;
      },
      error => {
        if (error.config.headers.showLoading) requestCount -= 1;
        // 异常状态作统一处理
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "错误请求";
              break;
            case 401:
              error.message = "未授权，请重新登录";
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = "请求错误,未找到该资源";
              break;
            case 405:
              error.message = "请求方法未允许";
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 500:
              error.message = "服务器端出错";
              break;
            case 501:
              error.message = "网络未实现";
              break;
            case 502:
              error.message = "网络错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "网络超时";
              break;
            case 505:
              error.message = "http版本不支持该请求";
              break;
            default:
              error.message = `连接错误${error.response.status}`;
          }
        } else {
          error.message = "连接到服务器失败了~";
        }
        //报错提示
        if (deviceType === "pc") {
          Message.error(error.message);
        } else {
          Notify({ type: "danger", message: error.message });
        }
        return Promise.reject(error);
      }
    );
  }
}
/**
 * [loadingClose 关闭loading]
 *
 * @return  {[type]}  [return description]
 */
function loadingClose() {
  setTimeout(() => {
    if (requestCount === 0) {
      if (deviceType === "pc") {
        if (loadingInstanceArr.length !== 0) {
          for (let i = 0, max = loadingInstanceArr.length; i < max; i++) {
            loadingInstanceArr[i].close();
          }
          loadingInstanceArr = [];
        }
      } else {
        Toast.clear();
      }
    }
  }, 10);
}
