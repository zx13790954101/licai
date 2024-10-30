<template>
  <div class="PositionDynamics">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="机构持仓状态(2022年一季度机构持股)" name="first">
        <a href="https://data.eastmoney.com/zlsj/qfii.html" target="_blank"
          >2022年一季报机构持股一览表（东方财富网）</a
        >

        <a href="https://data.eastmoney.com/zlsj/" target="_blank"
          >机构持仓股动态（东方财富网）</a
        >
        <a href="https://data.eastmoney.com/gjdcg/mx.html" target="_blank"
          >重要机构持股个股明细 （东方财富网）</a
        >
        <a
          href="https://baijiahao.baidu.com/s?id=1732304368385961213&wfr=spider&for=pc"
          target="_blank"
          >基金持仓</a
        >
        <a
          href="https://baijiahao.baidu.com/s?id=1732304368385961213&wfr=spider&for=pc"
          target="_blank"
          >保险持仓</a
        >
        <a
          href="https://baijiahao.baidu.com/s?id=1732304368385961213&wfr=spider&for=pc"
          target="_blank"
          >社保持仓</a
        >
        <a
          href="https://baijiahao.baidu.com/s?id=1732304368385961213&wfr=spider&for=pc"
          target="_blank"
          >券商持仓</a
        >
        <a
          href="https://baijiahao.baidu.com/s?id=1732304368385961213&wfr=spider&for=pc"
          target="_blank"
          >养老金持仓</a
        >
      </el-tab-pane>
      <el-tab-pane label="总合全部的数据" name="second">
        <div class="flex-c">
          <a href="http://cwzx.shdjt.com/jgtop500.asp" target="_blank">
            机构最新持股数量top500排名,机构重仓股！</a
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="牛散共同持仓查询" name="third">
        <a href="http://www.tetegu.com/gongtongchicang/" target="_blank"
          >多位牛散（新进）持仓的股票·</a
        >
      </el-tab-pane>
      <el-tab-pane label="基金持仓" name="fourth">
        <a href="http://stockdata.stock.hexun.com/jgcc/" target="_blank"
          >机构持仓数据</a
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
//消息面
export default {
  data() {
    return {
      activeName: "first",
      active_num: 0,
      msg_list: [],
    };
  },
  created() {
    var that = this;
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    more() {
      //https://xuangubao.cn/subject/bkj/16961441
      window.open("https://www.cls.cn/plate?code=cls80014", "top");
    },
  },
};
</script>
<style lang="scss">
.PositionDynamics {
  .el-card__body {
    padding: 10px;
  }
}
</style>
<style scoped lang="scss">
.PositionDynamics {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  a {
    display: block;
  }
  .box1 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    margin-right: 20px;
    padding-right: 10px;
    min-width: 200px;
    padding-left: 20px;
  }
  h4 {
    font-size: 12px;
  }

  p {
    font-size: 12px;
  }
  .box2 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    background-color: #242323;
    padding: 10px 10px;
    a {
      color: white;
      display: block;
    }
  }
}
</style>
