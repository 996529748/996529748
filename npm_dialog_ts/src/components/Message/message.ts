import MessageCompontent from './message.vue';

import { MessageType,OptionType } from './type';

import { createApp,watch } from 'vue';

export const fields = ['confirm','prompt'];//属性挂载

//创建实例方法
const Message = (option:any) => {

  const MessageApp = createApp(MessageCompontent,option);

  return new Promise((resolve,reject)=>{

    showMessage(MessageApp,{ resolve, reject });

  })

}

//插入属性
fields.forEach(field => {

  Message[field] = (option:OptionType) =>{

    option.field = field;

    return Message(option);

  }

})

//展示弹窗
const showMessage = (app:any,{resolve,reject}:any)=>{

  const oFragment = document.createDocumentFragment();

  const vm = app.mount(oFragment);

  document.body.appendChild(oFragment);

  vm.setVisible(true);

  //监听开关变量处理
  watch(vm.state,(state) => {

    if(!state.visible){

      switch (state.type) {
        
        case 'cancel':
          reject();
          break;
          
        case 'confirm':
          resolve(state.promptVal);
          break;

        default:
          break;

      }

      //销毁实例
      hideMessage(app)
      
    }

  })

}

const hideMessage = (app:any) => {

  app.unmount()

}

export default Message