<template>
  <div class="ClassifyDetail">
    <div class="headFixed">
      <Search text="在当前场景下搜索" :params="id"></Search>

      <HeadSelect
        :titles="titles"
        v-model:titleIndex="titleIndex"
        v-model:show="showPopup"
        @updateList="getList"
      ></HeadSelect>

      <div class="labels">
        <div class="label1">
          <p
            v-for="item in labels"
            :key="item.name"
            :class="{ cur: sortType == item.id }"
            @click="sortTypeClick(item.id)"
          >
            {{ item.name }}
          </p>
        </div>
        <div class="more" v-show="showMoreLabel">
          <p
            v-for="item in moreLabel"
            :key="item.name"
            :class="{ cur: item.id == priceType }"
            @click="
              priceType = item.id;
              showMoreLabel = false;
              labels[4].name = '筛选'
            "
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>

    <WaterfallLayout
      :totalList="imgs"
      @getList="getList()"
      ref="waterfall"
    ></WaterfallLayout>
  </div>
</template>

<script>
import Search from "components/contents/search/Search.vue";
import HeadSelect from "./classifyChild/headSelect/HeadSelect.vue";
import WaterfallLayout from "components/contents/waterfallLayout/WaterfallLayout.vue";

export default {
  name: "ClassifyDetail",
  data() {
    const id = this.$route.params.id;
    return {
      id,
      titleIndex: 0,
      showPopup: false,
      showMoreLabel: false,
      pageNum: 0,
      sortType: 0,
      priceType: 0,
      // 数据
      titles: [],
      imgs: [],
      labels: [
        { name: "最热", id: 0 },
        { name: "最新", id: 1 },
        { name: "使用最多", id: 2 },
        { name: "最多收藏", id: 3 },
        { name: "筛选", id: undefined },
      ],
      moreLabel: [
        { name: "全部", id: 0 },
        { name: "免费", id: 2 },
        { name: "付费", id: 3 },
      ],
    };
  },
  computed: {
    watchType() {
      const { sortType, priceType } = this;
      return { sortType, priceType };
    },
  },
  components: {
    Search,
    HeadSelect,
    WaterfallLayout,
  },
  methods: {
    sortTypeClick(id) {
      if (id != undefined) {
        this.sortType = id;
      } else {
        this.showMoreLabel = !this.showMoreLabel;
        this.labels[4].name = this.showMoreLabel ? "收起" : "筛选";
      }
    },
    /* 
      请求数据相关
    */
    async getData() {
      const url =
        "/api/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=" +
        this.id +
        "&_dataClientType=3";
      const { body } = await fetch(url).then((r) => r.json());
      this.titles = body.secondKindInfo.repoTag.use;
    },
    async getList(reset) {
      if (reset) {
        this.$refs.waterfall.reset();
        this.pageNum = 0;
      }
      this.pageNum++;
      this.$store.commit("setLoadingFlag", true);
      const url = `/api/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&type=0&page_no=${this.pageNum}&sid=${this.id}&is_new=1&price_type=${this.priceType}&sort_type=${this.sortType}&use_id=${this.titleIndex}&_dataClientType=3`;
      const { body } = await fetch(url).then((r) => r.json());

      fetch("/pub" + body.cacheUrl.split(".com")[1])
        .then((r) => r.json())
        .then((res) => {
          this.$refs.waterfall.finished = false;
          if (!res.body && !reset) {
            this.$refs.waterfall.finished = true;
            this.$store.commit("setLoadingFlag", false);
            return;
          }

          this.imgs = res.body.templates;

          this.$nextTick(() => {
            // this.$refs.waterfall.loading = false;
            this.$refs.waterfall.disposeData();
            this.$store.commit("setLoadingFlag", false);
          });
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("setLoadingFlag", false);
          this.$refs.waterfall.reset();
          this.$refs.waterfall.finished = true;
        });
    },
  },
  created() {
    this.getData();
    this.getList();
  },
  activated() {
    
    // console.log(11);
  },
  watch: {
    watchType: {
      handler() {
        this.getList(true);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.ClassifyDetail {
  overflow: hidden;
  .headFixed {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
  }
}
.labels {
  padding: 0.14rem 0.12rem .05rem;
  max-height: 1rem;
  text-align: center;
  color: #313132;
  line-height: 0.3rem;
  border-bottom: 1px solid #eee;
  .label1 {
    display: flex;
    p {
      flex: 1;
      background: #f3f4f9;
      border-radius: 0.13rem;
      margin: 0 0.05rem;
    }
  }
  .more {
    display: flex;
    margin-top: 0.12rem;
    p {
      width: 0.6rem;
      background: #f3f4f9;
      border-radius: 0.13rem;
      margin: 0 0.05rem;
    }
  }

  .cur {
    background: #0773fc !important;
    color: #fff;
  }
}
.waterfallLayout {
  margin: 1.55rem 0 0;
}
</style>