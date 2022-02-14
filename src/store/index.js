import { createStore } from 'vuex'

export default createStore({
  state: {
    previewData: { // 长按预览
      flag: false,
      item: {}
    },
    loadingFlag: false,
    loginTip: false,
  },
  mutations: {
    setPreviewData(state, data) {
      state.previewData = {
        flag: data.flag,
        item: data.item || {}
      };
    },
    setLoadingFlag(state, data) {
      state.loadingFlag = data;
    },
    setLoginTip(state, data) {
      state.loginTip = data
    }
  },
  actions: {
  },
  modules: {
  }
})
