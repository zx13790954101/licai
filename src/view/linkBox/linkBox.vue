<template>
  <div class="linkBox">
    <dateBox></dateBox>
    <div class="list-box">
      <!-- <swiperPlate></swiperPlate> -->

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="整体" name="1">
          <section>
            <div
              class="head_item"
              v-for="(item, index) in data_list"
              :key="index"
            >
              <div class="head">
                <h4>{{ item.name }}</h4>
              </div>
              <ul class="">
                <li
                  v-for="(item2, index2) in item.item_list"
                  class="item"
                  :key="index2"
                >
                  <a :href="item2.link" target="three">
                    <h5>{{ item2.title }}</h5>
                  </a>
                </li>
              </ul>
            </div>
          </section></el-tab-pane
        >

        <el-tab-pane label="基金" name="2">
          <section>
            <div
              class="head_item"
              v-for="(item, index) in data_list2"
              :key="index"
            >
              <div class="head">
                <h4>{{ item.name }}</h4>
              </div>
              <ul class="">
                <li
                  v-for="(item2, index2) in item.item_list"
                  class="item"
                  :key="index2"
                >
                  <a :href="item2.link" target="three">
                    <h5>{{ item2.title }}</h5>
                  </a>
                </li>
              </ul>
            </div>
          </section></el-tab-pane
        >

        <el-tab-pane label="新闻" name="3">
          <analysis></analysis>
        </el-tab-pane>
        <el-tab-pane label="上证指数日期走势图" name="4">
          <dateKline></dateKline>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import linkList from "./assets/link";
import linkList2 from "./assets/link2";
export default {
  data() {
    return {
      activeName: "4",
      drawer: false,
      direction: "ltr",
      data_list: [],
      data_list2: [],
    };
  },
  components: {
    dateBox: () => import("./dateBox.vue"),
    swiperPlate: () => import("../common/swiperPlate.vue"),
    analysis: () => import("../item/index2/analysis.vue"),
    dateKline: () => import("../fuCommon/dateKline.vue"),
  },
  created() {
    window.title = "黄页";
    this.data_list = linkList.list;
    this.data_list2 = linkList2.list;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      done();
    },
  },
};
</script>
<style scoped lang="scss">
.linkBox {
  min-height: 100vh;
  display: flex;
  background-color: #f1f4f9;
  .date_btn {
    position: fixed;
    bottom: 5%;
    right: 5%;
  }
  .list-box {
    width: 90%;
    overflow: hidden;
    margin: 0px auto;
    text-align: center;
    padding-top: 20px;
    box-shadow: 0px 0px 2px 1px #ffffff17;
    border-radius: 10px;
    margin-left: 50px;
    section {
      .head_item {
        margin-bottom: 0px;
        padding: 0px 0px 30px 0px;
        text-align: left;
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: white;
        section {
          background-color: white;
          padding: 10px 20px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: 10px 10px;
        }
        .head {
          background-color: #f8f8fa;
          padding-left: 20px;
          text-align: left;
          padding: 5px 10px 5px 10px;
          margin-bottom: 10px;
          background: #fff7e0;
          border-bottom: 1px solid #ffbc05;
          // border-bottom: 1px solid #b3b3b3;
        }
        h4 {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          padding: 7px 15px;
          display: inline-block;
          color: #000000;
          text-align: left;
          position: relative;
          padding-left: 10px;
          /* background-color: #ffdd00; */
          width: 100%;
          color: #333333;
          padding: 5px 10px 5px 10px;
          color: #3c3c3c;
          font-size: 16px;
        }
        h5 {
          // border-left: 3px solid #f44336;
          padding-left: 15px;
          position: relative;
        }
        h5::before {
          background: #e6394d;
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 2;
        }
        .item {
          display: inline-block;

          margin: 0px;
          // border: 2px solid #000000;
          // border-radius: 30px;
          // background-color: #fa4238;

          padding: 0px 10px 0px 10px;
          height: 40px;
          width: 25%;

          a {
            font-size: 16px;
            color: #ffffff;
            color: #3c3c3c;
          }
          a:hover {
            color: blue;
          }
        }
      }
    }
  }
}
</style>
