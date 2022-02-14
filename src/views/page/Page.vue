<template>
  <div id="page">
    <router-view v-slot="{ Component }">
      <keep-alive include="">
        <component :is="Component" />
      </keep-alive>
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