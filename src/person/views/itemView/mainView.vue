<template>
  <div class="mainView"> <el-card class="box-card">
      <section class="top_view">
        <marketReport></marketReport>
        <el-collapse accordion >
          <el-collapse-item>
            <template slot="title">
              我的标题
            </template>
          </el-collapse-item>
        </el-collapse>
      </section>
      <section class="bottom_view">
        <personReport></personReport>
        <el-collapse accordion >
          <el-collapse-item>
            <template slot="title">
              我的标题
            </template>
          </el-collapse-item>
        </el-collapse>
      </section>
    </el-card>
  </div>
</template>
<script>
import marketReport from "./marketReport.vue";
import personReport from "./personReport.vue";
export default {
  data() {
    return {
      percentage: 10,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    };
  },
  created() { },
  mounted() {

  },
  components: {
    marketReport,
    personReport
  },
  methods: {},
};

</script>
<style  lang="scss">
.mainView {
  padding: 20px;
  background-color: #ecf0f1;
  .el-collapse-item__header {
  background-color: #ffeb3b;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
}
</style>
