<template>
  <div class="index_main4">
    <nav>
      <swiper :options="swiperOption1" ref="mySwiper" class="mySwiper1">
        <!-- slides -->
        <swiper-slide>
          <div class="item">
            <h4>复苏</h4>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item">
            <h4>过热</h4>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item">
            <h4>滞胀</h4>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item">
            <h4>衰退</h4>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-prev1" slot="button-prev">
          <
        </div>
        <div class="swiper-button-next swiper-button-next1" slot="button-next">
          >
        </div>
      </swiper>

      <button class="more_btn" @click="toMore()">
        查看更多-对比更多的经济数据(macroview)
      </button>
    </nav>
    <!-- <Collapse></Collapse> -->
  </div>
</template>
<script>
import "swiper/swiper-bundle.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption1: {
        slidesPerView: 4,
        prevButton: ".swiper-button-prev", //上一张
        nextButton: ".swiper-button-next", //下一张
      },

      activeNames: [],
    };
  },
  components: {
    swiper,
    swiperSlide,
    speed: () => import("./speed.vue"),
    Collapse: () => import("./Collapse.vue"),
  },
  created() {},
  mounted() {},
  methods: {
    toMore() {
      window.open("https://www.macroview.club/data");
    },
  },
};
</script>
<style scoped lang="scss">
.index_main4 {
  nav {
    padding: 10px 0px;
    background-color: #fff6f7;
    text-align: center;
    margin: 0 auto;
  }

  .more_btn {
    position: absolute;
    right: 10%;
    border: 1px solid #f44336;
    padding: 5px 10px;
  }

  .mySwiper1 {
    width: 400px;
    position: relative;
    display: inline-block;
    padding: 0px 30px;

    .swiper-button-prev1 {
      position: absolute;
      top: 50%;
      left: 10px;
      right: auto;
      display: inline-block;
      height: 40px;
      width: 20px;
      background-color: white;
      font-size: 18px;
      color: #333333;
      text-align: center;
      font-weight: 600;
      line-height: inherit;
      display: flex;
    }

    .item {
      text-align: center;

      padding: 5px 0px;
      margin: 0px 10px;
      background-color: #b4b0a8;
    }

    .swiper-slide-active {
      .item {
        background-color: #f44336;
        color: white;
      }
    }

    .swiper-button-next1 {
      position: absolute;
      top: 50%;
      right: 10px;
      left: auto;
      display: inline-block;
      height: 40px;
      width: 20px;
      background-color: white;
      font-size: 18px;
      color: #333333;
      text-align: center;
      font-weight: 600;
      line-height: inherit;
      display: flex;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      content: "";
    }
  }
}
</style>
