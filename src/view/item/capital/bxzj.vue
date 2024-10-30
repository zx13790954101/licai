<template>
  <div class="bxzj">
    <header class="flex-c">
      <span class="flex-item">
        <b class="l"> 北向资金:-89.26亿 </b>
        <b class="r"> 南向资金:64.29亿 </b>
      </span>
      <button @click="dialogVisible3 = true">更多</button>
    </header>
    <div id="bxzj" class="bxzj_box"></div>
    <el-dialog
      title="列表选择"
      :visible.sync="dialogVisible3"
      width="80%"
      :before-close="handleClose"
      class="dialog3"
    >
      <el-table :data="bxzjjson1" style="width: 100%">
        <el-table-column prop="date" label="时间" width="180">
        </el-table-column>
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
    </el-dialog>
  </div>
</template>
<script>
//https://legulegu.com/stockdata/hu-shen-gang-tong
//网页参考
// import bxzjjson from "../assets/capital/json/bxzj.json";
import { bxzj, bxzjjson } from "./../assets/capital/js/bxzj.js";
export default {
  data() {
    return {
      bxzjjson1: null,
      daterange: "",
      region: "",
      dialogVisible3: false,
    };
  },
  created() {
    this.bxzjjson1 = bxzjjson;
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(function () {
        bxzj();
      }, 1000);
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible3 = false;
    },
    onSubmit() {},
  },
};
</script>
<style scoped lang="scss">
header {
  width: 100%;
  padding: 10px;
  background-color: #fff1d7;
}
button {
  padding: 10px 15px;
}
.l {
  color: #d2524e;
  padding: 0 10px;
  font-size: 18px;
  font-weight: 500;
}
.r {
  color: #00935b;
  padding: 0 10px;
  font-size: 18px;
  font-weight: 500;
}
.bxzj_box {
  width: 800px;
  height: 400px;
}
</style>
