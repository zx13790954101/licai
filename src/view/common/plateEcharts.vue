<template>
  <div class="plateEcharts flex-c">
    <section class="echarts1"
             id="echarts3"> </section>
    <section class="operation">
      <h3>今日操作:(每日不定时更新)</h3>

    </section>
  </div>
</template>
<script>

export default {


  components: {
  },
  created () {


  },
  mounted () {
    this.$nextTick(() => {
      this.init1()
    })


  },
  methods: {
    init1 () {
      let myChart = echarts.init(document.getElementById('echarts3'));
      var option;

      option = {
        title: {
          text: '持有的板块',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['新能源', '白酒', '医疗', '光伏', '保险', '中概互联网']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      };

      option && myChart.setOption(option);
    },



  }
}
</script>


<style scoped lang="scss">
.plateEcharts {
  align-items: unset;
}
.echarts1 {
  height: 250px;
  width: 400px;
}
.operation {
  width: 200px;
}
</style>
