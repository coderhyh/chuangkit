<template>
  <van-popup
    class="LoginTip"
    v-model:show="show"
    position="bottom"
    closeable
    :style="{ height: '4.7rem' }"
  >
    <div class="wrap">
      <div class="title">快捷登录</div>
      <van-cell-group inset class="tel">
        <van-field
          v-model="tel"
          center
          clearable
          border
          autofocus
          placeholder="请输入手机号"
        >
        </van-field>
      </van-cell-group>

      <van-cell-group inset class="yzm">
        <van-field
          v-model="yzm"
          center
          clearable
          border
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button round size="small" type="default"
              >获取验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <p class="label"><span>账号密码登录</span><span>注册账号</span></p>

      <div class="submit">登录</div>

      <div class="tip">
        登录即同意<span>用户协议</span>和<span>隐私政策</span>
      </div>

      <div class="rest">
        <p>其他方式登录</p>
        <img src="~assets/imgs/common/qq.png" alt="">
      </div>
    </div>
  </van-popup>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "LoginTip",
  data() {
    return {
      show: false,
      tel: "",
      yzm: "",
    };
  },
  computed: {
    ...mapState(["loginTip"]),
  },
  methods: {
    ...mapMutations(["setLoginTip"]),
  },
  watch: {
    show(val) {
      this.setLoginTip(val);
    },
    loginTip(val) {
      this.show = val;
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.48rem 0.35rem;
  background: url("~assets/imgs/common/loginTipBgc.png") no-repeat center top /
    cover;
  .title {
    text-align: center;
    font-size: 0.24rem;
    font-weight: 900;
  }
  .tel,
  .yzm {
    border-bottom: 1px solid #ebebeb;
    background: transparent;
  }
  .tel {
    margin: 0.28rem 0 0.12rem;
  }
  .yzm {
    width: 100%;
    margin: 0;
  }
  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #0773fc;
    margin-top: 0.1rem;
  }
  .submit {
    width: 2.75rem;
    height: 0.47rem;
    background: #cde3fe;
    color: #fff;
    line-height: 0.47rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.4rem;
    margin-top: 0.3rem;
  }
  .tip {
    color: #999999;
    text-align: center;
    margin-top: .1rem;
    span {
      color: #217DFD;
    }
  }
  .rest {
    font-size: .13rem;
    font-weight: 900;
    text-align: center;
    margin-top: .25rem;
    img {
      margin-top: .1rem;
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.wrap::before {
  content: "";
  position: absolute;
  width: 0.32rem;
  height: 0.04rem;
  border-radius: 0.2rem;
  background: #e4e7ed;
  top: 0.1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>