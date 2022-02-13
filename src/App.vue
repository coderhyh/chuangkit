<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.needKeepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </router-view>
    <Preview></Preview>
    <Loading></Loading>
  </div>
</template>

<script>
import Preview from "components/contents/preview/Preview.vue";
import Loading from "components/common/loading/Loading.vue";

export default {
  name: "App",
  components: {
    Preview,
    Loading,
  },
  created() {
    // console.log(this.$route.meta.needKeepAlive, 'app');
  },
};
</script>

<style lang="less" scoped>
@import url("~assets/css/base.css");
</style>