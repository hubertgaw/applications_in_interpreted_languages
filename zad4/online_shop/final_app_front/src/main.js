import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import mitt from 'mitt';
const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount('#app')
