<template>
  <div class="dateKline">
    <histogram
      ref="kline1"
      :name="'_kline1'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :listData="listData4"
      :timeData="timeData4"
      :width1="width_all"
      :height1="'800px'"
      :markLine="markLine"
      :markArea="markArea1"
      value=""
    >
    </histogram>
  </div>
</template>

<script>
import histogramFund from "./histogramFund.vue"
import histogram from "../item/index3/histogram.vue"
import {
  dealTime
} from "./dealData.js"
import {
  getAjax
} from "../../assets/common.js"
import {
  dealData
} from "../fuCommon/getUrl"
import cyclejson from "./json/cycle.json"
import {
  dealDateKline
} from "../../lib/js/dealKline.js"
export default {
  data () {
    return {
      list_data: null,
      listData4: null,
      timeData4: null,
      title4: null,
      title4_1: null,
      width_all: null,
      markLine: [],
      markArea1: [],
    }
  },
  created () {
    this.initDate()
  },
  props: {
    array_all: Array,
  },
  components: {
    histogram,
  },
  mounted () {
    this.width_all = document.querySelector(".dateKline").offsetWidth + "px"
    var that = this
  },
  methods: {
    //两个数组互相加
    dealTimeDate (data, time, arr01) {
      let array1 = []
      arr01.forEach((element, index) => {
        let num1 = time.indexOf(element)
        if (num1 == -1) {
          array1.push(array1[index - 1])
        } else {
          array1.push(data[num1])
        }
      })
      return {
        num: array1,
        time: arr01,
      }
    },
    dealData (data2, type, name, num, type2, num3) {
      let num2 = 1458
      let that = this
      let array2 = []
      let time1 = []
      let num1 = []
      data2.forEach((element2, index2) => {
        if (index2 > data2.length - num2) {
          if (type == 1) {
            array2.push(element2[6].toFixed(2))
            time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)))
            num1.push(element2[1])
          } else if (type == 2) {
            array2.push(element2.split(",")[8])
            time1.push(element2.split(",")[0])

            if (num == 6) {
              num1.push(
                (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)
              )
            } else {
              num1.push(element2.split(",")[num])
            }
          }
        }
      })
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
        type_echarts: type2 == undefined ? undefined : "bar",
        itemStyle: num3 == undefined ? undefined : 2,
      }
      return object1
    },
    dealMarkArea (data) {
      let array1 = []
      let color1 = ["#33333328", "#f5deb306", "#33333328", "#f5deb306"]
      data.forEach((element, index) => {
        let item1 = [{
          name: element.name,
          xAxis: element.xAxis[0],
          itemStyle: {
            color: color1[element.type],
          },
        },
        {
          xAxis: element.xAxis[1],
        },
        ]
        array1.push(item1)
      })
      return array1
    },
    initDate () {
      const szzs_url =
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.000001&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=1458&klt=101&fqt=1&end=30000101"

      let szzs = getAjax(szzs_url)
      szzs = szzs.responseJSON.data
      //处理数据 w
      let kline_data = this.dealData(szzs.klines, 2, szzs.name, 2)
      let klinedata = dealDateKline(kline_data, cyclejson.cycle.markArea_data)
      this.listData4 = klinedata[0]
      this.timeData4 = klinedata[1]
      this.markArea1 = klinedata[2]
      return
      let item1 = []
      let new_array = []
      let time2 = []
      let this_time = null
      kline_data.time.forEach((element, index) => {
        //判断
        if (this_time == element.slice(0, 4)) {
          item1.push(kline_data.num[index])
          time2.push(element.slice(5, 10))
          if (index + 1 == kline_data.time.length) {
            new_array.push({
              name: this_time,
              array: item1,
              num: item1,
              time: time2,
            })
          }
        } else {
          if (this_time !== null) {
            new_array.push({
              name: this_time,
              array: item1,
              num: item1,
              time: time2,
            })
          }

          item1 = []
          this_time = null
          this_time = element.slice(0, 4)
          time2 = []
          time2.push(element.slice(5, 10))
          item1.push(kline_data.num[index])
        }
      })

      let new_time = []
      new_array.forEach((element, index) => {
        if (index == 0) {
          new_time = element.time
        } else {
          new_time = new_time.concat(element.time)
        }
      })
      let arr01 = new_time.filter((x, index, self) => {
        let arrs = []
        new_time.forEach((item, i) => {
          arrs.push(item)
        })
        return arrs.indexOf(x) === index
      })

      arr01.sort(function (a, b) {
        //正序a-b
        return new Date(a) - new Date(b)
      })
      let item_this = this.dealTimeDate(
        new_array[0].num,
        new_array[0].time,
        arr01
      )
      new_array[0].num = item_this.num
      new_array[0].time = item_this.time



      this.listData4 = new_array
      this.timeData4 = kline_data.time
      this.markArea1 = this.dealMarkArea(cyclejson.cycle.markArea_data)
    },
  },
};
</script>
<style lang="scss">
.dateKline {
}
</style>
