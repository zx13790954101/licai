<!--
 * @Author: “linzesen” zx2905111@github.com
 * @Date: 2023-03-24 20:00:22
 * @LastEditors: “linzesen” zx2905111@github.com
 * @LastEditTime: 2024-01-29 14:17:46
 * @FilePath: \mask-money\vue-lunar-fullcalendar-master\src\view\fuCommon\item\fund4.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="fund1">
    <dateTableHis
      :input_name="input_name"
      :indexfun1="day_data_array"
      v-if="day_data_array != null"
    ></dateTableHis>
  </div>
</template>
<script>
import dateTableHis from "./dateTableHis.vue"
import indexFun from "../js/indexFun.js"
export default {
  data () {
    return {
      day_data_array: null,
    }
  },
  created () {
    let indexfun1 = indexFun.initDataShares(this.input_name)

    console.log("indexfun1",indexfun1)
      
    this.day_data_array = JSON.parse(JSON.stringify(indexfun1))
    console.log("day_data_array",this.day_data_array)
  },
  props: {
    //  初始化数据
    input_name: {
      type: String,
      default: null,
    },
  },
  components: {
    dateTableHis,
  },
  mounted () { },
  watch: {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
