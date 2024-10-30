<template>
  <div class="index">


    <clockIndex></clockIndex>
    <!-- <calendarIndex></calendarIndex> -->

  </div>
</template>
<script>
import calendarIndex from "./calendar/index.vue";
import clockIndex from "./clock/index.vue";
export default {
  data() {
    return {

    };
  },
  components: {
    calendarIndex,
    clockIndex
  },
  created () {

  },
  mounted() {


  },
  methods: {
  
  },
};
</script>
<style scoped lang="scss">
</style>
