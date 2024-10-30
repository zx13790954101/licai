<template>
  <div class="KlineDiagram">
    <nav class="flex-c">
      <span class="flex-item"> </span>
      <span @click="more"> 更多 </span>
    </nav>
    <div class="flex-c">
      <section class="box1">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in data_list2"
            :key="index"
            :timestamp="item.data"
            placement="top"
          >
            <el-card>
              <a :href="item.href">
                <h4>{{ item.title }}</h4>
                <p>{{ item.tip }}</p>
              </a>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </section>
      <section class="box2 flex-item">
        <template>
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in data_list_content[active_num]"
              :key="index"
              :timestamp="item.data"
              placement="top"
            >
              <a :href="item.href">
                <h4>{{ item.title }}</h4>
                <p>
                  {{ item.tip }}
                  <span
                    :style="{
                      color: parseInt(item.end) > 0 ? '#e94041' : '#05a687',
                    }"
                    >大盘涨幅{{ item.end }}</span
                  >
                </p>
              </a>
            </el-timeline-item>
          </el-timeline>
        </template>
      </section>
    </div>
  </div>
</template>
<script>
//K线图分析
export default {
  data() {
    return {
      active_num: 0,
      data_list2: [
        {
          title: "中央政治局会议",
          href: "baidu.com",
          tip: "稳定发展经济",
          data: "2022-4-29",
          id: "2022429",
        },
        {
          title: "中央政治局会议",
          href: "baidu.com",
          tip: "稳定发展经济",
          data: "2022-4-29",
          id: "2022429",
        },
        {
          title: "中央政治局会议",
          href: "baidu.com",
          tip: "稳定发展经济",
          data: "2022-4-29",
          id: "2022429",
        },
      ],
      data_list_content: [
        [
          {
            title: "中央政治局会议",
            href: "baidu.com",
            tip: "稳定发展经济",
            end: "5%",
            data: "2022-4-29",
            id: "2022429",
          },
        ],
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    more() {},
  },
};
</script>
<style lang="scss">
.KlineDiagram {
  .el-card__body {
    padding: 10px;
  }
}
</style>
<style scoped lang="scss">
.KlineDiagram {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  nav {
    padding: 10px 0px;
  }

  .box1 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    margin-right: 20px;
    padding-right: 10px;
    min-width: 200px;
    padding-left: 20px;
  }
  h4 {
    font-size: 12px;
  }

  p {
    font-size: 12px;
  }
  .box2 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    background-color: #242323;
    padding: 10px 10px;
    a {
      color: white;
    }
  }
}
</style>
