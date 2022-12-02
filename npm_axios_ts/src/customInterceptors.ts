import axios, { AxiosInstance } from 'axios'
import { customRequestConfig } from './customRequestConfig'
import { getErrMessage } from './errCode'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true //默认loading显示 or 隐藏的变量

class customInterceptors {

    instance: AxiosInstance //axios实例

    showLoading: boolean //loading展示

    loadingInstance?: ReturnType<typeof ElLoading.service> //loading实例

    constructor(config:customRequestConfig){ //构造函数

        this.instance = axios.create(config) //根据传入配置手动创建实例

        this.showLoading = config.showLoading ?? DEFAULT_LOADING //控制loading显示

        //全局请求拦截器
        this.instance.interceptors.request.use((

            (res)=>{

                if (this.showLoading) {

                    if(config.loadingConfig){

                        this.loadingInstance = ElLoading.service(config.loadingConfig)

                    }else{

                        this.loadingInstance = ElLoading.service({

                            lock: true,

                            text: '正在加载中...',

                            background: 'rgba(0, 0, 0, 0.1)'

                          })

                    }
                }

                return res
            }),

            (err) => {

                this.loadingInstance?.close()

                return err
            }

        )

        //全局响应拦截器
        this.instance.interceptors.response.use((
            (res)=>{
                setTimeout(() => {

                    this.loadingInstance?.close()

                }, 1000)

                return res.data
            }),
            (err) => {
                //错误状态码解析信息
                this.loadingInstance?.close()

                err = getErrMessage(err)

                return err
            }
        )
    }

    //重写request方法
    request<T>(config: customRequestConfig): Promise<T> {

        return new Promise((resolve, reject) => {

            // 定制该请求是否加loading。当为传入该参数时，默认为true

            if (config.showLoading === false) {

                this.showLoading = false

            }


            this.instance.request<any, T>(config).then(

                (res) => {

                    resolve(res)

                },
                (err) => {

                    this.showLoading = DEFAULT_LOADING

                    reject(err)

                }
            )
        })
    }

}

export default customInterceptors