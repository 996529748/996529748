<template>
  <h1>demo</h1>
</template>
<script setup lang="ts">
import customAxiosRequest from './customInterceptors'
// import customAxiosRequest from '../lib/customAxios.es'
//axios基本配置
const requestInstance = new customAxiosRequest({
    timeout: 10000,
    showLoading: true, //默认接口存在Loading
    // 携带凭证
    withCredentials: true,
    headers:{'X-token':'22222'},
    loadingConfig:{
        text: "拼命加载中...",
        background: "rgba(0, 0, 0, 0.5)"
    },
})
const config = {

  showLoading:false

}
const getUserInfo = (config:any) =>{
  requestInstance.request({
    url: `https://webapi.foxitcloud.cn/v1/api/enterpriseUser/getCurrentUserInfo`,
    method: "GET",
    ...config
  });
}
getUserInfo(config)

</script>