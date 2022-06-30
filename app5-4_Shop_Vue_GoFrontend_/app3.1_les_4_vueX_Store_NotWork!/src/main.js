// import { createApp } from 'vue' 
// import App from './App.vue'

// // import store from "./vuex/store";

// createApp(App).mount('#app');



import { createApp } from 'vue' 
import App from './App.vue'
import store from "@/store";

const app = createApp(App)

app.use(store)
app.mount('#app')








































//import Vue from 'vue'
//import App from './App.vue'
// import store from './vuex/store'
// import router from "./router/router";
// import './assets/styles/styles.scss'
// import 'material-design-icons-iconfont'

//Vue.config.productionTip = false

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

//createApp(App).mount('#app')


