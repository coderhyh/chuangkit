import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Lazyload, Image as VanImage, Icon, List, Popup, Loading, Tab, Tabs, Search, Field, CellGroup, NoticeBar, Cell, ActionSheet } from 'vant';

createApp(App)
  .use(Button)
  .use(VanImage)
  .use(Lazyload)
  .use(Icon)
  .use(List)
  .use(Popup)
  .use(Loading)
  .use(Tab)
  .use(Tabs)
  .use(Search)
  .use(Field)
  .use(CellGroup)
  .use(NoticeBar)
  .use(Cell)
  .use(ActionSheet)

  .use(store)
  .use(router)
  .mount('#app')
