<template>
  <div class="postion">
    <div class="suggest-info" v-if="false">
      <div class="left-info" @click="toLink()">
        <div class="rateinfobox">
          <div class="rateinfo" id="pipe">
            <span
              class="percent"
              :style="{ height: parseInt(data_list.TopText.PositionInd) + '%' }"
            ></span>
          </div>
        </div>
        <div class="tips">
          <span class="num"
            ><span id="figure">{{
              parseInt(data_list.TopText.PositionInd)
            }}</span>
            <h6>%</h6>
          </span>
          <span class="fl">建议仓位</span>
        </div>
      </div>
      <div class="right-info">
        <span class="dot"></span>
        <span class="title" id="cangwei_title">{{
          data_list.TopText.Title
        }}</span>
        <span class="infos" id="cangwei_main">{{
          data_list.TopText.Content
        }}</span>
      </div>
    </div>

    <!-- <div class="box2" v-if="data_list != null">
      <ul>
        <li v-for="(item, index) in data_list.MarketStyle" :key="index">
          {{ item.Category }}
        </li>
      </ul>

      <ul>
        <li v-for="(item, index) in data_list.MarketStyle" :key="index">
          {{ item.ThemeList[0].Name }}
        </li>
      </ul>
      <el-tooltip placement="top" content="点击跳转到主题投资见面">
        <p>
          {{
            data_list.Recommend[0].DefaultText +
            ":" +
            data_list.Recommend[0].ThemeList[0].Name
          }}
        </p>
      </el-tooltip>
    </div> -->

    <div class="box2">
      <ul>
        <li v-for="(item, index) in data_list3" :key="index">
          {{ item }}
        </li>
      </ul>

      <ul>
        <li v-for="(item, index) in data_list4" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getMarketData } from "../../../lib/api/index1.js";
export default {
  data() {
    return {
      data_list: null,
      data_list1: null,
      data_list2: null,
      data_list3: ["避险版块", "走势最好", "周期版块", "跌幅最多"],
      data_list4: ["保险", "白酒", "煤炭", "新能源"],
    };
  },
  created() {
    var that = this;
    // getMarketData(function (res) {
    //   that.data_list = res.data.result[0];
    // });
  },
  mounted() {},
  methods: {
    toLink() {
      window.open("http://quote.eastmoney.com/zhuti/?from=bk", "top");
    },
  },
};
</script>
<style scoped lang="scss">
.postion {
  position: relative;
  overflow: hidden;

  margin-left: 0px;
  margin-bottom: 10px;

  .suggest-info {
    width: auto;
    height: auto;
    text-align: center;
    padding: 5px 15px;
    background-image: linear-gradient(88deg, #27272773, #d5d5e012);
    display: flex;
    align-items: center;
  }

  .suggest-info .left-info {
    float: left;
    width: 62px;
    text-align: center;
    display: flex;
    width: 110px;
  }

  .tips {
    padding-top: 10px;
  }

  .box2 {
    ul {
      display: flex;
      li {
        width: 60px;
        flex: 1;
        display: inline-block;
        border: 1px solid #27272773;
        padding: 5px 5px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }
    }

    p {
    }
  }

  .fl {
    display: block;
    display: block;
    font-size: 14px;
    margin-top: 5px;
  }

  .suggest-info .left-info .num {
    color: #ff0000;
    font-weight: bold;
    font-size: 30px;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
    display: inline-table;
  }

  .suggest-info .left-info .num h6 {
    display: inline-block;
  }

  .suggest-info .left-info .rateinfobox {
    width: 20px;
    margin-right: 10px;
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
    color: #474747;
    font-size: 12px;
  }

  .suggest-info .left-info .tips .tiptxt .txt {
    padding-top: 2px;
    color: #474747;
    line-height: 1.5;
  }

  .suggest-info .right-info {
    float: left;
    width: auto;
    height: 50px;
    overflow: hidden;
    overflow: hidden;
    margin-left: 10px;
    border-left: 2px solid #ff3b43;
    padding-left: 5px;
    text-align: left;
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
    font-size: 14px;
  }

  .suggest-info .right-info .infos {
    margin-top: 3px;
    display: inline-block;
    color: #474747;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}
</style>
