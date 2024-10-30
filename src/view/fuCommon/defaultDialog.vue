<template>
  <el-dialog
    class="defaultDialog"
    v-bind:visible="dislogVisible"
    v-bind:close-on-click-modal="false"
    v-on:close="closeModal"
    width="65%"
  >
    <div class="box">
      <h5>
        {{ name }}
      </h5>
      <ul>
        <li v-for="(item, index) in datalist" :key="index">
          <h6>
            {{ item }}
          </h6>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      datalist1: null,
    };
  },
  computed: {
    dislogVisible: {
      get(val) {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
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
    closeModal() {
      this.$emit("input", false);
    },
  },
};
</script>
<style scoped lang="scss">
.defaultDialog {
}
</style>
