<template>
  <div class="macroscopicData ">
    <section class="head"></section>
    <section class="head flex-c">

      <div class="flex-item">
        <div id="macros1"
             class="item"></div>
      </div>
      <div class="flex-item">

        <div id="macros2"
             class="item"></div>
      </div>
    </section>
    <section class="bottom flex-c">
      <div class="flex-item">
        <div id="macros3"
             class="item"></div>
      </div>
      <div class="flex-item">
        <div id="macros4"
             class="item"></div>
      </div>
    </section>
  </div>
</template>
<script>

import initGdpCpi from '../../assets/js/gdpcpi_init'
import initm1m2 from '../../assets/js/m1m2_init'
import cpippi from '../../assets/js/cpippi'
import cpi from '../../assets/js/cpi'
export default {
  components: {
  },
  created () {


  },
  mounted () {
    this.$nextTick(() => {
      initGdpCpi.initGdp()
      initm1m2.initM1M2()
      cpi.cpi()
      cpippi.cpippi()
      ///this.init1()
    })

  },
  methods: {


  }
}
</script>


<style scoped lang="scss">
.macroscopicData {
  padding: 20px;
  box-shadow: 1px 1px 3px 3px #2c2c2c2e;
  border-radius: 10px;
  background-color: white;
  margin-top: 20px;

  .item {
    width: 500px;
    height: 400px;
  }
}
</style>

