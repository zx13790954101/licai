<template>
  <div class="kline">
    <histogram
      ref="kline1"
      :name="'_kline1'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :listData="listData4"
      :timeData="timeData4"
      :width1="width_all"
      :height1="'600px'"
      :markLine="markLine"
      value=""
    >
    </histogram>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span> 估值适中,但是不适合投资（判断当前的估值和投资的位置） </span>
            <el-divider></el-divider>
            <el-tooltip
              content="https://danjuanapp.com/dj-valuation-table-detail/SH000300"
              placement="top"
            >
              <el-link
                type="danger"
                href="https://danjuanapp.com/dj-valuation-table-detail/SH000300"
                >沪深300的pe值-来自蛋卷基金
              </el-link>
            </el-tooltip>
            <p>
              目前问题: 需要补充沪深300
              中间的数据，想办法让两个数据同步,现在先用底部的蛋卷基金的数据，判断沪深300是不是在底部
              目前还不是，差不多还需要计算上次的底部，每次突破之后需要判断，这个判断条件计算平均线
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span
              >判断沪深300和pe值和10国债的走势图判断（建议点击观看就好，不用转换过来）</span
            >
            <el-divider></el-divider>
            <el-tooltip
              content="https://www.jisilu.cn/data/indicator/000300"
              placement="top"
            >
              <el-link
                type="danger"
                href="https://www.jisilu.cn/data/indicator/000300"
                >沪深300温度计-来自集思录</el-link
              >
            </el-tooltip>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span
              >沪深300估值之股债利差（暂时不知道干嘛的，先不要添加数据）</span
            >
            <el-divider></el-divider>
            <el-tooltip
              content="http://value500.com/CSI300.asp"
              placement="top"
            >
              <el-link type="danger" href="http://value500.com/CSI300.asp"
                >沪深300估值之股债利差-来自value500</el-link
              >
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import histogram from "./histogram.vue";
import url_name from "./url_name";
import { getAjax } from "../../../assets/common.js";
export default {
  data() {
    return {
      urlList: [
        {
          url: "https://data.eastmoney.com/cjsj/yzgptjnew.html",
          title: "股票账户统计一览",
        },
      ],
      listData4: null,
      timeData4: null,
      title4: null,
      title4_1: null,
      width_all: null,
      markLine: [],
      hushen300_pe:
        "https://danjuanapp.com/djapi/index_eva/pe_history/SH000300?day=5y",
    };
  },
  props: {
    array1: Object,
  },
  created() {
    var that = this;
    let array1 = this.array1;
    let array2 = that.dealData2(array1.klines, 2, array1.name, 2);
      
    let array5 = getAjax(this.url1("133.USDCNH")).responseJSON.data;

    let array3 = that.dealData2(array5.klines, 2, array5.name, 2);
      
    let hushen300 = JSON.parse(getAjax(url_name.hushen300).responseText);
        
    let item_pe = getAjax(this.hushen300_pe).responseJSON.data;
    
    let hushen300_pe = this.dealData7(item_pe.index_eva_pe_growths);
    that.title4 = "上证指数";
    //let lili_data = getAjax(url_name.lili).responseJSON.result.data;

    let cpi_data =JSON.parse(getAjax(url_name.cpi).responseText).result.data;

    cpi_data = that.dealData(
      array2.time,
      this.dealData5(cpi_data).time,
      this.dealData5(cpi_data).tb
    );
    console.log("ppippi",  JSON.parse(getAjax(url_name.ppi).responseText))
    let ppi_data = JSON.parse(getAjax(url_name.ppi).responseText).result.data;
    ppi_data = that.dealData(
      array2.time,
      this.dealData6(ppi_data).time,
      this.dealData6(ppi_data).hb
    );

    // let all_time = hushen300.date.concat(hushen300_pe.time);

    // let arrNew = new Set(all_time); //通过set集合去重

    // arrNew = Array.from(arrNew);
    // arrNew = arrNew.sort(function (a, b) {
    //   return b < a ? -1 : 1;
    // });

    let num1 = this.dealTimeDate(
      hushen300.close,
      hushen300.date,
      hushen300_pe.time
    );

  

    let array4 = [
      {
        num: num1.num,
        name: "沪深300",
        time: num1.time,
      },
      {
        num: hushen300_pe.pe,
        name: "沪深300的pe值—基金",
        time: hushen300_pe.time,
      },
      // {
      //   num: hushen300.pe.slice(-array2.time.length),
      //   name: "沪深300的pe值",
      //   time: array2.time,
      // },

      // {
      //   name: "中国债收益率",
      //   num: that
      //     .dealData4(lili_data, 2)
      //     .cn.slice(-array2.time.length)
      //     .reverse(),
      //   time: array2.time,
      // },
    ];
    that.listData4 = array4;
  
    that.timeData4 = array2.time;
    let new_array1 = [
      {
        name: item_pe.horizontal_lines[0].line_name,
        value2: item_pe.horizontal_lines[0].line_value.toFixed(2),
      },
      {
        name: item_pe.horizontal_lines[1].line_name,
        value2: item_pe.horizontal_lines[1].line_value.toFixed(2),
      },
      {
        name: item_pe.horizontal_lines[2].line_name,
        value2: item_pe.horizontal_lines[2].line_value.toFixed(2),
      },
    ];

    this.setMarkLine(new_array1, hushen300_pe.time);
  },
  mounted() {
    this.width_all = document.querySelector(".kline").offsetWidth + "px";
    var that = this;
    // let hushen300 = JSON.parse(getAjax(url_name.hushen300).responseText);
    // let array_hushen300 = that.dealData(hushen300.pe, 2, "沪深300的pe值", 2);
    // let array_hushen3002 = that.dealData(hushen300.close, 2, "沪深300", 2);
  },
  components: {
    histogram,
  },
  methods: {
    //风险溢价
    dealRiskPremium(data, data1) {
      let array1 = [];
      data.forEach((element, index) => {
        let item1 = 1 / element - data1[index];
        array1.push(item1);
      });

      return array1;
    },

    dealTimeDate(data, time, time1) {
      let all_time = time.concat(time1);
      let array1 = [];

      let arr01 = all_time.filter((x, index, self) => {
        let arrs = [];
        all_time.forEach((item, i) => {
          arrs.push(item);
        });
        return arrs.indexOf(x) === index;
      });

      arr01.sort(function (a, b) {
        //正序a-b
        return new Date(a) - new Date(b);
      });

      arr01.forEach((element, index) => {
        let num1 = time.indexOf(element);
        if (num1 == -1) {
          array1.push(array1[index - 1]);
        } else {
          array1.push(data[num1]);
        }
      });
      return {
        num: array1,
        time: arr01,
      };
    },
    url1(num1, num2) {
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=758&klt=101&fqt=1&end=30000101"
      );
    },
    setMarkLine(new_array1_DATA, time1) {
      let that = this;
      let new_array1 = new_array1_DATA;
      let new_array2 = [];
      let lineStyle1 = [];
      new_array1.forEach((item, index) => {
        let item1 = {
          name: item.name + "(" + item.value2 + ")",
          yAxis: item.value2,
          // 单独配置每条线的样式
          lineStyle: {
            width: 3,
            color: item.active ? "red" : "#333333",
          },
          label: {
            // padding: [-13, -20, 15, -45],
            formatter: item.name + "(" + item.value2 + ")",
          },
        };
        new_array2.push(item1);
      });

      this.markLine = [
        {},
        {
          itemStyle: {
            normal: {
              lineStyle: {
                type: "dashed",
                // 这儿设置的颜色是公共配置，如需单独配置，请在data里配置
                // color: '#000',
              },
              label: {
                show: true,
                position: "end",
              },
            },
          },
          data: new_array2,
        },
      ];
    },
    setMarkLine2(new_array1_DATA, time1) {
      let that = this;
      let new_array1 = new_array1_DATA;
      let new_array2 = [];
      new_array1.forEach((item, index) => {
        let start_num = time1[time1.length - 1];
        let item1 = [
          {
            coord: [time1[1], item.value2],
            symbol: "circle",
            name: item.name + "(" + item.value2 + ")",
            symbolSize: 6,
          },
          {
            symbolSize: 6,
            name: item.name,
            label: {
              position: "end",
            },
            coord: [start_num, item.value2],
            symbol: "arrow",
          },
        ];
        new_array2.push(item1);
      });
      this.markLine = [
        {},
        {
          data: new_array2,
          lineStyle: {
            width: 3,
            color: "#333333",
          },
        },
      ];
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    dealData7(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.pe.toFixed(2));
        data2.push(this.dateFormat("YYYY-mm-dd", new Date(element2.ts)));
      });
      console.log("data2", data2);
      return { 
        pe: data1,
        time: data2,
      };
    },
    dealData6(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.BASE);
        data2.push(element2.BASE_SAME);
        data3.push(element2.REPORT_DATE.slice(0, 10));
      });
      return {
        dy: data1,
        hb: data2,
        time: data3,
      };
    },
    dealData5(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.NATIONAL_SAME);
        data2.push(element2.NATIONAL_SEQUENTIAL);
        data3.push(element2.REPORT_DATE.slice(0, 10));
      });
      return {
        tb: data1,
        hb: data2,
        time: data3,
      };
    },
    dealData4(data5, num) {
      let that = this;
      let data1 = [];
      let data1_time = [];
      let data2 = [];
      let data2_time = [];
      data5.forEach((element2, index2) => {
        if (element2.EMM00166466 != null) {
          data1.push(element2.EMM00166466.toFixed(2));
          data1_time.push(element2.SOLAR_DATE.slice(0, 10));
        }
        if (element2.EMG00001310 != null) {
          data2.push(element2.EMG00001310.toFixed(2));
          data2_time.push(element2.SOLAR_DATE.slice(0, 10));
        }
      });
      return {
        cn: data1,
        us: data2,
        time1: data1_time,
        time2: data1_time,
      };
    },
    dealData3(data2, num) {
      let that = this;
      let num1 = [];

      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        num1.push(element2_item[num]);
      });
      return num1;
    },
    dealData2(data2, type, name, num) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];

      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        time1.push(element2_item[0]);
        num1.push(element2_item[num]);
      });
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },

    dealData(time, time1, data1) {
      let array1 = [];
      let num1 = 0;
      time.forEach((element, index) => {
        if (time1.indexOf(element) != -1) {
          array1.push(parseFloat(data1[time1.indexOf(element)]));
          num1 = parseFloat(data1[time1.indexOf(element)]);
        } else {
          array1.push(num1);
        }
      });

      return array1;
    },
  },
};
</script>
<style scoped lang="scss">
.kline {
  padding: 0px;
  width: 100%;

  .main {
    background-color: #353a47;
    padding: 10px;
  }

  .box-card {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
