<template>
  <div class="decrease">
    <section class="input-btn flex-item">
      <div class="flex-c">
        <el-input
          class="time"
          v-model="time_data"
          placeholder="输入买入日期(xxxx-xx-xx)"
          size="medium"
        ></el-input>
        <el-button
          @click="toSreach(time_data,0)"
          size="medium"
        >确定 </el-button>
      </div>

      <ul>
        <li
          v-for="(item, index) in sreach_data"
          :key="index"
          class="flex-c"
          :class="item.active ? 'active' + item.active : ''"
        >
          <h4 v-if="item.name">{{ item.name }}:</h4>
          <h5
            :class="parseFloat(item.num) > 0 ? 'active1' : 'active2'"
            v-if="!item.active || item.active != 1"
          >
            {{ item.num }}
          </h5>

          <pre v-if="item.active == 1" style="height: 200px;overflow-y: auto;">
        {{ item.num }}
        </pre>
        </li>
      </ul>
    </section>
    <div class="box flex-item">
      <ul v-if="week_list == null">
        <li
          v-for="(item, index) in this_list_data"
          :key="index"
          class="flex-c"
        >
          <h4 v-if="item.name">{{ item.name }}:</h4>
          <h5 :class="item.num > 0 ? 'active1' : 'active2'">{{ item.num }}%</h5>
          <h4 v-if="item.time">
            {{ item.time }}
          </h4>
        </li>
      </ul>
    </div>
    <ul
      v-if="week_list == null"
      class="flex-item"
    >
      <li
        v-for="(item, index) in day_list_data"
        :key="index"
        class="flex-c"
      >
        <h4 v-if="item.name">{{ item.name }}:</h4>
        <h5 :class="item.num > 0 ? 'active1' : 'active2'">{{ item.num }}%</h5>
        <h4 v-if="item.time">({{ item.time }}天)</h4>
      </li>
    </ul>
    <ul
      v-if="week_list != null"
      class="flex-item"
    >
      <li
        v-for="(item, index) in week_list_data"
        :key="index"
        class="flex-c"
      >
        <h4 v-if="item.name">{{ item.name }}:</h4>
        <h5 :class="item.num > 0 ? 'active1' : 'active2'">{{ item.num }}%</h5>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  dealFlowData
} from "./decrease.js"
export default {
  data () {
    return {
      week_list_data: [],
      day_list_data: [],
      this_list_data: [],
      time_data: "",
      sreach_data: [],
    }
  },
  created () { },
  props: {
    week_list: {
      type: Object,
      default: null,
    },
    day_list: {
      type: Object,
      default: null,
    },
    //  初始化的值
    dealFlow: {
      type: Array,
      default: null,
    },
    inflowArray: {
      type: Array,
      default: null,
    },
    inflow: {
      type: Array,
      default: null,
    },
  },
  components: {},
  mounted () {
  
    if (this.week_list != null) {
      this.week_list_data = this.dealWeekList(this.week_list)
    } else {
      this.this_list_data = this.dealThisData(this.inflow)
    }
  console.log("this.week_list111",this.day_list)


        console.log("this.inflow",this.this_list_data)


    //搜索计算
    if (this.dealFlow != null) {
            let all_num=this.dealFlow
      if(this.dealFlow.length>10){
        all_num=this.dealFlow.reverse()
      }

      this.toSreach(all_num)
    }
  },
  watch: {
    //获取日期的数据
    week_list: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val != null) { }
      },
    },
    day_list: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val != null) {
          console.log("dat_list", val)
        }
      },
    },
    inflow: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val != null) { }
      },
    },
     dealFlow: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val != null) { 
           let all_num=val
          if(val.length>10){
            all_num=val.slice().reverse()
          }
           this.toSreach(all_num)
        }
      },
    },
  },
  methods: {
    //搜索买入的时间  view_type=是不是要展示买入位置
    toSreach (time, view_type) {
      let length1 = this.day_list.inflow
      let time_array = this.day_list.time
      let num_array = this.day_list.num

      let percentage_array = 0
      let this_time2 = 0
      let xs_time = ""
      if (typeof time != "string") {
        let all_money = 0
        let percentage_array2 = 0
        //全部的逻辑的累加值
        let all_money_data = 0
        let add_money_data = 0
        //结束累加值
        let down_money_data = 0
        //累加盈利
        let accumulation_profit = 0
 
       
        //计算累计的涨跌幅
        time.forEach((element, index) => {
          element.money=element.money?element.money:element.num
          let this_time = time_array.findIndex((item) => {
            return item === time[index].time + ""
          })
          //上一个时间
          let last_time = null
          if (index != 0) {
            last_time = time_array.findIndex((item) => {
              return item === time[index - 1].time + ""
            })
          };
          //每个买入和卖出的涨跌幅,就是涨跌幅的百分百的数值是多少
          let stage_price = (parseFloat(num_array[this_time]) - parseFloat(num_array[last_time])) /
            parseFloat(num_array[last_time])
          //如果当前的买入时间小于上一个买入时间，那么就计算当前的买入时间到上一个买入时间的涨跌幅
          if (index + 1 == time.length) {
            if (all_money + element.money == 0) {
              stage_price =
                (parseFloat(num_array[length1.length - 1]) -
                  parseFloat(num_array[this_time])) /
                parseFloat(num_array[this_time])
            }
          }
          if (index == 0) {
            stage_price = 0
          }
          //当前总的数值
          let this_sh = 1 + element.money / all_money
          if ((-element.money) == all_money) {
            this_sh = 1
          }
          //当前亏损值
          all_money_data = percentage_array * (1 + stage_price)

          //累加的亏损值
          accumulation_profit = accumulation_profit + percentage_array * stage_price
          if (element.money < 0) {
            percentage_array = all_money_data - all_money_data * this_sh
            down_money_data = down_money_data + element.money

          } else {
            percentage_array = all_money_data + element.money
            add_money_data = add_money_data + element.money
          }

          all_money = all_money + element.money
          xs_time =
            xs_time + `\n` + element.time + "买入" + element.money + "元"

        })

        //console.log("all_money_data=", all_money_data)
        percentage_array2 = accumulation_profit
        percentage_array = (
          ((all_money + accumulation_profit) / all_money) *
          100
        ).toFixed(2)
        this_time2 = time_array.findIndex((item) => {
          return item === time[0].time + ""
        })

        this.$parent.dealLineData(this_time2)
        this.sreach_data = [{
          name: "累加涨跌幅",
          num: percentage_array + "%",
        },
        {
          name: "持有天数",
          num: length1.length - this_time2,
        },
        {
          name: "买入的时间",
          num: xs_time,
          active: 1,
        },
        {
          name: "成本" + all_money + "元",
          num: "盈利" + percentage_array2.toFixed(2) + "元",
        },
        {
          name: "止跌涨跌幅推荐",
          num: -this.$parent.zhidie_array[this_time2] + "%",
          active: 3,
        },
        ]
      } else {
        this_time2 = time_array.findIndex((item) => {
          return item === time + ""
        })
        percentage_array = (
          length1[length1.length - 1] - length1[this_time2]
        ).toFixed(2)

        this.$parent.dealLineData(this_time2, 2)

        this.sreach_data = [{
          name: "累加涨跌幅",
          num: percentage_array + "%",
        },
        {
          name: "持有天数",
          num: length1.length - this_time2,
        },
        {
          name: "买入的时间",
          num: time,
        },
        {
          name: "止跌涨跌幅推荐",
          num: "-" + this.$parent.zhidie_array[this_time2] + "%",
          // active: 2,
        },
        ]
       console.log("toSreach", view_type)
        if(view_type==0){
          this.this_list_data = this.dealThisData(this.inflow,this_time2)

        }
      }

     



    },

    dealInflow (num, data) {
      let info = []
      let info_item = []

      data.slice(-num).forEach((element, index) => {
        if (element > 0) {
          info.push(element)
        } else {
          info_item.push(element)
        }
      })

      let all = data.slice(-num).reduce((a, b) => a + b)

      all = all / num
      info = info.length > 0 ? info.reduce((a, b) => a + b) / info.length : 0
      info_item = info_item.reduce((a, b) => a + b) / info_item.length
      return {
        all: {
          name: "平均值",
          num: all.toFixed(2),
        },
        z_all: {
          name: "正平均值",
          num: info.toFixed(2),
        },
        f_all: {
          name: "负平均值",
          num: info_item.toFixed(2),
        },
      }
    },
    dealThisData (data,this_num) {
      let day_list=this.day_list
      if(this_num){
         day_list={
          adjustedGrid:day_list.adjustedGrid.slice(0,this_num),
          all_klines:day_list.all_klines.slice(0,this_num),
          array:day_list.array.slice(0,this_num),
          atr_klines:day_list.atr_klines.slice(0,this_num),
          inflow:day_list.inflow.slice(0,this_num),
          klines:day_list.klines.slice(0,this_num),
          name:day_list.name,
          num:day_list.num.slice(0,this_num),
          time:day_list.time.slice(0,this_num),
         }
      
      }
         console.log("day_list",day_list)
      let list_data = day_list.num.slice(-40)

      let info_array = dealFlowData(day_list, 40)

      let info_array180 = dealFlowData(day_list, 180)

      let info_array10 = this.dealDayList(day_list, 10)
      let dealInflow2 = this.dealInflow(10, day_list.array)

      let array10 = dealFlowData(day_list, 10)
      let info_array2 = []
      day_list.array.slice(-40).forEach((item, index) => {
        let item1 = item > 0
        let item2 = day_list.array.slice(-40)[index - 1] > 0
        if (item2 == item1) {
          info_array2.push(item)
        } else {
          info_array2 = []
          info_array2.push(item)
        }
      })
      this.day_list_data = [
        info_array[2],
        info_array[0],
        info_array[1],
        info_array180[0],
        info_array180[1],
      ]
   console.log("day_list_data",this.day_list_data)
      let daylist = this.dealDayList(day_list, 20)

      
      return [{
        name: "今天",
        num: data[1],
      },
      {
        name: "前一天",
        num: data[0],
      },
      {
        name: "累加涨跌幅" + info_array2.length + "天",
        num: info_array2
          .reduce((a, b) => parseFloat(a) + parseFloat(b))
          .toFixed(2),
      },
      daylist[0],
      daylist[1],
      info_array10[0],
      info_array10[1],
      ]
    },
    dealDayList (data1, num) {
      let end_array = data1.array.slice(-num)
      let this_time = data1.time.slice(-num)
      let inflow_array = data1.inflow.slice(-num)
      let max_num = Math.max(...end_array)
      let min_num = Math.min(...end_array)

      let max_time = end_array.findIndex((item) => {
        return item === max_num
      })
      let min_time = end_array.findIndex((item) => {
        return item === min_num
      })

      let max_num2 = Math.max(...inflow_array)
      var min_num2 = Math.min(...inflow_array)

      let max_time2 = inflow_array.findIndex((item) => {
        return item === max_num2
      })
      let min_time2 = inflow_array.findIndex((item) => {
        return item === min_num2
      })
      let dief_num3 = null
      let end_num3 = null
      let min_num233 = null
      //判断最大在前面还是在后面
      if (max_time2 > min_time2) {
        dief_num3 = max_num2 - min_num2
        let end_array1 = inflow_array.splice(
          max_time2,
          inflow_array.length - 1
        )
        min_num2 = Math.min(...end_array1)

        end_num3 = min_num2 - max_num
        min_num233 = inflow_array.findIndex((item) => {
          return item === min_num2
        })
      } else {
        dief_num3 = min_num2 - max_num2
        console.log("num", num)
        console.log("dief_num3", dief_num3)
        let end_array1 = inflow_array.slice(0, max_time2 + 1)

        min_num2 = Math.min(...end_array1)

        end_num3 = max_num2 - min_num2
        min_num233 = inflow_array.findIndex((item) => {
          return item === min_num2
        })
      }
      let info_data = [{
        name: num + "天内最大涨跌值",
        num: max_num.toFixed(2),
        time: this_time[max_time],
      },
      {
        name: num + "天内最大跌幅值",
        num: min_num.toFixed(2),
        time: this_time[min_time],
      },
      //日期有问题
      {
        name: num + "天内持续跌幅",
        num: dief_num3.toFixed(2),
        time: this_time[min_num233],
      },
      {
        name: num + "天内持涨幅",
        num: end_num3.toFixed(2),
        time: this_time[min_num233],
      },
      ]
      return info_data
    },

    dealWeekList (data1) {
      let zheng = []
      let zheng_num = 0
      let fuzhi = []
      let fuzhi_num = 0
      let all_array = []
      let if_type = parseFloat(data1.array[0]) > 0 ? true : false
      let if_array = []
      data1.array.forEach((Element, index) => {
        all_array.push(parseFloat(Element))
        if (parseFloat(Element) >= 0) {
          zheng.push(parseFloat(Element))
          zheng_num = parseFloat(Element) + zheng_num

          let type1 = parseFloat(data1.array[index - 1]) > 0
          let type2 = parseFloat(Element) > 0
          if (type1 == type2) {
            if_array.push(parseFloat(Element))
          } else {
            if_array = []
          }
        } else {
          let type1 = parseFloat(data1.array[index - 1]) > 0
          let type2 = parseFloat(Element) > 0
          if (type1 == type2) {
            if_array.push(parseFloat(Element))
          } else {
            if_array = []
          }

          fuzhi.push(parseFloat(Element))
          fuzhi_num = parseFloat(Element) + fuzhi_num
        }
      })
      if (if_array.length == 0) {
        if_array.push(data1.array[data1.array.length - 1])
      }
      zheng_num = (zheng_num / zheng.length).toFixed(2)
      fuzhi_num = (fuzhi_num / fuzhi.length).toFixed(2)
      let max_num = Math.max(...all_array).toFixed(2)
      let min_num = Math.min(...all_array).toFixed(2)
      let info_data = [{
        name: "最近的连续涨跌幅",
        num: if_array.reduce((a, b) => a + b).toFixed(2),
      },
      {
        name: "一周时间最大涨幅",
        num: max_num
      },
      {
        name: "一周时间最大跌幅",
        num: min_num
      },
      {
        name: "周时间涨幅平均值",
        num: zheng_num
      },
      {
        name: "周时间跌幅平均值",
        num: fuzhi_num
      },
      ]
      return info_data
    },
  },
};
</script>

<style lang="scss" scoped>
.decrease {
  width: 100%;
  background-color: #343434;
  color: white;
  display: flex;
  padding: 10px 20px;

  .box {
    display: flex;
  }

  .active3 {
    font-size: 24px;

    h5 {
      font-size: 24px;
    }
  }

  ul {
    padding: 5px;
    width: 100%;
    margin-right: 20px;

    li {
      border: 1px solid;
      padding: 5px 10px;
      display: flex;
      color: white;
    }

    h4 {
      word-wrap: normal;
      word-break: keep-all;
      margin-right: 10px;
    }

    h5 {
      font-weight: 600;
      font-size: 18px;
      word-break: keep-all;
    }

    pre {
      font-weight: 600;
      font-size: 18px;
      margin: 0px;
      text-align: left;
      padding: 0px;
      line-height: 18px;
    }

    .active1 {
      color: #f72c5b;
    }

    .active2 {
      color: #7cffb2;
    }
  }
}
</style>
