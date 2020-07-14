import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import { MdChips, MdDatepicker, MdButton, MdDialog, MdField } from 'vue-material/dist/components'
import VueMaterial from 'vue-material'

import 'materialize-css/dist/js/materialize.min';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

// Vue.use(MdChips)
// Vue.use(MdDatepicker)
// Vue.use(MdButton)
// Vue.use(MdDialog)
// Vue.use(MdField)

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
