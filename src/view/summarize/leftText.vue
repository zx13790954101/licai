<template>
  <div class="leftText">
    <formBox> </formBox>
  </div>
</template>
<script>
import formBox from "./formBox.vue";
export default {
  data() {
    return {};
  },
  created() {},
  components: { formBox },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.leftText {
}
</style>
