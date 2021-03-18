import Vue from 'vue'
import App from './App.vue'
import Sugar from 'sugar'
import 'sugar/locales/ru'

Sugar.extend();
Sugar.Date.setLocale('ru');

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
