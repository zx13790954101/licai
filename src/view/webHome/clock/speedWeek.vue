<template>
  <div class="speedWeek">
    <div class="speed_box">
      <div
        class="item"
        v-for="(item, index) in 7"
        :key="index"
        :class="speed_num > index + 1 ? 'active' : ''"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      speed_num: 0,
      speed_l: 0,

    };
  },
  created() {
    this.getWeekProgressPercentage();
  },
  methods: {
    getWeekProgressPercentage() {
      // 获取今天的日期
      const today = new Date();
      // 获取今天是星期几（星期天为0，星期一为1，...，星期六为6）
      const dayOfWeek = today.getDay();
      let adjustedDayOfWeek = (dayOfWeek || 7) % 7 || 1; // 如果dayOfWeek为0（星期天），则转换为7，然后取模7得到1（星期一）
      this.speed_num = adjustedDayOfWeek - 1;
      // 计算进度百分比
      // 因为一周有7天，所以百分比是 (当前天数 - 1) / 6 * 100%
      const progressPercentage = ((adjustedDayOfWeek - 1) / 6) * 100;

      this.speed_l = Math.round(progressPercentage * 100) / 100;
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.speedWeek {
  height: 50px;
  background-color: wheat;

  border-radius: 20%;
  .speed_box {
    display: flex;
    .item {
      width: 50px;
      height: 50px;
      background-color: #fff;
      border: 1px solid #000000;
    }
    .active {
      width: 50px;
      height: 50px;
      background-color: red;
    }
  }
}
</style>
