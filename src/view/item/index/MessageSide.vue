<template>
  <div class="MessageSide">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="日常消息(选股宝)" name="first">
        <ul class="list_ul">
          <li v-for="(item, index) in msg_list" :key="index">
            <h2>{{ item.Title }}</h2>
            <div class="box">
              <h5>
                {{ item.Summary }}
              </h5>
              <span>
                {{ dateFormat2("YYYY-mm-dd HH-MM-SS ", item.CreatedAt) }}
              </span>
            </div>
          </li>
        </ul>

        <nav class="flex-c">
          <span class="flex-item"> </span>
          <span @click="more">(来自财联社)更多 </span>
        </nav>
      </el-tab-pane>
      <el-tab-pane label="股吧" name="second">
        <div class="flex-c">
          <a href="http://guba.eastmoney.com/list,bk0896.html" target="_blank"
            >白酒吧(来自东方财富网)</a
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="机构点评" name="third">
        <a href="http://guba.eastmoney.com/list,bk0896.html" target="_blank"
          >白酒吧(第一财经)</a
        >
        <a
          href="http://search.sina.com.cn/?t=keyword&c=news&q=%E7%99%BD%E9%85%92"
          target="_blank"
          >白酒(新浪财经)</a
        >
        <a
          href="https://www.yicai.com/search?keys=%E7%99%BD%E9%85%92l"
          target="_blank"
          >白酒吧(来自东方财富网)</a
        >
      </el-tab-pane>
      <el-tab-pane label="博主点评" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getXGBmsgData } from "../../../lib/api/xgb.js";
//消息面
export default {
  data() {
    return {
      activeName: "first",
      active_num: 0,
      msg_list: [],
    };
  },
  created() {
    var that = this;
    getXGBmsgData(function (res) {
      that.msg_list = res.data.Messages;
    });
  },
  mounted() {},
  methods: {
    dateFormat2(fmt, date) {
      date = new Date(date * 1000);
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    more() {
      //https://xuangubao.cn/subject/bkj/16961441
      window.open("https://www.cls.cn/plate?code=cls80014", "top");
    },
  },
};
</script>
<style lang="scss">
.MessageSide {
  .el-card__body {
    padding: 10px;
  }
}
</style>
<style scoped lang="scss">
.MessageSide {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  nav {
    padding: 10px 0px;
  }
  .list_ul {
    max-height: 300px;
    overflow-y: scroll;
    padding: 10px;
    li {
      border-bottom: 1px solid #efefef;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 16px;
      font-weight: 400;
    }
    .box {
      h5 {
        font-size: 12px;
        color: #666;
        word-wrap: break-word;
        word-break: break-all;
        display: -webkit-box; //谷歌
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //显示几行
        overflow: hidden;
      }
    }
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
