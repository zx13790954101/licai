<template>
  <div class="tableList">
    <el-table
      :data="dataList"
      class="table-box"
      style="width: 100%"
      :stripe="type"
      :border="type"
      height="120"
    >
      <el-table-column prop="f12" label="年份"> </el-table-column>
      <el-table-column prop="f12" label="1月份"> </el-table-column>
      <el-table-column prop="f12" label="2月份"> </el-table-column>
      <el-table-column prop="f12" label="3月份"> </el-table-column>
      <el-table-column prop="f12" label="4月份"> </el-table-column>
      <el-table-column prop="f12" label="5月份"> </el-table-column>
      <el-table-column prop="f12" label="6月份"> </el-table-column>
      <el-table-column prop="f12" label="7月份"> </el-table-column>
      <el-table-column prop="f12" label="8月份"> </el-table-column>
      <el-table-column prop="f12" label="9月份"> </el-table-column>
      <el-table-column prop="f12" label="10月份"> </el-table-column>
      <el-table-column prop="f12" label="11月份"> </el-table-column>
      <el-table-column prop="f12" label="12月份"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
//信息列表页
import { getAjax } from "../../assets/common.js";
export default {
  data() {
    return {
      name: "",
      type: true,
      tableData: [],
    };
  },
  created() {
    var that = this;
    let url;
  },
  props: { dataList: Array },
  mounted() {
    let item1 = [];
    let time1 = null;
    let array1 = [];
    console.log("data", this.dataList);
    // this.dataList.time.forEach((element, index) => {
    //   if (time1 == element.slice(0, 4)) {
    //     item1.push(this.dataList.num[index]);
    //   } else {
    //     array1.push({
    //       name: time1,
    //       array: item1,
    //     });

    //     item1 = [];
    //     time1 = null;
    //     time1 = element.slice(0, 4);
    //     item1.push(this.dataList.num[index]);
    //   }
    // });
    console.log("data", array1);
  },
  methods: {},
};
</script>
<style lang="scss">
.tableList {
  margin-top: 0px;
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
    padding: 5px 0px;
  }
  .el-table td.el-table__cell div {
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
  .el-table .el-table__cell {
    padding: 5px 0px;
  }
  .el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    color: #333333;
  }
  .head {
    margin-bottom: 10px;
    border-bottom: 1px solid #051125;
    padding-bottom: 5px;
    span {
      border-right: 2px solid #051125;
    }
  }
  button {
    padding: 2px 8px;
    border: 0px solid #333333;

    margin-right: 10px;
    border-radius: 0px;
    vertical-align: text-top;
  }
}
</style>
