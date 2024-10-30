// 说明文档页
// https://cloud.tencent.com/developer/article/1019452
<template>
<div class="lunarFullCalendar">

  <!-- <header>
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button icon="el-icon-back"
                     @click="toPrev"></el-button>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-right"
                     @click="toNext"></el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="date_input"
                    placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="switchDate()">切换日期 </el-button>
        </el-col>

      </el-row>
    </div>

  </header> -->
  <!-- <div class="bg">
    <img src="../assets/img/date_bg1.jpg">
    <div class="triangle"></div>
  </div> -->
  <div class="full-calendar">
    <lunar-full-calendar :events="events"
                         ref="calendar2"
                         id="calendar2"
                         @event-selected="eventSelected"
                         :config="config"
                         :cell-class="getCellClass" 
                         @day-click="dayClick">

                         <template v-slot:event-render="{ event }">
                        <div >
                          {{ event.date }}: {{ event.value }}
                        </div>
                      </template>
            </lunar-full-calendar>
  </div>
  <!-- <div class="full-calendar">
    <lunar-full-calendar :events="events"
                         ref="calendar3"
                         id="calendar3"
                         @event-selected="eventSelected"
                         :config="config2"
                         @day-click="dayClick"></lunar-full-calendar>

  </div> -->
</div>
</template>
<script>
 //import { LunarFullCalendar } from 'vue-lunar-full-calendar'
// import { LunarFullCalendar } from '../../components'
// import 'vue-lunar-full-calendar/dist/LunarFullCalendar.min.css';
import $ from 'jquery'
import { LunarFullCalendar } from '../../../../lib/LunarFullCalendar.min.js'
export default {
components: {
  LunarFullCalendar,
},
data: function () {
  let self = this
  return {
    date_input: '',
    events: [
      {
        title: '数据1',
        start: new Date(),
        end: new Date()
      },
    ],
    config: {
      lunarCalendar: true,
      fixedWeekCount: false,
      firstDay: 1,
      aspectRatio: 2.5,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: '今天',
        month: '月',
        week: '周',
        day: '日'
      },
      locale: 'zh-cn',
      editable: true,
      eventLimit: true,
      defaultView: 'month',
      hiddenDays: [0, 6], // 隐藏星期六和星期天
      //eventContent: this.customEventContent,
      // eventRender: this.customDayRender
    
    },
  }
},
props: {
    weekMoonTable_data: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.events=[]
    this.weekMoonTable_data.forEach((element,index) => {
      this.events.push({
        title: element.num,
        start: new Date(element.time),
        end: new Date(element.time)

      })
    });
   
  },
methods: {
  getCellClass(date) {
      // 查找当前日期是否在 specialDates 中
      console.log("date",date)
      const specialDate = this.weekMoonTable_data.find(sd => sd.time === date.format('YYYY-MM-DD'));
      if (specialDate) {
        return 'active1';
      }
      return '';
    },
  customEventContent(arg) {
      const value = parseInt(arg.event.title, 10);
      console.log("value1111",value)
      const color = value < 0 ? 'green' : 'red';
      return { html: `<div style="background-color: ${color}; color: white; padding: 5px; text-align: center;">${arg.event.title}</div>` };
    },
  customEventRender(event, element) {
    const value = parseInt(event.title, 10);
    console.log("value1111",value)
    if (value < 0) {
      element.css('background-color', 'green');
    } else if (value > 0) {
      element.css('background-color', 'red');
    }
  },
  //切换日期
  switchDate () {
    var date1 = "2022/04/11";
    if (this.date_input != '') {
      date1 = this.date_input
    }
    var date = $("#calendar2").fullCalendar("moment", date1);
    console.log(date);
    $("#calendar2").fullCalendar('gotoDate', date1)
  },
  toPrev () {

    console.log(this.$refs.calendar2);
    $("#calendar2").fullCalendar('prev')
  },
  toNext () {
    $("#calendar2").fullCalendar('next')

  },
  // 注释的是功能是可以修改对应的功能值属性，比如设置  eventLimit为 false
  //  this.$refs.calendar.fireMethod('option',{
  //      eventLimit :false
  //  })
  dayClick (date, jsEvent, view) {
    // 点击当天的事件
    alert('农历数据：' + JSON.stringify(window.lunar(date._d)))
    console.log(date, jsEvent, 'dayClick')
  },
  eventSelected (event, jsEvent, view) {
    // 选中事件
    console.log(event, jsEvent, 'eventSelected')
  },
  viewRender (view, element) {
    console.log(view, element, 'viewRender')
  },
  enter () {
    this.$router.push('/explain')
  }
}
}
</script>
<style lang="scss">
.fc-day-grid-event {
  color: white;
  text-align: center;
  padding: 5px;
}
.fc-day-grid-container {
height: 100% !important;
}
</style>
<style scoped lang="scss">
$color: #45b984;
header {
position: absolute;
top: 5px;
left: 10px;
width: 100%;
z-index: 2;
}
.triangle {
width: 0;
height: 0;
border-top: 50px solid black;
border-right: 50px solid transparent;
border-left: 50px solid transparent;
}
.bg {
}
.lunarFullCalendar {
position: relative;
height: 100%;
padding: 30px 0px 20px 0px;
display: flex;
box-shadow: 1px 1px 3px 3px #2c2c2c2e;
border-radius: 10px;
background-color: white;
//   .top {
//     height: 100px;
//     h2 {
//       text-align: center;
//       font-size: 15px;
//     }
//     div {
//       font-size: 13px;
//     }
//   }
.full-calendar {
  background-color: white;
  padding: 10px;
  height: calc(100% - 30px);
  height: auto; //设置高度

  /deep/ {
    .fc-unthemed thead,
    .fc-unthemed .fc-content,
    .fc-unthemed th,
    .fc-unthemed td,
    .fc-unthemed tbody,
    .fc-unthemed .fc-row,
    .fc-unthemed .fc-list-view,
    .fc-unthemed .fc-popover,
    .fc-unthemed .fc-divider,
    .fc-unthemed .fc-list-heading td {
      border-color: #eaecf1;
    }

    .fc-unthemed .fc-row {
      height: 70px !important; //设置高度
    }
    .fc-header-toolbar {
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      h2 {
        font-size: 16px;
        color: #000;
      }
    }
    .fc-unthemed .fc-head {
      th {
        span {
          color: #1d262e;
          font-size: 14px;
        }
      }
    }
    .fc-button {
      height: 30px;
      background: #fff;
      border-color: #fff;
      box-shadow: none;
      padding: 0;
    }
    .fc-today-button {
      font-size: 15px;
      color: $color;
    }
    .fc-show-button,
    .fc-hide-button {
      position: relative;
      width: 80px;
      border: 1px solid #bbbfcd;
      border-radius: 20px;
      font-size: 15px;
      color: #000;
    }
    .fc-next-button,
    .fc-prev-button {
      color: #7d8292;
    }
    .fc-button-group {
      margin-left: 20px;
      font-size: 15px;
      button {
        width: 80px;
        color: #000;
        border: 1px solid #bbbfcd;
      }
      button:first-child {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      button:last-child {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .fc-state-active {
        background: $color;
        color: #fff;
        text-shadow: none;
      }
    }
    .fc-agendaDay-view,
    .fc-month-view,
    .fc-agendaWeek-view {
      .fc-widget-content {
        .fc-sun,
        .fc-sat {
          background: rgba(245, 246, 248, 0.6);
        }

        .fc-sat,
        .fc-sun {
          color: #d03125;
          position: relative;
        }
        .fc-sat::before,
        .fc-sun::before {
          content: "";
          position: absolute;
          right: 0px;
          top: 0px;
          color: #45b984;
          padding: 2px;
        }
        .fc-day-number {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0;
          line-height: 13px;
          float: left;
          text-align: right;
          float: none;
          display: block;
        }
        .fc-day-top {
          padding: 15px 5px 0 5px;
        }
        .fc-day-cnTerm {
          font-size: 10px;
          color: #7d8292;
          float: right;
          display: block;
          text-align: right;
          width: 100%;
        }

        .fc-day-cnDate {
          font-size: 12px;
          color: #7d8292;
          float: right;
          text-align: right;
          float: none;
          display: block;
        }

        .fc-tue {
          .fc-day-cnTerm {
            color: #ce200f;
            font-weight: 600;
          }
        }
        .fc-more {
          font-size: 12px;
          color: #7d8292;
        }
        .fc-event {
          cursor: pointer;
          font-size: 12px;
          color: #000;
          background-color: rgba($color: $color, $alpha: 0.15) !important;
          border: 1px solid rgba($color: $color, $alpha: 0.15) !important;
          border-left: 2px solid rgba($color: $color, $alpha: 0.15) !important;
          border-radius: 0;
        }
        .fc-day-grid-event {
          padding: 1px 0 1px 5px;
        }
      }
    }
    .fc-agendaWeek-view,
    .fc-agendaDay-view {
      .fc-axis {
        font-size: 15px;
      }
      .fc-title {
        font-size: 15px;
        color: $color;
      }
    }
    .fc-month-view {
      .fc-event {
        &.fc-not-start {
          border-left: 1px solid rgba($color: $color, $alpha: 0.1) !important;
        }
      }
    }
    .fc-agendaDay-view {
      .fc-head {
        table {
          margin: 15px 0;
        }
        .fc-day-header {
          display: none;
        }
      }
    }
    .fc-head {
      .fc-day-header,
      .fc-widget-header,
      .fc-head-container {
        border-top-color: #fff;
        border-left-color: #fff;
        border-right-color: #fff;
      }
      .fc-widget-header {
        height: 100% !important;
        border: 1px solid #eeeff3;
        border-bottom: 0px;
      }
      table {
        margin: 10px 0 15px 0;
        font-size: 15px;
        color: #000;
      }
    }
  }
}
}

.tip {
color: $color;
text-align: center;
font-size: 16px;
cursor: pointer;
}
</style>
