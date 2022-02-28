<template>
  <!-- 内容区域 -->
  <div class="main main-full" style="padding-bottom: 0px;">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="map-box">
      <!-- 地图 -->
      <div class="allmap" id="transferMap"></div>
      <!-- 左侧查询条件 -->
      <div class="map-left">
        <!-- 筛选 -->
        <div style="height: 54px;background-color: white;">
          <ul class="filter-box" style="padding-top: 10px;margin-left: 25px; margin-right: 15px;">
            <li class="filter-item">
              <div class="filter-con">
                <el-button type="text" style="color:green">车{{census.carNum}}辆</el-button>
                <el-divider direction="vertical" style="height: 30px;"></el-divider>
                <el-button type="text" style="color:#3fc5f7">订单{{census.orderNum}}个</el-button>
              </div>
            </li>
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
                <div class="el-select w180">
                  <el-select v-model="search.carStatus" slot="prepend" @change="searchData" placeholder="请选择车辆状态">
                    <el-option label="全部车辆" value="-1"></el-option>
                    <el-option label="正常车辆" value="1"></el-option>
                    <el-option label="报警车辆" value="0"></el-option>
                  </el-select>
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
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 左侧图例 -->
      <div class="legend-box" style="left: 20px;">
        <div class="legend-hd">图例</div>
        <div class="legend-bd">
          <ul class="legend-list">
            <li><span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/blackCar.png"></span>正常车辆</li>
            <li><span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/redCar.png"></span>报警车辆</li>
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
      <!-- 右侧详情弹出 -->
      <div class="map-right" id="transferWindow" style="top: 20px;display: none;width: unset; ">
        <transferPlanInfoWindow ref="transferPlanInfoWindow"></transferPlanInfoWindow>
      </div>
    </div>
  </div>
</template>

<script>
import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
import customOverlay from '../realTime/js/customOverlay';
import transferPlanInfoWindow from './transferPlanInfoWindow';
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "transferRealTimeMonitor",
  props: {},
  components: {
    transferPlanInfoWindow,
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
      census:{
        carNum: 0,
        orderNum: 0
      },
      map: null,
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
        carStatus: '-1',
        lng: sessionStorage.getItem('lng'),
        lat: sessionStorage.getItem('lat'),
        outInStackLimit:5,
      },
      redCarImgUrlPath: "../../../../static/css/images/map/redCar.png",
      blackCarImgUrlPath: "../../../../static/css/images/map/blackCar.png",
    }
  },
  methods: {
    // 查询button
    searchData(){
      customOverlay.clearMap("all",this);
      $("#transferWindow").fadeOut();
      var point = new BMap.Point(this.user.lng, this.user.lat);//定义一个中心点坐标
      var centerLevel = 10;
      if (this.user.regionLevel == 3) {
        centerLevel = 12;
      }
      this.map.centerAndZoom(point, centerLevel);
      this.getTransferInfo();
      if(this.fence.isRegionFenceOpen){
        this.drawRegionFenceOpen();
      }
      if(this.fence.isBanInFenceOpen){
        this.selectPoints(1);
      }
      if(this.fence.isBanOutFenceOpen){
        this.selectPoints(2);
      }
    },
    // 清除覆盖物
    clearOver(){
      customOverlay.clearMap("carOver",this);
      customOverlay.clearMap("lushuOver",this);
    },
    // 初始化百度地图js
    initTransferMap(){
      var _this = this;
      loadBMapApi(_this.AppConfig.appInfo.baiDuMapAk, 1).then(() => {
        _this.initBMap();
      })
          .catch((err) => {
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
          /*this.drawRegionBoundary();
          this.selectPoints('');
          this.getTransferInfo();*/
          this.searchData();
        });// 行政区域下拉集
      }); //创建地图
    },
    // 创建地图
    createMap(){
      return new Promise((resolve, reject) => {
        var self = this;
        var map = new BMap.Map("transferMap",
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
        /*    function showInfo(e){
                alert(e.point.lng + ", " + e.point.lat);
            }
            // 地图点击事件
            self.map.addEventListener("click", showInfo);*/
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
        return;
      }
    },
    // 地图围栏数据
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
              pointArr.push(new BMap.Point(item.split("_")[1], item.split("_")[0]));
            });
            var ply = null;
            if(type==1){
              ply = new BMap.Polygon(pointArr, {
                strokeWeight: 1,
                strokeColor: "#e63c41",
                fillColor: "#e63c41",
                fillOpacityL: 0.6,
              }); //建立多边形覆盖物
              ply.imei = "fenceInOver";
            }else if(type==2){
              ply = new BMap.Polygon(pointArr, {
                strokeWeight: 1,
                strokeColor: "#ADD8E6",
                fillColor: "#ADD8E6",
                fillOpacityL: 0.6,
              }); //建立多边形覆盖物
              ply.imei = "fenceOutOver";
            }else{
              ply.imei = "fenceOver";
            }
            _this.map.addOverlay(ply);
          });
        }
      }).catch((error) => {
        // catch 指请求出错的处理
        // console.log(error);
      });
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
    // 查询当前条件下车辆信息
    getTransferInfo(){
      // console.log(this.search.carStatus,this.search.regionCode);
      var _this = this;
      _this.$axios.get("/api/regulatory/tEnterpriseTransferStandingBook/getTransferInfo",{
        params: {
          "regionCode": _this.search.regionCode,
          "carStatus": _this.search.carStatus,
        }
      }).then(function (res) {
        if (res.code == 0) {
          var data = res.data;
          if(data!=null){
            _this.renderingTransferCarMakerAndCensusData(data);
          }
        }
      }).catch((error) => {
        // catch 指请求出错的处理
        // console.log(error);
      });
      /*var data = {};
      if(this.search.regionCode == "371300"){
          if(this.search.carStatus==0){
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京A16065","carStatus":true,"lng":"118.699199","lat":"35.140984","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"3"}]}};
          }else if(this.search.carStatus==1){
              data = {"msg":"success","code":0,"data":{"carRunNum":2,"orderRunNum":2,"carInfos":[{"carNo":"京AF0236","carStatus":false,"lng":"118.454087","lat":"34.982968","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"1"},{"carNo":"京A12001","carStatus":false,"lng":"117.827633","lat":"35.38142","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"2"}]}};
          }else{
              data = {"msg":"success","code":0,"data":{"carRunNum":3,"orderRunNum":3,"carInfos":[{"carNo":"京AF0236","carStatus":false,"lng":"118.454087","lat":"34.982968","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"1"},{"carNo":"京A12001","carStatus":false,"lng":"117.827633","lat":"35.38142","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"2"},{"carNo":"京A16065","carStatus":true,"lng":"118.699199","lat":"35.140984","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"3"}]}};
          }
      }else if(this.search.regionCode == "371326"){
          if(this.search.carStatus==0){
              data = {"msg":"success","code":0,"data":{"carRunNum":0,"orderRunNum":0,"carInfos":[]}};
          }else if(this.search.carStatus==1){
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京A12001","carStatus":false,"lng":"117.827633","lat":"35.38142","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"2"}]}};
          }else{
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京A12001","carStatus":false,"lng":"117.827633","lat":"35.38142","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"2"}]}};
          }
      }else if(this.search.regionCode == "371302"){
          if(this.search.carStatus==0){
              data = {"msg":"success","code":0,"data":{"carRunNum":0,"orderRunNum":0,"carInfos":[]}};
          }else if(this.search.carStatus==1){
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京AF0236","carStatus":false,"lng":"118.454087","lat":"34.982968","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"1"}]}};
          }else{
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京AF0236","carStatus":false,"lng":"118.454087","lat":"34.982968","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"1"}]}};
          }
      }else if(this.search.regionCode == "371327"){
          if(this.search.carStatus==0){
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京A16065","carStatus":true,"lng":"118.699199","lat":"35.140984","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"3"}]}};
          }else if(this.search.carStatus==1){
              data = {"msg":"success","code":0,"data":{"carRunNum":0,"orderRunNum":0,"carInfos":[]}};
          }else{
              data = {"msg":"success","code":0,"data":{"carRunNum":1,"orderRunNum":1,"carInfos":[{"carNo":"京A16065","carStatus":true,"lng":"118.699199","lat":"35.140984","pos":"","regionCode":"","regionLevel":"","regionLng":"","regionLat":"","planId":"3"}]}};
          }
      }else{
          data = {"msg":"success","code":0,"data":{"carRunNum":0,"orderRunNum":0,"carInfos":[]}};
      }
      this.renderingTransferCarMakerAndCensusData(data.data);*/
    },
    // 渲染车辆点 & 头统计
    renderingTransferCarMakerAndCensusData(data){
      var _this = this;
      _this.census.carNum =  data.carRunNum!=null?data.carRunNum:0;
      _this.census.orderNum =  data.orderRunNum!=null?data.orderRunNum:0;
      var carInfos = data.carInfos;
      if(carInfos!=null && carInfos.length>0){
        customOverlay.drawTransferCarMaker(_this,carInfos);
      }
    },
    // 监听车辆点击事件
    carMakerClickHandler(carMaker, carInfo){
      var self = this;
      carMaker.addEventListener("click", function (e) {
        self.clearOver();
        self.tranPlanInfoLook(carInfo);
      })
    },
    // 查询转运详情
    tranPlanInfoLook(carInfo) {
      /*var _this = this;
      _this.registeredAddress = "";
      _this.$axios.get("/api/regulatory/tEnterpriseTransferStandingBook/selectTranPlanInfo/"+carInfo.planId).then(function (res) {
          if (res.code == 0) {
              $("#transferWindow").fadeIn();
              if(res.data && res.data.carVo){
                  _this.$refs.transferPlanInfoWindow.Transdata = res.data;
              }else{
                  _this.$refs.transferPlanInfoWindow.Transdata = _this.$refs.transferPlanInfoWindow.TransdataBak;
              }
              _this.$refs.transferPlanInfoWindow.isShowzyxx = true;
              _this.$refs.transferPlanInfoWindow.iswld = [1];

              var lushuData = res.data.fiveCoupletsVo?res.data.fiveCoupletsVo[res.data.fiveCoupletsVo.length-1]:null;
              _this.drawLushuStrAndEntMaker(lushuData,carInfo.carStatus);
          }
      }).catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
      });*/
      var data = {};
      if(carInfo.carNo=="京A12001"){
        data = {"msg":"success","code":0,"data":{"carVo":{"carNo":"京A12001","entName":"山东尚康环保科技有限公司","carModel":null,"driver":"刘海光","driverPhone":"18910729027","carStatus":false,"tattachments":null},"transInfoVo":[{dictCode:"HW49",dictName:"废矿物油",weight:"1011.23 kg"},{dictCode:"HW49",dictName:"废液压油",weight:"980.10 kg"},{dictCode:"HW49",dictName:"废冷冻机油",weight:"501.34 kg"}],"fiveCoupletsVo":[{fiveNo:"WLD202012230001",planId:"",status:1,status:1,statustr:"正常",moveOutEntName:"绿岛",saidToWeight:6000,handoverTime:"2020-12-16 10:33",handledByName:"陈磊",receiveEntName:"山东明瑞环保有限公司",receiveWeigt:"--",receiveTime:"--",jshandledByName:"张森",activeNumber:0,cfEntLng:"117.63024064109607",cfEntLat:"35.51299175714329",jsEntLng:"117.85417023862321",jsEntLat:"35.363047793998156"}]}};
      }else if(carInfo.carNo=="京AF0236"){
        data = {"msg":"success","code":0,"data":{"carVo":{"carNo":"京AF0236","entName":"山东尚康环保科技有限公司","carModel":null,"driver":"陈海","driverPhone":"18910728006","carStatus":false,"tattachments":null},"transInfoVo":[{dictCode:"HW49",dictName:"废矿物油",weight:"1011.23 kg"},{dictCode:"HW49",dictName:"废液压油",weight:"980.10 kg"},{dictCode:"HW49",dictName:"废冷冻机油",weight:"501.34 kg"}],"fiveCoupletsVo":[{fiveNo:"WLD202012230002",planId:"",status:1,status:1,statustr:"正常",moveOutEntName:"绿岛",saidToWeight:6000,handoverTime:"2020-12-16 10:33",handledByName:"韩效冲",receiveEntName:"山东信科环化有限责任公司",receiveWeigt:"--",receiveTime:"--",jshandledByName:"王道",activeNumber:0,cfEntLng:"118.35046606677598",cfEntLat:"35.044594295723535",jsEntLng:"118.50138139245229",jsEntLat:"34.972809579189594"}]}};
      }else if(carInfo.carNo=="京A16065"){
        data = {"msg":"success","code":0,"data":{"carVo":{"carNo":"京A16065","entName":"山东尚康环保科技有限公司","carModel":null,"driver":"郭天旭","driverPhone":"18910723003","carStatus":true,"tattachments":null},"transInfoVo":[{dictCode:"HW49",dictName:"废矿物油",weight:"1011.23 kg"},{dictCode:"HW49",dictName:"废液压油",weight:"980.10 kg"},{dictCode:"HW49",dictName:"废冷冻机油",weight:"501.34 kg"}],"fiveCoupletsVo":[{fiveNo:"WLD202012230002",planId:"",status:1,status:1,statustr:"正常",moveOutEntName:"绿岛",saidToWeight:6000,handoverTime:"2020-12-16 10:33",handledByName:"岳冲",receiveEntName:"临沂金明辉建材有限公司",receiveWeigt:"--",receiveTime:"--",jshandledByName:"李鑫",activeNumber:0,cfEntLng:"118.74040252254721",cfEntLat:"35.25709082430714",jsEntLng:"118.74022286144499",jsEntLat:"35.13748257826439"}]}};
      }
      // $("#transferWindow").fadeIn();
      document.getElementById("transferWindow").style.display="block";
      this.$refs.transferPlanInfoWindow.Transdata = data.data;
      this.$refs.transferPlanInfoWindow.isShowzyxx = true;
      this.$refs.transferPlanInfoWindow.iswld = [1];

      var lushuData = data.data.fiveCoupletsVo?data.data.fiveCoupletsVo[data.data.fiveCoupletsVo.length-1]:null;
      this.drawLushuStrAndEntMaker(lushuData,carInfo.carStatus);
    },
    // 绘制当前五联单起始终点
    drawLushuStrAndEntMaker(item,carStatus){
      var _this = this;
      var sLng = item.cfEntLng;
      var sLat = item.cfEntLat;
      if (sLng==null || sLat==null){
        _this.$message.warning("起点坐标获取失败！");
        return
      }
      var sEntName = item.moveOutEntName;
      var eLng = item.jsEntLng;
      var eLat = item.jsEntLat;
      if (eLng==null || eLat==null){
        _this.$message.warning("终点坐标获取失败！");
        return
      }
      var eEntName = item.receiveEntName;
      // 初始化行政区图层
      /*  customOverlay.clearMap("regionBoundaryOver",this);
        customOverlay.queryDistrict(_this,_this.user.regionName);*/
      var spoint = new BMap.Point(sLng,sLat);
      var epoint = new BMap.Point(eLng,eLat);
      // 初始化始终点位
      customOverlay.addStartMarker(sLng,sLat,sEntName,"起点",_this);
      customOverlay.addStartMarker(eLng,eLat,eEntName,"终点",_this);
      // 调整视野
      var pointArr = [];
      pointArr.push(spoint);
      pointArr.push(epoint);
      customOverlay.setViewport(pointArr,_this);
      _this.getSearchPath(spoint,epoint,carStatus);
    },
    // 绘制当前车辆路线图(假的)
    getSearchPath(spoint,epoint,carStatus){
      var _this = this;
      var options = {
        onSearchComplete: function(results){
          if (driving.getStatus() == BMAP_STATUS_SUCCESS){
            // 获取第一条方案
            var plan = results.getPlan(0);
            // 获取方案的驾车线路
            var route = plan.getRoute(0);
            //返回路线的地理坐标点数组。（自 1.2 新增）
            var points = route.getPath();
            // console.log(points);
            // 绘制路线
            _this.drawRoute(points,carStatus);
          }
        }
        //,
        //renderOptions:{map: map, autoViewport: true}
      };
      var driving = new BMap.DrivingRoute(_this.map, options);
      driving.search(spoint,epoint);

    },
    drawRoute(points,carStatus){
      var _this = this;
      // 绘制路线
      if(points==null){
        return;
      }
      //alert(points.length);
      // 随机当前车辆位置索引
      var carIndex = points.length-Math.floor(points.length/5);
      // 截取当前索引前数据(模拟车辆已行驶路线)
      var tempArray = [];
      for (let i = 0; i < carIndex; i++) {
        tempArray.push(points[i]);
      }
      var polyline = new BMap.Polyline(tempArray,
          {
            strokeColor:"#18a45b",
            strokeWeight:8,
            strokeOpacity:0.8,
            icons:[_this.draw_line_direction(8)]
          }
      );   //创建折线
      _this.map.addOverlay(polyline);          //增加折线
      // 截取当前索引后数据(模拟车辆未行驶路线)
      var noTempArray = [];
      for (let i = carIndex; i < points.length; i++) {
        noTempArray.push(points[i]);
      }
      var polyline = new BMap.Polyline(noTempArray,
          {
            strokeColor:"#999",
            strokeWeight:8,
            strokeOpacity:0.8,
            icons:[_this.draw_line_direction(8)]
          }
      );   //创建折线
      _this.map.addOverlay(polyline);          //增加折线

      var point = points[carIndex];
      // 
      // 添加车辆
      var redCar = new BMap.Icon(_this.redCarImgUrlPath, new BMap.Size(40, 40));
      var blackCar = new BMap.Icon(_this.blackCarImgUrlPath, new BMap.Size(40, 40));
      var carMaker = "";
      if (carStatus) {
        carMaker = new BMap.Marker(point, {icon: redCar,}); // 创建标注
      } else {
        carMaker = new BMap.Marker(point, {icon: blackCar,}); // 创建标注
      }
      _this.map.addOverlay(carMaker); // 添加点
    },
    draw_line_direction(weight) {
      var icons=new BMap.IconSequence(
          new BMap.Symbol('M0 -5 L-5 -2 L0 -4 L5 -2 Z', {
            scale: weight/10,
            strokeWeight: 2,
            rotation: 0,
            fillColor: 'white',
            fillOpacity: 1,
            strokeColor:'white'
          }),'100%','5%',false);
      return icons;
    },

    drawRegionFenceOpen(){
      var _this = this;
      customOverlay.queryDistrict(_this,_this.user.regionName);
    }
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
          this.drawRegionFenceOpen();
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

.map-right{
  /*top: 0;*/
  /*display: flex;*/
  /*align-items: center;*/
  overflow: hidden;
  width: 300px;
  position: absolute;
  right: 10px;
  max-height: 90%;
  top: 5%;
  overflow-y: auto;
}


.legend-box-top {
  position: absolute;
  top: 80px;
  left: 60px;
  background-color: #fff;
  -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.16);
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px;
  min-width: 110px;
  font-size: 12px;
}
.legend-box-top .legend-hd {
  line-height: 38px;
  padding: 0 10px;
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
}
.legend-box-top .legend-hd .icon {
  font-size: 12px;
}
.legend-box-top .legend-bd {
  padding: 0 10px 10px;
}
.legend-box-top .legend-list li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 10px;
}
.legend-box-top .legend-list .legend-ico {
  line-height: 1;
  margin-right: 8px;
  height: 18px;
  width: 18px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGVsbGlwc2UgZmlsbD0iI0M0OTYxNiIgY3g9IjYiIGN5PSIxOSIgcng9IjUiIHJ5PSIyIi8+PGVsbGlwc2UgZmlsbD0iI0E5N0QwMCIgY3g9IjYiIGN5PSIxOSIgcng9IjMiIHJ5PSIxIi8+PGNpcmNsZSBzdHJva2U9IiNDNDk2MTYiIGZpbGw9IiNGN0I1MDAiIGN4PSI2IiBjeT0iNiIgcj0iNS41Ii8+PGNpcmNsZSBmaWxsPSIjRkZGIiBjeD0iNiIgY3k9IjYiIHI9IjMiLz48cGF0aCBmaWxsPSIjQzQ5NjE2IiBkPSJNNyAxMUg1djhoMnoiLz48L2c+PC9zdmc+);
}
.legend-box-top .legend-list .legend-ico.jieshou {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGVsbGlwc2UgZmlsbD0iIzNDOTg4NyIgY3g9IjYiIGN5PSIxOSIgcng9IjUiIHJ5PSIyIi8+PGVsbGlwc2UgZmlsbD0iIzJENzM2NiIgY3g9IjYiIGN5PSIxOSIgcng9IjMiIHJ5PSIxIi8+PGNpcmNsZSBzdHJva2U9IiMzQzk4ODciIGZpbGw9IiM2M0MxQjAiIGN4PSI2IiBjeT0iNiIgcj0iNS41Ii8+PGNpcmNsZSBmaWxsPSIjRkZGIiBjeD0iNiIgY3k9IjYiIHI9IjMiLz48cGF0aCBmaWxsPSIjM0M5ODg3IiBkPSJNNyAxMUg1djhoMnoiLz48L2c+PC9zdmc+);
}
</style>