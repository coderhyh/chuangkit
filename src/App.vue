<template>
  <div id="app">
    <router-view v-slot="{ Component }" :class="{ showPreview: previewData.flag }">
      <keep-alive include="Page">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Preview></Preview>
    <Loading></Loading>
  </div>
</template>

<script>
import Preview from "components/contents/preview/Preview.vue";
import Loading from "components/common/loading/Loading.vue";

import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Preview,
    Loading,
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
  // overflow: hidden;
  // height: 100vh;
}
</style>