require('./bootstrap');
window.Vue = require('vue');

//axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// vuex
import store from "./store";

//Component App là file Master FE
// import App from './components/App';

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('app', require('./components/App.vue').default);
Vue.component('menu-component', require('./components/MenuComponent.vue').default);
Vue.component('play-component', require('./components/PlayComponent.vue').default);

//router.js
import router from './router';

const app = new Vue({
    el: '#app',
    store: store,
    router: router,
    // render: h => h(App)
});
