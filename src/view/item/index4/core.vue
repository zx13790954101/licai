<template>
  <div class="core">
    -->
    <section class="flex-c">
      <!-- <div class="content">
        <h4>美联储加息</h4>
        <a target="_blank" :href="href1">
          美联储哈克：预计美联储6月和7月会议将各加息50个基点</a
        >
        <b>预期新的事</b>
      </div> -->
      <div class="right">
        <postion></postion>
      </div>
    </section>

    <!-- <section class="flex-c bottom">
      <div class="left">
        <ul>
          <li class="flex-c" v-for="(item, index) in msg_list" :key="index">
            <span class="flex-item" @click="toBtn(item.url)">
              {{ item.title }}</span
            >
          </li>
        </ul>
      </div>
    </section> -->
    <!-- <section class="flex-c bottom">
      <mogulPosition :name="'1'"></mogulPosition>
    </section> -->
  </div>
</template>
<script>
//世界各地版块情况
export default {
  data() {
    return {
      href1: "https://www.cls.cn/detail/1018564",
      msg_list: [
        {
          title: "英为财情（财经资讯头条 ）",
          url: "https://cn.investing.com/news/most-popular-news",
        },
        {
          title: "英为财情（股票股市资讯 ）",
          url: "https://cn.investing.com/news/stock-market-news",
        },
        {
          title: "英为财情（外汇新闻）",
          url: "https://cn.investing.com/news/forex-news",
        },
        {
          title: "老虎社区(美股社区)",
          url: "https://www.laohu8.com/",
        },
      ],
    };
  },
  components: {
    postion: () => import("./postion.vue"),
    mogulPosition: () => import("./mogulPosition.vue"),
  },
  created() {},
  mounted() {},
  methods: {
    openDialog() {},
    toBtn(url) {
      window.open(url);
      
    },
  },
};
</script>
<style scoped lang="scss">
.core {
  h3 {
    color: white;
    font-size: 16px;
    width: 100%;
    margin: 0px 0px 10px 0px;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    ul {
      padding: 10px 10px;
      min-height: 100px;
      width: 100%;

      li {
        font-size: 14px;
        font-weight: 600;
        background-color: white;
        margin-bottom: 10px;
        padding: 5px;
        border-left: 8px solid #ff0000;
      }
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    span {
    }

    .content1 {
    }
  }

  .bottom {
    margin-top: 25px;
    width: 100%;

    li:hover {
      color: blue;
    }
  }

  .content {
    padding: 10px;
    height: 130px;
    width: 130px;
    border-radius: 70px;
    background-color: red;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    flex-wrap: wrap;
    position: relative;

    a {
      color: white;
    }

    b {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      position: absolute;
      z-index: 1;
      right: -0px;
      bottom: -15px;
      display: flex;
      background-color: #e91e63;
      align-content: center;
      justify-content: center;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>
