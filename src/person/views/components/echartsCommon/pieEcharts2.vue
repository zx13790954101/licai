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
            width2: "400px",
        };
    },
    created() { },
    props: {
        view_name: String,
        height1: String,
        deal_data: Array
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
                // title: {
                //     text: '阅读书籍分布',
                //     left: 'center',
                //     textStyle: {
                //         color: '#999',
                //         fontWeight: 'normal',
                //         fontSize: 14
                //     }
                // },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '90%'],
                        left: 'center',
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 5
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                            fontSize: 20 // 修改圆环内部文字大小
                        },
                        labelLine: {
                            show: true // 显示引导线
                        },
                        data: [
                            { value: 200, name: '报障', itemStyle: { color: 'red' } },
                            { value: 400, name: '咨询', itemStyle: { color: 'green' } }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        type: 'pie',
                        radius: ['50%', '55%'],
                        width:500,
                        left: 'center',
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 5
                        },
                        label: {
                            alignTo: 'edge',
                            formatter: '{name|{b}}\n{time|{c} 小时}%',
                            minMargin: 5,
                            edgeDistance: 80,
                            shadowOffsety: 10,
                            lineHeight: 25,
                            color: '#999',
                            fontSize: 15, // 修改圆环外部文字大小
                            rich: {
                                time: {
                                    fontSize: 18,
                                    color: '#000000'
                                }
                            }
                        },
                        labelLine: {
                            length: 15,
                            length2: 0,
                            maxSurfaceAngle: 80
                        },
                        labelLayout: function (params) {
                            const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                            const points = params.labelLinePoints;
                            // Update the end point.
                            points[2][0] = isLeft
                                ? params.labelRect.x
                                : params.labelRect.x + params.labelRect.width;
                            return {
                                labelLinePoints: points
                            };
                        },
                        data: [
                            { value: 200, name: '个人资金', itemStyle: { color: 'red' } },
                            { value: 400, name: '贷款', itemStyle: { color: 'green' } }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
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
        height: 320px;
    }
}
</style>
  