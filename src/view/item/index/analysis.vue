<template>
  <div class="analysis">
    <!-- <h2>因子评分参数</h2> -->
    <div class="flex-c">
      <div class="l-box">
        <el-menu
          :default-active="active_num.toString()"
          class="el-menu-vertical-demo"
          mode="vertical"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, index) in this_data.btn_array"
            :key="index"
            @click="move1(index)"
            :index="index.toString()"
            >{{ item.name }}<span>{{ item.tip }}</span>

            <!-- <b>{{ index }}</b> -->
          </el-menu-item>
        </el-menu>
      </div>

      <template>
        <section class="r-box">
          <PolicyAspect v-if="active_num == '0'"></PolicyAspect>

          <MessageSide v-else-if="active_num == '1'"></MessageSide>
          <CapitalSide v-else-if="active_num == '2'"> </CapitalSide>
          <Confidence v-else-if="active_num == '3'"></Confidence>
          <KlineDiagram v-else-if="active_num == '4'"></KlineDiagram>
          <!-- <li v-for="(item, index) in content[active_num]" :key="index">
            <h4>
              {{ item.title }}
            </h4>
            <a :href="item.href">{{ item.name }}</a>
          </li> -->
        </section>
      </template>
    </div>
    <el-dialog
      title="列表选择"
      :visible.sync="dialogVisible3"
      width="40%"
      :before-close="handleClose"
      class="dialog3"
    >
      <dialog3 v-model="dialogVisible3"></dialog3>
    </el-dialog>
    <!-- <dialog3 v-model="dialogVisible3"></dialog3> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible3: false,
      this_data: {
        btn_array: [
          {
            name: "政策面",
            tip: "无注册政策",
            id: 1,
          },
          {
            name: "消息面",
            tip: "无注册政策",
            id: 2,
          },
          {
            name: "资金面",
            tip: "无注册政策",
            id: 3,
          },
          {
            name: "信心面",
            tip: "无注册政策",
            id: 4,
          },
          {
            name: "K线图走势",
            tip: "无注册政策",
            id: 5,
          },
        ],
      },
      active_num: "0",
      content: [
        [
          {
            name: "",
            title: "",
            href: "",
          },
        ],
      ],
    };
  },
  created() {},
  mounted() {},
  components: {
    PolicyAspect: () => import("./PolicyAspect.vue"),
    CapitalSide: () => import("./CapitalSide.vue"),
    Confidence: () => import("./Confidence.vue"),
    KlineDiagram: () => import("./KlineDiagram.vue"),
    MessageSide: () => import("./MessageSide.vue"),
    dialog3: () => import("../dialog/dialog3.vue"),
  },
  methods: {
    handleClose() {
      this.dialogVisible3 = false;
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    move1(num) {
      //  console.log(num);
      this.active_num = num;
    },
  },
};
</script>
<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 0px;
  margin-top: 10px;
  display: block;
}
.analysis {
  padding: 20px 20px;
  box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.1);
  background-color: #353a47;
  border: 2px solid #ffffff;
  flex-wrap: wrap;
  h2 {
    display: block;
    position: relative;
    margin: -10px 0px 15px 0px;
  }
  pre {
    height: 150px;
  }
  .el-menu {
    border-width: 0px;
    border-right: solid 2px #ffffff;
    background-color: #353a47;
    padding: 5px 0px;
  }
  .l-box {
    .el-menu-item {
      line-height: initial;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-items: center;
      font-weight: 600;
      color: #ffffff;
      padding-left: 30px;
      span {
        width: 100%;
        font-weight: 500;
        display: block;
        font-size: 12px;
        color: #ffffff;
        margin-top: 2px;
      }
      b {
        position: absolute;
        padding: 5px;
        border: 2px solid #e33e33;
        color: #e33e33;
        border-radius: 30px;
        height: 30px;
        width: 30px;
        text-align: center;
        top: 20%;
        transform: rotate(15deg);
        left: 5px;
      }
    }
    .el-menu-item.is-active {
      padding-left: 20px;
      border: 2px solid #ffffff;
      border-right: 2px solid #353a47;
      margin-right: -2px;
      z-index: 2;
      position: relative;
      color: #ff3050;
    }
    .el-menu-item.is-active::after {
      content: "";
      width: 5px;
      height: 80%;
      position: absolute;
      left: -2px;
      top: 10%;
      background-color: #ff3050;
      z-index: 12;
    }
  }
  .r-box {
    width: 100%;
    min-height: 300px;
    height: 100%;
  }
}
</style>
