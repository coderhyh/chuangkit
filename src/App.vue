<template>
  <div id="app">
    <router-view v-slot="{ Component }" :class="{ showPreview: previewData.flag }">
      <keep-alive include="Page,ClassifyDetail,Search">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Preview></Preview>
    <Loading></Loading>
    <LoginTip></LoginTip>
    <div class="gif" v-if="showGif">
      <van-icon name="cross" class="icon" @click="showGif = false"/>
      <img src="~assets/imgs/common/vipentry.gif" @click="$store.commit('setLoginTip', true)" alt="">
    </div>
  </div>
</template>

<script>
import Preview from "components/contents/preview/Preview.vue";
import Loading from "components/common/loading/Loading.vue";
import LoginTip from 'components/contents/loginTip/LoginTip.vue';

import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      showGif: true
    };
  },
  components: {
    Preview,
    Loading,
    LoginTip
  },
  computed: {
    ...mapState(["previewData"]),
  },
  created() {
    // console.log(this.$route.meta.needKeepAlive, 'app');
  },
};
</script>

<style lang="less" scoped>
@import url("~assets/css/base.css");
.showPreview {
  filter: blur(5px);
}
.gif {
  width: 0.85rem;
  height: 0.91rem;
  position: fixed;
  right: 0.1rem;
  bottom: .8rem;
  .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>