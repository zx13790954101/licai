<template>
  <div class="tableList" v-if="datalist_table2.length > 0">
    <el-table
      :data="datalist_table2"
      class="table-box"
      :cell-style="cellStyle"
      style="width: 100%"
      center
    >
      <el-table-column prop="name" label="年份" center> </el-table-column>

      <el-table-column
        prop="name"
        v-for="(item, index) in 12"
        :key="index"
        :label="index + 1 + '月份'"
        center
      >
        <template #default="{ row }">
          <div v-if="row.array[index]">
            <p
              :class="row.array[index] > 0 ? 'active1' : 'active2'"
              style="float: none"
              v-if="row.all_array == undefined"
            >
              {{ row.array[index] }}%
            </p>

            <ul
              class="flex-c"
              style="float: none"
              v-if="row.all_array != undefined"
            >
              <li v-for="(item, index) in row.all_array[index]" :key="index">
                <h6>{{ item.slice(5, 10) }}</h6>
              </li>
            </ul>
            <ul
              class="flex-c"
              style="float: none"
              v-if="row.all_array != undefined"
            >
              <li v-for="(item, index) in row.all_array2[index]" :key="index">
                <h6 :class="item > 0 ? 'active1' : 'active2'">
                  {{ item }}
                </h6>
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  props: {
    datalist_table2: {
      type: Array,
      default: null,
    },
  },
  components: {},
  mounted() {
    console.log("datalist_table2datalist_table2",this.datalist_table2)
  },
  watch: {},
  methods: {
    //设置指定行、列、具体单元格颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === new Date().getMonth() + 1) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return "background-color:#d1d1d1"; //rgb(105,0,7)
      } else {
        return "";
      }
    },
  },
};
</script>
<style  lang="scss">
.tableList .el-table .cell{
  padding: 0px;
}
</style>
<style scoped lang="scss">
.el-table td.el-table__cell div {
  padding: 0px;
}
.active1 {
  float: right;
  color: red;
}
.tableList {
  width: 100%;
}
.active2 {
  color: green;
}

ul {
  width: 100%;
  li {
    flex: 1;
    border: 1px solid #838383;
    width: 50px;
    text-align: center;
    h6 {
    }
  }
}
</style>
