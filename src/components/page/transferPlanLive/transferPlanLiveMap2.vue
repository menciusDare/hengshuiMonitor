<template>
  <!-- 内容区域 -->
  <div class="main main-full" id>
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="map-box">
      <!-- 地图 -->
      <div class="allmap" id="wfMap"></div>
      <!-- 左侧 -->
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
                    :disabled="isDisabled"
                    v-model="adcd"
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
                <el-popover placement="top" width="180" v-model="visible">
                  <el-input placeholder="请输入围栏名称" v-model.trim="wlinput" clearable></el-input>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="IsInPolygon(false,wlinput)">取消</el-button>
                    <el-button type="primary" size="mini" @click="IsInPolygon(true,wlinput)">确定</el-button>
                  </div>
                  <el-button type="primary" size="small" slot="reference">
                    <span>保存围栏</span>
                  </el-button>
                </el-popover>
                <!-- <el-button size="small" type="primary">上传围栏</el-button> -->
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
              <el-upload :http-request="importPoint" action="fakeaction">
                <el-button size="small" type="primary">上传围栏</el-button>
              </el-upload>
            </li>
            <li class="filter-item">
              <el-popover placement="top" width="180" v-model="visible1">
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
          </ul>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
  </div>
</template>

<script type="text/javascript">
import productionVideoHuiKan from "./realTimeVideo";
import Urls from "../../../components/common/unit/urls";
import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "transferPlanLiveMap",
  components: {
    productionVideoHuiKan,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      iswld: [1],
      adcd: this.AppConfig.appInfo.regionCode /*sessionStorage.getItem("regionCode")*/,
      cfAndZyInfoVo: {},
      isShowzyxx: true,
      status1: "1",
      input3: "",
      wlinput: "",
      polygonId: "",
      visible: false,
      visible1: false,
      tableDatas1: {},
      dayTime: new Date(),
      isDisabled: false,
      addressName: "",
      map: null,
      orderNum: 0,
      carNum: 0,
      markerArr: [],
      showEntinfo: false,
      regionMaker: "",
      areaOptions: [],
      cityOptions: [],
      dialogTableVisible: false,
      dialogTitle: "",
      cityCode: "",
      areaCode: "",
      cfUnit: "",
      tableDatas: [
        { dictType: "HW08", dictDetailName: "矿物废油", number: "40" },
        { dictType: "HW08", dictDetailName: "矿物废油", number: "40" },
        { dictType: "HW08", dictDetailName: "矿物废油", number: "40" },
        { dictType: "HW08", dictDetailName: "矿物废油", number: "40" },
      ],
      regionCode: sessionStorage.getItem("regionCode"),
      Transdata: {
        carVo: {
          carNo: "京A33334",
          entName: "清洁之光运输有限公司",
          carModel: "",
          driver: "张伟",
          driverPhone: "13999222233",
        },
        transInfoVo: [
          { dictCode: "HW08", dictName: "矿物废油", weight: 40 },
          { dictCode: "HW08", dictName: "矿物废油", weight: 40 },
          { dictCode: "HW08", dictName: "矿物废油", weight: 40 },
        ],
        fiveCoupletsVo: [
          {
            fiveNo: "HX2223331",
            status: 1,
            moveOutEntName: "节能悠悠有限公司",
            saidToWeight: 30,
            handoverTime: "2020-07-01 12:33",
            receiveEntName: "万物生长处置有限公司",
            receiveWeigt: 30,
            receiveTime: "2020-07-01 12:33",
          },
          {
            fiveNo: "HX2223331",
            status: 0,
            moveOutEntName: "节能悠悠有限公司",
            saidToWeight: 30,
            handoverTime: "2020-07-01 12:33",
            receiveEntName: "万物生长处置有限公司",
            receiveWeigt: null,
            receiveTime: null,
          },
          {
            fiveNo: "HX2223331",
            status: 0,
            moveOutEntName: "节能悠悠有限公司",
            saidToWeight: 30,
            handoverTime: "2020-07-01 12:33",
            receiveEntName: "万物生长处置有限公司",
            receiveWeigt: null,
            receiveTime: null,
          },
        ],
      },
      regionLevel:
        sessionStorage.getItem("regionLevel") == null
          ? this.AppConfig.appInfo.regionLevel
          : sessionStorage.getItem("regionLevel"),
      parentCode: this.AppConfig.appInfo.parentCode,
      regionName: this.AppConfig.appInfo.regionName,
      lng: this.AppConfig.appInfo.lng,
      lat: this.AppConfig.appInfo.lat,
      pageIndex: 1,
      data1: [],
      pageSize: 5000,
      centerLevel: 8,
      initBssw: this.AppConfig.appInfo.bssw,
      initBsne: this.AppConfig.appInfo.bsne,
      level: 5,
      isInit: true,
      entType: "",
      markers1: [],
      registeredAddress: "",
      userRegionCode: "",
      zoom: "",
      dataList: [],
      entTypeOptions: [
        {
          value: "",
          label: "全部企业",
        },
        {
          value: "1",
          label: "重点企业",
        },
        {
          value: "2",
          label: "一般企业",
        },
        {
          value: "3",
          label: "收集企业",
        },
        {
          value: "4",
          label: "经营企业",
        },
      ],
      regionOptions: [],
      search: {
        entType: "1",
        regionCode: this.AppConfig.appInfo.regionCode /*sessionStorage.getItem("regionCode")*/,
        regionName: this.AppConfig.appInfo.regionName,
        regionName1: this.AppConfig.appInfo.regionName,
        regionLevel:
          sessionStorage.getItem("regionLevel") == null
            ? this.AppConfig.appInfo.regionLevel
            : sessionStorage.getItem("regionLevel"),
        regionParentCode: "",
      },
      outInStackLimit: 5,
      entMapInfo: {},

      showWhen: this.$route.params.showWhen
        ? this.$route.params.showWhen
        : false,
      stockScale: 0,
      groupStorageCurrentSum: 0,
      containeGroupVoList: [],
      // cfImgUrlPath :"../../../../static/css/images/map/chanfei.png",
      cfAbnormalImgUrlPath: "../../../../static/css/images/map/红车.png",
      czImgUrlPath: "../../../../static/css/images/map/灰车.png",
      cfNormalImgUrlPath:
        "../../../../static/css/images/map/normalEnterprise.png",
    };
  },
  methods: {
    initPage() {
      var _this = this;
      loadBMapApi(_this.AppConfig.appInfo.baiDuMapAk, 1)
        .then(() => {
          _this.initBMap();
          if (_this.showWhen) {
            _this.startQueryTrack("myTrace");
          } else {
            _this.getBoundary();
          }
          // console.log("地图初始化" + _this.showWhen);
        })
        .catch((err) => {
          // console.log(err);
          // console.log("地图加载失败");
        });
    },
    jumpAddress(item) {
      this.$refs.closeMouleHK.openVideo(item);
    },
    openwfzyxx() {
      this.isShowzyxx = !this.isShowzyxx;
    },
    openwld(index) {
      let status = !this.iswld[index];
      this.$set(this.iswld, index, status);
    },
    initBMap() {
      return new Promise((resolve, reject) => {
        this.createMap(); //创建地图
        this.setMapEvent(); //设置地图事件
        this.addMapControl(); //向地图添加控件
      });

      // this.getRegionCountData(
      //   "",
      //   "",
      //   3,
      //   this.initBssw,
      //   this.initBsne,
      //   this.search.entType,
      //   this.search.regionCode
      // ); // 请求统计数据
    },
    importPoint(file) {
      let form = new FormData();
      form.append("file", file.file);
      var _this = this;
      _this.$axios
        .post(
          "/api/regulatory/tEnterpriseTransferStandingBook/importPoint",
          form
        )
        .then(function (res) {
          if (res.code == 0) {
            _this.selectPoints();
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    getBoundary() {
      // console.log("执行加边界" + this.search.regionName1);
      var _this = this;
      var bdary = new BMap.Boundary();
      ///this.level = 3
      // bdary.get(this.search.regionName, function(rs) {
      bdary.get(this.search.regionName1, function (rs) {
        //获取行政区域
        //map.clearOverlays();        //清除地图覆盖物
        // var count = rs.boundaries.length; //行政区域的点有多少个
        var pointArray = [];

        var ply = new BMap.Polygon(rs.boundaries[0], {
          strokeWeight: 1,
          strokeColor: "#ff0000",
          fillOpacity: 0.2,
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
        _this.selectPoints();
        rs.boundaries[0].split(";").forEach((element) => {
          pointArray.push(
            new BMap.Point(element.split(",")[0], element.split(",")[1])
          );
        });
        window.pointArray = pointArray;
        if (_this.search.regionName1 != this.AppConfig.appInfo.regionName) {
          map.setViewport(pointArray);
        }
      });
    },
    searchMap() {
      this.map.clearOverlays(); //清空地图覆盖物
      if (this.$refs.regionElCascader.getCheckedNodes().length < 1) {
        this.map.reset();
      }
      /*var bs = this.map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                var sw = bssw.lng + "," + bssw.lat;
                var ne = bsne.lng + "," + bsne.lat;*/
      var sw = this.initBssw;
      var ne = this.initBsne;
      this.level = 3;
      /*if(this.search.regionLevel==1){
                    map.centerAndZoom(this.regionName+this.search.regionName,7);
                    this.getRegionCountData(0,this.search.regionCode,1,sw,ne,this.search.entType,this.search.regionCode);// 请求统计数据
                }else if(this.search.regionLevel==2){
                    map.centerAndZoom(this.regionName+this.search.regionName,9);
                    this.getRegionCountData(this.search.regionParentCode,this.search.regionCode,2,sw,ne,this.search.entType,this.search.regionCode);// 请求统计数据
                }else */ if (
        this.search.regionLevel == 3 ||
        this.search.regionLevel == 2
      ) {
        var centerLevel = 10;
        if (this.regionLevel == 3) {
          centerLevel = 12;
        }
        map.centerAndZoom(
          this.regionName + this.search.regionName,
          centerLevel
        );
        //this.getRegionCountData(this.search.regionParentCode,this.search.regionCode,3,sw,ne,this.search.entType,this.search.regionCode);// 请求统计数据
        this.getRegionCountData(
          "",
          "",
          3,
          sw,
          ne,
          this.search.entType,
          this.search.regionCode
        ); // 请求统计数据
        //this.getIndexMaps(this.search.regionCode,this.search.entType);
      }
    },
    createMap() {
      var self = this;
      var map = new BMap.Map("wfMap", {
        maxZoom: 19,
        enableMapClick: false, // 构造底图时，关闭底图可点功能
      }); //在百度地图容器中创建一个地图

      var point = new BMap.Point(this.lng, this.lat); //定义一个中心点坐标
      //map.centerAndZoom(point,this.centerLevel);//设定地图的中心点和坐标并将地图显示在地图容器中
      var centerLevel = 10;
      if (self.regionLevel == 3) {
        centerLevel = 12;
      }
      map.centerAndZoom(
        new BMap.Point(
          sessionStorage.getItem("lng") == null
            ? this.lng
            : sessionStorage.getItem("lng"),
          sessionStorage.getItem("lat") == null
            ? this.lat + 0.2
            : sessionStorage.getItem("lat")
        ),
        centerLevel
      );

      window.map = map; //将map变量存储在全局

      self.map = map;
      map.setMapStyle({ style: "grayscale" });
      var overlays1 = [];
      window.overlays = [];
      var overlaycomplete = function (e) {
        overlays1.push(e.overlay);
        overlays = overlays1;
      };

      var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid", //边线的样式，solid或dashed。
      };
      setTimeout(() => {
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
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
      }, 500);
    },
    selectPoints() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/tEnterpriseTransferStandingBook/selectPoints")
        .then(function (res) {
          if (res.code == 0) {
            ;

            res.data.forEach((element) => {
              let pointArray = element.mapFence.split(",");
              let pointArr = [];
              pointArray.forEach((item) => {
                pointArr.push(
                  new BMap.Point(item.split("_")[1], item.split("_")[0])
                );
              });
              var ply = new BMap.Polygon(pointArr, {
                strokeWeight: 1,
                strokeColor: "#ff0000",
              }); //建立多边形覆盖物
              map.addOverlay(ply);
              var point = _this.getCenterPoint(pointArr);

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
              map.addOverlay(wLlabel); // 添加点
            });
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    clearAll() {
      for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
      }
      let pt = new BMap.Point(118.28392152973998, 35.03893254555622);
      let markers = map.getOverlays();
      markers.forEach((element) => {
        if (element.point) {
          if (element.point.lnt == pt.lnt && element.point.lat == pt.lat) {
            // console.log(pt);
            map.removeOverlay(element);
          }
        }
      });

      overlays.length = 0;
    },
    searchData() {
      $("#entInfo").fadeOut();
      map.clearOverlays(); //清空地图覆盖物
      let zoom = map.getZoom();
      var self = this;
      var entType = self.search.entType;
      //alert("当前地图层级为:"+zoom+"级");
      var bs = map.getBounds(); //获取可视区域
      var bssw = bs.getSouthWest(); //可视区域左下角
      var bsne = bs.getNorthEast(); //可视区域右上角
      var sw = bssw.lng + "," + bssw.lat;
      var ne = bsne.lng + "," + bsne.lat;
      this.searchRegionChange();
      // this.addEntMaker();
      this.getBoundary();
    },

    selectJJAndJSDetails(planId, detailType, title) {
      var _this = this;
      _this.$axios
        .get(
          "/api/regulatory/tEnterpriseTransferStandingBook/selectJJAndJSDetails",
          {
            params: {
              palnId: planId, // 行政区域code
              detailType: detailType, // 无用
            },
          }
        )
        .then(function (res) {
          if (res.code == 0) {
            _this.tableDatas1 = res.data.transInfoVo;
            _this.cfAndZyInfoVo = res.data.cfAndZyInfoVo;
            _this.dialogTableVisible = true;
            _this.dialogTitle = title;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    setMapEvent() {
      map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
      map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
      map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
      map.enableKeyboard(); //启用键盘上下左右键移动地图
      map.enableInertialDragging();
      map.enableContinuousZoom();
    },
    addMapControl() {
      //向地图中添加缩放控件
      var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
      });
      //map.addControl(ctrl_nav);
      //向地图中添加缩略图控件
      var ctrl_ove = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1,
      });
      //map.addControl(ctrl_ove);
      //向地图中添加比例尺控件
      var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
      //map.addControl(ctrl_sca);
      // 城市列表控件
      var size = new BMap.Size(10, 20);
      var ctrl_cti = new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之前事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
      });
      //map.addControl(ctrl_cti);
    },
    groupBy(array, f) {
      const groups = {};
      array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    },
    getlatestpoint(phone) {
      var _this = this;
      Urls.jsonp(Urls.getlatestpoint, { entity_name: phone }, function (res) {
        var pt = new BMap.Point(
          res.latest_point.longitude,
          res.latest_point.latitude
        );
        map.centerAndZoom(pt, 12);
        map.addOverlay(new BMap.Marker(pt));
        _this.data1.push(new BMap.Marker(pt));
      });
    },
    baidudv: function (x, y) {
      //默认地理位置设置为上海市浦东新区
      var x = x,
        y = y;
      var _this = this;
      if (navigator.geolocation) {
        // 百度地图API功能
        var point = new BMap.Point(x, y);
        map.centerAndZoom(point, 12);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function (rs) {
          //getLocation函数用来解析地址信息，分别返回省市区街等 r.point里有经纬度
          var addComp = rs.addressComponents;
          var province = addComp.province; //获取省份
          var city = addComp.city; //获取城市
          var district = addComp.district; //区
          var street = addComp.street; //街
          return district;
        });
      }
    },

    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode: _this.regionCode,
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
            //_this.search.regionCode = res.data[0].value+'';
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.search.regionName1 = regionInfo[0].parent
          ? regionInfo[0].parent.label + regionInfo[0].label
          : regionInfo[0].label;
        this.search.regionName = regionInfo[0].label;
        this.search.regionLevel = regionInfo[0].level + 1;
        this.search.regionCode = regionInfo[0].value;
        let parentRegionInfo = regionInfo[0].parent;
        if (parentRegionInfo != null) {
          this.search.regionParentCode = parentRegionInfo.value;
        } else {
          this.search.regionName = this.regionName;
          this.search.regionLevel = this.regionLevel;
          this.search.regionCode = this.regionCode;
          this.search.regionParentCode = this.parentCode;
        }
      } else {
        this.search.regionName = this.regionName;
        this.search.regionLevel = this.regionLevel;
        this.search.regionCode = this.regionCode;
        this.search.regionParentCode = this.parentCode;
      }
      if(this.search.regionLevel==2){
        this.map.centerAndZoom(this.search.regionName, 10);
      }
      // console.log(this.search.regionCode + "<<<当前省/市/区");
    },
    add_overlay() {
      map.clearOverlays();
      markerClusterer.clearMarkers(this.markers1);
      map.centerAndZoom(new BMap.Point(118.404, 34.915), 18);
      map.enableScrollWheelZoom();
      var MAX = 10;
      var markers = [];
      var dataList = [];
      var pt = null;
      var i = 0;
      for (; i < MAX; i++) {
        var data = {};
        pt = new BMap.Point(Math.random() * 2 + 118, Math.random() * 2 + 34);
        data.lng = Math.random() * 1 + 118;
        data.lat = Math.random() * 1 + 34.5;
        data.entKind = 1;
        dataList.push(data);
        markers.push(new BMap.Marker(pt));
      }
      this.addEntMaker(dataList);
      //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
      // var markerClusterer = new BMapLib.MarkerClusterer(map, {
      //   markers: markers
      // });
    },
    selectRegionInfoByUser() {
      var _this = this;
      var userId = sessionStorage.getItem("userId");
      _this.$axios
        .get("/api/regulatory/index/selectRegionInfoByUser/" + userId)
        .then(function (res) {
          if (res.code == 0) {
            if (res.data != null) {
              _this.lng = res.data.lng;
              _this.lat = res.data.lat;
              _this.search.regionName = res.data.regionName;
              if ((res.data.regionLevel = 3)) {
                _this.centerLevel = 13;
              } else if ((res.data.regionLevel = 2)) {
                _this.centerLevel = 8;
              }
            }
            // 地图
            _this.initPage();
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
          // 地图
          _this.initPage();
        });
    },
    selectClDdYcNum() {
      var _this = this;
      _this.$axios
        .post(
          "/api/regulatory/tEnterpriseTransferStandingBook/selectClDdYcNum",
          {}
        )
        .then(function (res) {
          if (res.code == 0) {
            _this.carNum = res.data.carNum;
            _this.orderNum = res.data.orderNum;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
          // 地图
          _this.initPage();
        });
    },
    getCenterPoint(path) {
      var x = 0.0;
      var y = 0.0;
      for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i].lng);
        y = y + parseFloat(path[i].lat);
      }
      x = x / path.length;
      y = y / path.length;
      return new BMap.Point(x, y);
    },
    deletePolygon(issubmit, polygonId) {
      var _this = this;
      var flag = _this.isNull(polygonId);
      if(flag){
        _this.$message.warning("请输入围栏编号!");
        return;
      }
      if (issubmit) {
        if (polygonId != "") {
          _this.$axios
            .get(
              "/api/regulatory/tEnterpriseTransferStandingBook/deletePoint/" +
                polygonId
            )
            .then(function (res) {
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
          _this.clearAll();
        } else {
          _this.$message.error("无此报警围栏，请输入对应报警围栏id!");
        }
      }
      _this.visible1 = false;
      _this.polygonId = "";
      // alert(overlays[0].getPath());
    },
    isNull( str ){
      if ( str == "" ) return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    IsInPolygon(issubmit, wlinput) {
      var _this = this;
      var flag = _this.isNull(wlinput);
      if(flag){
          _this.$message.warning("请输入围栏名称!  ");
          return;
      }
      if (issubmit && wlinput != "") {
        if (overlays && overlays.length > 0) {
          _this.$axios
            .post(
              "/api/regulatory/tEnterpriseTransferStandingBook/addPoint/" +
                wlinput,
              overlays[0].getPath()
              // pointArray
            )
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
          _this.$message.error(
            "无报警围栏，请先使用右下角绘制工具绘制报警围栏!"
          );
        }
      }
      _this.visible = false;
      _this.wlinput = "";
      // alert(overlays[0].getPath());
    },
  },

  mounted() {
    // var oJs = document.createElement("script");
    // oJs.setAttribute("type", "text/javascript");
    // oJs.setAttribute("src", "realTime.js"); //文件的地址 ,可为绝对及相对路径
    // document.getElementsByTagName("head")[0].appendChild(oJs); //绑定
    // if (this.search.regionLevel == 3) {
    //   this.isDisabled = true;
    // }
    this.selectClDdYcNum();
    // 行政区域级联
    this.getRegionChildrenList();
    // 查询当前用户区域信息
    this.selectRegionInfoByUser();
  },
};
</script>

<style>
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
