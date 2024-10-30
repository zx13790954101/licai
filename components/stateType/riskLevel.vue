<template>
  <div class="riskLevel">
    <section>
      <h3>日期月份预测:</h3>
      <ul>
        <li
          v-for="(item, index) in dataList"
          :key="index"
          class="flex-c"
          :class="item.active == index ? 'active' : ''"
        >
          <span class="l-span"> {{ item.title }} </span>
          <span class="c-span">
            {{ item.tip }}
          </span>
          <span class="r-span">{{ item.propose }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          title: "4月份",
          tip: "不建议买入",
          propose: "（过去大跌概率90%，小跌10%）",
          active: 0,
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
.riskLevel {
  position: relative;
  background-color: white;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 #0000001a;
  margin: 0px 10px;
  h3 {
    word-break: keep-all;
    margin-bottom: 10px;
  }
  section {
    padding: 10px;
    background-color: wheat;
  }
  ul {
    li {
      background-color: white;
      padding: 8px 10px;
      border-radius: 10px;
      flex: 1;
      span {
        word-break: keep-all;
      }

      .l-span {
        margin-right: 20px;
        padding: 3px 5px;
      }
      .r-span {
        flex: 1;
      }
    }
    li.active {
      flex: 1;

      .l-span {
        color: white;
        background-color: red;
        border-radius: 10px;
      }
    }
  }
}
</style>
