import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload, Image as VanImage, Icon, List, Popup, Loading, Tab, Tabs, Search } from 'vant';

createApp(App)
  .use(VanImage)
  .use(Lazyload)
  .use(Icon)
  .use(List)
  .use(Popup)
  .use(Loading)
  .use(Tab)
  .use(Tabs)
  .use(Search)

  .use(store)
  .use(router)
  .mount('#app')
