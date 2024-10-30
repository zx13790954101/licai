<template>
    <div class="histogram" :class="'histogram' + view_name">
        <div :id="'histogram' + view_name" :style="{ height: height1, width: width2 }" class="histogram_box"></div>
    </div>
</template>
<script>
import $ from "jquery";
import * as echartsInit from 'echarts';
export default {

    data() {
        return {
            datalist1: null,
            width2: "150px",
        };
    },
    created() { },
    props: {
        view_name: String,
        height1: String,
        deal_data: Array,
        type:Number,
    },
    components: {},
    mounted() {
        var that = this;
        this.$nextTick(() => {
            // that.width2 =
            //     document.querySelector(".histogram" + that.view_name).offsetWidth + "px";
            setTimeout(function () {
                that.initView();
            }, 2000);
        });
    },
    watch: {
        deal_data: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val != null) {

                    //this.initView();
                }
            },
        },
    },
    methods: {
        initView() {
            var chartDom = document.getElementById("histogram" + this.view_name);
            var myChart = echartsInit.init(chartDom);
            var option;


            
            var option = {
           
           series: [
               {
                   name: '访问来源',
                   type: 'pie',
                  // selectedMode: this.type==1?'single':'single',
                   radius: this.type==1?['50%', '75%'] :'75%',
                //    itemStyle: {
                //        borderRadius: 5,
                //        borderColor: '#fff',
                //        borderWidth: 2
                //    },
                   label: {
                       show: true,
                       position: 'inside',
                       formatter:  '{d}%',
                      //this.type==1? '{c} 万': '{d}%',
                       fontSize: 12 // 修改圆环内部文字大小
                   },
                   labelLine: {
                       show: true // 显示引导线
                   },
                   data: this.deal_data,
                   emphasis: {
                       itemStyle: {
                           shadowBlur: 10,
                           shadowOffsetX: 0,
                           shadowColor: 'rgba(0, 0, 0, 0.5)'
                       }
                   }
               }
           ]
       };

            option && myChart.setOption(option);
            if(this.type==1){
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
       
        }
    },
};

</script>
<style scoped lang="scss">
.histogram {
    width: 100%;

    nav {
        background-color: #555;
        padding: 2px 10px;
        color: white;
        font-size: 12px;
        font-weight: 600;

        button {
            background-color: #f5deb300;
            color: white;
            font-size: 12px;
            border: 0px;
            padding: 2px;
            border-radius: 2px;
            border-bottom: 1px solid white;
        }
    }

    .histogram_box {
        width: 500px;
        height: 150px;
    }
}
</style>
  