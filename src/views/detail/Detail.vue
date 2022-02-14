<template>
  <div class="Detail" v-if="Object.keys(curData).length">
    <div class="picture">
      <van-image
        lazy-load
        class="pic"
        width="2.4rem"
        height="4rem"
        fit="contain"
        :src="
          'https:' +
          curData.designTemplateImageUrl +
          '?v=1644680461890&x-oss-process=image/resize,w_600/format,jpg'
        "
      />
    </div>

    <div class="title">{{ curData.templateTitle }}</div>
    <div class="subTitle">{{ curData.kindTitle }}</div>
    <div class="info">
      图片编号为{{ id }}，该手机壁纸尺寸是{{ curData.width }} *
      {{ curData.height }}。点击“立即使用”， 《{{
        curData.templateTitle
      }}》一键生成，在线编辑图片，简单托拉拽，秒出精美 手机壁纸。
    </div>
    <div class="labels">
      <router-link
        :to="'/search?val=' + item"
        v-for="item in curData.keywords.split(' ')"
        :key="item"
        >{{ item }}</router-link
      >
    </div>

    <div class="title">为你推荐</div>
    <div class="recommend">
      <touchView
        @click="select(item)"
        v-for="item in recommend"
        :key="item.designTemplateId"
        :item="item"
      >
        <van-image
          width="100%"
          height="100%"
          lazy-load
          :src="
            'https:' +
            item.designTemplateImageUrl +
            '?v=1644677716499&x-oss-process=image/resize,w_300/format,jpg'
          "
        />
        <img
          class="icon"
          v-if="!item.price"
          src="~assets/imgs/index/label.png"
          alt=""
        />
      </touchView>
    </div>

    <FloorControl></FloorControl>
  </div>
</template>

<script>
import touchView from "components/contents/preview/touchView.vue";
import FloorControl from './detailChild/FloorControl';

export default {
  name: "Detail",
  data() {
    const id = this.$route.params.id;
    return {
      id,
      curData: {},
      recommend: [],
    };
  },
  components: {
    touchView,
    FloorControl
  },
  methods: {
    select(item) {
      this.$router.replace("/detail/" + item.designTemplateId);
      this.id = item.designTemplateId;
      this.getData();
    },

    async getData() {
      this.$store.commit("setLoadingFlag", true);
      const url = `/api/designtemplate/getDetailCacheFileUrl.do?_dataType=json&_dataClientType=3`;
      const { body: res } = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "client_type=40&id=" + this.id,
      }).then((r) => r.json());
      this.$store.commit("setLoadingFlag", false);
      this.curData = res.currentTemplate;
      this.recommend = res.recommendedTemplates;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.Detail {
  padding: 0 0.12rem 0.71rem;
  .picture {
    width: 3.51rem;
    height: 4.53rem;
    padding: 0.16rem;
    background: #e3e6e9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.13rem;
  }
  .title {
    font-weight: 900;
    font-size: 0.18rem;
    margin-top: 0.15rem;
  }
  .subTitle {
    color: #666666;
    margin: 0.1rem 0;
  }
  .info {
    color: #000;
    font-size: 0.13rem;
    line-height: 1.3;
  }
  .labels {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.15rem;
    a {
      padding: 0 0.16rem;
      color: #000;
      font-size: 0.14rem;
      background: #f3f4f9;
      line-height: 0.31rem;
      margin: 0 0.08rem 0.08rem 0;
      border-radius: 0.2rem;
    }
  }
  .recommend {
    margin-top: 0.15rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a {
      width: 48%;
      margin-bottom: 0.1rem;
      position: relative;
      .icon {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        width: 0.32rem;
        height: 0.14rem;
      }
    }
  }
}
</style>