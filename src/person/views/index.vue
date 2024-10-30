<template>
  <div class="index">
    <mainView></mainView>
    <weekMoonTable></weekMoonTable>

    <lineEcharts v-if="all_data!=null" :view_name="'person_data'" :deal_data="all_data[0]"></lineEcharts>
 <test></test>
  </div>
</template>
<script>
    import mainView from "./itemView/mainView.vue";
  import weekMoonTable from "./components/weekMoonTable.vue";
    import test from "./components/test.vue";
  import lineEcharts from "./components/echartsCommon/lineEcharts.vue";
  import excelUtil from "./../js/excelUtil.js"
  import {
    my_financial,
    all_daily_profit,
    daily_profit
  }
  from "./../url_name/excel/dingding.js";
  export default {
    data() {
      return {
        default_active: 2,
        all_data: null,
      };
    },
    created() {},
    mounted() {
      let that = this;
      this.$nextTick(() => {

        excelUtil.dealPersonData().then(res => {
              that.all_data = res
        })
    

      })

    },
    components: {
      mainView,
      weekMoonTable,
      lineEcharts,
      test
    },
    methods: {},
  };

</script>
<style scoped lang="scss">

</style>
