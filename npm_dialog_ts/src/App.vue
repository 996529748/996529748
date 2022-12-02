<script setup lang='ts'>

import { Message } from './components';

//展示message

const showMessage = () => {

  Message({
    title:'My Message',
    confirmText:'确认',
    content:'This is content',
  })
  .then(()=>{
    console.log('resolve');
  }).catch(()=>{
    console.log('reject');
  })

}


const showConfirmMessage = () => {

  Message.confirm({
    title:'My ConfirmMessage',
    cancelText:'取消',
    showCancelButton:true,
    content:'This is ConfirmMessage',
  }).then(()=>{
    console.log('ConfirmMessage resolve');
  }).catch(()=>{
    console.log('ConfirmMessage reject');
  })

}


const showPromptMessage = () => {

  Message.prompt({
    title:'My PromptMessage',
    confirmText:'确认',
    cancelText:'取消',
    showCancelButton:true,
    content:'This is PromptMessage',
  }).then((value:string)=>{
    console.log(`PromptMessage resolve:${value}`);
  }).catch(()=>{
    console.log('PromptMessage reject');
  })

}

</script>

<template>
  <div>
    <button @click="showMessage">showMessage</button>
    <button @click="showConfirmMessage">showConfirmMessage</button>
    <button @click="showPromptMessage">showPromptMessage</button>
  </div>
</template>

<style lang='scss' scoped>
</style>