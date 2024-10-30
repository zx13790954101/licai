<template>
  <div class="gaugeEcharts flex-c">
    <section class="echarts1"
             id="echarts1"> </section>
    <section class="echarts1"
             id="echarts2"> </section>
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
      this.init2()
    })


  },
  methods: {
    init1 () {
      let myChart = echarts.init(document.getElementById('echarts1'));
      var option;

      option = {
        title: {
          text: '大盘评分',
        },
        series: [

          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 4,
            axisLine: {
              lineStyle: {
                width: 12,
                color: [
                  [0.33, '#7CFFB2'],
                  [0.663, '#58D9F9'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '25%',
              width: 4,
              offsetCenter: [0, '-25%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 5,
              distance: 1,
              lineStyle: {
                color: 'auto',
                width: 1
              }
            },
            splitLine: {
              length: 15,
              distance: 0,
              lineStyle: {
                color: 'auto',
                width: 2
              },

            },
            axisLabel: {
              fontSize: 9,
              color: 'auto',
              distance: 18,
              formatter: function (value) {
                return value;
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 30,


            },
            detail: {
              fontSize: 15,
              offsetCenter: [0, '-5%'],
              valueAnimation: true,
              formatter: function (value) {
                return value + '分';
              },
              color: 'auto'
            },
            data: [
              {
                value: 50,
                name: ''
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    init2 () {
      let myChart = echarts.init(document.getElementById('echarts2'));
      var option;

      option = {
        title: {
          text: '外盘评分',
        },
        series: [
          {
            type: 'gauge',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#FFAB91',
              shadowColor: 'rgba(0,138,255,0.25)',
              shadowBlur: 5,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },

            progress: {

              show: true,
              roundCap: true,
              width: 6
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '70%',
              width: 5,
              offsetCenter: [0, '0%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 6
              }
            },
            axisTick: {
              splitNumber: 4,
              lineStyle: {
                width: 1,
                color: '#999'
              }
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 20,
              color: '#999',
              fontSize: 8
            },
            title: {
              show: false
            },
            detail: {
              backgroundColor: '#fff',
              borderColor: '#FFAB91',
              borderWidth: 2,
              width: '30%',
              lineHeight: 20,
              height: 20,
              borderRadius: 8,
              offsetCenter: [0, '25%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|分}';
              },
              rich: {
                value: {
                  fontSize: 15,
                  fontWeight: 'bolder',
                  color: '#FFAB91',
                },
                unit: {
                  fontSize: 12,
                  color: '#999',
                  padding: [0, 0, -2, 5]
                }
              }
            },
            data: [
              {
                value: 10
              }
            ]
          },

        ]
      };
      option && myChart.setOption(option);
    }


  }
}
</script>


<style scoped lang="scss">
.echarts1 {
  height: 250px;
  width: 250px;
}
</style>
