<template>
  <div id="fundView" class="fundView">
    <histogramFund
      v-if="listData4.length > 0"
      :name="'_fundView'"
      :title="'北上资金和上证指数'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title1="title4"
      :title2="title4_1"
      :listData="listData4"
      :listData1="num_data"
      :timeData="timeData4"
      :timeData2="time_data"
      :width1="'800px'"
      :height1="'500px'"
      value=""
    ></histogramFund>
  </div>
</template>
<script>
import $ from "jquery";
import histogramFund from "./common/histogramFund.vue";
export default {
  data() {
    return {
      daterange: "",
      region: "",
      listData4: [],
      listData4_1: [],
      timeData4: [],
      timeData4_1: [],
      title4: null,
      title4_1: null,

      num_data: [
        "3",
        "3",
        "3",
        "6",
        "6",
        "6",
        "6",
        "12",
        "12",
        "12",
        "12",
        "12",
        "12",
        "12",
        "12",
        "12",
        "12",
        "20",
        "20",
      ],
      time_data: [
        "2022-07-05",
        "2022-07-06",
        "2022-07-07",
        "2022-07-08",
        "2022-07-11",
        "2022-07-12",
        "2022-07-13",
        "2022-07-14",
        "2022-07-15",
        "2022-07-18",
        "2022-07-19",
        "2022-07-20",
        "2022-07-21",
        "2022-07-22",
        "2022-07-25",
      ],
    };
  },
  created() {},
  components: { histogramFund },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      that.getData();
    });
  },
  methods: {
    onSubmit() {},
    //获取版块的列表
    getData() {
      var that = this;
      var url1 =
        "https://api.doctorxiong.club/v1/stock/kline/day?code=399997&startDate=2022-05-01&endDate=2022-06-10";
      var that = this;
      this.$axios.get(url1).then((res) => {
        console.log(res);
        let data1 = res.data.data;
        //  that.listData4_1 = that.num_data;
        // that.timeData4_1 = that.time_data;
        data1.forEach((item, index) => {
          console.log(item);
          that.timeData4.push(item[0]);
          that.listData4.push(item[2]);
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.fundView {
  height: 60vh;
}
</style>
