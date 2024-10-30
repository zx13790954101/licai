<template>
  <div class="headNav">
    <header class="flex-c">
      <h3>LINZESEN</h3>
      <div class="left">
        <span>今日大盘:60分</span>
        <span> 4000股跌 2000股大涨</span>
      </div>
      <div class="center">
        <span>上证指数：3600 0.3%</span>
        <span>创业板： 2800 -0.2%</span>
      </div>
      <div class="right flex-item">
        <span>2022年-2月-18号 (开盘日) 14：50（盘中）</span>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  components: {},
  created () {

  },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="scss">
.headNav {
  padding: 10px;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  animation: mymove 2s infinite;
  /*Safari 和 Chrome:*/
  -webkit-animation: mymove 2s infinite;
  box-shadow: 4px 1px 6px 0px #474662;
  background-color: #272633;
  z-index: 2;
  display: flex;
  align-items: center;
  header {
    display: flex;
    align-items: center;
    width: 100%;
    h3 {
      color: white;
      font-size: 26px;
      letter-spacing: 2px;
    }
    span {
      color: white;
      letter-spacing: 1px;
    }
  }
  .left {
    margin: 0px 20px;
  }
  .right {
    float: right;
    text-align: right;
  }
}

@keyframes mymove {
  0% {
    box-shadow: 4px 1px 6px 0px #474662;
  }
  50% {
    box-shadow: 0px 0px 6px 0px #ffa500b3;
  }
  100% {
    box-shadow: 4px 1px 6px 0px #474662;
  }
}

/*Safari 和 Chrome:*/
@-webkit-keyframes mymove {
  0% {
    box-shadow: 4px 1px 6px 0px #474662;
  }
  50% {
    box-shadow: 0px 0px 6px 0px #ffa500b3;
  }
  100% {
    box-shadow: 4px 1px 6px 0px #474662;
  }
}
</style>
