<template>
  <div id="Index">
    <div class="fixed">
      <div class="headImg">
        <img src="~assets/imgs/index/headImg.png" alt="" />
      </div>

      <Search></Search>
    </div>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="scroll"
      offset="50"
      :immediate-check="false"
      ref="scroll"
    >
      <HeadList :scene="scene"></HeadList>

      <Recommend :recommend="recommend"></Recommend>

      <MainGoods :list="list"></MainGoods>
    </van-list>
  </div>
</template>

<script>
import Search from "components/contents/search/Search.vue";
import HeadList from "./indexChild/HeadList.vue";
import Recommend from "./indexChild/Recommend.vue";
import MainGoods from "../../components/contents/mainGoods/MainGoods.vue";

import { request } from "common/utils";

export default {
  name: "Index",
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      // 请求数据
      scene: [],
      recommend: [],
      list: [],
    };
  },
  components: {
    Search,
    HeadList,
    Recommend,
    MainGoods,
  },
  methods: {
    onLoad() {
      console.log("end");
      this.page++;
      const url =
        "/v2/mobile/main/getSceneDetail.do?_dataType=json&_dataClientType=3&client_type=40&page_no=" +
        this.page +
        "";
      request(url, ({ body }) => {
        console.log(body);

        this.list.push(...body.data.sceneDetail);
        console.log(this.list.length, body.data.totalCount);
        if (this.list.length >= body.data.totalCount) {
          this.finished = true;
        }
        this.loading = false;
      });
    },

    /* 
      数据请求相关
    */
    async getData() {
      const url =
        "/v2/mobile/main/getMainMiniProgramHomeInfo.do?_dataType=json&_dataClientType=3&client_type=40";
      const res1 = await fetch(url).then((r) => r.json());
      this.scene = res1.body.data.scene;
      this.list = res1.body.data.sceneDetails.sceneDetail;

      const url2 =
        "/v2/solutionSubject/theme.do?_dataType=json&_dataClientType=3&client_type=40&solutionSubjectId=1&pageNum=1&pageSize=6&templatePageSize=6&type=3&device=2";
      const res2 = await fetch(url2).then((r) => r.json());
      this.recommend = res2.body.data.themes;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#Index {
  overflow: hidden;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 1.12rem;
  background: #fff;
  z-index: 999;
}
.headImg {
  width: 100vw;
  height: 0.58rem;
}
.scroll {
  margin: 1.12rem 0 0.46rem;
  overflow: hidden;
}

</style> 