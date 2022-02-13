<template>
  <div class="Search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        autofocus
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        clear-trigger="always"
        @cancel="$router.back()"
        @update:model-value="value = value.trim()"
      />
    </form>

    <section v-show="!goodsList.length">
      <SearchText
        isHistory
        :name="'搜索历史'"
        @textSearch="textSearch"
        ref="history"
      ></SearchText>

      <SearchText
        :list="hotList"
        :name="'热门搜索'"
        @textSearch="textSearch"
      ></SearchText>
    </section>

    <section v-if="goodsList.length">
      <van-tabs
        v-model:active="active"
        @click-tab="onClickTab"
        color="#0773FC"
        line-width=".2rem"
        class="titles"
      >
        <van-tab title="全部" :name="0" />
        <van-tab
          v-for="item in titles"
          :key="item.kindId"
          :title="item.kindTitle"
          :name="item.kindId"
        />
      </van-tabs>

      <div class="info">
        <p class="right">{{ totalCount }}个模板</p>
        <p class="left">
          <span
            :class="{ cur: hotOrNew == item.id }"
            v-for="(item, index) in labels"
            :key="item.id"
            @click="labelClick(item.id)"
            >{{ item.name }}<span v-if="!index">丨</span></span
          >
        </p>
      </div>
    </section>
    <WaterfallLayout
      :totalList="goodsList"
      ref="waterfall"
      @getList="getData"
      class="waterfall"
    ></WaterfallLayout>
  </div>
</template>

<script>
import SearchText from "./searchChild/SearchText.vue";
import WaterfallLayout from "components/contents/waterfallLayout/WaterfallLayout.vue";

import { Notify } from "vant";

export default {
  name: "Search",
  data() {
    return {
      value: "",
      pageNum: 0,
      active: 0,
      labels: [
        { name: "最热", id: 0 },
        { name: "最新", id: 1 },
      ],
      /* 数据 */
      historyList: [],
      hotList: [],
      goodsList: [],
      titles: [],
      totalCount: 0,
      hotOrNew: 0,
      titleId: 0,
    };
  },
  components: {
    SearchText,
    WaterfallLayout,
  },
  methods: {
    onSearch(val) {
      if (!this.value.length) {
        return;
      }
      this.getData();

      this.$nextTick(() => {
        this.$refs.history.setHistory(val);
      });
    },
    textSearch(val) {
      this.value = val;
      this.onSearch(val);
    },

    onClickTab({ name }) {
      this.titleId = name;
      this.refreshData();
    },
    labelClick(id) {
      this.hotOrNew = id;
      this.refreshData();
    },
    refreshData() {
      this.pageNum = 0;
      this.$refs.waterfall.reset();
      this.getData();
    },

    /* 
      请求相关
    */
    async getData() {
      this.pageNum++;
      this.$store.commit("setLoadingFlag", true);
      const url =
        "/v2/template/wxSmallAppSearch.do?_dataType=json&kw=" +
        this.value +
        "&pageNo=" +
        this.pageNum +
        "&time_order=" +
        this.hotOrNew +
        "&second_kind_id=" +
        this.titleId;
      const { body } = await fetch(url).then((r) => r.json());
      this.goodsList = body.templates;
      this.totalCount = body.totalCount;
      this.$store.commit("setLoadingFlag", false);
      if (!this.goodsList.length) {
        Notify({ type: "warning", message: "当前分类暂无模板" });
      }
      this.$nextTick(() => {
        this.$refs.waterfall.disposeData();
      });
    },
    async getHotList() {
      const url = "/v2/template/getRecommendKeyword.do?_dataType=json";
      const { body } = await fetch(url).then((r) => r.json());
      this.hotList = body.data;

      const url2 = "/v2/designkind/getDesignKindBasicInfo.do?_dataType=json";
      const { body: res } = await fetch(url2, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "client_type=40&type=2&_dataClientType=3",
      }).then((r) => r.json());
      this.titles = res.data.secondLabel;
    },
  },
  created() {
    this.getHotList();
  },
  watch: {
    value(val) {
      if (val == "") {
        this.goodsList = [];
        this.$refs.waterfall.reset();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Search {
  height: 100vh;
  overflow: hidden;
  .titles {
    padding: 0 0.12rem;
    border-bottom: 1px solid #eeeeee;
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: 0 0.12rem;
    margin-top: 0.15rem;
    line-height: 0.19rem;
    .right {
      font-size: 0.16rem;
    }
    .left {
      color: #666666;
    }
    .cur {
      font-weight: 900;
    }
  }
  .waterfall {
    height: 5.3rem;
    overflow: auto;
    margin-top: .1rem;
  }
}
</style>