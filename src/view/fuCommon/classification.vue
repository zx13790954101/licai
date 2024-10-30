<template>
  <div class="classification">
    <ul>
      <li>
        <div class="title">上涨趋势</div>
        <div class="box">
          <span> 应该怎么卖，卖多少，留多少 </span>
          <span> 应该怎么加，加多少，什么再跑 </span>
        </div>
      </li>
      <li>
        <div class="title">横盘趋势</div>
        <div class="box">
          <span> 设置预估时间要多久 </span>
          <span> 怎么加 </span>
          <span> 需不需要减 </span>
          <span> 横盘一段时间之后需不需要跑 </span>
        </div>
      </li>
      <li>
        <div class="title">下跌趋势</div>
        <div class="box">
          <span> 应该什么时候减仓 </span>
          <span> 什么时候累加 </span>
          <span> 什么时候大加 </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Section from "../section.vue";
  export default {
    data() {
      return {
        active: 1,
      };
    },
    computed: {},
    created() {},
    props: {},
    components: {
      Section
    },
    mounted() {},
    methods: {},
  };
</script>
<style scoped lang="scss">
  .classification {
    background-color: white;
    padding: 10px;
    color: #333333;

    ul {
      width: 100%;
      text-align: center;

      li {
        display: inline-block;
        margin: 1% 0%;

        padding: 10px;

        .title {
          width: 80px;
          height: 80px;
          border-radius: 50px;
          background-color: #7e7e7e;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: 600;
          margin: 0 auto;
        }

        .box {
          border-top: 1px solid;
          margin-top: 10px;

          span {
            width: 70px;
            word-break: revert;
            height: auto;
            line-height: inherit;
            display: inline-block;
            vertical-align: top;
            margin: 0px 5px;
            margin-top: 10px;
            background-color: wheat;
            padding: 5px;
          }
        }
      }
    }
  }
</style>
