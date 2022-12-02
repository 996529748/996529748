<script setup lang='ts'>
import { h, reactive,toRefs} from 'vue'
import { fields } from './message';

const state = reactive({

  visible:false,

  promptVal:'',
  
  type:'confirm'

})

const props = defineProps({

  title:{
    type:String,
    default:'Message'
  },

  content:{
    type:String,
    default:'Message content',
  },

  showCancelButton:{
    type:Boolean,
    default:false
  },

  confirmText:{
    type:String,
    default:'OK'
  },

  cancelText:{
    type:String,
    default:'cancel'
  },

  field:{
    type:String,
    default:'confirm',
    Validator:(value:string)=>{
      return fields.includes(value)
    }
  }

})

const { visible } = toRefs(state);

const setVisible = (isVisible:boolean) => {

  state.visible = isVisible

}

//关闭
const close = () =>{
  state.type = 'cancel'
  setVisible(false)

}

const confirm = () =>{
  state.type = 'confirm'
  setVisible(false)

}

//小组件
const ContentView = ({field}:any) => {

  switch (field) {

    case !field || 'confirm':

      return h('p', null, props.content);

    case 'prompt':

      return h('input',{

        value:state.promptVal,

        onInput:(e:any) => state.promptVal = e.target.value,

        class:'message-input'

        });

    default:

      return '';
  }

}

//暴露
defineExpose({

  setVisible,
  state

})

</script>

<template>
  <transition name="message-fade">
    <div class="message-mask" @click="close" v-show="visible">
      <div @click.stop class="message-wrapper">
        <h1>{{ title }}</h1>
        <div class="content">
          <content-view :field="field">{{content}}</content-view>
        </div>
        <div class="button-group">
          <button @click="confirm">{{confirmText}}</button>
          <button v-if="showCancelButton" @click="close">{{cancelText}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang='scss' scoped>
.message-fade-enter-from,.message-fade-leave-to {
  opacity: 0;
}

.message-fade-enter-active {
  transition: opacity 2s ease-in;
}
.message-fade-leave-active {
  transition: opacity 2s ease-out;
}
.message-mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: #000;
  .message-wrapper{
    width: 420px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    border-radius: 4px;
  }
}
</style>