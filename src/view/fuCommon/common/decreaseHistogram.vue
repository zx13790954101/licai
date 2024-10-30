<!--
 * @Author: “linzesen” zx2905111@github.com
 * @Date: 2023-03-22 11:05:38
 * @LastEditors: “linzesen” zx2905111@github.com
 * @LastEditTime: 2024-01-30 10:03:05
 * @FilePath: \mask-money\vue-lunar-fullcalendar-master\src\view\fuCommon\common\decreaseHistogram.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="decreaseHistogram">
    <decreaseTable v-if="dealFlow != null" :dealFlow="dealFlow">
    </decreaseTable>
    <decrease ref="decrease" v-if="day_data_array != null" :day_list="day_data_array" :inflow="inflow_data"
      :dealFlow="dealFlow" :inflowArray="inflowArray" class="flex-item">
    </decrease>

    <btnStausGroup :allTime="index_time" :funData="funData" :dataList="btndataList">
    </btnStausGroup>
    <histogramFund v-if="index_list.length > 0" ref="zjlrsj" :thame="''" :name="'_zjlrsj'" :link="''" :title="title4"
      :listData="index_list" :timeData="index_time" :markLine="index_markline" :markPoint="index_markpoint"
      :areaStyle="areaStyle2" :legend1="legend1" :width1="'1400px'" :height1="'600px'" value=""></histogramFund>
    <h3>新趋势图</h3>
    <div class="input-box  flex-c">
      <el-input class="time" v-model="price_time_input" placeholder="输入买入日期(xxxx-xx-xx)" size="medium"></el-input>
      <el-button @click="gainData(price_time_input)" size="medium">确定 </el-button>
    </div>
    <p style="font-size: 20px" v-html="accumulative_data_all">
    </p>
    <histogramFund v-if="new_list.length > 0" ref="zjlrsj2" :thame="'light'" :name="'_zjlrsj2'" :link="''"
      :markPoint="index_markpoint2"
      :title="title4" :listData="new_list" :timeData="index_time" :areaStyle="areaStyle2" :legend1="legend2"
      :width1="'1400px'" :height1="'600px'" value="">
    </histogramFund>
  </div>
</template>

<script>
  import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue"
  import histogramFund from "../histogramFund.vue"
  import decrease from "./decrease/decrease.vue"
  import decreaseTable from "./decrease/decreaseTable.vue"
  import {
    dealData
  } from "../getUrl"
  import gridData from "../js/gridData.js"
  import dealDecrease from "./decrease/dealDecrease.js"
  import {
    setMarkLine
  } from "../setMarkLine.js"
  //获取每个版块买入信息
  import {
    dealFlowData
  } from "./decrease/dealDecreaseName.js"
  import initCaculate from "../js/calculateStopLoss"
  import {
    initZhiDie,
    initMaxMinSpj,
    init10TimeData
  } from "./decrease/decreasePoint.js"
  //处理point
  import dealZjrsjPoint from "./js/dealZjrsjPoint.js"


  import {
    dealPoint
  } from "../common/util.js"
  export default {
    data() {
      return {
        inflow_data: [],
        title4: "",
        index_list: [],
        index_time: [],
        index_markline: [],
        index_markpoint: [],
        //第二个
        index_markpoint2:[],
        indexfun1: null,
        areaStyle2: [{}],
        dealFlow: null,
        btndataList: [],
        funData: [],
        inflowArray: [],
        calculateStopLoss: null,
        zhidie_array: [],
        legend1: undefined,
        legend2: undefined,
        zhidie_point: null,
        new_list: [],
        //累加数据总结
        accumulative_data_all: "",
        //输入的
        price_time_input: '',
        decrease_data: null,
        //当前个股的
        this_kline_data: null,
        //设置
        zjlrsj_point: null,
      }
    },
    created() {},
    props: {
      day_data_array: {
        type: Object,
        default: null,
      },
    },
    components: {
      histogramFund,
      decrease,
      btnStausGroup,
      decreaseTable
    },
    created() {
      this.initData()
    },
    mounted() {

    },
    watch: {},
    methods: {
      //获取数据
      gainData(value) {
        let that = this
        let decrease_data = that.decrease_data

        let this_time2 = that.index_time.findIndex((item) => {
          return item === value + ""
        })

        let length1 = this_time2 - 1
        console.log("获取日期的标签位置", length1)
        that.accumulative_data_all =
          "40天涨幅：" +
          decrease_data[7].num[length1] +
          "% <br> 40天跌幅：" +
          decrease_data[8].num[length1] +
          "%  <br> 20天涨幅：" +
          decrease_data[9].num[length1] +
          "% <br> 20天跌幅：" +
          decrease_data[10].num[length1] +
          "% <br> 10天涨幅：" +
          decrease_data[5].num[length1] +
          "% <br>  10天跌幅：" +
          decrease_data[6].num[length1]
      },
      // 搜索问题，处理 问题
      dealLineData(this_time, type2) {
        let that = this
        //处理数据
        let select_data = that.index_list

        that.index_list = []
        let max_data = JSON.parse(JSON.stringify(select_data[0].num))
        let max_num = max_data.slice(this_time - 6, this_time)

        let num1 = this.calculateStopLoss.deal_data2.ji_zhidie.reverse()
        //缺少最大值=

        let zdf_num_max = this.calculateStopLoss.deal_data2.zbs_array[this_time]
        let zdf_num_min = this.calculateStopLoss.deal_data2.ji_zhidie[this_time]
        // console.log("zdf_num_max==还是需要计算40天的数据", zdf_num_max);

        let gridData2 = gridData.dealMarkLine(
          that.indexfun1.num,
          select_data[0].num[this_time],
          zdf_num_max,
          zdf_num_min
        )

        let index_markline = setMarkLine(
          [
            gridData2.top_data5,
            {
              name: "当前的位置",
              num: select_data[0].num[this_time],
            },
            gridData2.bottom_data5,
          ],
          that.index_time
        )

        setTimeout(() => {
          that.index_list = select_data
          that.index_markline = index_markline

          if (type2 == 2) {
           
            let point2 = [{
              name: "买卖操作",
              value: "买入位置2",
              xAxis: that.index_time[this_time],
              yAxis: select_data[0].num[this_time],
            }, ]
            that.index_markpoint = [{
                data: point2,
              },

              {
                data: this.zhidie_point,
              },
              {},
              {},
              {},
            ]
          }
        }, 1000)
      },
      //处理返回来的数据
      dealStausPoint(deal_data) {
        let that = this
        //处理数据
        let select_data = that.index_list
        that.index_list = []
        setTimeout(() => {
          that.index_list = select_data
          that.index_markpoint = deal_data
        }, 1000)
      },
      newAccumulative() {
        let that = this;
        let decrease_data = dealDecrease.initData(
          that.indexfun1.num,
          that.day_data_array
        );

       
        that.decrease_data = decrease_data
        that.new_list.push({
          num: that.indexfun1.num,
          name: that.indexfun1.name,
        })
        that.new_list.push({
          num: that.indexfun1.inflow,
          name: "累计涨跌幅",
        })
        // that.new_list.push({
        //   num: decrease_data[5].num,
        //   name: decrease_data[5].name,
        // });

        that.new_list.push({
          num: decrease_data[5].num,
          name: decrease_data[5].name,
        })
        that.new_list.push({
          num: decrease_data[6].num,
          name: decrease_data[6].name,
          type_echarts: "bar",
          itemStyle: 2,
        })
        that.new_list.push({
          num: decrease_data[9].num,
          name: decrease_data[9].name,
        })
        that.new_list.push({
          num: decrease_data[10].num,
          name: decrease_data[10].name,
          type_echarts: "bar",
          itemStyle: 2,
        })

        that.new_list.push({
          num: decrease_data[7].num,
          name: decrease_data[7].name,
        })
        that.new_list.push({
          num: decrease_data[8].num,
          name: decrease_data[8].name,
          type_echarts: "bar",
          itemStyle: 2,
        });
        that.new_list.push({
          num: that.indexfun1.atr_klines,
          name: 'art数值',
        })
        that.new_list.push({
          num: that.indexfun1.adjustedGrid,
          name: '网格间隔',
        })
        dealZjrsjPoint.initData(
          [
            decrease_data[5].num,
            decrease_data[6].num,
            decrease_data[9].num,
            decrease_data[10].num,
            decrease_data[7].num,
            decrease_data[8].num,
          ],
          this.index_time
        );
        let length1 = decrease_data[7].num.length - 1
        //计算涨跌幅数据
        that.accumulative_data_all =
          "40天涨幅：" +
          decrease_data[7].num[length1] +
          "%   20天涨幅：" +
          decrease_data[9].num[length1] +
          "%  10天涨幅：" +
          decrease_data[5].num[length1] +
          "% <br> 40天跌幅：" +
          decrease_data[8].num[length1] +
          "%  20天跌幅：" +
          decrease_data[10].num[length1] +
          "%   10天跌幅：" +
          decrease_data[6].num[length1] + '%'
        that.legend2 = {
          selected: {
            this_name: true,
            累计涨跌幅: false,
            "10天内持续跌幅": true,
            "10天内持续涨幅": false,
            "20天内持续跌幅": false,
            "20天内持续涨幅": false,
            "40天内持续跌幅": false,
            "40天内持续涨幅": false,
             "art数值": false,
          },
        }

            let point_10TimeData = dealPoint(
             init10TimeData({
                this_num:that.indexfun1.num,
                diefu_data10:decrease_data[6].num,
                time:that.indexfun1.time
             }).zhidie_array.num,
             0
            )
            //设置网络上限，
            // that.index_markline = [gridData2[0], {}, {}, {}];
            //设置大小
            that.index_markpoint2 = [
             
              {
                data: point_10TimeData
              },
             
            ]
      },
      initData() {
        let that = this
        that.indexfun1 = that.day_data_array
        that.this_kline_data = that.day_data_array

        this.inflow_data = that.indexfun1.array.slice(-2)

        //计算
        let calculateStopLoss = initCaculate.calculateStopLoss2(
          [{
            klines: this.indexfun1.all_klines
          }],
          this.indexfun1.all_klines,
          null,
          "",
          this.indexfun1.time
        )
        this.calculateStopLoss = calculateStopLoss

        this.zhidie_array = calculateStopLoss.deal_data2.ji_zhidie.reverse()
        that.index_list.push({
          num: that.indexfun1.num,
          name: that.indexfun1.name,
        })

        let array1_item = [0]

        array1_item = array1_item.concat(
          dealData(that.indexfun1.all_klines, 2, "成交额(亿)", 6).num
        )
        // that.index_list.push({
        //   num: array1_item,
        //   name: "成交额(亿)",
        // });
        // that.index_list.push({
        //   num: calculateStopLoss.deal_data2.zdf_max_array.reverse(),
        //   name: "近30日涨幅",
        //   yAxisIndex: false,
        // });
        // that.index_list.push({
        //   num: calculateStopLoss.deal_data2.zdf_min_array.reverse(),
        //   name: "近30日跌幅",
        //   yAxisIndex: false,
        // });
        that.index_list.push({
          num: calculateStopLoss.deal_data2.ji_zhidie.reverse(),
          name: "止损跌幅",
        })
        that.index_list.push({
          num: calculateStopLoss.deal_data2.zdf_min_array.reverse(),
          name: "20天最小值的幅度",
        })
        that.index_list.push({
          num: calculateStopLoss.deal_data2.zdf_max_array.reverse(),
          name: "20天最大值的幅度",
        })
        console.log("calculateStopLoss",calculateStopLoss)
        // that.index_list.push({
        //   num: that.indexfun1.array,
        //   name: "每日涨跌",
        //   type_echarts: "bar",
        //   itemStyle: 2,
        // });
        // that.index_list.push({
        //   num: calculateStopLoss.deal_data2.zbs_array.reverse(),
        //   name: "20天最大值和最小值的幅度",
        // });

        //处理另外的折线图的数据
        this.newAccumulative()

        that.index_list.push({
          num: that.indexfun1.inflow,
          name: "累计涨跌幅",
        })

        that.index_list.push({
          num: dealData(that.indexfun1.all_klines, 3, "换手率", 10).array,
          name: "位置",
        })

           that.index_list.push({
            num: calculateStopLoss.max_spj_array,
            name: "最高值收盘价",
            //  type_echarts: "bar",
            // itemStyle: 2,
          });

          that.index_list.push({
            num: calculateStopLoss.spj_min_array,
            name: "收盘价最低价",
            
          });
          that.index_list.push({
            num: calculateStopLoss.spj_max_min_array,
            name: "收盘价-最高值-最低价",
            
          });
        // that.index_list.push({
        //     num: calculateStopLoss.max_min_array,
        //     name: "最高值-最低价",
        //   });


        let this_name = that.indexfun1.name
        that.legend1 = {
          selected: {
            // 通过selected的图例选中状态来控制你要显示的个数
            this_name: true,
            止损跌幅: false,
            "20天最小值的幅度": false,
            "20天最大值的幅度": false,
            // 每日涨跌: false,
            //  "20天最大值和最小值的幅度": false,
            累计涨跌幅: false,
            位置: false,
            累计涨跌幅: false,
            收盘价最低价: false,
            最高值收盘价: false,
            每日输入变化: false,
          },
        }

        this.zhidie_point = dealPoint(
          initZhiDie(calculateStopLoss).zhidie_array.num,
          0
        )

        that.index_time = that.indexfun1.time

        this.inflowArray = that.indexfun1.array
        //设置自定义
        this.funData = [
          this.index_list[0].num,
          this.index_list[1].num,
          this.index_list[2].num,
          this.index_list[3].num,
        ]
        this.btndataList = [{
            name: this.index_list[0].name,
            state: 1,
            color: "#4992ff",
          },
          {
            name: this.index_list[1].name,
            state: 3,
            color: "#7cffb2",
          },
          {
            name: this.index_list[2].name,
            state: 3,
            color: "#fddd60",
          },
          {
            name: this.index_list[3].name,
            state: 3,
            color: "#ff6e76",
          },
        ]
        //获取买入的价格的位置
        dealFlowData(that.indexfun1.name).then(res => {
          this.dealFlow = res;
          let dealflow = res;
          console.log("dealFlowData",res)

          //判断是不是有买入状态
          if (dealflow != null) {
            let point2 = [];
     
            dealflow.forEach((element, index) => {
              let gridData2 = gridData.dealMarkLine(
                that.indexfun1.num,
                element.num
              )
              gridData2 = setMarkLine(
                [gridData2.top_data5, gridData2.bottom_data5],
                that.index_time
              )
              const index_time = that.indexfun1.time.findIndex(item => item === element.time);

              point2.push({
                name: "买卖操作",
                value: element.type,
                xAxis: element.time,
                yAxis: that.indexfun1.num[index_time],
                itemStyle: element.type.indexOf('卖出') != -1 ? {
                  color: "green",
                } : {
                  color: 'red'
                }
              });
              
            })
            let  bug_shell_data=[];
            let shell_cben=0;
            //买入卖出的价值变化
            let  bug_shell_all_data=0;
            let  bug_shell_all_data_array=[];
            let this_index=0;
            let if_end_index=false;
            //总的收入百分比
            let shell_bfb=[];
            that.indexfun1.time.forEach((element, index) => {
               // 使用filter()方法筛选出与targetTime相匹配的对象
                let matchingItems = dealflow.find(item => item.time === element);
               
                let bfb=(100+(
                      that.indexfun1.inflow[index]-
                    that.indexfun1.inflow[index-1]))/100
                // 提取筛选出对象中的num值
                if(matchingItems){
                  if(bug_shell_data.length>0){
                    bug_shell_all_data=(bug_shell_all_data*bfb+matchingItems.num).toFixed(2)
                  }else{
                    this_index=index
                    bug_shell_all_data=matchingItems.num;
                  }
                  bug_shell_all_data_array.push(bug_shell_all_data)
               
                   // 获取到的元素在 dealflow 数组中的索引
                  let index1 = dealflow.indexOf(matchingItems);
                  // 检查是否是最后一个元素
                  if (index1 === dealflow.length - 1) {
                    if_end_index=true
                  }
                  bug_shell_data.push(matchingItems.num);
                  shell_cben=shell_cben+matchingItems.num;
                  shell_bfb.push( (bug_shell_all_data /shell_cben).toFixed(3))
                }else{
                  if(bug_shell_all_data>0){
                    bug_shell_all_data_array.push((bug_shell_all_data*bfb).toFixed(2))
                    shell_bfb.push( (bug_shell_all_data*bfb /shell_cben).toFixed(3))
                  }else{
                    bug_shell_all_data_array.push(0)
                    shell_bfb.push( 0)
                  }
                  bug_shell_data.push(0)
                }
            })
            that.index_list.push({
              num: bug_shell_data,
              name: "每日买入卖出",
              type_echarts: "bar",
              itemStyle: 2,
            });
            that.index_list.push({
              num: bug_shell_all_data_array,
              name: "每日输入变化",
            });
          

              let point_spj_max_min = dealPoint(
          initMaxMinSpj(calculateStopLoss).zhidie_array.num,
          0
           )
            //设置网络上限，
            // that.index_markline = [gridData2[0], {}, {}, {}];
            //设置大小
            that.index_markpoint = [
              {
                data: point2,
              },
              {
                data: this.zhidie_point,
              },
              {},
              {},
              {},
              {},

              {},
              {},
              {
                data: point_spj_max_min
              },
             
            ]
            //计算没有买入状态
          } else {
            this.$nextTick(() => {
              let decrease_data = that.$refs
              //设置当前情况
              that.$refs.decrease.toSreach(
                that.index_time[that.index_time.length - 1]
              )
            })
          }

        })


      },
    },
  }

</script>

<style lang="scss" scoped>
  .decreaseHistogram {}

</style>
