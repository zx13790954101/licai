<template>
  <div class="marketReport flex-c">
     <div class="l_box">
    <el-progress :stroke-width="18" type="dashboard" :percentage="percentage" :color="colors"></el-progress>
    <div class="test">
      <el-button-group>
          <el-button type="danger" round>卖出 </el-button>
            <el-button type="info" disabled round style="opacity: 0.4;">待定</el-button>
      
        <el-button type="success" disabled round style="opacity: 0.4;">买入</el-button>
      
      </el-button-group>
    </div>
    <div class="btn_array">
      <button>买入</button>
      <button>待定</button>
      <button>卖出</button>
    </div>
    </div>
 
  <div class="r_box">

  </div>
 </div>
</template>
<script>
  export default {
    data() {
      return {
        percentage: 10,
        colors: [{
            color: '#f56c6c',
            percentage: 20
          },
          {
            color: '#e6a23c',
            percentage: 40
          },
          {
            color: '#5cb87a',
            percentage: 60
          },
          {
            color: '#1989fa',
            percentage: 80
          },
          {
            color: '#6f7ad3',
            percentage: 100
          }
        ]
      };
    },
    created() {},
    mounted() {

    },
    components: {},
    methods: {},
  };

</script>
<style scoped lang="scss">
.l_box{
  text-align: center;
}
</style>
