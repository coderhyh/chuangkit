<template>
  <div class="FloorControl">
    <div class="left">
      <img src="~assets/imgs/common/shoucang.png" alt="">
    </div>
    <div class="right" @click="click">
      立即编辑
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FloorControl',
    data() {
      return {
        
      }
    },
    methods: {
      click() {
        const info = localStorage.getItem("info");
        if (!info) {
          this.$store.commit("setLoginTip", true)
        }else {

        }
      }
    },
  }
</script>

<style lang="less" scoped>
.FloorControl {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  padding: 0 .12rem;
  height: 0.71rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 0.53rem;
    height: 0.53rem;
  }
  .right {
    width: 2.91rem;
    height: 0.47rem;
    background: #0773FC;
    color: #fff;
    line-height: .47rem;
    text-align: center;
    border-radius: .1rem;
    font-size: .16rem;
  }
}
</style>