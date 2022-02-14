<template>
  <div id="Design">
    <div class="needLogin">
      <img src="~assets/imgs/common/empty.png" alt="" />
      <div class="label">登录后才可以看到你的设计</div>
      <div class="click" @click="click">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Design",
  methods: {
    click() {
      this.$store.commit("setLoginTip", true)
    }
  },
};
</script>

<style lang="less" scoped>
.needLogin {
  width: 1.9rem;
  margin: 1.3rem auto 0;
  text-align: center;
  img {
    width: 1rem;
    height: 1rem;
  }
  .label{
    color: #666666;
    font-size: .14rem;
    margin: .03rem 0 .15rem;
  }
  .click {
    color: #fff;
    line-height: .43rem;
    background: #0773FC;
    font-size: .16rem;
    border-radius: .4rem;
  }
}
</style>