<template>
  <div class="swiperPlate">
    <div class="swiper-container">
      <ul class="swiper-wrapper">
        <li
          class="swiper-slide"
          v-for="(item, index) in data_array"
          :key="index"
        >
          <div class="item" :class="(index + 1) % 2 === 0 ? 'item1' : 'item2'">
            <dl>
              <dt class="title">{{ item.name }}</dt>
              <dd v-for="(item1, index1) in item.item_array" :key="index1">
                {{ item1 }}
              </dd>
            </dl>
          </div>
          <div class="bar">
            <span v-for="(item, index) in 10" :key="index"></span>
          </div>
        </li>
      </ul>
    </div>
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
    var swiper = new Swiper(".swiper-container", {
      roundLengths: true,
      slidesPerView: "auto",
      freeMode: true,
    });
    // 跳转到最后一个
    //   swiper.slideTo(i, 1000, false);
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.swiperPlate {
  .el-card__body {
    padding: 5px 0px;
  }
  .swiper-slide {
    width: 15%;
    position: relative;
  }
  .bar {
    display: flex;
    width: 100%;
    position: absolute;
    top: 44%;
    left: 2px;
    span {
      height: 7px;
      border-right: 2px solid #333333;
      width: 100%;
      flex: 1;
    }
    span:nth-of-type(5) {
      height: 12px;
      position: relative;
      margin-top: -6px;
    }
  }
  .item {
    dl {
      display: flex;
      flex-wrap: wrap;
      word-break: normal;
      align-items: end;
      height: 70px;
      border-left: 2px solid #333333;
      font-size: 0px;
      flex-direction: row;
      align-content: flex-start;
      padding-left: 10px;
      dd {
        width: 100%;
        font-size: 12px;
      }
      dt {
        font-size: 14px;
      }
    }

    dl::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 7px;
      border: 2px solid #ffab0e;
      position: absolute;
      left: -5px;
      top: -2px;
      background-color: #ff5722;
    }
  }
  .item1 {
    border-top: 2px solid #333333;
    height: 70px;
    margin-top: 68px;
    dl {
      align-content: flex-end;
    }
    dl::after {
      left: -4px;
      bottom: -2px;
      top: auto;
    }
  }
  .item2 {
    height: 70px;
    border-bottom: 2px solid #333333;
    margin-bottom: 70px;
    dl {
    }
  }
}
</style>
