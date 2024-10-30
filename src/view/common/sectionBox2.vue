<template>
  <div class="sectionBox2">
    <!-- <nav class="flex-c">
      <h3>大盘解析</h3>
      <span class="flex-item">
        <button>今天</button>
        <button>近5日</button>
      </span>
    </nav> -->

    <article class="top">
      <el-tabs type="border-card" v-model="activeName" class="flex-item">
        <el-tab-pane label="市场生命线" name="1" :lazy="lazy1">
          <tableBox5 v-if="activeName == '1'"></tableBox5>
        </el-tab-pane>

        <el-tab-pane label="资金和涨跌幅变化" name="2" :lazy="lazy1">
          <proposalTableBox v-if="activeName == '2'"></proposalTableBox>
          <tableBox v-if="activeName == '2'"></tableBox>
          <tableBox2 v-if="activeName == '2'"></tableBox2>
        </el-tab-pane>
        <el-tab-pane label="创业板" name="3" :lazy="lazy1">
          <tableBox6 v-if="activeName == '3'"></tableBox6>
        </el-tab-pane>
        <!--    <el-tab-pane label="筹码分布" name="6" :lazy="lazy1">
          <tableBox5 v-if="activeName == '6'"></tableBox5>
        </el-tab-pane> -->
      </el-tabs>
    </article>

    <article class="bottom" v-if="activeName == '1'">
      <div class="box-card2">
        <stateType></stateType>
      </div>

      <el-row :gutter="24">
        <el-col :span="12">
          <div class="grid-content bg-purple" style="text-align: center">
            <span> 判断应该买那个规模的股票 </span>
            <el-tooltip
              content="https://www.funddb.cn/site/fed"
              placement="top"
            >
              <el-link type="danger" href="https://www.funddb.cn/site/fed"
                >全部中小大盘股的股债性价 -来自韭圈儿</el-link
              >
            </el-tooltip>
            <!-- <p>判断位置</p> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="text-align: center">
            <span> 判断版块排名 </span>
            <el-tooltip
              content="https://danjuanapp.com/djmodule/value-center?channel=1300100141"
              placement="top"
            >
              <el-link
                type="danger"
                href="https://danjuanapp.com/djmodule/value-center?channel=1300100141"
                >中证指数的pe排名 -来自蛋卷基金</el-link
              >
            </el-tooltip>
            <!-- <p>判断位置</p> -->
          </div>
        </el-col>
      </el-row>
    </article>
    <!-- <el-card class="box-card">
      <swiperPlate></swiperPlate>
    </el-card> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      lazy1: true,
      activeName: "1",
      score1: 40,
      percentage: 10,
      type1: false,
      colors: [
        {
          color: "#f56c6c",
          percentage: 20,
        },
        {
          color: "#e6a23c",
          percentage: 40,
        },
        {
          color: "#5cb87a",
          percentage: 60,
        },
        {
          color: "#1989fa",
          percentage: 80,
        },
        {
          color: "#6f7ad3",
          percentage: 100,
        },
      ],
    };
  },
  components: {
    tableBox: () => import("../item/index2/tableBox.vue"),
    tableBox2: () => import("../item/index2/tableBox2.vue"),
    tableBox3: () => import("../item/index2/tableBox3.vue"),
    tableBox6: () => import("../item/index2/tableBox6.vue"),
    tableBox5: () => import("../item/index2/tableBox5.vue"),
    swiperPlate: () => import("./swiperPlate.vue"),
    proposal1: () => import("../item/index2/proposal1.vue"),
    analysis: () => import("../item/index2/analysis.vue"),
    proportion: () => import("../item/index1/proportion.vue"),
    zdbfb: () => import("../item/index1/zdbfb.vue"),
    proposalTableBox: () => import("../item/index2/proposalTableBox.vue"),
    stateType: () => import("../../../components/stateType/index.vue"),
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      // this.init1()
    });
  },
  methods: {
    move1(num) {
      console.log(num);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    init1() {
      let data_array = [
        {
          value: 1048,
          name: "K线图",
        },
        {
          value: 735,
          name: "资金面",
        },
        {
          value: 580,
          name: "政策面",
        },
        {
          value: 484,
          name: "供需关系",
        },
        {
          value: 300,
          name: "信心",
        },
        {
          value: 300,
          name: "业绩",
        },
        {
          value: 300,
          name: "业绩",
        },
      ];
      let myChart = echarts.init(document.getElementById("echarts_section"));
      var option;
      option = {
        title: {
          text: "版块的名字和持有最大理由",
          subtext: "详情",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: data_array,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss">
.el-button {
  display: block;
}

.box-card {
  padding: 0px 0px;
}
</style>
<style scoped lang="scss">
.box-card2 {
  margin-right: 20px;
  padding: 10px;
  margin: 0 auto;
}

.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 26px;
    font-weight: normal;
  }

  & p {
    color: #657180;
    font-size: 12px;
    margin: 5px 0 5px;
    font-weight: 600;
  }

  & span {
    display: block;
    padding: 10px 0px;
    color: #657180;
    font-size: 12px;

    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }

  & span i {
    font-style: normal;
    color: #3f414d;
  }
}

.el-button + .el-button {
  margin-left: 0px;
  margin-top: 10px;
}

.sectionBox2 {
  background-color: #ffffff7a;
  padding: 0px;
  border-radius: 10px;
  width: 100%;

  .swiper-box {
    position: relative;
    overflow: hidden;
  }

  article {
    margin-bottom: 0px;
    width: 100%;
  }

  .bottom {
    padding: 10px 0px;
    margin-bottom: 30px;
    justify-content: center;
    background-color: #eff3f8;
  }

  .box-card {
    margin-left: 10px;
  }

  .icon1 {
    font-size: 25px;
    font-weight: 600;
    margin: 0px 20px;
  }

  .section1 {
    width: 300px;
    height: 300px;
  }
}
</style>
