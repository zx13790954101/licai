<template>
  <div class="kline">
     <el-button size="mini" type="primary" plain @click="download">导出图片</el-button>

     <div ref="content" class="content1" id="content1">
          <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
              <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
              <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
              <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
              <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
              <p>ssssss</p>
          <img src="./../assets/img/bg1.png">
          <h1>sssssssssssssssssssssssssssss</h1>
              <img src="./../assets/img/ml.png">
     </div>

    <!-- <div id="kline" class="kline-box"  style="height: 140vh"></div> -->
    
  </div>
</template>
<script>
import $ from "jquery";

//import html2canvas from 'html2canvas'
import kline from "./../assets/kline/echarts1.js";
export default {
  data() {
    return {};
  },
  created() {},
  components: {},
  mounted() {
    // this.$nextTick(() => {
    //   setTimeout(function () {
    //     kline.klineInit();
    //   }, 2000);
    // });
    var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '* { -webkit-text-size-adjust: none; }';
document.getElementsByTagName('head')[0].appendChild(style);
  },
  methods: {
 // 第二种方式直接下载图片
    download() {
      var element = document.getElementById("content1");
      // 定义canvas大小
      var canvasWidth = element.offsetWidth/2;
      var canvasHeight =  element.offsetHeight/2;
      const ref = this.$refs.content // 截图区域
      html2canvas(ref, {
//         width: canvasWidth,
// height: canvasHeight,
scale:0.8,
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      }).then((canvas) => {

        // var extra_canvas = document.createElement("canvas");
        //         extra_canvas.setAttribute('width',canvasWidth/2);
        //         extra_canvas.setAttribute('height',canvasHeight/2);
        //         var ctx = extra_canvas.getContext('2d');
        //         ctx.drawImage(canvas,0,0,canvas.width/2, canvas.height/2,0,0,70,70);

        const dataURL = canvas.toDataURL('image/png')
        const creatDom = document.createElement('a')
        document.body.appendChild(creatDom)
        creatDom.href = dataURL
        creatDom.download = '图片'
        creatDom.click()
      })
    }

  },
};
</script>
<style scoped lang="scss">
.kline {
  p{
    background-color: white;
  }
  h1{
      background-color: white;
  }
}
</style>
