<template>
  <div class="main">
    <headNav></headNav>

    <section class="left_bar_content" :class="type_bar == true ? ' ' : 'active'">
      <div class="box">
        <div class="top_title" @click="type_bar = !type_bar">
          <el-button icon="el-icon-right" v-if="type_bar"></el-button>
          <el-button icon="el-icon-back" v-else></el-button>
        </div>
      </div>

    </section>
    <section class="head_top " :class="type_bar == true ? ' ' : 'active'">
      <currentbox class="flex-item"></currentbox>
      <!-- <msg></msg> -->
      <lunarFullCalendar></lunarFullCalendar>
    </section>
    <section class="bottom_c flex-c" :class="type_bar == true ? ' ' : 'active'">
      <merrillClock class="flex-item"></merrillClock>
      <macroscopicData></macroscopicData>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type_bar: false,
    }
  },
  created () {
  },
  components: {
    currentbox: () => import('./currentBox.vue'),
    lunarFullCalendar: () => import('./lunarFullCalendar.vue'),
    macroscopicData: () => import('./common/macroscopicData.vue'),
    merrillClock: () => import('./common/merrillClock.vue'),
    headNav: () => import('./common/headNav.vue'),
    msg: () => import('./common/msg.vue'),
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.main {
  min-width: 1500px;
  background-color: #353a47;
  padding: 100px 60px 100px 120px;

  .head_top {
    display: flex;
  }

  .bottom_c {
    align-items: unset;
    display: flex;
  }

  .head_top.active,
  .bottom_c.active {
    margin-left: 50px;
  }
}

.left_bar_content {
  position: fixed;
  left: 0px;
  top: 50px;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;

  .box {
    box-shadow: 4px 1px 6px 0px #474662;
    height: 100vh;
    width: 600px;
    background-color: white;
  }
}

.left_bar_content.active {
  background-color: rgba(0, 0, 0, 0);
  width: 200px;

  .box {
    height: 100vh;
    width: 200px;
  }
}
</style>