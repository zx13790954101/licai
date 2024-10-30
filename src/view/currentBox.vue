<template>
  <div class="currentBox">
   <gaugeEcharts></gaugeEcharts>
   <plateEcharts></plateEcharts>
  </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  components: {
    gaugeEcharts: () => import('./common/gaugeEcharts.vue'),
    plateEcharts: () => import('./common/plateEcharts.vue'),
  },
}
</script>
<style scoped lang="scss">
.currentBox{
  padding: 20px;
  box-shadow: 1px 1px 3px 3px #2c2c2c2e;
  border-radius: 10px;    background-color: white;
  margin-right: 20px;
}

</style>