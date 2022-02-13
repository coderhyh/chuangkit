<template>
  <div class="SearchText" v-show="isHistory ? data.length : true">
    <div class="title">
      <p>{{ name }}</p>
      <van-icon
        v-if="isHistory"
        class="icon"
        @click="delHistory"
        name="delete-o"
      />
    </div>
    <ul>
      <li
        v-for="item in data"
        :key="item"
        @click="$emit('textSearch', isHistory ? item : item.keyword)"
      >
        {{ isHistory ? item : item.keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchText",
  components: {},
  data() {
    return {
      data: this.list,
    };
  },
  props: {
    name: String,
    isHistory: Boolean,
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    delHistory() {
      this.emptyHistory();
    },
    setHistory(val) {
      const index = this.data.indexOf(val.trim());
      if (index == -1) {
        this.data.unshift(val);
        localStorage.setItem("historyList", JSON.stringify(this.data));
      }
    },
    getHistory() {
      const historyList = localStorage.getItem("historyList");
      historyList && (this.data = JSON.parse(historyList));
    },
    emptyHistory() {
      this.data = [];
      localStorage.setItem("historyList", JSON.stringify(this.data));
    }, 
  },
  created() {
    this.isHistory && this.getHistory();
  },
  watch: {
    list: {
      handler(list) {
        this.data = list;
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.SearchText {
  width: 3.4rem;
  margin: 0.15rem auto;
  .title {
    display: flex;
    line-height: 0.16rem;
    justify-content: space-between;
    font-size: 0.14rem;
    color: #333;
    line-height: 0.18rem;
    .icon {
      font-size: 0.18rem;
      font-weight: normal;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.05rem;
    li {
      padding: 0.07rem 0.12rem;
      background: #f5f5f5;
      margin: 0.05rem;
      border-radius: 0.15rem;
      color: #333333;
      i {
        margin-right: 0.05rem;
        display: inline-block;
        width: 0.11rem;
        height: 0.11rem;
      }
    }
  }
}
</style>