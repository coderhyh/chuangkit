<template>
  <div class="headSelect">
    <van-tabs
      v-model:active="active"
      @click-tab="onClickTab"
      style="width: 100%"
      color="#0773FC"
      line-width=".2rem"
    >
      <van-tab title="全部" :name="0" />
      <van-tab
        v-for="item in titles"
        :key="item.tagId"
        :title="item.name"
        :name="item.tagId"
      />
    </van-tabs>

    <div class="moreIcon" @click="$emit('update:show', !show)">
      <van-icon name="arrow-down" />
    </div>
  </div>
  <van-popup
    v-model:show="show"
    position="top"
    :style="{ height: '32%', top: '.97rem', overflow: 'hidden' }"
    :overlay-style="{ top: '.97rem' }"
  >
    <div class="zzcWrap">
      <p :class="{ cur: active == 0 }" @click="textClick(0)">全部</p>
      <p
        v-for="item in titles"
        :key="item.tagId"
        :class="{ cur: active == item.tagId }"
        @click="textClick(item.tagId)"
      >
        {{ item.name }}
      </p>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "HeadSelect",
  data() {
    return {
      active: 0,
    };
  },
  emits: ["updateList", "update:titleIndex", "update:show"],
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    titleIndex: {
      type: Number,
      default: 1,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    textClick(id) {
      this.onClickTab({ name: id });
      this.active = id;
    },
    onClickTab({ name }) {
      this.$emit("update:show", false);
      this.$emit("update:titleIndex", name);
      this.$emit("updateList", true);
    },
  },
};
</script>

<style lang="less" scoped>
.headSelect {
  padding: 0 0.4rem 0 0.14rem;
  height: 0.42rem;
  line-height: 0.42rem;
  position: relative;
  z-index: 9999;
  display: flex;
  align-items: center;
  background: #fff;
  .titles {
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    .item {
      margin-right: 0.2rem;
      display: inline-block;
      font-size: 0.15rem;
      position: relative;
      color: #333333;
    }
  }
  .titles::-webkit-scrollbar {
    display: none;
  }
  .moreIcon {
    position: absolute;
    right: 0.15rem;
    box-shadow: -0.1rem 0 0.15rem rgba(235, 235, 235, 0.3);
    padding-left: 0.05rem;
    i {
      font-weight: bold;
      font-size: 0.16rem;
    }
  }
}
.zzcWrap {
  width: 110%;
  height: 100%;
  overflow: hidden;
  padding: 0.05rem 0.16rem 0;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eeeeee;
  p {
    width: 0.74rem;
    line-height: 0.3rem;
    text-align: center;
    background: #f3f4f9;
    color: #313132;
    margin: 0 0.15rem 0.12rem 0;
    border-radius: 0.15rem;
  }
  .cur {
    background: #0773fc;
    color: #fff;
  }
}
</style>