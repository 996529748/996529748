# axios 封装类

# 使用

##### 导入

**import HttpRequest from "class_http_serve"**

##### new 一个实例

**const http = new HttpRequest()**

##### 调用方法

**http.request**


# 配置参数

**showLoading: true**  请求时是否需要loading
  
**loadingConfig {}**   PC项目使用的loading配置  [具体参数](https://element.eleme.io/#/zh-CN/component/loading)

  
# 例子

<pre>
    <code>
        const config = {
            token: 1, //自定义token
            showLoading: true, //是否需要loading
            loadingConfig: {
                target: ".demo",
                lock: true,
                fullscreen: false,
                text: "拼命加载中...",
                background: "rgba(0, 0, 0, 0.5)"
            }
        };
    </code>
</pre>

# 初始化axios实例
<pre>
    <code>
        const http = new HttpRequest({
            method: "get",
            // 请求头信息
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            // 设置超时时间
            timeout: 5000,
            // 携带凭证
            withCredentials: true,
            // 返回数据类型
            responseType: "json",
            token: 1
        });
    </code>
</pre>

