<template>
  <div class="tableList" v-if="datalist_table2.length > 0">
    <el-table
      :data="datalist_table2"
      class="table-box"
      :class="parseInt(type) == 1?'table1':''"
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
        <template #default="{ row }"   :class="row.array[index] > 0 ? 'active1' : 'active2'">
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
    type:null
  },
  components: {},
  mounted() {},
  watch: {},
  methods: {
    //设置指定行、列、具体单元格颜色
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (parseInt(this.type) ==1 ) {
        if (row.array[columnIndex - 1] < 1000) {
          if (row.array[columnIndex - 1] > 0) {
            return "background-color:red" //rgb(105,0,7)
          } else {
            return "background-color:green" //rgb(105,0,7)
          }
        }
      }
    
    

      if (columnIndex === new Date().getMonth() + 1) {
        if (parseInt(row.name) == new Date().getFullYear()) {
        
                    //指定坐标rowIndex ：行，columnIndex ：列
          return "background-color:#d1d1d1" //rgb(105,0,7)
         }
      } else {
        return "";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.el-table td.el-table__cell div {
  padding: 0px;
}
.active1 {
  float: right;
  color: #ffffff;
  background-color:red ;
  text-align: center;
}
.table1  {
   .active1{
    color: #ffffff;
      text-align: center;
      font-weight: 600;
   }
   .active2{
     color: #ffffff;
     font-weight: 600;
      text-align: center;
   }
}
.tableList {
  width: 100%;
}
.active2 {
  color: #ffffff;
  background-color:green ;
  text-align: center;
}
ul {
  width: 100%;
  li {
    flex: 1;
    border: 1px solid #838383;
    width: 50px;
    text-align: center;
    h6 {
      width: 100%;
    }
  }
}
</style>
