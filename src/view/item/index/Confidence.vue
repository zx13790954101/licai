<template>
  <div class="Confidence">
    <nav class="flex-c">
      <span class="flex-item"> </span>
      <span @click="more"> 更多 </span>
    </nav>
  </div>
</template>
<script>
//信心面
export default {
  data() {
    return {
      active_num: 0,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    more() {},
  },
};
</script>
<style lang="scss">
.Confidence {
  .el-card__body {
    padding: 10px;
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #ffffff00;
}
</style>
<style scoped lang="scss">
.Confidence {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  nav {
    padding: 0px 0px 10px 0px;
  }

  .box1 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    margin-right: 20px;
    padding-right: 10px;
    min-width: 200px;
    padding-left: 20px;
  }
  h4 {
    font-size: 12px;
  }

  p {
    font-size: 12px;
  }
  .box2 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    background-color: #242323;
    padding: 10px 10px;
    a {
      color: white;
    }
  }
}
</style>
