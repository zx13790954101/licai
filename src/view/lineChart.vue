<template>
  <div id="line1" class="lineChart"></div>
</template>
<script>
import $ from "jquery";
import line from "./../assets/kline/line.js";
export default {
  data() {
    return {
      daterange: "",
      region: "",
    };
  },
  created() {},
  components: {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(function () {
        line.line();
      }, 2000);
    });
  },
  methods: {
    onSubmit() {},
  },
};
</script>
<style scoped lang="scss">
.lineChart {
  height: 60vh;
}
</style>
