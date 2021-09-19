import Vue from 'vue';
import Dev from './serve.vue';

new Vue({
    render: (h) => h(Dev),
  }).$mount("#app");
  