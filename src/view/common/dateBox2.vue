<template>
  <div class="dateBox">
    <div class="main_box">
      <swiper :options="swiperTopOptions" ref="swiperSection" class="section_swiper">
        <swiper-slide class="swiper-slide" v-for="(item, index) in data_list" :key="index">
          <div class="dato">
            <b>
              {{ item.date }}
            </b>
          </div>

          <section class="box">
            <div class="flex-c">
              <h3 class="flex-item">
                {{ item.name }}
              </h3>
              <span class="lj"> 累计涨跌幅： {{ item.markup }} </span>
            </div>

            <h5>
              {{ item.tip }}
            </h5>
            <ul>
              <li v-for="(item, index) in item.array" :key="index">
                <button>
                  {{ item.time }}
                </button>
                <a>{{ item.name }}</a>
              </li>
            </ul>
            <div class="flex-c">
              <span class="flex-item">补一个折线图工具(主要展示开始涨跌幅走势)</span>
              <span class="r_box">更多</span>
            </div>
          </section>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  //每个月的大涨的版块，和估计下一个大涨的版块
  import dateData from "../../assets/json/index/datebox2.json";
  import "swiper/swiper-bundle.css";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  export default {
    data() {
      return {
        swiperTopOptions: {
          spaceBetween: 0,
          // initialSlide: 0, //设置页面的起始页
          slidesPerView: "auto",
          observer: true,
          observeParents: true,
          // 滑动速度
          speed: 2000,
          // 显示分页
          lazyLoading: true,
        },
        data_list: [],
      };
    },
    components: {
      swiper,
      swiperSlide,
    },
    created() {
      this.data_list = dateData.list;
    },
    methods: {},
  };
</script>
<style lang="scss">
  .dateBox {
    background-color: #4c5351;
    position: relative;
    padding: 10px 15px;
    overflow: hidden;
    border: 4px solid #333333;
    margin-left: 20px;

    .section_swiper {
      .swiper-slide {
        width: 50%;
        padding-right: 30px;

        .box {
          padding: 10px;
          color: #fff;
          background: #ea5454;
          min-height: 100px;
          border: 4px solid #333333;

          .r_box {
            width: 30px;
            height: 30px;
            border-radius: 20px;
            margin-right: 10px;
            background-color: #333333;
            line-height: 30px;
            vertical-align: middle;
            text-align: center;
            font-weight: 600;
            letter-spacing: 1px;
          }

          h3 {
            font-size: 20px;
          }

          h5 {
            color: #ffeb3b;
            margin: 5px 0px 0px 0px;
          }

          pre {
            margin: 0px;
          }

          .lj {
            background-color: #ffc107;
            color: black;
            font-weight: 600;
            padding: 0px 5px;
          }

          ul {
            height: 160px;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            width: 112%;
            margin-left: -6%;
            margin-bottom: -5px;
            background-color: #ffffff38;
            padding: 5px 5px;
            border-bottom: 10px solid #ffffff00;
            border: 2px solid #333;

            li {
              border-bottom: 2px solid #000000;
              padding-bottom: 5px;

              button {
                background-color: #333;
                color: #fff;
                display: block;
                border-radius: 0px;
                padding: 2px 5px;
                margin-bottom: 5px;
              }

              a {
                color: black;
                font-weight: 600;
                letter-spacing: 1px;
              }

              margin-bottom: 10px;
            }
          }
        }

        ul::-webkit-scrollbar {
          width: 6px; //对垂直方向滚动条
          height: 6px; //对水平方向滚动条
        }

        //滚动的滑块
        ul::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background-color: #333 //滚动条的颜色;
        }

        //内层滚动槽
        ul::-webkit-scrollbar-track-piece {
          background-color: #ccc;
        }

        .dato {
          margin-bottom: 10px;
          color: #4c5351;
          width: 45px;
          border: 2px solid white;
          border-radius: 50px;
          height: 45px;
          padding: 2px;
          background-color: #ffc107;
          z-index: 1;
          text-align: center;

          b {
            line-height: 15px;
            font-weight: 600;
            height: 40px;
            width: 40px;
            top: 8px;
            left: 2px;
            position: absolute;
            transform: scale(0.9);
            font-size: 16px;
          }
        }

        .dato::after {
          content: "";
          width: 100%;
          height: 2px;
          border-radius: 5px;
          position: absolute;
          top: 21px;
          left: 0px;
          background-color: #f8f8f8;
          z-index: -1;
        }
      }

      .swiper-slide:nth-of-type(1) {
        .box {
          background: #e9e9e9;
          color: #333333;
        }

        .dato {
          width: 30px;
          height: 30px;
          margin-bottom: 18px;
          margin-top: 7px;

          b {
            transform: scale(1);
            left: -5px;
            top: -4px;
          }
        }
      }

      .swiper-slide:nth-of-type(2) {
        .dato {}
      }
    }
  }
</style>
