<template>
  <div class="index">

    <div class="clock">

      <!-- 12个小时的点位 -->
      <div class="dotH dotH1">
        <div></div>
      </div>
      <div class="dotH dotH2">
        <div></div>
      </div>
      <div class="dotH dotH3">
        <div></div>
      </div>
      <div class="dotH dotH4">
        <div></div>
      </div>
      <div class="dotH dotH5">
        <div></div>
      </div>
      <div class="dotH dotH6">
        <div></div>
      </div>

      <!-- 60个分的点 -->
      <div class="dotM dotM1">
        <div></div>
      </div>
      <div class="dotM dotM2">
        <div></div>
      </div>
      <div class="dotM dotM3">
        <div></div>
      </div>
      <div class="dotM dotM4">
        <div></div>
      </div>
      <div class="dotM dotM5">
        <div></div>
      </div>
      <div class="dotM dotM6">
        <div></div>
      </div>
      <div class="dotM dotM7">
        <div></div>
      </div>
      <div class="dotM dotM8">
        <div></div>
      </div>
      <div class="dotM dotM9">
        <div></div>
      </div>
      <div class="dotM dotM10">
        <div></div>
      </div>
      <div class="dotM dotM11">
        <div></div>
      </div>
      <div class="dotM dotM12">
        <div></div>
      </div>
      <div class="dotM dotM13">
        <div></div>
      </div>
      <div class="dotM dotM14">
        <div></div>
      </div>
      <div class="dotM dotM15">
        <div></div>
      </div>
      <div class="dotM dotM16">
        <div></div>
      </div>
      <div class="dotM dotM17">
        <div></div>
      </div>
      <div class="dotM dotM18">
        <div></div>
      </div>
      <div class="dotM dotM19">
        <div></div>
      </div>
      <div class="dotM dotM20">
        <div></div>
      </div>
      <div class="dotM dotM21">
        <div></div>
      </div>
      <div class="dotM dotM22">
        <div></div>
      </div>
      <div class="dotM dotM23">
        <div></div>
      </div>
      <div class="dotM dotM24">
        <div></div>
      </div>

      <!-- 数字 -->
      <div class="num num1_7">
        <div>1</div>
        <div>7</div>
      </div>
      <div class="num num2_8">
        <div>2</div>
        <div>8</div>
      </div>
      <div class="num num3_9">
        <div>3</div>
        <div>9</div>
      </div>
      <div class="num num4_10">
        <div>4</div>
        <div>10</div>
      </div>
      <div class="num num5_11">
        <div>5</div>
        <div>11</div>
      </div>
      <div class="num num6_12">
        <div>6</div>
        <div>12</div>
      </div>

      <!-- 表盘圆心 -->
      <div class="circle">
        <div></div>
      </div>

      <!-- 数字年月日 周 -->
      <div class="num-date" id="numDate"></div>
      <!-- 数字时间（时:分:秒） -->
      <div class="num-time">
        <span id="numHH">17</span>
        <span id="numMM">45</span>
        <span id="numSS">27</span>
      </div>

      <!-- 时针、分针、秒针 -->
      <div class="line line-h" id="lineH">
        <div></div>
      </div>
      <div class="line line-m" id="lineM">
        <div></div>
      </div>
      <div class="line line-s" id="lineS">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
  
  },
  mounted () {
    let that = this
    let hDeg = 0
    let mDeg = 0
    let sDeg = 0
    let lineH = document.getElementById('lineH')
    let lineM = document.getElementById('lineM')
    let lineS = document.getElementById('lineS')
    let numDate = document.getElementById('numDate')
    let numHH = document.getElementById('numHH')
    let numMM = document.getElementById('numMM')
    let numSS = document.getElementById('numSS')
    setInterval(() => {
      let time = that.getHms()
      hDeg = (time.h * 30 + time.m / 60 * 30 + time.s / 60 * 0.008333333333333333) - 90
      mDeg = (time.m * 6 + time.s / 60 * 6) - 90
      sDeg = time.s * 6 - 90
      lineH.style.transform = `rotate(${hDeg}deg)`
      lineM.style.transform = `rotate(${mDeg}deg)`
      lineS.style.transform = `rotate(${sDeg}deg)`
      lineH.style.display = 'block'
      lineM.style.display = 'block'
      lineS.style.display = 'block'

      numDate.innerText = `${time.year}-${time.month}-${time.date} 星期${time.day}`
      numHH.innerText = `${time.hh}`
      numMM.innerText = `${time.mm}`
      numSS.innerText = `${time.ss}`
    }, 1000)

  },
  components: {
  },
  methods: {
    getHms () {
      let dayList = [
        { day: 0, text: '日' },
        { day: 1, text: '一' },
        { day: 2, text: '二' },
        { day: 3, text: '三' },
        { day: 4, text: '四' },
        { day: 5, text: '五' },
        { day: 6, text: '六' },
      ]
      let year = 0, month = 0, date = 0, day = 0, h = 0, m = 0, s = 0
      let d = new Date()
      year = d.getFullYear()
      month = d.getMonth() + 1
      date = d.getDate()
      day = d.getDay()
      h = d.getHours()
      m = d.getMinutes()
      s = d.getSeconds()
      h = h >= 12 ? h - 12 : h
      return {
        year: year + '',
        month: month < 10 ? '0' + month : month + '',
        date: date < 10 ? '0' + date : date + '',
        day: dayList.find(item => item.day == day).text,
        h: h,
        hh: h < 10 ? '0' + h : h + '',
        m: m,
        mm: m < 10 ? '0' + m : m + '',
        s: s,
        ss: s < 10 ? '0' + s : s + '',
      }
    }
  },
}
</script>
<style scoped lang="scss">
.clock {
  position: relative;
  background-color: #222;
  display: flex;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 10px solid rgb(156, 154, 154);
  align-items: center;
  justify-content: center;
  margin: 50px auto;
}

.circle {
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 2;
  display: flex;
  align-items: center;
}

.circle>div {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
  margin: 0 auto;
  z-index: 2;
}

/* 时针 */
.line-h {
  display: none;
  position: absolute;
  width: 46px;
  height: 12px;
  border-radius: 6px;
  background-color: transparent;
}

.line-h div {
  width: 110px;
  background: #fff;
  height: 12px;
  border-radius: 6px;
}

/* 分针 */
.line-m {
  display: none;
  position: absolute;
  width: 46px;
  height: 8px;
  border-radius: 4px;
  background-color: transparent;
}

.line-m div {
  width: 150px;
  background: #fff;
  height: 8px;
  border-radius: 4px;
}

/* 秒针 */
.line-s {
  display: none;
  position: absolute;
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background-color: transparent;
  z-index: 2;
}

.line-s div {
  width: 160px;
  background: red;
  height: 4px;
  border-radius: 2px;
}

/* 12个小时的点位 */
.dotH {
  position: absolute;
  height: 6px;
  width: 300px;
  background: #fff;
}

.dotH div {
  position: absolute;
  height: 8px;
  top: -1px;
  left: 15px;
  width: 270px;
  background-color: #222;
}

.dotH1 {
  transform: rotate(0deg);
}

.dotH2 {
  transform: rotate(30deg);
}

.dotH3 {
  transform: rotate(60deg);
}

.dotH4 {
  transform: rotate(90deg);
}

.dotH5 {
  transform: rotate(120deg);
}

.dotH6 {
  transform: rotate(150deg);
}

.num-date {
  position: absolute;
  top: 60%;
  color: #fff;
  font-size: 14px;
}

.num-time {
  position: absolute;
  top: 72%;
  color: #222;
  font-size: 14px;
  direction: flex;
}

.num-time>span {
  flex: 1;
  background-color: #fff;
  margin: 0 1px;
  padding: 4px;
  box-shadow: inset 0 0 5px 1px #2c3b3e;
}

/* 60个分的点 */
.dotM {
  position: absolute;
  height: 3px;
  width: 300px;
  background: #fff;
}

.dotM div {
  position: absolute;
  height: 5px;
  top: -1px;
  left: 5px;
  width: 290px;
  background-color: #222;
}

.dotM1 {
  transform: rotate(6deg);
}

.dotM2 {
  transform: rotate(12deg);
}

.dotM3 {
  transform: rotate(18deg);
}

.dotM4 {
  transform: rotate(24deg);
}

.dotM5 {
  transform: rotate(36deg);
}

.dotM6 {
  transform: rotate(42deg);
}

.dotM7 {
  transform: rotate(48deg);
}

.dotM8 {
  transform: rotate(54deg);
}

.dotM9 {
  transform: rotate(66deg);
}

.dotM10 {
  transform: rotate(72deg);
}

.dotM11 {
  transform: rotate(78deg);
}

.dotM12 {
  transform: rotate(84deg);
}

.dotM13 {
  transform: rotate(96deg);
}

.dotM14 {
  transform: rotate(102deg);
}

.dotM15 {
  transform: rotate(108deg);
}

.dotM16 {
  transform: rotate(114deg);
}

.dotM17 {
  transform: rotate(126deg);
}

.dotM18 {
  transform: rotate(132deg);
}

.dotM19 {
  transform: rotate(138deg);
}

.dotM20 {
  transform: rotate(144deg);
}

.dotM21 {
  transform: rotate(156deg);
}

.dotM22 {
  transform: rotate(162deg);
}

.dotM23 {
  transform: rotate(168deg);
}

.dotM24 {
  transform: rotate(174deg);
}

/* 数字 */
.num {
  position: absolute;
  width: 274px;
  height: 26px;
}

.num div {
  position: absolute;
  color: #fff;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
}

.num div:first-child {
  top: 0;
  left: 0;
}

.num div:last-child {
  top: 0;
  right: 0;
}

.num1_7 {
  transform: rotate(120deg);
}

.num1_7 div {
  transform: rotate(-120deg);
}

.num2_8 {
  transform: rotate(150deg);
}

.num2_8 div {
  transform: rotate(-150deg);
}

.num3_9 {
  transform: rotate(180deg);
}

.num3_9 div {
  transform: rotate(-180deg);
}

.num4_10 {
  transform: rotate(210deg);
}

.num4_10 div {
  transform: rotate(-210deg);
}

.num5_11 {
  transform: rotate(240deg);
}

.num5_11 div {
  transform: rotate(-240deg);
}

.num6_12 {
  transform: rotate(270deg);
}

.num6_12 div {
  transform: rotate(-270deg);
}

.circle1 {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  border-radius: 50%;
  position: relative;
}

.sector {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px 100px 0 0;
  border-color: transparent transparent transparent green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom right;
  transform: translate(-50%, -50%) rotate(-72deg);
  /* 72度是五分之一的角度 */
}
</style>
