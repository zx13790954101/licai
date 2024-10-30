<template>
  <div class="index">
    <!-- <header class="flex-c">
      <headerNav></headerNav>
    </header> -->

    <div class="menu-box">
      <ul>
        <li
          :class="default_active == 1 ? 'active' : ''"
          @click="default_active = 1"
        >
          版块
        </li>
        <li
          :class="default_active == 2 ? 'active' : ''"
          @click="default_active = 2"
        >
          大盘
        </li>
        <li
          :class="default_active == 3 ? 'active' : ''"
          @click="default_active = 3"
        >
          国内
        </li>
        <li
          :class="default_active == 4 ? 'active' : ''"
          @click="default_active = 4"
        >
          全球
        </li>

        <!-- <li @click="toLink">新闻页</li> -->
        <li>
          <el-switch
            v-model="switchType"
            active-color="#13ce66"
            @change="switchBtn()"
            inactive-color="#ff4949"
          >
          </el-switch>
        </li>
      </ul>
    </div>

    <section class="section-item1" v-if="default_active == 1">
      <sectionBox></sectionBox>
    </section>
    <section class="section-item2" v-if="default_active == 2">
      <sectionBox2></sectionBox2>
    </section>
    <section class="section-item2" v-if="default_active == 3">
      <sectionBox3></sectionBox3>
    </section>
    <section class="section-item2" v-if="default_active == 4">
      <sectionBox4></sectionBox4>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      default_active: 2,
      switchType: false,
    };
  },
  created() {
    this.switchType = sessionStorage.getItem("this_view_type") ? true : false;
  },
  components: {
    sectionBox: () => import("./common/sectionBox.vue"),
    sectionBox2: () => import("./common/sectionBox2.vue"),
    sectionBox3: () => import("./common/sectionBox3.vue"),
    sectionBox4: () => import("./common/sectionBox4.vue"),
    headerNav: () => import("./common/headerNav.vue"),
  },
  methods: {
    switchBtn() {
      if (this.switchType == false) {
        sessionStorage.removeItem("this_view_type");
      } else {
        sessionStorage.setItem("this_view_type", 1);
      }
    },
    toLink() {
      let routeData = this.$router.resolve({
        path: "/linkBox",
      });
      window.open(routeData.href, "_blank");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped lang="scss">
.index {
  background-color: #ffffff;
  min-height: 100vh;
  width: 100%;

  .link_btn {
    border-radius: 50px;
    width: 60px;
    height: 60px;
    background-color: #8bc34a;
    color: white;
    position: absolute;
    right: 5%;
    top: -15%;
    border-radius: 10px 10px 20px 0px;
  }

  header {
    height: 40px;
    width: 100%;
    background-color: #272633;
    justify-content: center;
  }

  section {
    padding: 0px 0px;
    min-height: 100px;
    width: 100%;
    overflow: hidden;
  }

  .menu-box {
    position: fixed;
    background-color: #ff9800;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0%;
    width: auto;
    z-index: 100;
    padding: 5px 5px 0px 5px;
    box-shadow: 1px -2px 3px 4px #89898933;
    border-radius: 10px 10px 0px 0px;

    ul {
      display: flex;
      width: auto;
    }

    li {
      padding: 10px 20px;
      margin: 0px 10px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: right;
      color: wheat;
      box-sizing: content-box;
      cursor: pointer;
      letter-spacing: 1px;
    }

    .active {
      background-color: white;
      color: #000000;
      font-size: 18px;
      font-weight: 600;
      border-radius: 20px;
      width: 70px;
      height: 40px;
      padding: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .section-item1 {
  }

  .section-item2 {
  }
}
</style>
