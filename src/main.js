import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './css/main.css'
import axios from 'axios'
import store from '../store/store'
import preview from 'vue-photo-preview'
import lazyload from 'vue-lazyload'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-photo-preview/dist/skin.css'
import 'font-awesome/css/font-awesome.min.css'
import qs from 'qs'
import VueHtml5Editor from 'vue-html5-editor'

import {
  debounce,
  throttle
} from 'lodash'
import {
  card,
  button,
  form,
  formItem,
  input,
  table,
  tableColumn,
  dialog,
  image,
  dropdown,
  dropdownMenu,
  dropdownItem,
  Message,
  pagination,
  upload,
  collapse,
  collapseItem
} from 'element-ui'
Vue.use(preview)
Vue.use(card)
Vue.use(button)
Vue.use(form)
Vue.use(formItem)
Vue.use(input)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(dialog)
Vue.use(image)
Vue.use(dropdown)
Vue.use(dropdownMenu)
Vue.use(dropdownItem)
Vue.use(pagination)
Vue.use(upload)
Vue.use(collapse)
Vue.use(collapseItem)
Vue.use(lazyload, {
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558333261095&di=fa650d5707f50387f99a7934326c94e2&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160127%2Fmp56791937_1453886827459_16.gif'
})
Vue.use(VueHtml5Editor, {
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
  // global component name
  name: "vue-html5-editor",
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: true,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: "fa fa-pencil",
    color: "fa fa-paint-brush",
    font: "fa fa-font",
    align: "fa fa-align-justify",
    list: "fa fa-list",
    link: "fa fa-chain",
    unlink: "fa fa-chain-broken",
    tabulation: "fa fa-table",
    image: "fa fa-file-image-o",
    hr: "fa fa-minus",
    eraser: "fa fa-eraser",
    undo: "fa-undo fa",
    "full-screen": "fa fa-arrows-alt",
    info: "fa fa-info",
  },
  // 配置图片模块
  // config image module
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 51200 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    // upload: {
    //   url: 	'https://sm.ms/api/upload',
    //   headers: {},
    //   params: {},
    //   fieldName: {}
    // },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText) {
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText)
      if (!json.ok) {
        alert(json.msg)
      } else {
        return json.data
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  //default en-us, en-us and zh-cn are built-in
  language: "zh-cn",
  // 自定义语言
  i18n: {
    //specify your language here
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "info": "关于",
      "color": "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置"
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    "text",
    "color",
    "font",
    "align",
    "list",
    "link",
    "unlink",
    "tabulation",
    "image",
    "hr",
    "eraser",
    "undo",
    "full-screen",
    "info",
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: {
    //omit,reference to source code of build-in modules
  }
})
Vue.prototype.throttle = throttle
Vue.prototype.debounce = debounce
Vue.prototype.$Message = Message
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.baseURL = '/blog'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.filter('fmTime', function (val) {
  if (!val) return ''
  let date = new Date(val)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  hh = hh >= 10 ? hh : '0' + hh
  mm = mm >= 10 ? mm : '0' + mm
  ss = ss >= 10 ? ss : '0' + ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  el: '#app',
  data() {
    return {

    }
  },
  router,
  store,
  render: h => h(App)
})
