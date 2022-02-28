// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from "jquery"
import '../static/css/css/style.css';
import '../static/css/css/video.css';
import '../static/css/css/swiper.css';
import '../static/css/css/login.css';
import '../static/css/css/fonts/iconfont.css';
import '../static/css/style/icon.css';
import '../static/css/style/select.css';
import '../static/css/style/row.css';
import '../static/css/style/col.css';
import '../static/css/style/pagination.css';
import '../static/css/style/table.css';
import '../static/css/style/input.css';
import '../static/css/style/button.css';
import '../static/css/style/date-picker.css';
import '../static/css/fonts/iconfont.css';
import "../static/css/js/zTree_v3/js/jquery.ztree.core.min.js";
import "../static/css/js/zTree_v3/js/jquery.ztree.excheck"
import "../static/css/js/zTree_v3/css/zTreeStyle/zTreeStyle.css";
import "../static/css/js/jquery.nicescroll";
import "../static/css/js/common";
import ElementUi from 'element-ui'
import '../theme/index.css'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import App from './App'
import router from './router'
import './styles/font.css'
import echarts from 'echarts'
import echartsMin from '../static/css/js/echarts.min'
import '../static/css/js/echarts-skin'
import DateFormat from './components/common/unit/DateFormat'
import AppConfig from '../static/ApplicationConfig'
import md5 from 'js-md5'    ;
import loadBMap from "./components/common/unit/loadBMapApi";
import VueECharts from 'vue-echarts'
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import "./plugins/video.js";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "./components/common/unit/ruoyi";
Vue.use(ElementUi);
Vue.use(Viewer);
Vue.prototype.$md5 = md5;

Vue.use(BaiduMap,{
  ak:'N9ZttRqRXqE1ZnxEr17ftskG'
});
import store from './store/index'
Vue.config.productionTip = false;
//赋给全局使用
window.$ = $;
window.echarts = echarts;
Vue.component('v-chart', VueECharts)
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (sessionStorage.getItem("token") != null) {// 判断当前的token是否存在 ；
    // console.log("auth认证成功"+sessionStorage.getItem("token"));
    config.headers['Authorization'] = 'Bearer '+ sessionStorage.getItem("token");
  } else {
    router.app.$router.push('/');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    //登录校验不正确跳到登录界面
    switch (response.data.status) {
        case 50005:
            sessionStorage.removeItem("token")
            router.app.$message.error("重新登录！");
            router.app.$router.push('/');
            return Promise.reject(response);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth){// 判断该路由是否需要登录权限
    // console.log("当前页面需要校验是否已经登陆");
    if (sessionStorage.getItem("token") != null){// 判断当前的token是否存在 ； 登录存入的token
      next();
    }else {
      next({
        path: '/',
        query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

//js日期格式化
DateFormat.init();

//引入公共信息文件
// var AppConfig = app_config;
Vue.prototype.AppConfig = AppConfig;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.IMG_URL = AppConfig.appInfo.IMG_URL;
Vue.prototype.IMG_URL1 = AppConfig.appInfo.IMG_URL1;
Vue.prototype.baidu_ak = 'N9ZttRqRXqE1ZnxEr17ftskG';
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
/* eslint-disable no-new */
let vm  = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created() {
        window.vm=this
    }
})
