# generalPopup

全站使用的提示弹窗，主要在工作台及支付部分使用

## 参数及用法
 
### 参数：

可接收10个props

1、icon：弹窗展示所需icon

2、title：弹窗标题

3、message：弹窗提示文本

4、confirmButtonText：确定按钮文本

5、cancelButtonText：取消按钮文本

6、confirmButtonType：确认按钮类型

7、cancelButtonType：取消按钮类型

8、beforeClose：弹窗关闭前回调

9、width：弹窗大小

10、showButton：是否展示取消按钮


### 用法：

1、任意地方可直接调用，传入对应参数即可，如：

const generalPopup = generalPopupInstance({
  icon:"warningIcon",
  title: "message title",
  message: 'message',
  beforeClose: (action, done) => {
    if(action === 'confirm'){
      //do something
      done();
      generalPopup.destory();
    }else{
      //do something
      done();
      generalPopup.destory();
    }
  }
});


2、默认不传参的部分，值为props中的default
