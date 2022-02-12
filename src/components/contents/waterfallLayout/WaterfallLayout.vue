<template>
  <van-list
    class="waterfallLayout"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <section>
      <ul v-for="(wrapItem, index) in column" :key="index">
        <li v-for="(item, index) in wrapItem.list" :key="index">
          <van-image
            width="100%"
            :height="item.h"
            lazy-load
            :src="
              'https:' +
              item.designTemplateThumbUrls[0] +
              '?v=1644651067763&x-oss-process=image/resize,w_300/format,jpg'
            "
          >
          </van-image>
        </li>
      </ul>
    </section>
  </van-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "waterfallLayout",
  data() {
    return {
      loading: false,
      finished: false,

      column: [
        {
          h: 0,
          list: [],
        },
        {
          h: 0,
          list: [],
        },
      ],
    };
  },
  props: {
    totalList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState(["strategyHeadNav"]),
  },
  methods: {
    onLoad() {
      console.log("666123");
      this.$emit("getList");
    },

    disposeData() {
      if (this.totalList.length) {
        this.reset();
        this.totalList.forEach((e, i) => {
          const { height, width } = e;
          let index = this.column[0].h > this.column[1].h ? 1 : 0;
          let h = (parseInt(height) / parseInt(width)) * 1.68 + "rem";
          e.h = h;
          this.column[index].h += parseInt(h);
          this.column[index].list.push(e);
        });
      }
    },

    reset() {
      this.column.forEach((e) => {
        e.h = 0;
        e.list = [];
      });
    },
  },
};
</script>

<style lang="less" scoped>
.waterfallLayout {
  overflow-y: scroll;
  height: 5.12rem;
  margin: 1.55rem 0 0;
  section {
    display: flex;
  }
  ul {
    flex: 1;
    padding: 0 0.05rem;
    overflow: hidden;
    li {
      margin-top: 0.15rem;
      width: 100%;
      border-radius: 0.13rem;
      overflow: hidden;
      background: #fff;
      font-size: 0;
      > img {
        width: 100%;
        object-fit: cover;
      }
      section {
        padding: 0.05rem 0.07rem;
        .title {
          font-weight: 700;
          font-size: 0.14rem;
          color: #555;
          line-height: 0.2rem;
        }
        .author {
          margin-top: 0.05rem;
          display: flex;
          align-items: center;
          font-size: 0.12rem;
          color: #999999;
          img {
            width: 0.21rem;
            border-radius: 50%;
            vertical-align: middle;
          }
          .name {
            margin: 0 0.05rem;
            max-width: 0.6rem;
          }
          .label {
            padding: 0 4px;
            line-height: 1.2;
            box-sizing: content-box;
            border-radius: 0.21rem;
            border: 1px solid #b3d4f3;
            color: #2b99ff;
          }
        }
      }
    }
  }
}
</style>