<template>
  <div class="calendar_div">
    <el-date-picker v-model="selectDate" type="date" placeholder="Pick a day" @change="handleSelectDate" />
    <el-button icon="ArrowLeft" circle @click="handleLeftBtn" />
    <el-button icon="ArrowRight" circle @click="handleRightBtn" />
    <div id="calendar" style="height: 100%"></div>
  </div>

</template>
<script>
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      useCreatePopup: true,
      useDetailPopup: true,
      calendar: undefined,
      selectDate:''
    }
  },
  methods: {
    init() {
      this.calendar = new Calendar('#calendar', {
        defaultView: 'week',
        useFormPopup: this.useCreatePopup,
        useDetailPopup: this.useDetailPopup,
        usageStatistics: false,
        // timezone:{
        //   zones:[
        //     {
        //       timezoneName:'Australia/Sydney',
        //     }
        //   ]
        // },
        template: {
          milestone: function (model) {
            return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
          },
          popupIsAllday() {
            return 'All day';
          },
          popupStateFree() {
            return 'Free';
          },
          popupEdit() {
            return 'Edit';
          },
          popupDelete() {
            return 'Delete';
          },
          popupDetailTitle({title}) {
            return title;
          },
          popupDetailLocation({location}) {
            return location;
          },
        },
        week:{
          taskView:false
        }
      });
      this.calendar.createEvents([
        {
          id: uuidv4(),
          title: 'Weekly Meeting',
          start: new Date(Date.now()),
          end: new Date(Date.now()+30*60*1000),
        },
      ]);
      // 创建
      this.calendar.on("beforeCreateEvent", (e) => {
        console.log("创建",e)
        this.calendar.createEvents([
          {
            id: uuidv4() ,
            calendarId: 'cal1',
            title: e.title,
            start: e.start.d.d,
            end: e.end.d.d,
            isAllday: e.isAllday,
            location: e.location,
            state: e.state,
            color: '#fff',
            backgroundColor: '#3c056d',
            dragBackgroundColor: '#3c056d',
            customStyle: {
              fontStyle: 'italic',
              fontSize: '15px',
            },
          }, // EventObject
        ])
      })
      //修改
      this.calendar.on('beforeUpdateEvent', (e) => {
        console.log("修改",e)
        const targetEvent = e.event;
        const changes = {...e.changes};
        this.calendar.updateEvent(targetEvent.id, targetEvent.calendarId, changes);
      });
      //删除
      this.calendar.on('beforeDeleteEvent', (e) => {
        console.log("删除",e)
        this.calendar.deleteEvent(e.id, e.calendarId);
      });
    },
    handleLeftBtn(){
      this.calendar.prev()
    },
    handleRightBtn(){
      this.calendar.next()
    },
    handleSelectDate(){
      this.calendar.setDate(this.selectDate)
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style scoped lang="scss">
.calendar_div{

}
</style>