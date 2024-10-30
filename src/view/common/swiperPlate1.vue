<template>
  <div class="swiperPlate">

    <div class="time-line-box">
      <div class="swiper-container">
        <ul class="layui-timeline swiper-wrapper">
          <li class="layui-timeline-item swiper-slide"
              v-for="(item,index) in data_array"
              :key='index'>
            <div class="layui-timeline-content layui-text">
              <dl>
                <dt class="layui-timeline-title">{{item.name}}</dt>

                <dd v-for="(item1,index1) in item.item_array"
                    :key='index1'>{{item1}}</dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import $ from 'jquery'
import "swiper/swiper-bundle.css";
import Swiper from 'swiper';
export default {
  data () {
    return {
      data_array: [
        {
          name: '煤炭版块',
          item_array: [
            '因为什么事情'
          ]
        },
        {
          name: '煤炭版块',
          item_array: [
            '因为什么事情'
          ]
        }, {
          name: '煤炭版块',
          item_array: [
            '因为什么事情'
          ]
        }, {
          name: '煤炭版块',
          item_array: [
            '因为什么事情'
          ]
        }
      ]
    };
  },
  created () {

  },
  mounted () {

    var i;
    $(".swiper-container li").each(function (index) {
      i = index + 1;
      if (parseInt($(".layui-timeline").css('padding-top')) <= $(this).find('dl').height() && index % 2 != 0) {
        $(".layui-timeline").css('padding-top', $(this).find('dl').height() + 10);
      };
    });
    var swiper = new Swiper('.swiper-container', {
      roundLengths: true,
      slidesPerView: 'auto',
      freeMode: true
    });
    // 跳转到最后一个
    //   swiper.slideTo(i, 1000, false);
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.swiperPlate {
  background-color: white;
  padding: 0px 0px;
  height: 270px;
}

.swiper-wrapper {
  padding-top: 74px !important;
}
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.time-line-box {
  position: relative;
  transform: scale(0.6);
  margin-top: -30px;
}
.time-line-box ul:after {
  content: "";
  background: url(../../assets/img/line.png) repeat-x left bottom;
  height: 52px;
  width: 1000%;
  position: absolute;
  left: 0;
  z-index: 1;
}
.time-line-box ul li {
  float: left;
  width: 211px;
  position: relative;
  padding-top: 120px;
  padding-bottom: 0;
  padding-left: 0;
  z-index: 2;
}
.time-line-box ul li:after {
  content: "";
  height: 70px;
  border-left: #d3d3d2 2px solid;
  position: absolute;
  top: 52px;
  left: 0;
}
.time-line-box ul li dl {
  padding-left: 25px;
}
.time-line-box ul li dl dt {
  font-size: 20px;
  color: #2da891;
  font-weight: bold;
  position: relative;
  margin-bottom: 5px;
}
.time-line-box ul li dl dt:after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #2da891;
  position: absolute;
  left: -32px;
  top: 0;
  border: #a1d4cc 4px solid;
}
.time-line-box ul li dl dd {
  color: #333;
  font-size: 15px;
  line-height: 1.8;
  padding-left: 15px;
  position: relative;
}
.time-line-box ul li dl dd:after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #2da891;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -3px;
}
.time-line-box ul li:first-child {
  margin-left: 95px;
}
.time-line-box ul li:last-child {
  margin-right: 40px;
}
.time-line-box ul li:nth-child(2n) {
  padding-top: 0;
}
.time-line-box ul li:nth-child(2n):after {
  top: auto;
  bottom: -51px;
  height: 76px;
  z-index: 2;
}
.time-line-box ul li:nth-child(2n) dt:after {
  left: -34px;
}
.time-line-box ul li:nth-child(2n) .layui-text {
  position: absolute;
  left: 0;
  bottom: 0px;
  border-left: #d3d3d2 2px solid;
}
.time-line-box ul .item-this:after {
  border-left: #2da891 2px solid;
}
.time-line-box ul .item-this .layui-text {
  border-left: #2da891 2px solid !important;
}
</style>

