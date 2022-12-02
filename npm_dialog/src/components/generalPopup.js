import Vue from "vue";
import generalPopup from "./generalPopup.vue";

let instance = null;

const GeneralPopupConstructor = Vue.extend(generalPopup);

const destroyInstance = () => {
  setTimeout(() => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
  }, 200);
};

const generalPopupInstance = config => {
  // 创建实例
  instance = new GeneralPopupConstructor({
    propsData: config
  });
  let vm = instance.$mount();
  let el = vm.$el;
  document.body.appendChild(el);

  instance.visible = true;

  return {
    instance,
    destroy: destroyInstance
  };
};

export default generalPopupInstance;
