<template>
  <div class="Collapse">
    <h3>美国经济数据(目期和前期对比和下一期时间)</h3>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <div>
            <article class="head-title">
              m1和m2数据
              <b>(公布时间:每月15号左右)</b>
            </article>
            <article>
              <b
                >--(m1同比4月份上涨,达到预期的4.6%)<i class="el-icon-top"></i
              ></b>
            </article>
          </div>
        </template>
        <div class="box">
          <div id="macros2" class="item"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div>
            <article class="head-title">
              cpi和ppi数据
              <b>(公布时间:每月15号左右)</b>
            </article>
            <article>
              <b>--(m1同比上期上涨)</b>
            </article>
          </div>
        </template>
        <div class="box">
          <div id="macros3" class="item"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div>
            <article class="head-title">
              cpi和猪肉价格
              <b>(公布时间:每月15号左右)</b>
            </article>
            <article>
              <b>--(m1同比上期上涨)</b>
            </article>
          </div>
        </template>
        <div class="box">
          <div id="macros4" class="item"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import initm1m2 from "../../../assets/js/m1m2_init";
import cpippi from "../../../assets/js/cpippi";
import cpi from "../../../assets/js/cpi";
export default {
  data() {
    return {
      activeNames: [],
    };
  },
  components: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      // initGdpCpi.initGdp()
      initm1m2.initM1M2();
      cpi.cpi();
      cpippi.cpippi();
    });
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss">
.Collapse {
  background-color: #fafafa;
  h3 {
    margin: 0px 0px 10px 0px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    padding: 10px;
    color: #5e6d82;
  }
  .head-title {
    min-width: 100%;
    color: #000000;
    font-size: 12px;
    b {
      color: #787878;
      float: right;
      background-color: #fafafa;
      padding: 0px;
      margin-top: 0px;
      font-size: 12px;
    }
  }
  i {
    font-weight: 600;
  }
  b {
    color: #f44336;
    font-size: 14px;
    font-weight: 600;
    padding-left: 15px;
    // background-color: #000000;
    padding: 3px 10px;
    margin-top: 5px;
  }
  .item {
    width: 100%;
    height: 400px;
  }
  article {
    line-height: 25px;
    height: 25px;
  }

  .el-collapse-item__header {
    background-color: #fafafa;
    border-bottom: 3px solid #ebeef5;
    height: 70px;
    line-height: 70px;
    padding: 0px 15px;
  }
  .el-collapse-item:nth-child(odd)
  {
      .el-collapse-item__header {
          background-color: #ffffff;
      }
  }
}
</style>
