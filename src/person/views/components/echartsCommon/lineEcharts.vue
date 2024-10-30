<template>
  <div class="histogram" :class="'histogram' + view_name">
    <div :id="'histogram' + view_name" :style="{ height: height1, width: width2 }" class="histogram_box"></div>
  </div>
</template>
<script>
  import $ from "jquery";
  import * as echartsInit from 'echarts';
  export default {

    data() {
      return {
        datalist1: null,
        width2: "1400px",
      };
    },
    created() {},
    props: {
      view_name: String,
      height1: String,
      deal_data: Array
    },
    components: {},
    mounted() {
      var that = this;
      this.$nextTick(() => {
        that.width2 =
          document.querySelector(".histogram" + that.view_name).offsetWidth + "px";
        setTimeout(function () {
          that.initView();
        }, 2000);
      });
    },
    watch: {
      deal_data: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val != null) {

            //this.initView();
          }
        },
      },
    },
    methods: {
      initView() {
        var chartDom = document.getElementById("histogram" + this.view_name);
        var myChart = echartsInit.init(chartDom);
        var option;

        // 原始数据
        var data = this.deal_data
        // data=data.reverse()


        // 按年份分组数据
        var groupedData = {};
        data.forEach(function (item) {
          var year = item.time.split('-')[0];
          var date = item.time.substring(5); // 获取 mm-dd 部分
          if (!groupedData[year]) {
            groupedData[year] = [];
          }
          groupedData[year].push({
            date: date,
            num: item.num
          });
        });

        // 生成 ECharts 配置项
        var series = [];
        for (var year in groupedData) {
          series.push({
            name: year,
            type: 'line',
            data: groupedData[year].map(function (item) {
              return [item.date, item.num];
            })
          });
        }

        var option = {
          title: {
            text: '不同年份的数据折线图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: Object.keys(groupedData)
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Array.from(new Set(data.map(item => item.time.substring(5)))).sort()
          },
          yAxis: {
            type: 'value'
          },
          series: series,
          dataZoom: [{
              type: 'slider',
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              start: 0,
              end: 100
            }
          ]
        };

        option && myChart.setOption(option);
      }
    },
  };

</script>
<style scoped lang="scss">
  .histogram {
    width: 100%;

    nav {
      background-color: #555;
      padding: 2px 10px;
      color: white;
      font-size: 12px;
      font-weight: 600;

      button {
        background-color: #f5deb300;
        color: white;
        font-size: 12px;
        border: 0px;
        padding: 2px;
        border-radius: 2px;
        border-bottom: 1px solid white;
      }
    }

    .histogram_box {
      width: 500px;
      height: 320px;
    }
  }

</style>
