<template>
  <div class="szzs" v-if="bxzj_data.length > 0">
    <el-table :data="bxzj_data" style="width: 100%">
      <el-table-column prop="date" label="时间" width="180"> </el-table-column>
      <el-table-column
        prop="northMoney"
        label="北向资金(沪股通+深股通)"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="southMoney" label="南向资金(港股通)">
      </el-table-column>
      <el-table-column prop="difference" label="差额"> </el-table-column>
    </el-table>
    <el-table :data="bxzj_data" style="width: 100%">
      <el-table-column prop="date" label="时间" width="180"> </el-table-column>
      <el-table-column
        prop="northMoney"
        label="北向资金(沪股通+深股通)"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="southMoney" label="南向资金(港股通)">
      </el-table-column>
      <el-table-column prop="difference" label="差额"> </el-table-column>
    </el-table>
    <el-table :data="bxzj_data" style="width: 100%">
      <el-table-column prop="date" label="时间" width="180"> </el-table-column>
      <el-table-column
        prop="northMoney"
        label="北向资金(沪股通+深股通)"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="southMoney" label="南向资金(港股通)">
      </el-table-column>
      <el-table-column prop="difference" label="差额"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bxzj_data: [],
    };
  },
  created() {},
  components: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.szzs {
}
</style>
