<template>
  <router-link
    class="touchView"
    :to="to || ''"
    @touchstart="start"
    @touchmove="end"
    @touchend="end"
  >
    <slot></slot>
  </router-link>
</template> 
 
<script>
import { mapMutations } from "vuex";

export default {
  name: "touchView",
  data() {
    return {
      timer: null,
    };
  },
  props: ["item", "to"],
  methods: {
    ...mapMutations(["setPreviewData"]),

    start() {
      this.timer = setTimeout(() => {
        this.setPreviewData({
          flag: true,
          item: this.item,
        });
      }, 500);
    },
    end() {
      clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="less" scoped>
.touchView {
}
</style>