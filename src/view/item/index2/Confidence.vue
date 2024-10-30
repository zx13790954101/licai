<template>
  <div class="Confidence">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新开放式基金申购状态" name="first">
        <div class="flex-c">
          <a
            href="http://fund.eastmoney.com/Fund_sgzt.html#maxsg,asc_1"
            target="_blank"
            >最新开放式基金申购状态一览表（每日更新）(来自东方财富网)</a
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="股吧" name="second">
        <div class="flex-c">
          <a href="http://guba.eastmoney.com/list,bk0896.html" target="_blank"
            >白酒吧(来自东方财富网)</a
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="机构点评" name="third">
        <a href="http://guba.eastmoney.com/list,bk0896.html" target="_blank"
          >白酒吧(第一财经)</a
        >
        <a
          href="http://search.sina.com.cn/?t=keyword&c=news&q=%E7%99%BD%E9%85%92"
          target="_blank"
          >白酒(新浪财经)</a
        >
        <a
          href="https://www.yicai.com/search?keys=%E7%99%BD%E9%85%92l"
          target="_blank"
          >白酒吧(来自东方财富网)</a
        >
      </el-tab-pane>
      <el-tab-pane label="博主点评" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
//信心面
export default {
  data() {
    return {
      active_num: 0,
      activeName: "first",
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    more() {},
  },
};
</script>
<style lang="scss">
.Confidence {
  .el-card__body {
    padding: 10px;
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #ffffff00;
}
</style>
<style scoped lang="scss">
.Confidence {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  nav {
    padding: 0px 0px 10px 0px;
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
    }
  }
}
</style>
