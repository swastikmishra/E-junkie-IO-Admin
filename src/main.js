// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueAxios from 'vue-axios'
import EventBus from './EventBus'
import VueClipboard from 'vue-clipboard2'

Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$bus = EventBus

//Basic config for the app
window.Config = {}
window.Config.API = {
	"endpoint" : "http://cms/api/",
}

 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
