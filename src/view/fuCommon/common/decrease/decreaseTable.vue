<template>
  <!-- 表格显示方式 -->
  <div class="decreaseTable">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="400px"
      :stripe="true"
      :border="true"
      :default-sort="{prop: 'time'}"
    >
      <el-table-column
        prop="time"
        label="日期"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="money"
        label="额度"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="当前数值"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import decreaseTableFun from "./decreaseTable.js"
export default {
  data () {
    return {
      tableData: null
    }
  },
  created () { },
  props: {
    dealFlow: {
      type: Array,
      default: null,
    },
  },
  components: {},
  created () { },
  mounted () {

    decreaseTableFun.dealTable(this.dealFlow, this.$parent.this_kline_data, 1)
    this.tableData = this.dealFlow
  },
  watch: {},
  computed: {},
  methods: {
    formatter (row, column) {
      return row.address
    }
  },
}
</script>

<style lang="scss" scoped>
.decreaseTable {
}
</style>
