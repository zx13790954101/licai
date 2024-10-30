<template>
  <div class="typeOfState">
    <section class="active1">
      <p>上涨通道</p>
      <div class="box1"></div>
    </section>
    <section class="active2">
      <p>下跌通道(下跌超过幅度需要计算XXXX)</p>
      <div class="box1">
        <div class="item">
          <h5>买入注意</h5>
          <span> 设置止损跌幅 </span>
        </div>

        <div class="item">
          <h5>卖出注意</h5>
          <span> 注意别人也是在亏损中， 所以才有时间要短 </span>
          <span> 建议持有时间：（计算才有时间） </span>
          <span> 止盈位置计算（尽量低于预估位置，亏损也要止盈） </span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Section from "../../section.vue";
export default {
  data() {
    return {};
  },
  created() {},
  props: {
    this_type: {
      type: Number,
      default: 0,
    },
  },
  components: { Section },
  mounted() {},
  watch: {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
