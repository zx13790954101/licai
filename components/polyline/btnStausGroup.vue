<template>
  <div class="btnStausGroup">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="状态选择按钮" name="1">
        <div class="flex-c">
       <el-input
                v-model="zdf_input_num"
                placeholder="请输入日期"
                size="medium"
          ></el-input>
          <button @click="openInputBtn()">点击确认</button>
          <el-input
                v-model="zdf_input_num"
                placeholder="请输入涨跌幅的值"
                size="medium"
          ></el-input>
          <button @click="openInputBtn()">点击确认</button>
        </div>
     
        <div class="flex-c">
          <ul>
            <li
              v-for="(item, index) in dataList"
              :key="index"
              :style="{ 'background-color': item.color }"
            >
              <div class="main" v-for="(item2, index2) in 3" :key="index2">
                <p>{{ parseInt(index2) + 1 + "." + item.name }}</p>
                <el-radio-group
                  v-model="array_radio[index][index2]"
                  v-if="item.state == 1"
                  size="mini"
                >
                  <el-radio-button
                    border
                    :label="1"
                    class="top flex-c"
                    size="mini"
                  >
                    <i class="iconfont icon-ico top"></i>
                    <h5 class="top">上升</h5>
                  </el-radio-button>
                  <el-radio-button
                    border
                    :label="2"
                    class="bottom flex-c"
                    size="mini"
                  >
                    <i
                      class="iconfont icon-shujuxiajiangqushixiadie bottom"
                    ></i>
                    <h5 class="bottom">下降</h5>
                  </el-radio-button>
                  <!-- <el-radio :label="3">0（=零）</el-radio> -->
                </el-radio-group>
                <el-radio-group
                  v-model="array_radio[index][index2]"
                  v-if="item.state == 2"
                  size="mini"
                >
                  <el-radio-button
                    border
                    :label="1"
                    class="top flex-c"
                    size="mini"
                  >
                    <i class="iconfont icon-shuzhuangtu top"></i>
                    <h5 class="top">正</h5>
                  </el-radio-button>
                  <el-radio-button border :label="2" size="mini" class="flex-c">
                    <i class="iconfont icon-shuzhuangtu bottom"></i>
                    <h5 class="bottom">负</h5>
                  </el-radio-button>
                  <!-- <el-radio :label="3">0（=零）</el-radio> -->
                </el-radio-group>
                <el-radio-group
                  v-model="array_radio[index][index2]"
                  v-if="item.state == 3"
                  size="mini"
                >
                  <el-radio-button
                    border
                    :label="1"
                    class="top flex-c"
                    size="mini"
                  >
                    <i class="iconfont icon-shuzhuangtu top"></i>
                    <h5 class="top">等于</h5>
                  </el-radio-button>
                  <el-radio-button border :label="2" size="mini" class="flex-c">
                    <i class="iconfont icon-shuzhuangtu bottom"></i>
                    <h5 class="bottom">不等于</h5>
                  </el-radio-button>
                  <!-- <el-radio :label="3">0（=零）</el-radio> -->
                </el-radio-group>
              </div>
            </li>


          </ul>
          <button @click="openBtn()">点击确认</button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
//可以选择组件
export default {
  data() {
    return {
      name: "",
      radio: 1,
      array_radio: [],
      activeNames: [],
      //输入的涨跌值
       zdf_input_num:''
    };
  },
  created() {
    var that = this;
    this.dataList.forEach((item, index) => {
      that.array_radio.push([0, 0, 0]);
    });
  },
  //数组规则
  props: {
    dataList: Array,
    funData: Array,
    allTime: Array,
    type: String,
    zdfData: Array,//模拟涨跌幅
  },
  mounted() {},
  methods: {
    //点击按钮的事件
    openInputBtn(){
      let that=this
      that.$parent.dealStausPoint(
          that.setDayMarkPoint(that.funData, null, that.allTime,1)
        );
    },
    openBtn() {
      let that = this;

      if (this.type == "1") {
        that.$parent.dealStausPoint(
          that.setDayMarkPoint(that.funData, null, that.allTime)
        );
        return;
      }
      if (this.$parent.$parent.$parent.$parent.dealStausPoint) {
        this.$parent.$parent.$parent.$parent.dealStausPoint(
          this.setDayMarkPoint(this.funData, null, this.allTime)
        );
      } else if (this.$parent.$parent.$parent.dealStausPoint) {
        this.$parent.$parent.$parent.dealStausPoint(
          this.setDayMarkPoint(this.funData, null, this.allTime)
        );
      } else {
        that.$parent.dealStausPoint(
          that.setDayMarkPoint(that.funData, null, that.allTime)
        );
      }
    },
    //需要补充状态和数据
    setDayMarkPoint(array1, num_type_array, time1, input_select_type) {
      let that = this;
      let array2 = [];
      let type1 = ["买进", "卖出", "持有", "加仓", "等待"];

      let this_length = array1[0].length - 1;
      //循环全部的数组
      array1[0].forEach((item, index) => {
        try {
          //

          array1.forEach((item2, index2) => {
            //判断数值
            let deal_array_item = (num) => {
              //设置是不是绿色和红色

              let item = null;
              let key = that.dataList[index2].state;
              switch (key) {
                case 1:
                  item =
                    parseFloat(array1[index2][num]) -
                    parseFloat(array1[index2][num - 1]);
                  break;
                case 2:
                  item = array1[index2][num];
                  break;
                case 3:
                  item =
                    parseFloat(array1[index2][num]) ==
                    parseFloat(array1[index2][num - 1])
                      ? 1
                      : -1;
                  break;

                default:
                  break;
              }
              return parseFloat(item);
            };
            let this_num = deal_array_item(index);
            let this_num_type = this_num > 0 ? true : false;
            //当前的最后的数值
            let this_num2 = deal_array_item(this_length);
            let this_num_type2 = this_num2 > 0 ? true : false;

            //判断依据层级，添加多一个混合判断
            let this_status = false;

            try {
              that.array_radio[index2].forEach((item3, index3) => {
                if (item3 != 0) {
                  let this_num_1 = deal_array_item(index - index3);
                  let this_num_type_1 = this_num_1 > 0 ? true : false;
                  //当前的最后的数值
                  let this_num2_1 = deal_array_item(this_length - index3);
                  let this_num_type2_1 = this_num2_1 > 0 ? true : false;

                  let radio_type = parseInt(item3) == 1 ? true : false;

                  //是单还是连,是不是等于
                  if (this_num_type_1 == radio_type) {
                    this_status = true;
                  } else {
                    this_status = false;
                    throw Error();
                  }
                }
              });
            } catch (e) {
              this_status = false;
              //  console.log("层级异常", e);
            }

            //只要有异常就抛出
            if (this_status) {
              if (index2 == array1.length - 1) {
                let item1 = {
                  name: "买卖操作逻辑",
                  value: type1[this_num_type2 == true ? 1 : 0],
                  xAxis: time1[index],
                  yAxis: parseFloat(item),
                  itemStyle: {
                    color: this_num_type2 == true ? "red" : "#7cffb2",
                  },
                };
                array2.push(item1);
              }
            } else {
              throw new Error("EndIterative");
            }
          });
        } catch (e) {
          //   console.log("EndIterative", e);
          if (e.message !== "EndIterative") throw e;
        }
      });


      if(input_select_type==1){
        array2=[];
        array1[0].forEach((item, index) => {
          try {
            if(that.zdf_input_num!=''){

              let this_type=parseFloat(that.zdf_input_num)>0?
              that.zdfData[index]>parseFloat(that.zdf_input_num):
              that.zdfData[index]<parseFloat(that.zdf_input_num);
              //排队是不是大于这个涨跌幅
              if(this_type){
                  let item1 = {
                    name: "买卖操作逻辑",
                    value: '大于'+that.zdfData[index]+'%',
                    xAxis: time1[index],
                    yAxis: parseFloat(item),
                    itemStyle: {
                      color:  "red" 
                    },
                  };
                  array2.push(item1);
              }
             
            }
          }catch (e) {
          }
        })
        console.log("btnstausgroup22",array2)

      }
      console.log("btnstausgroup",array2)
      console.log("array1array1array1",that.zdfData)
      console.log("dataList",that.zdf_input_num)
      return [
        {
          data: array2,
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.el-collapse-item__header {
  background-color: #ffeb3b;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.el-collapse {
  width: 100%;
}
.el-collapse-item__header.is-active {
  background-color: #ffeb3b;
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
}
.el-radio-button__inner {
  display: flex;
  align-items: center;
}
</style>
<style scoped lang="scss">
.btnStausGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      margin-right: 0px;
      padding: 10px 30px;

      .main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background-color: #ffffffba;
      }

      .main:nth-of-type(2) {
        // border-top: 2px solid;
        // border-bottom: 2px solid;
        margin: 0px 0px;
      }

      p {
        font-size: 14px;
        font-weight: 600;
        padding: 0px 10px;
        white-space: nowrap;
      }

      h5 {
        display: block;
      }

      i {
        font-size: 20px;
        font-weight: 600;
        padding-right: 5px;
      }

      .top {
        color: #f72c5b;
      }

      .bottom {
        color: #4caf50;
      }
    }
  }

  button {
    height: 148px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 0px;
    padding: 0px 10px;
    border: 20px solid black;
  }
  .el-radio-button__inner {
    padding: 6px 6px;
  }
}
</style>
