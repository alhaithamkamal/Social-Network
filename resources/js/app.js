require('./bootstrap')

import Vue     from 'vue'

import router  from './routes.js'

import store   from './store.js'

import BootstrapVue from 'bootstrap-vue'

Vue.use(require('vue-moment'));



new Vue({
	router,
	store,
}).$mount('#app')

