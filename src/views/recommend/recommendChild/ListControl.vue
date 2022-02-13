<template>
  <div class="ListControl">
    <div class="title">{{ countList.title }}</div>
    <div class="list">
      <router-link
        :to="'/detail/'+item.designTemplateId"
        v-for="item in countList.templates"
        :key="item.designTemplateId"
        :style="{
          height: (parseInt(item.height) / parseInt(item.width)) * 1.08 + 'rem',
        }"
        @touchstart="start(item)"
        @touchmove="end"
        @touchend="end"
      >
        <van-image
          width="100%"
          height="100%"
          lazy-load
          :src="
            'https:' +
            item.designTemplateImageUrl +
            '?v=1644671489468&x-oss-process=image/resize,w_300/format,jpg'
          "
        />
      </router-link>
    </div>
    <div class="lookMore" @click="moreClick(countList.id)" v-if="show">
      查看更多
    </div>
  </div>
</template>

<script>
export default {
  name: "ListControl",
  data() {
    return {
      pageNum: 1,
      show: true,
    };
  },
  props: {
    countList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    async moreClick(id, index) {
      this.pageNum++;
      this.$store.commit("setLoadingFlag", true);
      const url = `/v2/solutionSubject/themeExtend/template.do?_dataType=json&_dataClientType=3&client_type=40&themeExtendId=${id}&pageSize=6&pageNum=${this.pageNum}`;
      const { body: res } = await fetch(url).then((r) => r.json());
      this.countList.templates.push(...res.data.templates);
      this.$store.commit("setLoadingFlag", false);
      if (this.countList.templates.length == res.data.count) {
        this.show = false;
        return;
      }
    },

    start(item) {
      this.time = setTimeout(() => {
        this.$store.commit("setPreviewData", {
          flag: true,
          item,
        });
      }, 500);
    },
    end() {
      clearTimeout(this.time);
    },
  },
};
</script>

<style lang="less" scoped>
.ListControl {
  padding: 0 0.12rem;
  overflow: hidden;
  .title {
    font-size: 0.16rem;
    text-align: center;
    margin-top: 0.1rem;
  }
  .list {
    margin-top: 0.2rem;
    width: 110%;
    display: flex;
    flex-wrap: wrap;
    a {
      margin: 0 0.14rem 0.12rem 0;
      width: 1.08rem;
      height: 1.08rem;
      display: block;
      border: 1px solid #e6e6e6;
    }
  }
  .lookMore {
    margin: 0.1rem auto 0.2rem;
    width: 1.52rem;
    line-height: 0.42rem;
    text-align: center;
    background: #f9fafd;
    color: #646465;
    border-radius: 0.3rem;
    border: 1px solid #f1f2f5;
  }
}
</style>