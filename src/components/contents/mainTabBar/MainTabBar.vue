<!-- MainTabBar -->
<template>
  <tab-bar>
    <tab-bar-item v-for="item in TabBarList" :key="item.path" :path="item.path" :activeColor="'#1B2337'">
      <template #item-icon>
        <img :src="item.img" alt="" />
      </template>
      <template #item-icon-active>
        <img :src="item.img_active" alt="" />
      </template>
      <template #item-name>
        <p>{{ item.name }}</p>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      TabBarList: [
        {
          path: "/page/index",
          img: require("assets/imgs/tabbar/index.png"),
          img_active: require("assets/imgs/tabbar/index-cur.png"),
          name: "首页",
        },
        {
          path: "/page/design",
          img: require("assets/imgs/tabbar/design.png"),
          img_active: require("assets/imgs/tabbar/design-cur.png"),
          name: "我的设计",
        },
        {
          path: "/page/profile",
          img: require("assets/imgs/tabbar/profile.png"),
          img_active: require("assets/imgs/tabbar/profile-cur.png"),
          name: "个人中心",
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
#tab-bar {
  display: flex;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #E6E6E6;
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 0.12rem;
  height: 0.45rem;
  color: #999999;

  img {
    width: 0.20rem;
    height: 0.20rem;
    margin-top: 0.05rem;
  }
}
</style>