<template>
  <div class="fund2">
    <btnStausGroup
      :allTime="dataList[0].time"
      :funData="funData"
      :dataList="btndataList"
    >
    </btnStausGroup>

    <histogramFund
      v-if="dataList2.length > 0"
      ref="analysis1"
      :thame="'dark'"
      :name="'_analysis1'"
      :link="''"
      :title="title2"
      :listData="dataList2"
      :timeData="dataList[0].time"
      :width1="'1400px'"
      :markLine="markLine"
      :areaStyle="areaStyle2"
      :markPoint="zjlrsj_markPoint3"
      :height1="'700px'"
      value=""
    >
    </histogramFund>
  </div>
</template>
<script>
import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue"
import histogramFund from "../histogramFund.vue"
import { setRise } from "../js/setMarkPoint/setMarkPoint.js"
export default {
  data () {
    return {
      title2: "",
      btndataList: [],
      funData: [],
      zjlrsj_markPoint3: [],
      this_dataList2: [],
      markLine: [],
      areaStyle2: [{}],
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
    dataList2: {
      type: Array,
      default: [],
    },
    dataList: {
      type: Array,
      default: [],
    },
    zjlrsj_list: {
      type: Array,
      default: [],
    },
    input_name1: {
      type: String,
      default: "",
    },

    zjlrsj_markPoint: {
      type: Array,
      default: [],
    },
  },
  components: {
    histogramFund,
    btnStausGroup,
  },
  mounted () { },
  watch: {
    zjlrsj_markPoint (val) {
      console.log(val)
      if (val.length > 0) {
        let this_array = this.dataList2
        this.dataList2 = []

        this.zjlrsj_markPoint3 = this.zjlrsj_markPoint
        this.dataList2 = this_array
      }
    },
  },
  methods: {
    //跳转到
    initData () {
      let that = this
      that.this_dataList2 = that.dataList2
      //处理markpoint的数据
      let object2 = setRise(
        // this.dataList2[1].num,
        this.dataList[0].time,
        this.dataList2[1].num,
        this.this_name,
        this.dataList2[0].num,
        this.zjlrsj_list[1].num,
        this.zjlrsj_list[2].num
      )

      let setDayMarkPoint1 = setDayMarkPoint(
        [
          this.dataList2[0].num,
          this.dataList2[1].num,
          this.zjlrsj_list[1].num,
          this.zjlrsj_list[2].num,
        ],
        [1, 1, 0, 1],
        this.dataList[0].time
      )
      setDayMarkPoint1 =
        setDayMarkPoint1.length > 0 ? setDayMarkPoint1 : object2

      this.zjlrsj_markPoint3 = setDayMarkPoint1

      //添加代码
      this.funData = [
        this.dataList2[0].num,
        this.dataList2[1].num,
        this.zjlrsj_list[1].num,
        this.zjlrsj_list[2].num,
      ]
      this.btndataList = [
        {
          name: this.dataList2[0].name,
          state: 1,
          color: "#4992ff",
        },
        {
          name: this.dataList2[1].name,
          state: 1,
          color: "#7cffb2",
        },
        {
          name: this.zjlrsj_list[1].name,
          state: 2,
          color: "#fddd60",
        },
        {
          name: this.zjlrsj_list[2].name,
          state: 1,
          color: "#ff6e76",
        },
      ]

      that.this_dataList2.push(this.zjlrsj_list[1])
      that.this_dataList2.push(this.zjlrsj_list[2])
    },
  },
};
</script>
<style scoped lang="scss"></style>
