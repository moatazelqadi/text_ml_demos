import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App);
app.config.globalProperties.window = window
app.use(router);
app.mount('#app')
