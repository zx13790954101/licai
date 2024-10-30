/*
 * @Author: “linzesen” zx2905111@github.com
 * @Date: 2023-09-07 14:00:33
 * @LastEditors: “linzesen” zx2905111@github.com
 * @LastEditTime: 2023-09-07 14:09:51
 * @FilePath: \mask-money\vue-lunar-fullcalendar-master\src\view\fuCommon\common\js\deal_buy_sell_data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//kline_data=K线图的数据
//buy_sell_data 买入卖出的值
//type 类型
const deaalBuySellData = function (
  kline_data,
  buy_sell_data,
  type
) {
    let _this = this;
    let length1 = kline_data.inflow
    let time_array = kline_data.time
    let num_array = kline_data.num

    let percentage_array = 0
    let this_time2 = 0
    let xs_time = "";
    let all_money = 0;


    let percentage_array2 = 0
    //全部的逻辑的累加值
    let all_money_data = 0
    let add_money_data = 0
    //结束累加值
    let down_money_data = 0
    //累加盈利
    let accumulation_profit = 0
    //计算累计的涨跌幅
    time.forEach((element, index) => {
      let this_time = time_array.findIndex((item) => {
        return item === time[index].time + ""
      })
      //上一个时间
      let last_time = null
      if (index != 0) {
        last_time = time_array.findIndex((item) => {
          return item === time[index - 1].time + ""
        })
      };
      //每个买入和卖出的涨跌幅,就是涨跌幅的百分百的数值是多少
      let stage_price = (parseFloat(num_array[this_time]) - parseFloat(num_array[last_time])) /
        parseFloat(num_array[last_time])
      //如果当前的买入时间小于上一个买入时间，那么就计算当前的买入时间到上一个买入时间的涨跌幅
      if (index + 1 == time.length) {
        if (all_money + element.money == 0) {
          stage_price =
            (parseFloat(num_array[length1.length - 1]) -
              parseFloat(num_array[this_time])) /
            parseFloat(num_array[this_time])
        }
      }
      if (index == 0) {
        stage_price = 0
      }
      //当前总的数值
      let this_sh = 1 + element.money / all_money
      if ((-element.money) == all_money) {
        this_sh = 1
      }
      //当前亏损值
      let last_data_num = all_money * (1 + stage_price)
      all_money_data = percentage_array * (1 + stage_price)
      //累加的亏损值
      accumulation_profit = accumulation_profit + percentage_array * stage_price
      if (element.money < 0) {
        percentage_array = all_money_data - all_money_data * this_sh
        down_money_data = down_money_data + element.money

      } else {

        percentage_array = all_money_data + element.money
        add_money_data = add_money_data + element.money
      }
      all_money = all_money + element.money
      xs_time =
        xs_time + `\n` + element.time + "买入" + element.money + "元"

    })

    //console.log("all_money_data=", all_money_data)
    percentage_array2 = accumulation_profit
    percentage_array = (
      ((add_money_data + accumulation_profit) / add_money_data) *
      100
    ).toFixed(2)

    this_time2 = time_array.findIndex((item) => {
      return item === time[0].time + ""
    })


  return {
    accumulation_profit,//累计
    xs_time,
    percentage_array,
    percentage_array2,
    down_money_data,
    add_money_data,
    all_money,
    this_time2,
  }
}

export default deaalBuySellData 