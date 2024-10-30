<template>
  <div class="speedTime">
    <div class="speed_div">
      <span class="pos_index" v-for="(item,index) in pos_list" :key="index" :style="{left:item.left}">
      
      </span>
       
      <span class="num" v-for="(item, index) in 24" :key="index" :class="item  % 2 == 0 ? 'big' : ''">

      </span>
      <span class="pos_this" :style="{width:pos_this+'%'}">
        {{pos_this + '%' }}
      </span>
    </div>
    <div class="time_div">
      <span class="time_num" v-for="(item, index) in 24" :key="index" :class="item  % 2 == 0 ? 'big' : ''">
        {{ item  }}
      </span>
    </div>
  </div>

</template>
<script>
import date_json from "./date.json";

export default {
  data () {
    return {
      pos_list:[],
      pos_this:0,
    }
  },
  created () {
    let that=this
    this.pos_list = date_json.list
    setInterval(() => {
      let all_time=60*60*24;
      let this_time = this.getSecondsSinceMidnight();
      let bfb=this_time/all_time
      bfb = (bfb * 100).toFixed(2);
      that.pos_this = bfb;
    }, 1000);
    let pos_list1 = this.pos_list
    pos_list1.forEach((item, index) => {
      if (index != 0) {
        if (index == 1) {
          
         }
      }
    
    });
  },
  methods: {
    getSecondsSinceMidnight () {
      const now = new Date()
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const diff = now - midnight
      return Math.round(diff / 1000)
    } 
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
.speedTime{
  .speed_div{
     height: 40px;
     max-width: 800px;
     width: 100%;
    background-color: #c7c7c7;
        display:flex;
          position: relative;
    .num{
  flex:1;
      text-align:center;
          border-left: 1px solid #757575;
    box-sizing: content-box;
    }
    .pos_this{
height: 50px;
background-color: #fd010142;
    position: absolute;
    left: 0px;
        box-sizing: border-box;
          border-right: 3px solid red;
          color:white;
          font-size:35px;
          text-align: center;
    }
  }
  .time_div{
         height: 20px;
     max-width: 800px;
     width: 100%;
    display:flex;
    span{
      flex:1;
      text-align:center;
      box-sizing: content-box;
      position: relative;
      right:-16px

    }
  }
}
</style>