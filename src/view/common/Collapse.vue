<template>
  <div class="Collapse">
    <h3>国内经济数据(目期和前期对比和下一期时间)</h3>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <div>
            <article class="head-title">
              m1和m2数据<i class="header-icon el-icon-info"></i>
              <b>(每次公布的数据是每个月的15号)</b>
            </article>
            <article>
              <b>--(m1同比上期上涨)</b>
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
              cpi和ppi数据<i class="header-icon el-icon-info"></i>
              <b>(每次公布的数据是每个月的15号)</b>
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
              cpi和猪肉价格<i class="header-icon el-icon-info"></i>
              <b>(每次公布的数据是每个月的15号)</b>
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
import initm1m2 from "../../assets/js/m1m2_init";
import cpippi from "../../assets/js/cpippi";
import cpi from "../../assets/js/cpi";
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
    width: 100%;
    color: #000000;
    font-size: 14px;
    b {
      color: #787878;
      float: right;
    }
  }
  i {
    font-weight: 600;
  }
  b {
    color: #f44336;
    font-size: 12px;
    font-weight: 400;
    padding-left: 15px;
  }
  .item {
    width: 100%;
    height: 400px;
  }
  article {
    line-height: 20px;
    height: 20px;
  }

  .el-collapse-item__header {
    background-color: #fafafa;
    height: 60px;
    line-height: 60px;
    padding: 0px 15px;
  }
}
</style>
