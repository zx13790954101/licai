<template>
  <div class="tableBox1">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="pz" fixed="left" label="配置逻辑"
        ><template #default="{ row }">
          <p>
            {{ row.pz }}
          </p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="code" label="代码" style="color: red"
        ><template #default="{ row }">
          <p>
            {{ row.code }}
          </p>
        </template>
      </el-table-column> -->
      <el-table-column prop="name" label="名称">
        <template #default="{ row }">
          <p>
            {{ row.name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="cw" label="仓位">
        <template #default="{ row }">
          <p
            :class="
              row.cw >= 30
                ? row.cw >= 60
                  ? row.cw >= 90
                    ? 'active4'
                    : 'active3'
                  : 'active2'
                : 'active1'
            "
          >
            {{ row.cw }}%
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="yk" label="盈亏"
        ><template #default="{ row }">
          <p :class="row.yk > 0 ? 'red' : 'green'">{{ row.yk }}%</p>
        </template>
      </el-table-column>
      <el-table-column prop="cz" label="操作">
        <template #default="{ row }">
          <!-- <p v-if="row.cz != 0" :class="row.cz > 0 ? 'red' : 'green'">
            {{ row.cz >= 0 ? "加仓" : "减仓" + Math.abs(row.cz) + "%" }}
          </p>
          <p v-if="row.cz == 0">无操作</p> -->
          <p>{{ row.cz }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="cz" label="当前情况">
        <template #default="{ row }">
          <p>{{ row.qk }}</p></template
        >
      </el-table-column>
      <el-table-column prop="cz" label="目的">
        <template #default="{ row }">
          <p>{{ row.md }}</p></template
        >
      </el-table-column>
      <el-table-column prop="cz" label="更多">
        <button>查看更多</button>
        <!--       <button>查看龙头解析</button> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "新能源",
          code: "000000",
          pz: "热点主力",
          cw: 30,
          yk: -5,
          cz: "累加加仓位，根据新闻和情况加",
          md: "保持8万左右的仓位，盈利30%",
          qk: "目前情况可控",
        },
        {
          name: "半导体",
          code: "000000",
          pz: "科技",
          cw: 50,
          yk: -5,
          cz: "保持一万块的仓位，然后等待机会",
          md: "盈利之后慢慢把大部分加回去新能源哪里去",
          qk: "现在亏-5%",
        },
        {
          name: "白酒",
          code: "000000",
          pz: "沪深300",
          cw: 65,
          yk: 2.5,
          cz: 0,
          md: "",
          qk: "",
        },
        {
          name: "保险",
          code: "000000",
          pz: "保守版块",
          cw: 29,
          yk: -5,
          cz: 0,
          md: "",
          qk: "",
        },
        {
          name: "互联网",
          code: "000000",
          pz: "港股",
          cw: 52,
          yk: 40,
          cz: 0,
          md: "",
          qk: "",
        },
        {
          name: "纳斯达克",
          code: "000000",
          pz: "美股",
          cw: 50,
          yk: 3.83,
          cz: 0,
          md: "",
          qk: "",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.tableBox1 {
  margin-top: 5px;

  button {
    border: 1px solid wheat;
    padding: 5px 5px;
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .el-table .el-table__cell {
  }

  p {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .el-table th.el-table__cell {
    background-color: #dbdbdb;

    .cell {
      font-weight: 600;
      color: black;
    }
  }

  .active1 {
  }

  .active2 {
    color: #9d5651;
  }

  .active3 {
    color: #f17c73;
  }

  .active4 {
    color: #ff1100;
  }
}
</style>
