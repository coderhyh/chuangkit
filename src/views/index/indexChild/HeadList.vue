<template>
  <div class="HeadList">
    <router-link
      to=""
      v-for="item in scene.slice(0, 8)"
      :key="item.designKindId"
    >
      <van-image
        width=".55rem"
        height=".55rem"
        lazy-load
        :src="'https:' + item.thumbUrl"
      />
      <p>{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeadList",
  props: {
    scene: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style lang="less" scoped>
.HeadList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  padding-bottom: .1rem;
  border-bottom: .04rem solid #F7F9FB;
  a {
    color: #333333;
    width: 0.8rem;
    margin: 0 0.06rem 0.16rem;
    text-align: center;
    p {
      margin-top: .05rem;
    }
  }
}
</style>