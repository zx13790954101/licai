<template>
  <div class="dateBox">
    <el-steps direction="vertical" :space="20" :active="7">
      <el-step
        v-for="(item, index) in data_list"
        :key="index"
        :title="item.name"
      >
        <template slot="description">
          <article class="flex-c">
            <div class="main">
              <h4 v-for="(item2, index2) in item.item_list" :key="index2">
                {{ item2.title }}
              </h4>
            </div>
            <div class="main_r">
              <h5 v-for="(item2, index2) in item.section" :key="index2">
                {{ item2.title }}
              </h5>
            </div>
          </article>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>
<script>
import dateData from "./assets/date.json";
export default {
  data() {
    return {
      data_list: [],
    };
  },
  created() {
    this.data_list = dateData.list;
  },
  methods: {},
};
</script>
<style lang="scss">
.dateBox {
  .el-step__title.is-finish {
    color: #303133;
  }
  .el-step__head.is-finish {
    color: #303133;
    border-color: #303133;
  }

  .el-step__head.is-process {
    color: #ff5a00;
    border-color: #ff5a00;
  }
}
</style>
<style scoped lang="scss">
.dateBox {
  padding: 20px;
  min-width: 350px;
  min-height: 100vh;
  background-color: white;
  margin-right: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  .main {
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    padding: 5px 5px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
}
</style>
