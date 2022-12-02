import GridRoll from "../src/components/gridRoll/gridRoll.vue";
import _Vue from "vue";

GridRoll.install = Vue =>{
    if(!Vue){
        window.Vue = Vue = _Vue
    }
    Vue.component(GridRoll.name,GridRoll)
}
export default GridRoll
