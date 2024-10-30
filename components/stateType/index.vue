<template>
  <div class="stateType_box">
    <section class="flex-c main">
      <purchase></purchase>
      <proposal></proposal>
      <riskLevel></riskLevel>
      <explain></explain>
    </section>
  </div>
</template>
<script>
import purchase from "./purchase.vue";
import proposal from "./proposal.vue";
import riskLevel from "./riskLevel.vue";
import explain from "../explain/index.vue";
//可以选择组件
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    purchase,
    proposal,
    riskLevel,
    explain,
  },
  //数组规则
  props: {
    dataList: Array,
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.stateType_box {
  .main {
    justify-content: center;
  }
}
</style>
