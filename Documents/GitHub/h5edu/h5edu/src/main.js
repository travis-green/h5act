// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import vSelect from 'vue-select';
import { Swipe, SwipeItem } from 'mint-ui';
import iView from 'iview';
import 'iview/dist/styles/iview.css';  

Vue.use(iView);
Vue.use(MintUI);
Vue.component('v-select', vSelect);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
