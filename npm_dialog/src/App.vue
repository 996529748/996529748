<template>
  <div id="app">
    <!-- <toast/> -->
    <h1 @click="showToast">demo</h1>
  </div>
</template>

<script>
// import toast from './components/toast.vue'

export default {
  name: 'App',
  components: {
    // toast
  },
  methods:{
    showToast(){
      this.$myToast({
        text: "复制成功",
        duration: 1500
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
