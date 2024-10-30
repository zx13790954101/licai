<template>
  <div class="summarize">
    <div class="mask-box"></div>
    <leftText> </leftText>

    <textBox></textBox>
  </div>
</template>
<script>
import leftText from "./leftText.vue";
import textBox from "./textBox.vue";
export default {
  data() {
    return {};
  },
  created() {},
  components: { leftText, textBox },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.summarize {
  .mask-box {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
}
</style>
