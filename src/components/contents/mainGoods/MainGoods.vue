<template>
  <div
    class="MainGoods"
    v-for="(wrapItem, index) in list"
    :key="wrapItem.kindId"
  >
    <div class="title">
      <p class="p1">{{ wrapItem.name }}</p>
      <p class="p2">进入场景</p>
    </div>

    <div class="contnet">
      <router-link
        to=""
        v-for="item in wrapItem.templates"
        :key="item.designTemplateId"
        :class="getClass(wrapItem.kindId)"
        @touchstart="start(item)"
        @touchend="end"
      >
        <van-image
          class="pic"
          width="100%"
          :height="
            (parseInt(item.height) / parseInt(item.width)) * 1.08 + 'rem'
          "
          lazy-load
          :src="
            'https:' +
            item.designTemplateImageUrl +
            '?v=1644589009809&x-oss-process=image/resize,w_300/format,jpg'
          "
        />
        <img class="label" src="~assets/imgs/index/label.png" alt="" />
      </router-link>
    </div>

    <div class="btn">
      <div class="more">更多</div>
      <div class="next" @click="next(wrapItem.kindId, index)">换一换</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      page: 1,
      time: null
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState(["previewData"]),
  },
  methods: {
    ...mapMutations(["setPreviewData"]),

    start(item) {
      this.time = setTimeout(() => {
        this.setPreviewData({
          flag: true,
          item
        })
      }, 500);
    },
    end() {
      clearTimeout(this.time);
    },

    getClass(id) {
      const arr = [20, 12];
      return {
        item: true,
        small: arr.indexOf(id) == -1,
        big: arr.indexOf(id) != -1,
      };
    },

    async next(id, index) {
      this.page++;
      const url =
        "/api/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&sid=" +
        id +
        "&page_size=6&page_no=" +
        this.page +
        "&_dataClientType=3";
      const link = await fetch(url).then((r) => r.json());
      const { body } = await fetch(
        "/pub" + link.body.cacheUrl.split(".com")[1]
      ).then((r) => r.json());
      console.log(body);
      this.list[index].templates = body.templates;
    },
  },
};
</script>

<style lang="less" scoped>
.MainGoods {
  padding: 0 0.12rem 0.15rem;
  overflow: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p1 {
      font-size: 0.16rem;
      color: #000;
      font-weight: 600;
    }
  }
  .contnet {
    margin-top: 0.15rem;
    display: flex;
    flex-wrap: wrap;
    width: 105%;
    overflow: hidden;
    .item {
      position: relative;
      margin: 0 0.14rem 0.14rem 0;
      border: 1px solid #e6e6e6;
      border-radius: 0.05rem;
      overflow: hidden;
    }
    .pic {
      display: block;
    }
    .small {
      width: 1.08rem;
    }
    .big {
      width: 1.68rem;
    }
    .label {
      position: absolute;
      right: 0.05rem;
      top: 0.05rem;
      width: 0.32rem;
      height: 0.14rem;
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
    margin-top: 0.15rem;
    div {
      background: #f3f4f9;
      width: 48%;
      line-height: 0.4rem;
      text-align: center;
      border-radius: 0.2rem;
      color: #313132;
    }
  }
}
</style>