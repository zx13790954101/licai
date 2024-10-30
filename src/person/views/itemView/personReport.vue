<template>
  <div class="personReport flex-c">
    <div class="l_box">
      <div class="flex-c">
        <section class="l_box_item2">
          <div class="item_big center">
            <h5>净资产(万)</h5>
            <h2>{{ deal_data[0].value + deal_data[1].value }}
            </h2>
            <div class="h5_box flex-c">

              <h5> <span> 本金(万)</span>
                {{
                                    deal_data[1].value
                                }}
              </h5>
              +
              <h5 style="color: red;">
                <span> 贷款(万) </span>
                {{
                                    deal_data[0].value
                                }}
              </h5>
            </div>

          </div>

        </section>
        <section class="l_box_item1">
          <pieEcharts :view_name="'pie_data2'" :deal_data="deal_data" :type="1">

          </pieEcharts>
          <div class="big_num">
            <h2>{{ suggest }}</h2>
            <!-- <h5>贷款:<span class="red">{{ deal_data[0].value }}万</span></h5> -->
          </div>
        </section>
      </div>
      <div class="item_big2 center flex-c">
        <div class="">

          <h6>持有的天数</h6>
          <h2>180天</h2>
        </div>
        <div class="box">
          <h2>
            <span>
              亏损
            </span>
            -10%
          </h2>
        </div>
        <div class="">
          <h5>持有{{ deal_data[0].value }}万(贷款)</h5>
        </div>

      </div>
    </div>

    <div class="l_box2 flex-c">

      <div class="l_box3">
        <section>
          <h5>总资产</h5>
          <h2>255000<span>元</span></h2>
        </section>
        <section>
          <h5>基金投资资产占比</h5>
          <h2>255000<span>元</span></h2>
        </section>
        <section>
          <h5>盈亏</h5>
          <h1 class="green">-155000<span>元</span></h1>
        </section>
        <section>
          <h5>总收益率</h5>
          <h2 class="green">-50%</h2>
        </section>
      </div>
      <pieEcharts :view_name="'pie_data'" :deal_data="deal_data2">
      </pieEcharts>
      <section class="menoy">
        <div class="top"></div>
      </section>

    </div>
  </div>
</template>
<script>
  import pieEcharts from "../components/echartsCommon/pieEcharts.vue";
  export default {
    data() {
      return {
        deal_data: [{
            value: 15,
            name: '贷款',
            selected: true,
            radius: '70%',
            itemStyle: {
              color: 'red'
            }
          },
          {
            value: 25,
            name: '个人资金',
            radius: '50%',
            itemStyle: {
              color: '#dfe5f3'
            }
          }
        ],
        deal_data2: [{
            value: 20,
            name: '投资',
            selected: true,
            itemStyle: {
              color: 'red'
            }
          },
          {
            value: 5,
            name: '现金',
            itemStyle: {
              color: '#e5e9f2'
            }
          }
        ],
        //贷款建议
        suggest: '卖出'
      };
    },
    created() {},
    mounted() {

    },
    components: {
      pieEcharts
    },
    methods: {},
  };

</script>
<style scoped lang="scss">
  .red {
    color: #ff3b30;
  }

  .green {
    color: #5ecb2c;
  }

  .center {
    text-align: center;
  }

  .personReport {
    margin-top: 10px;
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: 400;

      span {
        font-size: 12px;
      }
    }

    h1 {
      font-size: 34px;
      font-weight: 600;

      span {
        font-size: 12px;
      }
    }

    .l_box {
      .h5_box {

        h5 {
          padding: 10px 2px;
          border-radius: 5px;
          font-size: 14px;

          span {
            display: block;
            color: #555555;
            font-size: 8px;
          }
        }
      }

      .l_box_item1 {
        position: relative;
        margin-left: 30px;

        .big_num {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

      }

      .item_big2 {
        background-color: #ffffff;
        padding: 10px;
        border-radius: 10px;
        min-width: 100px;

        .box {
          background-color: #5ecb2c;
          color: white;
          border-radius: 15px;
          padding: 0px 5px;
          margin: 0px 10px;
        }
      }

      .l_box_item2 {
        .item_big {
          background-color: #ffffff;
          padding: 10px;
          border-radius: 10px;
          min-width: 100px;
        }

      }
    }

    .l_box2 {
      flex: 1;
      background-color: #dfe5f3;
      border-radius: 20px;
      margin-left: 50px;
    }

    .l_box3 {
      margin: 10px 0px 10px 30px;
      min-width: 160px;
    }
  }

</style>
