<template>
  <div class="Loading" v-show="$store.state.loadingFlag">
    <van-loading color="#1989fa" size=".4rem"></van-loading>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="less" scoped>
.Loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.4rem;
  height: 0.4rem;
}
</style>