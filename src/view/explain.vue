<template>
  <div class="explain">

  </div>
</template>
<script>
import $ from 'jquery'
export default {
  created () {

    var Daily = [];
    var daily_date = [0];
    var daily_date2 = [0];
    var this_num = 0;
    var all_daily = '';
    var balance = 3000;
    var balance_ararry = [3000];
    var num_index = 0;

    var start_time = "2021-09-14";//开始时间
    var end_time = "2022-03-17"//结束时间
    var time_array = [start_time];
    console.log("一共使用的时间", new Date((new Date(end_time)).getTime() - (new Date(start_time).getTime())))

    var end_data = this.getMarketData('161032', start_time, end_time)
    end_data.map((item) => {
      Daily.push(item[2])

      all_daily = new Number(all_daily) + new Number(item[2])
      //判断是不是跌幅超过-6%
      if (new Number(this_num) < -10) {

        num_index = num_index + 1
        daily_date.push(this_num)
        time_array.push(item[0])
        daily_date2.push(all_daily)
        if (num_index == 1) {
          balance_ararry.push(balance_ararry[0])
        } else {
          balance_ararry.push(balance_ararry[num_index - 1] * 2)
        }

        this_num = new Number(item[2])
      } else {


        this_num = new Number(this_num) + new Number(item[2])
      }

    });
    console.log("加仓日期", time_array)
    console.log("每次加仓", balance_ararry)
    console.log("每笔跌幅开始加仓位置", daily_date2)
    console.log("全部的跌幅", all_daily)
    var index1 = 0;
    var start_num = 0;
    balance_ararry.forEach((item, index) => {
      if (balance_ararry[index] < 30000) {

        start_num = start_num + item
        var type1 = new Number(all_daily) - new Number(daily_date2[index])
        console.log("每笔跌幅:", type1 / 100)
        type1 = type1 > 0 ? (type1 / 100 + 1) : (1 - (parseInt(type1) > 100 ? Math.abs(type1) / 1000 : Math.abs(type1) / 100))
        index1 = new Number(index1) + new Number(item) * type1
        console.log("每笔获利:", new Number(item) * type1)
        // console.log("balance_ararry:", balance_ararry[index])
      }

    });
    console.log("本金:", start_num)
    console.log("获利+本金:", index1)

  },
  methods: {
    back () {
      this.$router.push('/vue-lunar-fullCalendar')
    },
    maskData (data) {

    },
    //获取数据
    getMarketData (name, date1, date2) {
      var htmlobj = $.ajax({
        url:
          'https://api.doctorxiong.club/v1/fund/detail/list?code=' +
          name +
          '&startDate=' +
          date1 +
          '&endDate=' +
          date2,
        async: false,
      });

      return JSON.parse(htmlobj.responseText).data[0].netWorthData
    },

    //数据归类方法
    classify (arr, key) {
      let kind = []; //存放属性标识
      let newArr = []; //返回的数据
      arr.map((item) => {
        // 判断key是否存在，不存在则添加
        if (!kind.includes(item[key])) {
          kind.push(item[key]); //kind添加新标识
          newArr.push([]); //添加数组
        }
        let index = kind.indexOf(item[key]); //返回带有标识在kind内的下标，判断加入哪个数组
        newArr[index].push(item); //将对象存入数组
      });
      return newArr;
    },
    //得到加仓数据
    getData (data) {
      //最大值
      let max_data = {
        date: "",
        num: ""
      }
      //最小值
      let min_data = {
        date: "",
        num: ""
      }
      //获取最大值和最小值
      data.forEach((item, index) => {
        if (index == 0) {

        }

      });
      let max_min_data = {

      }


      var datq1 = ['0.5', '-0.1', '0.6', '-0.6']




    }
  }
}
</script>
<style scoped lang="scss">
.explain {
  font-size: 14px;
  text-align: center;
  h2 {
    text-align: center;
  }
  div {
    text-indent: 20px;
  }
  a {
    color: #409eff;
  }
  .back {
    cursor: pointer;
    display: inline-block;
    margin-top: 40px;
    color: #45b984;
    font-size: 15px;
  }
  .lunarImg {
    height: 380px;
  }
  .red {
    color: #ff0000;
  }
}
</style>

