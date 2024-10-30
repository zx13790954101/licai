<template>
  <div class="explain">
    <section>
      <h3>{{ name }}</h3>
      <p>{{ text }}</p>
    </section>
  </div>
</template>
<script>
import datalist from "./index.json";
//可以选择组件
export default {
  data() {
    return {
      name: "",
      text: "",
    };
  },
  created() {
    this.name = datalist.data[this.type_state].name;
    this.text = datalist.data[this.type_state].text;
  },
  components: {},
  //数组规则
  props: {
    type_state: {
      type: Number,
      default: 0,
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.explain {
  text-align: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 #0000001a;
  h3 {
  }
  p {
  }
}
</style>
