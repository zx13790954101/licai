<template>
  <div class="msg-box">
    <section>
      <button class=“”>短期消息</button>
    </section>
    <section>
      <button class=“”>中期消息</button>
    </section>
    <section>
      <button class=“”>长期消息</button>
    </section>
    <section>
      <button class=“”>政策</button>
    </section>
    <section>
      <button class=“”>外围消息</button>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  created () {

  },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="scss">
.msg-box {
  padding: 20px;
  box-shadow: 1px 1px 3px 3px #2c2c2c2e;
  border-radius: 10px;
  background-color: white;
  margin-right: 20px;

  section {
    width: 300px;
    button {
      border: 1px solid #333333;
      margin: 5px 0px;
    }
  }
}
</style>
