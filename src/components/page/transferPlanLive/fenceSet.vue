<template>
    <!-- 内容区域 -->
    <div class="main main-full" style="padding-bottom: 0px;">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="map-box">
            <!-- 地图 -->
            <div class="allmap" id="fenceMap"></div>
            <!-- 左侧查询条件 -->
            <div class="map-left">
                <!-- 筛选 -->
                <div style="height: 54px;background-color: white;">
                    <ul
                            class="filter-box"
                            style="    padding-top: 10px;margin-left: 25px; margin-right: 15px;"
                    >
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select w180">
                                    <el-cascader
                                            placeholder="选择所在地"
                                            ref="regionElCascader"
                                            v-model="search.regionInfo"
                                            @change="searchRegionChange()"
                                            :options="regionOptions"
                                            :props="{ checkStrictly: true }"
                                    ></el-cascader>
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-con">
                                <el-button
                                        type="button"
                                        size="small"
                                        @click="searchData"
                                        class="el-button el-button--primary"
                                >
                                    <span>查询</span>
                                </el-button>
                                <el-popover placement="top" width="180" v-model="visiblesub">
                                    <el-input placeholder="请输入围栏名称" v-model.trim="wlinput" clearable></el-input>
                                  <el-select v-model="fenceType" placeholder="请选择">
                                    <el-option
                                        v-for="item in fenceTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                  </el-select>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="IsInPolygon(false,wlinput)">取消</el-button>
                                        <el-button type="primary" size="mini" @click="IsInPolygon(true,wlinput)">确定</el-button>
                                    </div>
                                    <el-button type="primary" size="small" slot="reference">
                                        <span>保存围栏</span>
                                    </el-button>
                                </el-popover>
                                <el-button
                                        type="button"
                                        size="small"
                                        @click="clearAll()"
                                        class="el-button el-button--primary"
                                >
                                    <span>清除</span>
                                </el-button>
                            </div>
                        </li>
                        <li class="filter-item">
                            <el-popover placement="top" width="180" v-model="visibledel">
                                <el-input placeholder="请输入围栏编号" v-model.trim="polygonId" clearable></el-input>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="deletePolygon(false,polygonId)">取消</el-button>
                                    <el-button type="primary" size="mini" @click="deletePolygon(true,polygonId)">确定</el-button>
                                </div>
                                <el-button type="primary" size="small" slot="reference">
                                    <span>删除围栏</span>
                                </el-button>
                            </el-popover>
                        </li>
                        <li class="filter-item">
                            <el-upload :http-request="importPoint" action="fakeaction">
                                <el-button size="small" type="primary">上传围栏</el-button>
                            </el-upload>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 左侧图例 -->
            <div class="legend-box-top" style="left: 20px;">
              <div class="legend-bd">
                <ul class="legend-list">
                  <li><!--<span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/blackCar.png"></span>-->
                    <span style="font-size: initial;margin-right: 26px;">行政区域围栏 </span>
                    <el-switch
                        style="float: right"
                        v-model="fence.isRegionFenceOpen"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                  </li>
                  <li><!--<span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/redCar.png"></span>-->
                    <span style="font-size: initial;margin-right: 15px;">电子围栏(禁入)</span>
                    <el-switch
                        v-model="fence.isBanInFenceOpen"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                  </li>
                  <li><!--<span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/redCar.png"></span>-->
                    <span style="font-size: initial;margin-right: 15px;">电子围栏(禁出)</span>
                    <el-switch
                        v-model="fence.isBanOutFenceOpen"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 左侧图例 -->
            <div class="legend-box" style="left: 20px;">
              <div class="legend-hd">图例</div>
              <div class="legend-bd">
                <ul class="legend-list">
                  <li>
<!--                    <span class="tuli" style="margin-right: 10px">
                      <img style="width: 20px;" src="../../../../static/css/images/map/blackCar.png">
                    </span>-->
                    围栏编号:围栏名称
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
    import customOverlay from '../realTime/js/customOverlay';
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: "fenceSet",
        props: {},
        components: {
            BreadcrumbComponent
        },
        computed: {},
        data() {
            return {
                routePath: this.$route.path,
                fence:{
                  isRegionFenceOpen:true,
                  isBanInFenceOpen:false,
                  isBanOutFenceOpen:false
                },
                regionOptions: [],
                dicTypesOptions:[],
                map: null,
                overlays:[],
                user:{
                    regionCode: sessionStorage.getItem('regionCode'),
                    regionName: sessionStorage.getItem('regionName'),
                    regionLevel: sessionStorage.getItem('regionLevel'),
                    lng: sessionStorage.getItem('lng'),
                    lat: sessionStorage.getItem('lat'),
                },
                search: {
                    regionCode: sessionStorage.getItem('regionCode'),
                    regionInfo: sessionStorage.getItem('regionCode'),
                    regionName: sessionStorage.getItem('regionName'),
                    regionLevel: sessionStorage.getItem('regionLevel') == null ? this.AppConfig.appInfo.regionLevel : sessionStorage.getItem('regionLevel'),
                    regionParentCode: '',
                    lng: sessionStorage.getItem('lng'),
                    lat: sessionStorage.getItem('lat'),
                    times:["",""],
                    dictDetailCode:'',
                    zyUnit:''
                },
                visiblesub: false,

                visibledel: false,
                wlinput: "",
                fenceType:1,
                polygonId: "",
                fenceTypeOptions:[{
                  value: 1,
                  label: '禁入围栏'
                }, {
                  value: 2,
                  label: '禁出围栏'
                }]
            }
        },
        methods: {
            // 查询button
            searchData(){
                customOverlay.clearMap("all",this);
                if(this.fence.isRegionFenceOpen){
                  this.changeRegionBoundary();
                }
                if(this.fence.isBanInFenceOpen){
                  this.selectPoints(1);
                }
                if(this.fence.isBanOutFenceOpen){
                  this.selectPoints(2);
                }
                /*setTimeout(() => {
                    this.selectPoints();
                }, 500);*/
            },
            drawRegionFenceOpen(){
              var _this = this;
              customOverlay.queryDistrict(_this,_this.user.regionName);
            },
            // 清除覆盖物
            clearOver(){
                customOverlay.clearMap("regionInfoMaker",this);
            },
            // 初始化百度地图js
            initTransferMap(){
                var _this = this;
                loadBMapApi(_this.AppConfig.appInfo.baiDuMapAk, 1).then(() => {
                    _this.initBMap();
                }).catch((err) => {
                    // console.log(err);
                    // console.log("地图加载失败");
                });
            },
            // 初始化地图
            initBMap(){
                this.createMap().then(val => {
                    this.setMapEvent();//设置地图事件
                    this.addMapControl();//向地图添加控件
                    this.getRegionChildrenList().then(val => {
                        this.searchData();
                    });// 行政区域下拉集
                }); //创建地图
            },
            // 创建地图
            createMap(){
                return new Promise((resolve, reject) => {
                    var self = this;
                    var map = new BMap.Map("fenceMap",
                        {
                            // minZoom:9,// 显示级别
                            // maxZoom: 14,
                            enableMapClick: false// 构造底图时，关闭底图可点功能
                        }
                    );//在百度地图容器中创建一个地图
                    var point = new BMap.Point(self.user.lng, self.user.lat);//定义一个中心点坐标
                    var centerLevel = 10;
                    if (self.user.regionLevel == 3) {
                        centerLevel = 12;
                    }
                    map.centerAndZoom(point, centerLevel);
                    self.map = map;
                    map.setMapStyle({style: 'grayscale'});
                    resolve(true);
                })
            },
            // 地图事件
            setMapEvent(){
                var _this = this;
                _this.map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                _this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                _this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                _this.map.enableKeyboard();//启用键盘上下左右键移动地图
                _this.map.enableInertialDragging();
                _this.map.enableContinuousZoom();
                // 监听停止拖拽地图时可视区域四角
                _this.map.addEventListener('dragend', function (e) {

                });
                // 地图加载完毕
                _this.map.addEventListener("tilesloaded", function () {

                });
                // 监听层级
                _this.map.addEventListener('zoomend', function (e) {
                    /*let zoom = _this.map.getZoom();
                    customOverlay.clearMap("regionBoundaryOver",_this);
                    if(zoom>=13){
                        customOverlay.queryDistrict(_this,_this.user.regionName);
                    }else{
                        // 当前行政区域级联top0 || 不选时
                        if(_this.search.regionName==_this.user.regionName || _this.search.regionName=='' || _this.search.regionName==null){
                            _this.drawRegionBoundary();
                        }else{
                            customOverlay.queryDistrict(_this,_this.user.regionName+_this.search.regionName);
                        }
                    }*/
                });
                /*function showInfo(e){
                    alert(e.point.lng + ", " + e.point.lat);
                }
                // 地图点击事件
                _this.map.addEventListener("click", showInfo);*/
            },
            // 地图控件
            addMapControl(){
                var _this = this;
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE
                });
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
                // 城市列表控件
                var size = new BMap.Size(10, 20);
                var ctrl_cti = new BMap.CityListControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: size,
                });

                // 获取多边形覆盖物
                var overlaycomplete = function (e) {
                    _this.overlays.push(e.overlay);
                };
                var styleOptions = {
                    strokeColor: "red", //边线颜色。
                    fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3, //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
                    strokeStyle: "solid", //边线的样式，solid或dashed。
                };
                //实例化鼠标绘制工具
                var drawingManager = new BMapLib.DrawingManager(_this.map, {
                    isOpen: false, //是否开启绘制模式
                    enableDrawingTool: true, //是否显示工具栏
                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //位置
                        offset: new BMap.Size(5, 5), //偏离值
                        drawingModes: [BMAP_DRAWING_POLYGON],
                    },
                    polygonOptions: styleOptions, //多边形的样式
                });
                //添加鼠标绘制工具监听事件，用于获取绘制结果
                drawingManager.addEventListener("overlaycomplete", overlaycomplete);
            },
            // 获取行政区域级联数据
            getRegionChildrenList(){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    _this.$axios.get('/api/regulatory/regionInfo/getRegionInfoChildrenList', {
                        params: {
                            "regionCode": _this.user.regionCode
                        }
                    }).then(
                        function (res) {
                            if (res.code == 0) {
                                _this.regionOptions = res.data;
                                resolve(res.data);
                            }
                        }
                    ).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
            // 绘制行政区域边界
            drawRegionBoundary(){
                var _this = this;
                if(_this.regionOptions.length>0){
                    for (let i = 0; i < _this.regionOptions.length; i++) {
                        var regionName = _this.regionOptions[i].name;
                        var item = _this.regionOptions[i].children;
                        if(item && item.length>0){
                            customOverlay.queryDistrict(_this,regionName);
                            for (let j = 0; j < item.length; j++) {
                                var itemName = item[j].name;
                                customOverlay.drawNotBackgroudDistrict(_this,regionName+itemName);
                            }
                        }else{
                            customOverlay.queryDistrict(_this,regionName);
                        }
                    }
                }
            },
            // 所在地change事件
            searchRegionChange(){
                let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
                if (regionInfo && regionInfo.length > 0) {
                    this.search.regionName = regionInfo[0].data.label;
                    this.search.regionLevel = regionInfo[0].data.level;
                    this.search.regionCode = regionInfo[0].data.value;
                    this.search.lng = regionInfo[0].data.lng;
                    this.search.lat = regionInfo[0].data.lat;
                    let parentRegionInfo = regionInfo[0].parent;
                    if (parentRegionInfo != null) {
                        this.search.regionParentCode = parentRegionInfo.value;
                    }else{
                        this.search.regionParentCode = '';
                    }
                }
                this.searchData();
            },
            // 区域改变重新定位
            changeRegionBoundary(){
                customOverlay.clearMap("regionBoundaryOver",this);
                var point = new BMap.Point(this.search.lng,this.search.lat);
                if(this.search.regionName!=this.user.regionName){
                    // 3级
                    this.map.centerAndZoom(point, 11);
                    customOverlay.queryDistrict(this,this.user.regionName+this.search.regionName);
                }else{
                    // 2级
                    this.map.centerAndZoom(point, 10);
                    this.drawRegionBoundary();
                }
            },
            // 查询围栏数据
            selectPoints(type) {
                var _this = this;
                customOverlay.clearMap("fenceOver",_this);
                _this.$axios.get("/api/regulatory/tEnterpriseTransferStandingBook/selectPoints",{
                    params: {
                        "type": type,
                        "regionCode": _this.search.regionCode
                    }
                }).then(function (res) {
                    if (res.code == 0) {
                        res.data.forEach((element) => {
                            let pointArray = element.mapFence.split(",");
                            let pointArr = [];
                            pointArray.forEach((item) => {
                                pointArr.push(
                                    new BMap.Point(item.split("_")[1], item.split("_")[0])
                                );
                            });
                          var ply = null;
                          var imei = "fenceOver";
                          if(type==1){
                            ply = new BMap.Polygon(pointArr, {
                              strokeWeight: 1,
                              strokeColor: "#e63c41",
                              fillColor: "#e63c41",
                              fillOpacityL: 0.6,
                            }); //建立多边形覆盖物
                            imei = "fenceInOver";
                          }else if(type==2){
                            ply = new BMap.Polygon(pointArr, {
                              strokeWeight: 1,
                              strokeColor: "#ADD8E6",
                              fillColor: "#ADD8E6",
                              fillOpacityL: 0.6,
                            }); //建立多边形覆盖物
                            imei = "fenceOutOver";
                          }else{
                            imei = "fenceOver";
                          }
                          ply.imei = imei;
                          _this.map.addOverlay(ply);
                          // 添加标注
                          var point = customOverlay.getCenterPoint(pointArr);
                          var wLlabel = new BMap.Label(
                              element.id + (element.name ? ":" + element.name : ""),
                              {
                                position: point,
                                offset: new BMap.Size(1, 1),
                              }
                          );
                          wLlabel.setStyle({
                            background: "none",
                            color: "#red",
                            border: "none", //只要对label样式进行设置就可达到在标注图标上显示数字的效果
                          });
                          wLlabel.imei = imei;
                          _this.map.addOverlay(wLlabel); // 添加点
                        });
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            // 清除
            clearAll() {
                var _this = this;
                var data = _this.overlays;
                for (var i = 0; i < data.length; i++) {
                    _this.map.removeOverlay(data[i]);
                }
                _this.overlays = [];
            },
            // 取消||保存
            IsInPolygon(issubmit, wlinput) {
                var _this = this;
                if(!issubmit){
                  _this.visiblesub = issubmit;
                  return;
                }
                var flag = _this.isNull(wlinput);
                if(flag){
                    _this.$message.warning("请输入围栏名称!  ");
                    return;
                }
                if (issubmit && wlinput != "") {
                    var overlays = _this.overlays;
                    if (overlays && overlays.length > 0) {
                        _this.$axios.post("/api/regulatory/tEnterpriseTransferStandingBook/addPoint/" + wlinput+"/"+_this.search.regionCode+"/"+_this.fenceType, overlays[0].getPath())
                            .then(function (res) {
                                if (res.code == 0) {
                                    _this.$message.success("保存报警围栏成功!");
                                    _this.searchData();
                                }
                            })
                            .catch((error) => {
                                // catch 指请求出错的处理
                                _this.$message.error("保存报警围栏失败!");
                                // 地图
                                _this.initPage();
                            });
                        _this.clearAll();
                    } else {
                        _this.$message.error("无报警围栏，请先使用右下角绘制工具绘制报警围栏!");
                    }
                }
                _this.visiblesub = false;
                _this.wlinput = "";
            },
            // 取消||删除
            deletePolygon(issubmit, polygonId) {
                var _this = this;
                var flag = _this.isNull(polygonId);
                if(flag){
                    _this.$message.warning("请输入围栏编号!");
                    return;
                }
                if (issubmit) {
                    if (polygonId != "") {
                        _this.$axios.get("/api/regulatory/tEnterpriseTransferStandingBook/deletePoint/" + polygonId).then(function (res) {
                            if (res.data) {
                                _this.$message.success("删除报警围栏成功!");
                                _this.searchData();
                            } else {
                                _this.$message.error("删除报警围栏失败，无此报警围栏，请输入对应报警围栏id!");
                                _this.searchData();
                            }
                        })
                        .catch((error) => {
                            // catch 指请求出错的处理
                            _this.$message.error("删除报警围栏失败!");
                            // 地图
                            _this.searchData();
                        });
                    } else {
                        _this.$message.error("无此报警围栏，请输入对应报警围栏id!");
                    }
                }
                _this.visibledel = false;
                _this.polygonId = "";
            },
            // 上传
            importPoint(file) {
                let form = new FormData();
                form.append("file", file.file);
                var _this = this;
                _this.$axios.post("/api/regulatory/tEnterpriseTransferStandingBook/importPoint", form).then(function (res) {
                    if (res.code == 0) {
                        _this.searchData();
                    }else{
                        _this.$message.error("上传失败!");
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            // 判空
            isNull( str ){
                if ( str == "" ) return true;
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                return re.test(str);
            },
        },
        mounted() {
            // 初始化地图
            this.initTransferMap();
        },
        created() {
        },
        watch:{
        'fence.isRegionFenceOpen':{
          handler: function (newVal, oldVal) {
            // console.log(newVal,oldVal);
            if(!newVal){
              customOverlay.clearMap('regionBoundaryOver',this);
            }else{
              this.changeRegionBoundary();
            }
          }
        },
        'fence.isBanInFenceOpen':{
          handler: function (newVal, oldVal) {
            // console.log(newVal,oldVal);
            if(!newVal){
              customOverlay.clearMap('fenceInOver',this);
            }else{
              this.selectPoints(1);
            }
          }
        },
        'fence.isBanOutFenceOpen':{
          handler: function (newVal, oldVal) {
            // console.log(newVal,oldVal);
            if(!newVal){
              customOverlay.clearMap('fenceOutOver',this);
            }else{
              this.selectPoints(2);
            }
          }
        }
      }
    }
</script>

<style >
    .breadcrumb {
        line-height: 59px;
        height: 59px;
        font-size: 18px;
        color: #172033;
    }

    .allmap {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 61px 10px 10px 10px;
        background: #ffffff;
    }
    .el-step__description {
        white-space: pre;
    }
    .myZhongEntMakerClass {
        position: absolute;
        background: #ffffff;
        min-width: 150px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        padding: 12px;
        z-index: 2000;
        color: #475066;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        word-break: break-all;
    }
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display: none;
    }
    .el-step__line > .el-step__line-inner {
        height: unset !important;
    }
    .step__title {
        font-size: 12px;
    }
    .el-step__description.is-finish {
        color: black;
    }
    .el-step__title.is-finish {
        color: black;
    }
    .el-divider--horizontal {
        margin: 2px 0;
    }
    .icon-10014 {
        font-size: 25px;
        color: #1aac19;
    }
    .icon-yuanxing {
        font-size: 25px;
    }
    .el-step__title.is-process {
        font-weight: normal;
    }
    .el-step__title {
        font-size: 12px;
    }
    .el-divider--vertical {
        margin: 0 8px;
    }
    .company-box .company-hd .company-location {
        margin-top: 20px;
        opacity: 0.8;
    }
</style>