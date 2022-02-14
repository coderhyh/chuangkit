<template>
  <div class="Preview" v-show="previewData.flag">
    <div class="mask" @click="setPreviewData({ flag: false })"></div>
    <transition name="fade">
      <div class="content" v-show="previewData.flag">
        <van-image
          class="pic"
          width="100%"
          :height="getHeight"
          lazy-load
          :src="getSrc"
        />

        <div class="btn">
          <img src="~assets/imgs/common/shoucang.png" alt="" />
          <p>收藏</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Preview",
  data() {
    return {};
  },
  computed: {
    ...mapState(["previewData"]),
    getHeight() {
      return (
        (parseInt(this.previewData.item.height) /
          parseInt(this.previewData.item.width)) *
          2.14 +
        "rem"
      );
    },
    getSrc() {
      const url = this.previewData.item?.designTemplateThumbUrls?.[0];
      return (
        "https:" +
        url +
        "?v=undefined&x-oss-process=image/resize,w_600/format,jpg"
      );
    },
  },
  methods: {
    ...mapMutations(["setPreviewData"]),
  },
};
</script>

<style lang="less" scoped>
.Preview {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .mask {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.16);
    z-index: -1;
  }
  .content {
    width: 2.4rem;
    .btn {
      text-align: center;
      color: #fff;
      width: 0.5rem;
      margin: 0 auto;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.15rem 0 0.05rem;
      }
    }
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: scale(0.1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
}
</style>