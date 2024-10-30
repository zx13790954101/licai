<template>
  <div class="summarize">
    <div>
      <section>
        <div>
          <el-form ref="form" label-width="80px">
            <el-form-item label="即时配送">
              <el-radio-group v-model="radio">
                <el-radio border :label="3">备选项</el-radio>
                <el-radio border :label="6">备选项</el-radio>
                <el-radio border :label="9">备选项</el-radio>
              </el-radio-group>
            </el-form-item></el-form
          >
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 3,
    };
  },
  created() {},
  components: {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.summarize {
}
</style>
