<template>
  <div class="Recommend">
    <ListControl v-for="item in list" :key="item.id" :countList="item"></ListControl>
  </div>
</template>

<script>
import ListControl from "./recommendChild/ListControl.vue";
export default {
  name: "Recommend",
  data() {
    const id = this.$route.params.id;
    return {
      id,
      list: [],
    };
  },
  components: {
    ListControl,
  },
  methods: {
    async getData() {
      const url = `/v2/solutionSubject/themeDetail.do?_dataType=json&_dataClientType=3&client_type=40&themeId=${this.id}&templatePageSize=6`;
      const { body: res } = await fetch(url).then((r) => r.json());
      this.list = res.data.theme.themeExtends;
      console.log(this.list);

    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.Recommend {
}
</style>