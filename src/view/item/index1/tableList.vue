<template>
  <div class="tableList">
    <div class="flex-c head">
      <el-button>行业个股资金流</el-button>
      <el-button>行业历史资金流</el-button>
    </div>
    <div class="flex-c head">
      <el-button>权重</el-button>
      <el-button>龙头</el-button>
      <el-button>今日涨跌幅榜</el-button>
      <el-button>5日排行</el-button>
      <el-button>10日排行</el-button>
    </div>
    <el-table
      :data="tableData"
      class="table-box"
      style="width: 100%"
      :stripe="type"
      :border="type"
      height="170"
    >
      <el-table-column prop="f12" label="代码"> </el-table-column>
      <el-table-column prop="f14" label="名称"> </el-table-column>
      <el-table-column prop="f2" label="最新价"> </el-table-column>
      <el-table-column prop="f3" label="今日涨跌幅">
        <template #default="{ row }"> {{ row.f3 }}% </template>
      </el-table-column>
      <el-table-column prop="f62" label="今日主力净流入	">
        <template #default="{ row }"> {{ row.f62 }}元 </template>
      </el-table-column>
      <el-table-column prop="f184" label="净占比">
        <template #default="{ row }"> {{ row.f184 }}% </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//信息列表页

import { getBaijiuSection } from "./../../../lib/api/dfcf.js";
export default {
  data() {
    return {
      name: "",
      type: true,
      tableData: [
        {
          code: "000858",
          name: "五 粮 液",
          number: "162.47	",
          range: "5.83%",
          inflow: "16.44亿",
          Proportion: "22.77%	",
        },
        {
          code: "000858",
          name: "五 粮 液",
          number: "162.47	",
          range: "5.83%",
          inflow: "16.44亿",
          Proportion: "22.77%	",
        },
      ],
    };
  },
  created() {
    var that = this;
    getBaijiuSection(function (res) {
      console.log("res", res);
      that.tableData = res;
    });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
.tableList {
  margin-top: 10px;
  .table-box {
  }
  .el-table {
    border: 1px solid #c1d6f7;
  }
  .el-table thead th {
    border-right: 1px solid #c1d6f7;
    border-top: 1px solid #c1d6f7;
    border-bottom: 1px solid #c1d6f7;
    background: #d2e3ff;
    color: #333333;
  }
  .el-table td {
    border-right: 1px solid #c1d6f7;
    border-bottom: 1px solid #c1d6f7;
  }
  .el-table tr {
    background-color: #fff0;
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: #fff0;
    color: #ffffff;
  }
  .el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    color: #333333;
  }
}
</style>
