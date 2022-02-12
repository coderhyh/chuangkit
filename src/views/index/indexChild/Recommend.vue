<template>
  <div class="Recommend">
    <div class="title">推荐专题</div>
    <div class="content">
      <div class="item" v-for="(item, index) in recommend" :key="item.id">
        <p class="p1">{{item.title}}</p>
        <p class="sub">{{item.themeDescribe}}</p>
        <div class="yuan" :style="{background: colors[index]}"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {
      colors: ['#FF406C', '#FEC01B', '#00CB47', '#C86EFD', '#3BA9FF', '#FF406C']
    }
  },
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Recommend {
  padding: .2rem 0.12rem 0;
  .title {
    font-size: 0.16rem;
    color: #000;
    font-weight: 600;
  }
  .content {
    margin-top: .2rem;
    height: 0.93rem;
    overflow-x: auto;
    white-space: nowrap;

    .item {
      margin-right: .15rem;
      display: inline-block;
      position: relative;
      width: 1.04rem;
      height: 0.65rem;
      overflow: hidden;
      box-shadow: 0 0 0.12rem 0 rgb(224, 224, 224);
      border-radius: .05rem;
      padding-left: .15rem;
      .p1 {
        font-weight: 700;
        font-size: .13rem;
        white-space: nowrap;
        margin-top: .16rem;
      }
      .sub {
        color: #666666;
        margin-top: .12rem;
        transform: scale(.8) translateX(-.1rem);
      }
      .yuan {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }
    }
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
</style>