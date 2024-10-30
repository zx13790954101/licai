<template>
  <div class="tableBox1">
    <el-table :data="tableData" stripe style="width: 100%; background: #100c2a">
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
      <!-- <el-table-column prop="cz" label="操作">
        <template #default="{ row }">
          <p v-if="row.cz != 0" :class="row.cz > 0 ? 'red' : 'green'">
            {{ row.cz >= 0 ? "加仓" : "减仓" + Math.abs(row.cz) + "%" }}
          </p>
          <p v-if="row.cz == 0">无操作</p>
        </template>
      </el-table-column> -->
      <el-table-column prop="cz" label="持有时间">
        <p>目的</p>
      </el-table-column>
      <!-- <el-table-column prop="cz" label="目的">
        <p>目的</p>
      </el-table-column> -->
      <el-table-column prop="type" label="目前情况">
        <template #default="{ row }">
          <el-button v-if="row.type == 0">安然无恙</el-button>
          <el-button type="danger" v-if="row.type == 1">抢救中</el-button>
          <el-button type="warning" v-if="row.type == 2">康复中</el-button>
          <el-button type="primary" v-if="row.type == 3">出院</el-button>
          <el-button type="success" v-if="row.type == 4">生龙活虎</el-button>
        </template>
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
          name: "光伏",
          code: "000000",
          pz: "亏钱多走势坏",
          cw: 50,
          yk: 3.83,
          cz: 0,
          type: 1,
        },
        {
          name: "白酒",
          code: "000000",
          pz: "最近赚钱",
          cw: 65,
          yk: 2.5,
          cz: 0,
          type: 0,
        },
        {
          name: "黄金",
          code: "000000",
          pz: "避险板块",
          cw: 29,
          yk: -5,
          cz: 0,
          type: 2,
        },
        {
          name: "纳斯达克",
          code: "000000",
          pz: "稳定赚钱",
          cw: 50,
          yk: 3.83,
          cz: 0,
          type: 4,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.tableBox1 {
  margin-top: 0px;

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
