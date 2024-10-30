<template>
  <div class="funData"></div>
</template>
<script>
export default {
  data() {
    return {
      datalist1: null,
    };
  },
  computed: {},
  created() {},
  props: {
    value: Boolean,
    name: String,
    timeData: Array,
    markLine: Array,
    datalist: Array,
  },
  components: {},
  mounted() {},
  methods: {
    initData() {},
    switchData(type) {
      switch (type) {
        //保险
        case 1:
          break;
        //白酒
        case 4:
          break;

        default:
          break;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.funData {
}
</style>
