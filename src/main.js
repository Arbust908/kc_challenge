import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./assets/css/index.css";

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
