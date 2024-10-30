<template>
  <div class="fund2">
    <btnStausGroup
      :allTime="wlstock_time"
      :funData="funData"
      :dataList="btndataList"
      :type="'1'"
    >
    </btnStausGroup>

    <histogramFund
      v-if="wlstock_list.length > 0"
      ref="wlstock12"
      :thame="'dark'"
      :name="'_wlstock12'"
      :link="''"
      :title="title4"
      :listData="wlstock_list"
      :timeData="wlstock_time"
      :markPoint="wlstock_point"
      :width1="'1400px'"
      :height1="'500px'"
      value=""
    ></histogramFund>

    <histogramFund
      v-if="rz_list.length > 0"
      ref="wlstock12"
      :thame="'dark'"
      :name="'_rzzq2'"
      :link="''"
      :title="title4"
      :listData="rz_list"
      :timeData="rz_time"
      :width1="'1400px'"
      :height1="'500px'"
      value=""
    ></histogramFund>
  </div>
</template>
<script>
import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue"
import histogramFund from "../histogramFund.vue"
import { dealBigCapital, dealTime } from "../dealData.js"
import { dealReportName } from "../js/financing.js"
import { setRise, setCapital, setWlstock } from "../js/setMarkPoint/setMarkPoint.js"
export default {
  data () {
    return {
      title2: "",
      title4: "",
      btndataList: [],
      funData: [],
      zjlrsj_markPoint3: [],
      this_dataList2: [],
      markLine: [],
      areaStyle2: [{}],
      wlstock_list: [],
      wlstock_time: [],
      wlstock_point: [],
      rz_list: [],
      rz_time: [],
    }
  },
  created () {
    this.initData()
  },
  props: {
    this_name: {
      type: String,
      default: [],
    },

    input_name1: {
      type: String,
      default: "",
    },
  },
  components: {
    histogramFund,
    btnStausGroup,
  },
  mounted () { },
  watch: {},
  methods: {
    //处理返回来的数据
    dealStausPoint (deal_data) {
      let that = this
      console.log("deal_data", deal_data)
      //处理数据
      let select_data = that.wlstock_list
      //  let select_data2 = that.dataList4;
      that.wlstock_list = []
      //   that.dataList4 = [];
      setTimeout(() => {
        that.wlstock_list = select_data
        that.wlstock_point = deal_data
        //that.dataList4 = select_data2;
        //    that.markPoint3 = deal_data;
      }, 1000)
    },
    //跳转到
    initData () {
      let that = this

      let dealBigCapital22 = dealBigCapital(this.input_name1)

      let financing = dealReportName(this.input_name1)

      console.log("financing", financing)
      financing.list[3] = {
        name: financing.list[3].name,
        num: financing.list[3].num,
        itemStyle:2,
        type_echarts:"bar"
      }; 
      this.rz_list = financing.list
      this.rz_time = financing.time
      this.wlstock_list = dealBigCapital22.array1_wlstock
      console.log("this.wlstock_list", this.wlstock_list)
      this.wlstock_time = dealBigCapital22.array1_wlstock[0].time

      let object3 = setWlstock(
        this.wlstock_list[1].num,
        this.wlstock_list[2].num,
        this.wlstock_list[3].num,
        this.wlstock_time,
        this.wlstock_list[0].num,
        this.this_name
      )
      this.wlstock_point = object3

      //添加代码
      this.funData = [
        this.wlstock_list[0].num,
        this.wlstock_list[1].num,
        this.wlstock_list[2].num,
        this.wlstock_list[3].num,
      ]
      this.btndataList = [
        {
          name: this.wlstock_list[0].name,
          state: 1,
          color: "#4992ff",
        },
        {
          name: this.wlstock_list[1].name,
          state: 2,
          color: "#7cffb2",
        },
        {
          name: this.wlstock_list[2].name,
          state: 1,
          color: "#fddd60",
        },
        {
          name: this.wlstock_list[3].name,
          state: 1,
          color: "#ff6e76",
        },
      ]
    },
  },
};
</script>
<style scoped lang="scss"></style>
