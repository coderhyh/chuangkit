<template>
  <div id="Profile">
    <div class="head">
      <div class="user">
        <div class="left">
          <img src="~assets/imgs/common/userImg.png" alt="" />
          <section>
            <p class="p1" @click="$store.commit('setLoginTip', true)">
              登录/注册
            </p>
            <p class="p2">登录后获取更多精美模板</p>
          </section>
        </div>
        <div class="right">
          <van-icon class="icon" name="setting-o" />
        </div>
      </div>
      <div class="vip">
        <div class="top">
          <div class="text">
            <p class="p1">我的会员</p>
            <p class="p2">会员畅享百万模板素材免费商用</p>
          </div>
          <div class="btn" @click="$store.commit('setLoginTip', true)">
            立即开通
          </div>
        </div>
        <div class="down">
          <van-notice-bar
            left-icon="volume-o"
            style="height: 0.24rem"
            text="新年大促：个人会员低至0.16元/天，团队会员买一送一。点击查看"
          />
        </div>
      </div>
    </div>

    <div class="options">
      <van-cell
        v-for="item in options"
        :key="item.name"
        :title="item.name"
        :icon="item.icon"
        title-style="font-size: .16rem"
        @click="optionClick(item.type)"
      />
    </div>

    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      show: false,
      actions: [
        { name: "模板及工具问题咨询" },
        { name: "印刷问题咨询" },
        { name: "电话咨询" },
      ],
      options: [
        {
          name: "　我的订单",
          icon: require("assets/imgs/common/dingdan.png"),
          type: "login",
        },
        {
          name: "　我的收藏",
          icon: require("assets/imgs/common/shoucang-cur.png"),
          type: "login",
        },
        {
          name: "　联系客服",
          icon: require("assets/imgs/common/kefu.png"),
          type: "kefu",
        },
        {
          name: "　问题反馈",
          icon: require("assets/imgs/common/fankui.png"),
          type: "login",
        },
        {
          name: "　关于我们",
          icon: require("assets/imgs/common/guanyu.png"),
          type: "guanyu",
        },
      ],
    };
  },
  methods: {
    optionClick(type) {
      if (type == "login") {
        this.$store.commit("setLoginTip", true);
      } else if (type == "kefu") {
        this.show = true;
      } else {
      }
    },
    onSelect(item) {
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  background: url("~assets/imgs/common/profileBgc.png") no-repeat center / cover;
  height: 1.84rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  position: relative;
  .user {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 50%;
        margin-right: 0.15rem;
      }
      .p1 {
        font-size: 0.16rem;
        font-weight: 900;
        margin-bottom: 0.1rem;
      }
    }
    .icon {
      font-size: 0.2rem;
    }
  }
  .vip {
    width: 3.51rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.3rem;
    border-radius: 0.1rem;
    overflow: hidden;
    z-index: 999;
    .top {
      padding-left: 0.52rem;
      height: 0.6rem;
      background: url("~assets/imgs/common/vipBgc.png") no-repeat left center /
        cover;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .p1 {
        font-size: 0.17rem;
        color: #5e3917;
        font-weight: 900;
      }
      .p2 {
        color: #5e3917;
        font-weight: 100;
        margin-top: 0.03rem;
      }
      .btn {
        width: 0.72rem;
        height: 0.3rem;
        background: #cd9555;
        color: #fff;
        line-height: 0.3rem;
        text-align: center;
        margin-right: 0.1rem;
        border-radius: 0.05rem;
      }
    }
    .down {
      height: 0.24rem;
      background: #ff8f33;
      color: #fff;
      text-align: center;
      line-height: 0.24rem;
    }
  }
}
.options {
  margin-top: 0.26rem;
}
</style>