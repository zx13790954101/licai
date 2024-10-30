<template>
  <div class="kline2">

    <nav class="flex-c">
       <div class="flex-item">
          
      </div>
      <div class="r">
              <el-select v-model="region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-date-picker
              v-model="daterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
             <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
    </nav>
    <div id="kline2" class="kline-box" style="height: 75vh"></div>
  </div>
</template>
<script>
import $ from "jquery";
import kline from "./../assets/kline/echarts2.js";
export default {
  data() {
    return {
      daterange:'',
      region:'',
    };
  },
  created() {},
  components: {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(function () {
        kline.klineInit();
      }, 2000);
    });
  },
  methods: {
    onSubmit(){
      
    }
  },
};
</script>
<style scoped lang="scss">
.kline2 {
  nav{
    background-color: #100c2a;
    padding:  20px 10px;
  }
}
</style>
