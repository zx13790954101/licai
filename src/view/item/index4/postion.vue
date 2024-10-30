<template>
  <div class="postion">
    <div class="suggest-info flex-c">
      <div class="left-info">
        <span class="num"
          ><span id="figure">20</span>
          <h6>%</h6></span
        >
        <div class="rateinfobox">
          <div class="rateinfo" id="pipe">
            <span class="percent" style="height: 56%"></span>
          </div>
        </div>
      </div>
      <div class="right-info">
        <div>
          <span class="dot"></span>
          <a class="title">建议仓位</a>
        </div>
        <div>
          <span class="dot"></span>
          <a
            class="title"
            id="cangwei_title"
            href="https://quote.fx678.com/symbol/VIXDX"
            >恐慌指数VIX</a
          >
        </div>
        <div>
          <span class="dot"></span>
          <a
            class="title"
            id="cangwei_title"
            href="https://alternative.me/crypto/fear-and-greed-index/"
            >比特币恐惧与贪婪指数</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.postion {
  position: relative;
  overflow: hidden;
  .suggest-info {
    width: 215px;
    height: 130px;
    float: left;
    text-align: center;
    padding: 5px;
  }
  .suggest-info .left-info {
    float: left;
    width: 62px;
    text-align: center;
  }
  .suggest-info .left-info .num {
    color: #ff0000;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
  }
  .suggest-info .left-info .num h6 {
    display: inline-block;
  }
  .suggest-info .left-info .rateinfobox {
    width: 100%;
  }
  .suggest-info .left-info .rateinfo {
    width: 20px;
    border-radius: 10px;
    height: 68px;
    background-color: #e2e2e2;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .suggest-info .left-info .rateinfo .percent {
    width: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("../../../assets/img/percent.gif") no-repeat;
    background-size: cover;
  }
  .suggest-info .left-info .rateinfo .percent .percenttop {
    width: 20px;
    height: 9px;
    left: 0;
    border-radius: 10px;
    position: absolute;
    background-color: #da0626;
  }
  .suggest-info .left-info .tips #cwtips {
    position: relative;
    margin: 2px 0;
  }
  .suggest-info .left-info .tips #cwtips:hover .tiptxt {
    display: block;
  }
  .suggest-info .left-info .tips .tiptxt {
    display: none;
    position: absolute;
    width: 316px;
    top: 20px;
    padding: 10px 30px 14px 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 10px #c5c5c5;
    z-index: 120;
    text-align: left;
  }
  .suggest-info .left-info .tips .tiptxt .lab {
    color: #ffffff;
    font-size: 12px;
  }
  .suggest-info .left-info .tips .tiptxt .txt {
    padding-top: 2px;
    color: #ffffff;
    line-height: 1.5;
  }
  .suggest-info .right-info {
    float: left;
    width: 100%;
    overflow: hidden;
    text-align: left;
    div {
    }
  }
  .suggest-info .right-info .dot {
    width: 4px;
    height: 4px;
    background-color: #ea5504;
    border-radius: 2px;
    display: inline-block;
    vertical-align: middle;
  }
  .suggest-info .right-info .title {
    font-weight: bold;
    line-height: 1.5;
    color: #ffffff;
  }
  .suggest-info .right-info .infos {
    margin-top: 3px;
    display: inline-block;
    color: #ffffff;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}
</style>
