<template>
  <div>
    <router-view></router-view>
    <Preview></Preview>
  </div>
</template>

<script>
import Preview from 'components/contents/preview/Preview.vue';

export default {
  name: 'App',
  components: {
    Preview
  }
};
</script>

<style lang="less" scoped>
@import url("~assets/css/base.css");
</style>