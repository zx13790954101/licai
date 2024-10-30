<template>
  <div class="index">
    <speedTime></speedTime>
    <speedWeek></speedWeek>
     <imitate>  </imitate>
    <sliderPips></sliderPips>
  </div>
</template>
<script>
import sliderPips from "./sliderPips.vue";
import imitate from "./imitate.vue"
import speedTime from "./speedTime.vue"
import speedWeek from "./speedWeek.vue"
export default {
  data () {
    return {

    }
  }, 
  created () {

  },
  mounted () {

  },
  components: {
    sliderPips,
    imitate,
    speedTime,
    speedWeek
  },
  methods: {
  },
}
</script>
<style scoped lang="scss">
</style>
