<template>
  <div class="Search">
    <router-link :to="'/search?id='+params">
      <van-icon class="icon" name="search" />
      <p>{{ text }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    params: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="less" scoped>
.Search {
  position: relative;
  z-index: 9999;
  background: #fff;
  padding: .1rem 0;
  a {
    width: 3.51rem;
    height: 0.34rem;
    background: #f8f8fb;
    color: #636364;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    font-size: 0.13rem;
    border-radius: 0.17rem;
    .icon {
      font-weight: 900;
      font-size: 0.18rem;
      margin-right: 0.1rem;
    }
  }
}
</style>