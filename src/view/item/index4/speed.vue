<template>
  <div class="speed">
    <section>
      <ul>
        <li>
          <div class="title"></div>
        </li>
      </ul>
      <div class="bar"></div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: [],
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.speed {
  section {
    position: relative;
    width: 100px;
    height: 100px;
  }
  .bar {
  }
}
</style>
