import { createStore } from 'vuex'

export default createStore({
  state: {
    previewData: {
      flag: false,
      item: {}
    }
  },
  mutations: {
    setPreviewData(state, data) {
      state.previewData = {
        flag: data.flag,
        item: data.item || {}
      };
    }
  },
  actions: {
  },
  modules: {
  }
})
