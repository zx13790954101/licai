<template>
  <div class="purchaseBar">
    <ul class="flex-c">
      <li v-for="(item, index) in dataList" :key="index">
        <h5 :style="{ 'background-color': item.color }">{{ item.title }}</h5>
        <h6>
          {{ item.date }}
        </h6>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          title: "持有",
          date: "2022-03-15",
          position: "50%",
          passTime: "5",
          color: "#e94041",
        },
        {
          title: "买入",
          date: "2022-03-15",
          position: "50%",
          passTime: "5",
          color: "rgba(182 198 204)",
        },
        {
          title: "观望",
          date: "2022-03-15",
          position: "50%",
          passTime: "5",
          color: "rgba(182 198 204)",
        },
        {
          title: "卖出",
          date: "2022-03-15",
          position: "50%",
          passTime: "5",
          color: "rgba(182 198 204)",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.purchaseBar {
  ul {
    li {
      flex: 1;

      border: 1px solid #c3c3c3;
      h5 {
        text-align: center;
        color: white;
        padding: 2px;
      }
      h6 {
        padding: 5px 5px;
      }
    }
  }
}
</style>
