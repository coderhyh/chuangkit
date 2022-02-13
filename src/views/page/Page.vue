<template>
  <div id="page">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.needKeepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </router-view>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/contents/mainTabBar/MainTabBar.vue";
export default {
  name: "Page",
  components: {
    MainTabBar,
  },
  created() {
    // console.log(this.$route.meta.needKeepAlive, 'page');
  },
};
</script>

<style lang="less" scoped>
</style>