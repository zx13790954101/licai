<template>
  <div class="thermometer">
    <section class="box flex-c">
      <div class="flex-item">
        <ul>
          <li v-for="(item, index) in datalist1" :key="index">
            <p>{{ item }}</p>
            <span> </span>
          </li>
        </ul>
      </div>
      <div class="flex-item"></div>
    </section>
  </div>
</template>
<script>
import Section from "../section.vue";
//温度计q
export default {
  data() {
    return {
      datalist1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  computed: {},
  created() {},
  props: {
    value: Boolean,
    name: String,
    timeData: Array,
    markLine: Array,
    datalist: Array,
  },
  components: { Section },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.thermometer {
  .box {
    width: 80px;
    background-color: #e2e2e2;
    border-radius: 10px;
    overflow: hidden;

    li {
      span {
      }
    }
  }
}
</style>
