import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import VueCompositionApi from '@vue/composition-api';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
