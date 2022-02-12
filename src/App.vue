<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="ClassifyDetail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Preview></Preview>
    <Loading></Loading>
  </div>
</template>

<script>
import Preview from "components/contents/preview/Preview.vue";
import Loading from 'components/common/loading/Loading.vue';

export default {
  name: "App",
  components: {
    Preview,
    Loading
  },
};
</script>

<style lang="less" scoped>
@import url("~assets/css/base.css");
</style>