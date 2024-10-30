<template>
  <div class="swiper-container headerNav headnav-swiper">
    <ul class="swiper-wrapper">
      <li class="swiper-slide" v-for="(item, index) in data_array" :key="index">
        <dl>
          <dt>{{ item.name }}</dt>
          <dd v-for="(item1, index1) in item.item_array" :key="index1">
            {{ item1 }}
          </dd>
        </dl>
      </li>
    </ul>
    <div class="swiper-button-prev1"><</div>
    <div class="swiper-button-next1">></div>
  </div>
</template>
<script>
import $ from "jquery";
import "swiper/swiper-bundle.css";
import Swiper from "swiper";
export default {
  data() {
    return {
      data_array: [
        {
          name: "煤炭版块",
          item_array: ["因为什么事情"],
        },
        {
          name: "煤炭版块",
          item_array: ["因为什么事情"],
        },
        {
          name: "煤炭版块",
          item_array: ["因为什么事情"],
        },
        {
          name: "煤炭版块",
          item_array: ["因为什么事情"],
        },
      ],
    };
  },
  created() {},
  mounted() {
    var swiper = new Swiper(".headnav-swiper", {
      roundLengths: true,
      speed: 2500,
      slidesPerView: 4,
      freeMode: true,
      navigation: {
        nextEl: ".headerNav .swiper-button-next1",
        prevEl: ".headerNav .swiper-button-prev1",
      },
    });
    // 跳转到最后一个
    //   swiper.slideTo(i, 1000, false);
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.headerNav {
  position: relative;
  width: 70%;
  padding: 0px 40px;
  li {
    padding: 0px 10px;
  }
  dl {
    background-color: #444444;
    padding: 5px;
    margin: 0 15%;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    dt {
      font-size: 13px;
      font-weight: 600;
      margin-right: 5px;
    }
  }
  .swiper-button-prev1 {
    position: absolute;
    top: 20%;
    left: 10px;
    right: auto;
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: white;
    font-size: 12px;
    color: #333333;
    text-align: center;
    font-weight: 6000;
  }

  .swiper-button-next1 {
    position: absolute;
    top: 20%;
    right: 10px;
    left: auto;
    display: inline-block;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: white;
    font-size: 12px;
    color: #333333;
    text-align: center;
    font-weight: 6000;
  }
}
</style>
