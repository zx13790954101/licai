import Vue from 'vue'
import Router from 'vue-router'
// 主页面结构
const lunarFullCalendar = () => import('@/view/lunarFullCalendar.vue')

// 主页面结构
const main = () => import('@/view/main.vue')
// 说明
const explain = () => import('@/view/explain.vue')
const linkBox = () => import('@/view/linkBox/linkBox.vue')
const cycle = () => import('@/view/cycle.vue')
const index = () => import('@/view/index.vue')
const kline = () => import('@/view/kline.vue')
const kline2 = () => import('@/view/kline2.vue')
const lineChart = () => import('@/view/lineChart.vue')
const CapitalSide = () => import('@/view/item/index/CapitalSide.vue')
const test = () => import('@/view/test.vue')
const Capital = () => import('@/view/Capital.vue')
const fundView = () => import('@/view/fundView.vue')
//版块
const section = () => import('@/view/section.vue')
//版块详情
const limitBoard = () => import('@/view/limitBoard.vue')
//新闻
const news = () => import('@/view/news.vue')
//分析股票和版块
const analysis = () => import('@/view/analysis.vue')


//分析股票和版块
const summarize = () => import('@/view/summarize/index.vue')

//游戏人物属性模板介绍页
const person = () => import('@/person/views/index.vue')

//webHome
const webHome = () => import('@/view/webHome/index.vue')


Vue.use(Router)
const routes = [{
  path: '*',
  redirect: '/main'
},
{
  path: '/vue-lunar-fullCalendar',
  name: 'fullCalendar',
  component: lunarFullCalendar
  },
  //游戏人物介绍页
  {
    path: '/person',
    name: 'person',
    component: person
  },
{
  path: '/index',
  name: 'index',
  component: index
  }
  //设计股票版块的列表
  , {
  path: '/summarize',
  name: 'summarize',
  component: summarize
},
{
  path: '/analysis',
  name: 'analysis',
  component: analysis
},
{
  path: '/fundView',
  name: 'fundView',
  component: fundView
},{
  path: '/news',
  name: 'news',
  component: news
},
{
  path: '/section',
  name: 'section',
  component: section
},
{
  path: '/CapitalSide',
  name: 'CapitalSide',
  component: CapitalSide
},{
  path: '/limitBoard',
  name: 'limitBoard',
  component: limitBoard
}, {
  path: '/kline',
  name: 'kline',
  component: kline
},
{
  path: '/lineChart',
  name: 'lineChart',
  component: lineChart
},
{
  path: '/test',
  name: 'test',
  component: test
},
{
  path: '/Capital',
  name: 'Capital',
  component: Capital
},{
  path: '/kline2',
  name: 'kline2',
  component: kline2
},
{
  path: '/main',
  name: 'main',
  component: main
},
{
  path: '/explain',
  name: 'explain',
  component: explain
},
{
  path: '/linkBox',
  name: 'linkBox',
  component: linkBox
}, {
  path: '/cycle',
  name: 'cycle',
  component: cycle
}, {
  path: '/webHome',
  name: 'webHome',
  component: webHome
}
]

const router = new Router({
  mode: 'history',//default: hash ,history
  // base: '/vue-lunar-fullcalendar',
  routes,
  linkActiveClass: 'my-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
export default router

