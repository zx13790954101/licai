(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{"31jI":function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"index"},[t("div",{staticClass:"menu-box"},[t("ul",[t("li",{class:1==e.default_active?"active":"",on:{click:function(t){e.default_active=1}}},[e._v("\n        版块\n      ")]),e._v(" "),t("li",{class:2==e.default_active?"active":"",on:{click:function(t){e.default_active=2}}},[e._v("\n        大盘\n      ")]),e._v(" "),t("li",{class:3==e.default_active?"active":"",on:{click:function(t){e.default_active=3}}},[e._v("\n        国内\n      ")]),e._v(" "),t("li",{class:4==e.default_active?"active":"",on:{click:function(t){e.default_active=4}}},[e._v("\n        全球\n      ")]),e._v(" "),t("li",[t("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(t){return e.switchBtn()}},model:{value:e.switchType,callback:function(t){e.switchType=t},expression:"switchType"}})],1)])]),e._v(" "),1==e.default_active?t("section",{staticClass:"section-item1"},[t("sectionBox")],1):e._e(),e._v(" "),2==e.default_active?t("section",{staticClass:"section-item2"},[t("sectionBox2")],1):e._e(),e._v(" "),3==e.default_active?t("section",{staticClass:"section-item2"},[t("sectionBox3")],1):e._e(),e._v(" "),4==e.default_active?t("section",{staticClass:"section-item2"},[t("sectionBox4")],1):e._e()])},o=[]},UVWw:function(e,t,n){"use strict";n.r(t);var i=n("Z56g"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t.default=o.a},VdFg:function(e,t,n){(t=n("JPst")(!1)).push([e.i,".index[data-v-57fa606e]{background-color:#ffffff;min-height:100vh;width:100%}.index .link_btn[data-v-57fa606e]{border-radius:50px;width:60px;height:60px;background-color:#8bc34a;color:white;position:absolute;right:5%;top:-15%;border-radius:10px 10px 20px 0px}.index header[data-v-57fa606e]{height:40px;width:100%;background-color:#272633;justify-content:center}.index section[data-v-57fa606e]{padding:0px 0px;min-height:100px;width:100%;overflow:hidden}.index .menu-box[data-v-57fa606e]{position:fixed;background-color:#ff9800;left:50%;transform:translateX(-50%);bottom:0%;width:auto;z-index:100;padding:5px 5px 0px 5px;box-shadow:1px -2px 3px 4px #89898933;border-radius:10px 10px 0px 0px}.index .menu-box ul[data-v-57fa606e]{display:flex;width:auto}.index .menu-box li[data-v-57fa606e]{padding:10px 20px;margin:0px 10px;font-size:16px;font-weight:600;letter-spacing:1px;text-align:right;color:wheat;box-sizing:content-box;cursor:pointer;letter-spacing:1px}.index .menu-box .active[data-v-57fa606e]{background-color:white;color:#000000;font-size:18px;font-weight:600;border-radius:20px;width:70px;height:40px;padding:0px;display:flex;justify-content:center;align-items:center}\n",""]),e.exports=t},Z56g:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{default_active:2,switchType:!1}},created:function(){this.switchType=!!sessionStorage.getItem("this_view_type")},components:{sectionBox:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(7),n.e(24)]).then(n.bind(null,"HnVK"))},sectionBox2:function(){return n.e(50).then(n.bind(null,"CDKL"))},sectionBox3:function(){return Promise.all([n.e(0),n.e(1),n.e(28)]).then(n.bind(null,"djea"))},sectionBox4:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(2),n.e(23)]).then(n.bind(null,"3Qhl"))},headerNav:function(){return Promise.all([n.e(0),n.e(4),n.e(77)]).then(n.bind(null,"9NPD"))}},methods:{switchBtn:function(){0==this.switchType?sessionStorage.removeItem("this_view_type"):sessionStorage.setItem("this_view_type",1)},toLink:function(){var e=this.$router.resolve({path:"/linkBox"});window.open(e.href,"_blank")},handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)}}}},bAwQ:function(e,t,n){var i=n("LboF"),o=n("VdFg");"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};i(o,a);e.exports=o.locals||{}},f1x9:function(e,t,n){"use strict";n.r(t);var i=n("31jI"),o=n("UVWw");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("r69J");var c=n("KHd+"),s=Object(c.a)(o.default,i.a,i.b,!1,null,"57fa606e",null);t.default=s.exports},r69J:function(e,t,n){"use strict";n("bAwQ")}}]);
//# sourceMappingURL=85.cca62b2b93f8587220cc.js.map