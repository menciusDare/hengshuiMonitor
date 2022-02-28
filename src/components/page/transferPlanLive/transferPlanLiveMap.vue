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
                <el-button type="text" style="color:green">车{{carNum}}辆</el-button>
                <el-divider direction="vertical" style="height: 30px;"></el-divider>
                <el-button type="text" style="color:bule">订单{{orderNum}}个</el-button>
                <!-- <el-divider direction="vertical"></el-divider>
                <el-button type="text" style="color:red">异常5个</el-button>-->
              </div>
            </li>
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
                <div class="el-select w180">
                  <el-select v-model="status1" slot="prepend" placeholder="请选择状态">
                    <el-option label="全部" value></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="2"></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-con">
                <el-input placeholder="请输入内容" v-model="input3">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-con">
                <!--<div class="el-input el-input-group el-input-group&#45;&#45;append el-input&#45;&#45;prefix">
                                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                                    </span><input type="text" autocomplete="off" placeholder="请输入关键词搜素"
                                                         class="el-input__inner">
                                    <div class="el-input-group__append"><button type="button"  @click="searchMap" class="el-button">搜索</button></div>
                </div>-->
                <el-button
                  type="button"
                  size="small"
                  @click="searchData"
                  class="el-button el-button--primary"
                >
                  <span>查询</span>
                </el-button>
                <!-- <el-button
                  type="button"
                  size="small"
                  @click="IsInPolygon()"
                  class="el-button el-button--primary"
                >
                  <span>生成点</span>
                </el-button>
                <el-button
                  type="button"
                  size="small"
                  @click="clearAll()"
                  class="el-button el-button--primary"
                >
                  <span>清除</span>
                </el-button>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="map-right" id="entInfo" style="top: 20px;display: none;width: unset; ">
        <div class="company-box" style="width: 360px;">
          <div class="company-hd">
            <div class="company-logo">
              <img
                style="    width: 60px;
    height: 43px;"
                src="http://59.110.152.155:8000/group1/M00/00/17/rBGuPF7PJ5uAHTJYAAV7fB4Ykps780.jpg"
              />
            </div>

            <div class="company-title">
              <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
              <h2>{{Transdata.carVo.carNo}}</h2>
              <h3>{{Transdata.carVo.entName}}</h3>
              <!--</el-tooltip>-->
              <div style="margin-left: -70px;width: 270px;">
                <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.registeredAddress" placement="top-start">-->
                <span style="padding-right: 10px;">{{Transdata.carVo.driver}}</span>
                <i class="el-icon-mobile"></i>
                <span style="padding-right: 10px;">{{Transdata.carVo.driverPhone}}</span>
                <i class="el-icon-video-camera"></i>
                <el-link @click="jumpAddress(Transdata.carVo)">实时监控</el-link>
                <!--</el-tooltip>-->
              </div>
            </div>
            <div
              style="border: 1px solid #6DD400;height: 25px;margin-right: -21px;margin-top: -15px;background-color: #6DD400;width: 100px;text-align: center;
    line-height: 1.7;color: white;"
            >状态正常</div>
          </div>
          <div class="company-bd">
            <li class="menu-item">
              <a @click="openwfzyxx" data-toggle="tooltip" title="危废转运信息">
                <span class="menu-text">危废转运信息</span>
                <i
                  :class="'icon '+(isShowzyxx?'icon-top':'icon-down')+' menu-toggle '"
                  style="position: absolute;
    right: 20px;"
                ></i>
              </a>
              <ul class="menu-child" v-if="isShowzyxx">
                <div>
                  <table class="table-default">
                    <thead></thead>
                    <tbody>
                      <tr v-for="(item,i)  in Transdata.transInfoVo">
                        <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
                        <td
                          style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                          :title="item.storageTime"
                        >{{item.dictName}}</td>
                        <td
                          style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                          :title="item.operationType"
                        >{{item.weight}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ul>
            </li>
            <template v-for="(item,index) in Transdata.fiveCoupletsVo">
              <li class="menu-item">
                <a
                  :ref="'refa'+index"
                  @click="openwld(index)"
                  :style="'display: block;height: 32px;margin-top: 10px;line-height: 2;'+(iswld[index]?('background-color: rgba(216, 216, 216, 1);'):'')"
                  data-toggle="tooltip"
                  title="① 联单：HX2223331"
                >
                  <i
                    :class="'iconfont icon-'+(index+1)"
                    :ref="'refi'+index"
                    :style="iswld[index]?'color: rgba(0, 145, 255, 1);':''"
                  ></i>
                  <span class="menu-text" style="color: rgba(66, 66, 66, 1);">联单:{{item.fiveNo}}</span>
                  <span
                    v-if="item.status==0"
                    class="menu-text"
                    style="position: absolute;
    right: 40px;background-color: grey;opacity: 0.7;
}"
                  >未完成</span>
                  <span
                    v-if="item.status==1"
                    class="menu-text"
                    style="position: absolute;
    right: 40px;background-color: grey;opacity: 0.7;
}"
                  >已完成</span>
                  <i
                    :ref="'refii'+index"
                    style="position: absolute;
                
    right: 20px;"
                    :class="'icon '+(iswld[index]?'icon-top':'icon-down')+' menu-toggle '"
                  ></i>
                </a>
                <ul
                  class="menu-child"
                  :ref="'ref'+index"
                  v-show="iswld[index]"
                  style="margin-top: 10px;"
                >
                  <div style="float:left;width:12%">
                    <span>移出企业</span>
                    <br />
                    <br />
                    <br />
                    <span>接收企业</span>
                  </div>
                  <div style="width:88%;padding-top: 8px;">
                    <el-steps direction="vertical" :active="item.status">
                      <el-step
                        icon="iconfont icon-10014"
                        :description="'申请重量：30kg'+ '\n'+'交接时间：2020-07-01 12:33'"
                      >
                        <template slot="title">
                          <i class="el-icon-office-building"></i>
                          {{item.moveOutEntName}}
                        </template>
                        <template slot="description">
                          <div style="height: 0px;">申请重量：{{item.saidToWeight}}kg</div>
                          <div style="height: 20px;">交接时间：{{item.handoverTime}}</div>
                          <el-link
                            style="margin-left: 111px;color:#0091FF;"
                            @click="selectJJAndJSDetails(item.planId,1,'交接详情')"
                          >交接详情></el-link>
                        </template>
                      </el-step>
                      <el-step
                        :icon="item.status==1?'iconfont icon-10014':'iconfont icon-yuanxing'"
                        title="万物生长处置有限公司"
                      >
                        <template slot="title">
                          <i class="iconfont icon-huishou"></i>
                          {{item.receiveEntName}}
                        </template>
                        <template slot="description">
                          <div style="height: 0px;">接收重量：{{item.receiveWeigt}}kg</div>
                          <div style="height: 20px;">接收时间：{{item.receiveTime}}</div>
                          <el-link
                            v-show="item.status==1"
                            style="margin-left: 111px;color:#0091FF;"
                            @click="selectJJAndJSDetails(item.planId,2,'接收详情')"
                          >接收详情></el-link>
                        </template>
                      </el-step>
                    </el-steps>
                  </div>
                </ul>
              </li>
              <el-divider></el-divider>
            </template>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :modal="true"
      :modal-append-to-body="false"
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      width="600px"
    >
      <div class="company-hd" style="padding-bottom: 14px">
        <div class="company-logo" style="float: left;">
          <img
            style="width: 100px;
    height: 60px;"
            src="http://59.110.152.155:8000/group1/M00/00/17/rBGuPF7PJ5uAHTJYAAV7fB4Ykps780.jpg"
            class="logo-sub"
          />
        </div>
        <div class="company-title">
          <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
          <h2>{{Transdata.carVo.carNo}}</h2>
          <span style="padding-right: 10px;">{{Transdata.carVo.driver}}</span>
          <i class="el-icon-mobile"></i>
          <span style="padding-right: 10px;">{{Transdata.carVo.driverPhone}}</span>
          <!--</el-tooltip>-->
        </div>
      </div>
      <el-divider></el-divider>
      <div style=" padding-top: 6px;
      display: inline-flex;
      padding-bottom: 5px;
    ">
        <div
          style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
    border-color: #0190DA;
    margin-right: 8px;height: 20px;
"
        >
          <img src="../../../../static/css/images/map/yichu@2x.png" style="height: 11px;" />
          <span style="color: #0190DA;">产废</span>
        </div>
        <div>
          <b>{{cfAndZyInfoVo.productionEntName}}</b>
          <br />
          <span style="margin-left: -75px;line-height: 2;">经办人：{{cfAndZyInfoVo.handledByName}}</span>
          <br />
          <span style="margin-left: -75px;    letter-spacing: 14px;">时间</span>
          <span style="margin-left: -17px;">：{{cfAndZyInfoVo.transportDate}}</span>
        </div>

        <div
          style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
     border-color: #F7B844;
    margin-left: 40px;margin-right: 8px;height: 20px;"
        >
          <img src="../../../../static/css/images/map/jieshou@2x.png" style="height: 11px;" />
          <span style="color: #F7B844;">接收</span>
        </div>
        <div>
          <b>{{cfAndZyInfoVo.transportEntName}}</b>
          <br />
          <span style="margin-left: -75px;line-height: 2;">经办人：{{cfAndZyInfoVo.zyhandledByName}}</span>
          <br />
          <span style="margin-left: -75px;    letter-spacing: 14px;">时间</span>
          <span style="margin-left: -17px;">：{{cfAndZyInfoVo.zytransportDate}}</span>
        </div>
      </div>
      <el-divider></el-divider>
      <table class="table-default">
        <thead></thead>
        <tbody>
          <tr v-for="(item,i)  in tableDatas1">
            <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.storageTime"
            >{{item.dictName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.operationType"
            >{{item.weight}}kg</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>
    <!-- <iframe height=800 :src="video">
    </iframe>-->
  </div>
</template>

<script type="text/javascript">
import productionVideoHuiKan from "./realTimeVideo";
import Urls from "../../../components/common/unit/urls";
import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
import dataformat from "../../common/unit/DateFormat1";
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
      video:
        "http://10.0.200.134:8088/808gps/open/player/video.html?lang=zh&vehiIdno=%E4%BA%ACA123456&jsession=b4fe1b0b-bf31-4cf5-928c-883f5a4edc8d&channel=1",
      adcd: this.AppConfig.appInfo.regionCode /*sessionStorage.getItem("regionCode")*/,
      cfAndZyInfoVo: {},
      isShowzyxx: true,
      status1: "1",
      input3: "",
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
      cfAbnormalImgUrlPath: "../../../../static/css/images/map/redCar.png",
      czImgUrlPath: "../../../../static/css/images/map/blackCar.png",
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
            _this.initEntMaker();
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
      if(item==null){
        this.$message.warning("暂无监控数据!");
        return;
      }
      this.$refs.closeMouleHK.openVideo(item);
      // window.open(this.video);
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
          strokeOpacity: 0.5,
          fillColor: "#FFE494",
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物

        rs.boundaries[0].split(";").forEach((element) => {
          pointArray.push(
            new BMap.Point(element.split(",")[0], element.split(",")[1])
          );
        });
        if (_this.search.regionName1 != this.AppConfig.appInfo.regionName) {
          map.setViewport(pointArray);
        }
      });
    },
    getBoundary1(regionName) {
      var _this = this;
      var bdary = new BMap.Boundary();
      ///this.level = 3
      // bdary.get(this.search.regionName, function(rs) {
      bdary.get(regionName, function (rs) {
        //获取行政区域
        //map.clearOverlays();        //清除地图覆盖物
        // var count = rs.boundaries.length; //行政区域的点有多少个
        var pointArray = [];

        var ply = new BMap.Polygon(rs.boundaries[0], {
          strokeWeight: 1,
          strokeColor: "#ff0000",
          strokeOpacity: 0.5,
          fillColor: "#FFE494",
          fillOpacity: 0.3,
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
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
      var overlaycomplete = function (e) {
        overlays1.push(e.overlay);
        window.overlays = overlays1;
      };

      var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 1, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid", //边线的样式，solid或dashed。
      };
      // setTimeout(() => {
      //   //实例化鼠标绘制工具
      //   var drawingManager = new BMapLib.DrawingManager(map, {
      //     isOpen: false, //是否开启绘制模式
      //     enableDrawingTool: true, //是否显示工具栏
      //     drawingToolOptions: {
      //       anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //位置
      //       offset: new BMap.Size(1340, 5), //偏离值
      //       drawingModes: [BMAP_DRAWING_POLYGON],
      //     },
      //     polygonOptions: styleOptions, //多边形的样式
      //   });
      //   //添加鼠标绘制工具监听事件，用于获取绘制结果
      //   drawingManager.addEventListener("overlaycomplete", overlaycomplete);
      // }, 500);

      /*map.setMapStyleV2({styleJson:this.AppConfig.styleJson});*/
      // 监听停止拖拽地图时可视区域四角

      // map.addEventListener("dragend", function(e) {

      //   if (self.isInit) {
      //     console.log("拖拽时打点")
      //    self.initEntMaker();
      //   } else {
      //     return;
      //   }
      // });

      // // 地图加载完毕

      // 监听层级
      // map.addEventListener("zoomend", function(e) {
      //   if (self.level != 3) {
      //     self.searchData();
      //   } else {
      //     return;
      //   }
      // });
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
      this.addEntMaker();
    },
    getEntMaps(regionCode, regionName, bssw, bsne, entType, userRegionCode) {
      map.clearOverlays(); //清空地图覆盖物
      var _this = this;
      _this.$axios
        .get("/api/regulatory/index/getEntMaps", {
          params: {
            qxCode: regionCode, // 行政区域code
            czCode: "", // 无用
            entType: entType, // 企业类型
            bssw: bssw, // 可视区域西南角经纬度
            bsne: bsne, // 可视区域东北角经纬度
            userRegionCode: userRegionCode,
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data;

            _this.initEntMaker(); //向地图中添加统计点
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
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
                strokeColor: "#ADD8E6",
                fillColor: "#ADD8E6",
                fillOpacityL: 0.6,
              }); //建立多边形覆盖物
              map.addOverlay(ply);
            });
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
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
    getRegionCountData(
      parentRegionCode,
      thisRegionCode,
      level,
      bssw,
      bsne,
      entType,
      userRegionCode
    ) {
      var _this = this;
      _this.$axios
        .post(
          "/api/regulatory/tEnterpriseTransferStandingBook/selectTransPhoneList",
          {}
        )
        .then(function (res) {
          if (res.code == 0) {
            map.clearOverlays();
            // _this.dataList = res.data;
            // _this.addRegionMarker(res.data); //向地图中添加统计点
            _this.data1 = [];
            res.data.forEach((element) => {
              _this.getlatestpoint(element);
            });

            var markerClusterer = new BMapLib.MarkerClusterer(map, {
              markers: _this.data1,
            });
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },

    standardApiActionVehicleStatus() {
      var _this = this;
      _this.$axios
        .get(
          "/beidou/StandardApiAction_vehicleStatus.action?jsession=0b79821c-81c2-4bfe-884e-4fd2fdb44851&vehiIdno=京A123456&toMap=2&currentPage=1&pageRecords=50"
        )
        .then(function (res) {
          if (res.result == 0) {
            ;
            let a = [];
            let data = {};
            data.lng = res.infos[0].pos.split(",")[1];
            data.lat = res.infos[0].pos.split(",")[0];
            data.entKind = 1;
            a.push(data);
            _this.addEntMaker1(a);
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
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
    addEntMaker() {
      // markerClusterer.clearMarkers(this.markers1);
      this.markers1 = [];
      var MAX = 10;
      var markers = [];
      var dataList = [];
      var pointArr = [];
      var pt = null;

      for (var i = 0; i < MAX; i++) {
        var data = {};
        pt = new BMap.Point(Math.random() * 2 + 118, Math.random() * 2 + 34);
        data.lng = Math.random() * 1 + 118;
        data.lat = Math.random() * 1 + 34.5;
        data.entKind = i % 2 == 0 ? 2 : 1;
        dataList.push(data);
        markers.push(new BMap.Marker(pt));
      }
      var mycfIcon = {};
      /*                if(dataList.warningType==null||dataList.warningType==0){
                    mycfIcon = new BMap.Icon(this.cfNormalImgUrlPath, new BMap.Size(30,50))
                }else{*/
      mycfIcon = new BMap.Icon(
        this.cfAbnormalImgUrlPath,
        new BMap.Size(31, 30)
      );
      /*}*/
      var makers = [];
      var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(31, 30));
      for (var i = 0; i < dataList.length; i++) {
        //遍历
        if (dataList[i].count != 0) {
          // 过滤0数据
          var infoA = dataList[i].lng;
          var infoB = dataList[i].lat;
          /*if(1==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:mycfIcon});
                        }else if(2==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:myczIcon});
                        }else if(3==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:myysIcon});
                        }*/
          // 添加区域信息点位
          var entInfoMaker = null;
          var entInfoPoint = new BMap.Point(infoA, infoB);
          if (dataList[i].entKind == 1) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: mycfIcon,
            }); // 创建标注
          } else if (dataList[i].entKind == 2) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: myczIcon,
            }); // 创建标注
          }
          var entId = dataList[i].entId;
          //var zlabelContext = '<div><span style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #c0c4cc; position: relative;">重</span><em style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #c0c4cc; position: relative;">'+dataList[i].name+'</em><span style="position: relative;display: inline-block;background-color: #c0c4cc;padding-left: 15px;padding-right: 8px;height: 23px;">油量:'+dataList[i].currentAmount+'吨</span></div>';
          //var labelContext = '<div><em style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #dcdfe6; position: relative;">'+dataList[i].name+'</em><span style="position: relative;display: inline-block;background-color: #dcdfe6;padding-left: 15px;padding-right: 8px;height: 23px;">油量:'+dataList[i].currentAmount+'吨</span></div>';
          //var zlabelContext = '<div class="myZhongEntMakerClass"><a href="javascript:;" class="title-box"><div class="title-text"><i class="ico">重</i>'+dataList[i].name+'</div>   <div>油量：<span class="text-bold">'+dataList[i].currentAmount+'吨</span></div></a></div>';
          //var labelContext = '<div class="myZhongEntMakerClass"><a href="javascript:;" class="title-box"><div class="title-text">'+dataList[i].name+'</div>   <div>油量：<span class="text-bold">'+dataList[i].currentAmount+'吨</span></div></a></div>';
          // var zlabelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;"  class="title-box"><div class="title-text"><i class="ico">重</i>'+dataList[i].name+'</div>     <div class="title-text">油量：<span class="text-bold">'+dataList[i].currentAmount+'吨</span></div></a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          // var labelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;"  class="title-box"><div class="title-text">'+dataList[i].name+'</div>     <div class="title-text">油量：<span class="text-bold">'+dataList[i].currentAmount+'吨</span></div></a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          var zlabelContext = "";
          // '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' +
          // JSON.stringify(dataList[i]).replace(/\"/g, "'") +
          // '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' +
          // dataList[i].name +
          // // '"><div class="title-text"><i class="ico">重</i>' +
          // dataList[i].name +
          // '</div></a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          // var zlabelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: 498px; left: 380px;" x-placement="top-start"><a href="javascript:;" class="title-box" data-toggle="tooltip" data-placement="top" title="XXXXXX接收企业名称接XXXXXX接收企业名称接XXXXXX接收企业名称接"><div class="title-text">XXXXXX接收企业XXXXXX接收企业</div></a><div x-arrow="" class="popper__arrow" style="left: 160px;"></div></div>';
          var labelContext =
            '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' +
            JSON.stringify(dataList[i]).replace(/\"/g, "'") +
            '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' +
            dataList[i].name +
            '"><div class="title-text">' +
            dataList[i].name +
            '</div>   </a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          var label = null;
          if (dataList[i].entType == "1") {
            label = new BMap.Label(zlabelContext, {
              offset: new BMap.Size(-100, -50),
            });
          } else if (dataList[i].entType == "2") {
            label = new BMap.Label(labelContext, {
              offset: new BMap.Size(-100, -50),
            });
          }
          // label.setStyle({
          //   background: "none",
          //   color: "#red",
          //   border: "none" //只要对label样式进行设置就可达到在标注图标上显示数字的效果
          // });
          // entInfoMaker.setLabel(label); // 给点位添加文本
          var _this = this;
          // 全局,待优化
          window.entClickInfo = function (item) {
            var entInfo = JSON.parse(item.replace(/'/g, '"'));
            _this.entInfoLook(entInfo);
          };

          map.addOverlay(entInfoMaker); // 添加点
          this.entMakerClickHandler(entInfoMaker, dataList[i]); // 添加点击事件
          this.markers1.push(entInfoMaker);
          pointArr.push(entInfoPoint);
        }

        //
        // markerClusterer.clearMarkers();

        // window.markerClusterer = markerClusterer;
        /*$('[data-toggle="tooltip"]').tooltip({

                    });*/
        /*$('.title-box[data-toggle="tooltip"]').tooltip({
                        container: 'body',
                    })*/
      }
      //
      // markerClusterer.addMarkers(this.markers1);
      this.getBoundary();
      // map.setViewport(pointArr);
    },
    addEntMaker1(dataList) {
      // markerClusterer.clearMarkers(this.markers1);
      this.markers1 = [];
      var MAX = 10;
      var markers = [];
      var pointArr = [];
      var pt = null;

      // for (var i = 0; i < MAX; i++) {
      //   var data = {};
      //   pt = new BMap.Point(Math.random() * 2 + 118, Math.random() * 2 + 34);
      //   data.lng = Math.random() * 1 + 118;
      //   data.lat = Math.random() * 1 + 34.5;
      //   data.entKind = i % 2 == 0 ? 2 : 1;
      //   dataList.push(data);
      //   markers.push(new BMap.Marker(pt));
      // }
      var mycfIcon = {};
      /*                if(dataList.warningType==null||dataList.warningType==0){
                    mycfIcon = new BMap.Icon(this.cfNormalImgUrlPath, new BMap.Size(30,50))
                }else{*/
      mycfIcon = new BMap.Icon(
        this.cfAbnormalImgUrlPath,
        new BMap.Size(31, 30)
      );
      /*}*/
      var makers = [];
      var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(31, 30));
      for (var i = 0; i < dataList.length; i++) {
        //遍历
        if (dataList[i].count != 0) {
          // 过滤0数据
          var infoA = dataList[i].lng;
          var infoB = dataList[i].lat;
          /*if(1==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:mycfIcon});
                        }else if(2==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:myczIcon});
                        }else if(3==dataList[i].entKind){
                            entInfoMaker = new window.BMap.Marker(point[i],{icon:myysIcon});
                        }*/
          // 添加区域信息点位
          var entInfoMaker = null;
          var entInfoPoint = new BMap.Point(infoA, infoB);
          if (dataList[i].entKind == 1) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: mycfIcon,
            }); // 创建标注
          } else if (dataList[i].entKind == 2) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: myczIcon,
            }); // 创建标注
          }
          var entId = dataList[i].entId;
          var zlabelContext = "";
          var labelContext =
            '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' +
            JSON.stringify(dataList[i]).replace(/\"/g, "'") +
            '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' +
            dataList[i].name +
            '"><div class="title-text">' +
            dataList[i].name +
            '</div>   </a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          var label = null;
          if (dataList[i].entType == "1") {
            label = new BMap.Label(zlabelContext, {
              offset: new BMap.Size(-100, -50),
            });
          } else if (dataList[i].entType == "2") {
            label = new BMap.Label(labelContext, {
              offset: new BMap.Size(-100, -50),
            });
          }

          var _this = this;
          // 全局,待优化
          window.entClickInfo = function (item) {
            var entInfo = JSON.parse(item.replace(/'/g, '"'));
            _this.entInfoLook(entInfo);
          };

          map.addOverlay(entInfoMaker); // 添加点
          this.entMakerClickHandler(entInfoMaker, dataList[i]); // 添加点击事件
        }
      }
    },
    initEntMaker() {
      map.clearOverlays();
      // console.log("执行初始化数据");
      this.markers1 = [];
      var MAX = 10;
      var markers = [];
      var dataList = [];

      var pt = null;

      for (var i = 0; i < MAX; i++) {
        var data = {};
        pt = new BMap.Point(Math.random() * 2 + 118, Math.random() * 2 + 34);
        data.lng = Math.random() * 1 + 118;
        data.lat = Math.random() * 1 + 34.5;
        data.entKind = i % 2 == 0 ? 2 : 1;
        dataList.push(data);
        markers.push(new BMap.Marker(pt));
      }

      var mycfIcon = {};
      /*                if(dataList.warningType==null||dataList.warningType==0){
                    mycfIcon = new BMap.Icon(this.cfNormalImgUrlPath, new BMap.Size(30,50))
                }else{*/
      mycfIcon = new BMap.Icon(
        this.cfAbnormalImgUrlPath,
        new BMap.Size(80, 60)
      );
      /*}*/
      var makers = [];
      var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(80, 60));
      for (var i = 0; i < dataList.length; i++) {
        //遍历
        if (dataList[i].count != 0) {
          // 过滤0数据
          var infoA = dataList[i].lng;
          var infoB = dataList[i].lat;
          // 添加区域信息点位
          var entInfoMaker = null;

          if (dataList[i].entKind == 1) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: mycfIcon,
            }); // 创建标注
          } else if (dataList[i].entKind == 2) {
            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
              icon: myczIcon,
            }); // 创建标注
          }
          var entId = dataList[i].entId;
          var zlabelContext = "";
          var labelContext =
            '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' +
            JSON.stringify(dataList[i]).replace(/\"/g, "'") +
            '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' +
            dataList[i].name +
            '"><div class="title-text">' +
            dataList[i].name +
            '</div>   </a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
          var label = null;
          if (dataList[i].entType == "1") {
            label = new BMap.Label(zlabelContext, {
              offset: new BMap.Size(-100, -50),
            });
          } else if (dataList[i].entType == "2") {
            label = new BMap.Label(labelContext, {
              offset: new BMap.Size(-100, -50),
            });
          }

          var _this = this;
          // 全局,待优化
          window.entClickInfo = function (item) {
            var entInfo = JSON.parse(item.replace(/'/g, '"'));
            _this.entInfoLook(entInfo);
          };

          map.addOverlay(entInfoMaker); // 添加点
          this.entMakerClickHandler(entInfoMaker, dataList[i]); // 添加点击事件
          this.markers1.push(entInfoMaker);
        }
      }

      // var markerClusterer = new BMapLib.MarkerClusterer(map, {
      //   markers: this.markers1
      // });
      // window.markerClusterer = markerClusterer;
    },
    entMakerClickHandler(entInfoMaker, entInfo) {
      var _this = this;
      entInfoMaker.addEventListener(
        "click",
        function (e) {
          _this.isInit = false;
          // _this.startQueryTrack("myTrace");
          // $("#entInfo").fadeIn();
          ;
          var myP1 = new BMap.Point(118.275997, 35.041972); //起点-重庆
          var myP2 = new BMap.Point(118.24281, 35.1136); //终点-西安
          var myP3 = new BMap.Point(118.237138, 34.87211);

          sessionStorage.setItem("pts", []);
          var pts = [];
          map.clearOverlays();
          setTimeout(() => {
            _this
              .driverSearch1()
              .then(function (res) {
                // console.log(res);
                pts = pts.concat(res);
                _this
                  .driverSearch2()
                  .then(function (res) {
                    pts = pts.concat(res);
                    ;
                    let pts1 = _this.chunk(pts, 300);
                    let pts2 = _this.chunk1(pts, 300);
                    _this.addLuShu(pts2);
                    _this.initLuShu2(pts1);
                    var myIcon = new BMap.Icon(
                      "../../../../static/css/images/map/redCar.png",
                      new BMap.Size(35, 60)
                    );
                    var regionInfoMaker = new BMap.Marker(pts2[0], {
                      icon: myIcon,
                    });
                    map.addOverlay(regionInfoMaker);
                  })
                  .catch(function (err) {
                    // console.log(err);
                  });
              })
              .catch(function (err) {
                // console.log(err);
              });

            // _this.entInfoLook(1);
            // let point = [
            //   {
            //     lng: "118.275997",
            //     lat: "35.041972",
            //   },
            //   {
            //     lng: "118.24281",
            //     lat: "35.1136",
            //   },
            //   {
            //     lng: "118.237138",
            //     lat: "34.87211",
            //   },
            // ];
            // var styleOptions = {
            //   strokeColor: "red", //边线颜色。
            //   fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
            //   strokeWeight: 1, //边线的宽度，以像素为单位。
            //   strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
            //   fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
            //   strokeStyle: "solid", //边线的样式，solid或dashed。
            // };
            // let polArry1 = [];
            // point.forEach((item) => {
            //   let p = new BMap.Point(item.lng, item.lat);
            //   polArry1.push(p);
            // });
            // let polygon = new BMap.Polygon(polArry1, {
            //   strokeWeight: 2,
            //   strokeColor: "#ff0000",
            // });
            // map.addOverlay(polygon);

            _this.entInfoLook(entInfo);
            _this.selectPoints();
          });
        },
        200
      );
    },
    addLuShu(pts) {
      var myP1 = new BMap.Point(118.275997, 35.041972); //起点-重庆
      var myP2 = new BMap.Point(118.24281, 35.1136); //终点-西安
      var myP3 = new BMap.Point(118.237138, 34.87211);

      this.initLuShu1(pts);
      sessionStorage.setItem(
        "pts",
        JSON.stringify(pts).concat(JSON.stringify(pts))
      );
      this.addMarkerFun1(myP1, 1, 2, null, "临沂旺利达彩涂有限公司");

      this.addMarkerFun1(myP3, 1, 1, null, "临沂国盛彩印包装有限公司");
      //最后一页添加终点标记
      // // 终点
      this.addMarkerFun1(myP2, 1, 0, null, "中节能（临沂）环保能源有限公司");
    },
        addLuShu(pts) {
      var myP1 = new BMap.Point(118.275997, 35.041972); //起点-重庆
      var myP2 = new BMap.Point(118.24281, 35.1136); //终点-西安
      var myP3 = new BMap.Point(118.237138, 34.87211);

      this.initLuShu1(pts);
      sessionStorage.setItem(
        "pts",
        JSON.stringify(pts).concat(JSON.stringify(pts))
      );
      this.addMarkerFun1(myP1, 1, 2, null, "临沂旺利达彩涂有限公司");

      this.addMarkerFun1(myP3, 1, 1, null, "临沂国盛彩印包装有限公司");
      //最后一页添加终点标记
      // // 终点
      this.addMarkerFun1(myP2, 1, 0, null, "中节能（临沂）环保能源有限公司");
    },
    entInfoLook(entInfo) {
      var _this = this;
      _this.registeredAddress = "";
      // 查询企业详情
      _this.$axios
        .get(
          "/api/regulatory/tEnterpriseTransferStandingBook/selectZyxxAndWldByCarNo",
          {
            params: {
              carNo: "鲁A65747",
              outInStackLimit: _this.outInStackLimit,
            },
          }
        )
        .then(function (res) {
          if (res.code == 0) {
            $("#entInfo").fadeIn();
            _this.Transdata = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    addRegionMarker(dataList) {
      for (var i = 0; i < dataList.length; i++) {
        //遍历
        if (dataList[i].count != 0) {
          // 过滤0数据
          var infoA = dataList[i].lng;
          var infoB = dataList[i].lat;
          var myIcon = new BMap.Icon(
            "../../../../static/css/images/map/形状结合备份@1x备份 2@2x2.png",
            new BMap.Size(200, 65)
          );
          // 添加区域信息点位
          var regionInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {
            icon: myIcon,
          }); // 创建标注
          var labelContext =
            '<div><em style=" display: inline-block; padding: 4px 8px;font-size:25px;height: 23px;background-color: #ffb700;color: #fff; position: relative;">' +
            dataList[i].regionName +
            '</em><div style="position: absolute;display: inline;padding-left: 12px;padding-right: 8px;height: 48px;border-bottom: 2px solid #cf9236;border-right: 2px solid #cf9236;border-top: 2px solid #cf9236;margin-top: -2px;margin-left: 2px;padding: 4px 8px;font-size: 25px;border-radius: 5px;background: #f5f7fa;">' +
            dataList[i].count +
            "辆</div></div>";
          var label = new BMap.Label(labelContext, {
            offset: new BMap.Size(1, 1),
          });
          label.setStyle({
            background: "none",
            color: "#red",
            border: "none", //只要对label样式进行设置就可达到在标注图标上显示数字的效果
          });
          regionInfoMaker.setLabel(label); // 给点位添加文本
          map.addOverlay(regionInfoMaker); // 添加点
          this.regionCodeMakerClickHandler(regionInfoMaker, dataList[i]); // 添加点击事件
        }
      }
    },
    regionCodeMakerClickHandler(regionInfoMaker, regionInfo) {
      var self = this;
      var entType = self.search.entType;
      regionInfoMaker.addEventListener("click", function (e) {
        self.level = 3;
        // 查询当前点位下级点位 省查市
        map.clearOverlays(); //清空地图覆盖物
        // 设置可视区域
        var bs = map.getBounds(); //获取可视区域
        var bssw = bs.getSouthWest(); //可视区域左下角
        var bsne = bs.getNorthEast(); //可视区域右上角
        var sw = bssw.lng + "," + bssw.lat;
        var ne = bsne.lng + "," + bsne.lat;
        var thisLevel = regionInfo.level;
        /*if(thisLevel==1){//省
                        // 查询该省下市
                        map.centerAndZoom(new BMap.Point(regionInfo.lng,regionInfo.lat),7);
                        self.getRegionCountData(regionInfo.regionCode,'', 2, sw, ne,entType,self.search.regionCode);
                    }else */ if (
          thisLevel == 2 ||
          thisLevel == 1
        ) {
          // 市
          // 查询该市下区县
          map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 9);
        } else if (thisLevel == 3) {
          // 区县
          // 查询企业点位数据
          map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 13);
          // self.getIndexMaps(regionInfo.regionCode, entType);
        }
      });
    },
    driverSearch1() {
      return new Promise((resolve, reject) => {
        var driving = new BMap.DrivingRoute(map);
        var myP1 = new BMap.Point(118.275997, 35.041972); //起点-重庆
        var myP2 = new BMap.Point(118.24281, 35.1136); //终点-西安
        driving.search(myP2, myP1);
        driving.setSearchCompleteCallback(function () {
          let pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组

          resolve(pts);
          return true;
        });
      });
    },
    driverSearch2() {
      return new Promise((resolve, reject) => {
        var driving = new BMap.DrivingRoute(map);
        var myP1 = new BMap.Point(118.275997, 35.041972); //起点-重庆
        var myP3 = new BMap.Point(118.237138, 34.87211);
        driving.search(myP1, myP3);
        driving.setSearchCompleteCallback(function () {
          let pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组

          resolve(pts);
          return true;
        });
      });
    },
    initLuShu2(arrPois) {
      let pointArr = [];

      for (let i = 0; i < arrPois.length; i++) {
        pointArr.push(
          new BMap.Point(arrPois[i].lng, arrPois[i].lat)
          //  new BMap.Point(Math.random() * 1 + 118, Math.random() * 1 + 34)
        );
      }

      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: "1", //设置线宽
      });
      var icons = new BMap.IconSequence(sy, "100%", "5%");

      var polyline = new BMap.Polyline(pointArr, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: "8", //折线的宽度，以像素为单位
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        strokeColor: "grey", //折线颜色
      });
      map.addOverlay(polyline);

      // map.setViewport(pointArr);
    },
    chunk(arr, size) {
      var arr1 = [];
      arr1 = arr1.concat(arr.slice(0, size));
      return arr1;
    },
    chunk1(arr, size) {
      var arr1 = [];
      arr1 = arr1.concat(arr.slice(size, arr.length - 1));
      return arr1;
    },
    getIndexMaps(regionCode, entType) {
      map.clearOverlays(); //清空地图覆盖物
      var _this = this;
      _this.$axios
        .get("/api/regulatory/index/getIndexMaps", {
          params: {
            regionCode: regionCode,
            entType: entType,
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            var entCountData = res.data;
            if (entCountData.length > 0) {
              _this.addEntMaker(res.data);
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
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
            ;
            let a = res.data[0].name;
            _this.regionOptions = res.data;
            res.data[0].children.forEach((element) => {
              _this.getBoundary1(a + element.name);
            });
            setTimeout(() => {
              _this.selectPoints();
            }, 555);
            // _this.selectPoints();
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
    startQueryTrack(entityName) {
      this.markers1 = [];
      this.isInit = false;
      let _self = this;
      _self.map.clearOverlays(); //清空地图覆盖物
      _self.pageIndex = 1;
      _self.lastPoint = "";
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 18);
      // let timeStr = dataformat.formatDate(this.dayTime, "yyyy-MM-dd");
      let timeStr = "2020-07-10";
      let startTime = dataformat.newDate(timeStr + " 00:00:00");
      let endTime = dataformat.newDate(timeStr + " 23:59:59");
      let startTimeUnix = Math.ceil(startTime.getTime() / 1000) - 600;
      let endTimeUnix = Math.ceil(endTime.getTime() / 1000) - 600;
      this.getTrack(entityName, startTimeUnix, endTimeUnix, false);
    },
    getTrack(entityName, startTimeUnix, endTimeUnix, cycleOrNot) {
      let _self = this;
      let params = {
        entity_name: entityName,
        start_time: startTimeUnix,
        end_time: endTimeUnix,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        is_processed: 1,
        process_option:
          "denoise_grade=3,vacuate_grade=1,need_mapmatch=0,transport_mode=auto",
      };

      Urls.jsonp(Urls.getTrack, params, function (res) {
        // console.log("轨迹查询返回参数");
        // console.log(res);
        if (res.status == 0) {
          if (!cycleOrNot) {
            //第一次查询轨迹
            if (parseInt(res.total) == 0) {
              _self.getTrackFail(res);
              return;
            } else if (parseInt(res.total) <= _self.pageSize) {
              _self.startDrawingTracks(res, true);
            } else {
              //开始自动分页查询
              _self.pageCount = Math.ceil(res.total / _self.pageSize);
              _self.pageIndex = 2;
              _self.startDrawingTracks(res, false);
              // console.log("轨迹查询第"+_self.pageIndex+"页数据");
              _self.getTrack(entityName, startTimeUnix, endTimeUnix, true);
            }
          } else {
            if (_self.pageIndex < _self.pageCount) {
              //分页查询中
              _self.pageIndex += 1;
              _self.startDrawingTracks(res, false);
              // console.log("轨迹查询第"+_self.pageIndex+"页数据");
              _self.getTrack(entityName, startTimeUnix, endTimeUnix, true);
            } else {
              //最后一页返回结果
              _self.startDrawingTracks(res, true);
            }
          }
        } else {
          _self.getTrackFail(res);
        }
      });
    },
    getTrackFail(res) {
      // console.log("轨迹信息查询失败,报文如下:");
      // console.log(res);
      this.$message.error("查询失败,轨迹信息不存在!");
    },
    startDrawingTracks(res, isItTheLastPage) {
      let _self = this;
      // // 开始点
      let startPoint = new BMap.Point(
        res.start_point.longitude,
        res.start_point.latitude
      );
      _self.addMarkerFun(startPoint, 1, 0);
      if (isItTheLastPage) {
        //最后一页添加终点标记
        // // 终点
        let endPoint = new BMap.Point(
          res.end_point.longitude,
          res.end_point.latitude
        );
        _self.addMarkerFun(endPoint, 1, 1);
      }

      if (_self.lastPoint == "") {
        _self.lastPoint = res.points[res.points.length - 1];
      } else {
        //在指定位置添加元素,第一个参数指定位置,第二个参数指定要删除的元素,如果为0,则追加
        res.points.splice(0, 0, _self.lastPoint);
        //更新上一页的最后一个点
        _self.lastPoint = res.points[res.points.length - 1];
      }
      _self.lastPoint = res.points[res.points.length - 1];
      _self.initLuShu(res.points);
    },
    startDrawingTracks1(pointArr, p1, p2, p3) {
      // console.log(pointArr.length);
      this.map.clearOverlays();
      let _self = this;
      // // 开始点
      let startPoint = p1;
      _self.addMarkerFun1(startPoint, 1, 0, null, "临沂旺利达彩涂有限公司");
      let tujingPoint = p2;
      _self.addMarkerFun1(tujingPoint, 1, 2, null, "临沂国盛彩印包装有限公司");
      //最后一页添加终点标记
      // // 终点
      let endPoint = p3;
      _self.addMarkerFun1(
        endPoint,
        1,
        1,
        null,
        "中节能（临沂）环保能源有限公司"
      );

      _self.initLuShu1(pointArr);
    },
    initLuShu(arrPois) {
      let pointArr = [];
      for (let i = 0; i < arrPois.length; i++) {
        pointArr.push(
          new BMap.Point(arrPois[i].longitude, arrPois[i].latitude)
          //  new BMap.Point(Math.random() * 1 + 118, Math.random() * 1 + 34)
        );
      }

      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: "1", //设置线宽
      });
      var icons = new BMap.IconSequence(sy, "10", "30");

      var polyline = new BMap.Polyline(pointArr, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: "8", //折线的宽度，以像素为单位
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        strokeColor: "#18a45b", //折线颜色
      });

      map.addOverlay(polyline);
      map.setViewport(pointArr);
      // this.lushu = new BMapLib.LuShu(this.map, pointArr, {
      //     defaultContent: "", //"从天安门到百度大厦"
      //     autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
      //     icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52, 26), {
      //         anchor: new BMap.Size(27, 13)
      //     }),
      //     speed: 4500,
      //     enableRotation: true, //是否设置marker随着道路的走向进行旋转
      //     landmarkPois: [
      //         {
      //             lng: 116.305496,
      //             lat: 40.055212,
      //             html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',
      //             pauseTime: 3
      //         }
      //     ]
      // });
    },
    initLuShu1(arrPois) {
      let pointArr = [];

      for (let i = 0; i < arrPois.length; i++) {
        pointArr.push(
          new BMap.Point(arrPois[i].lng, arrPois[i].lat)
          //  new BMap.Point(Math.random() * 1 + 118, Math.random() * 1 + 34)
        );
      }

      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: "1", //设置线宽
      });
      var icons = new BMap.IconSequence(sy, "100%", "10%");
      var polyline = new BMap.Polyline(pointArr, {
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: true, //是否响应点击事件，默认为true
        icons: [icons],
        strokeWeight: "8", //折线的宽度，以像素为单位
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        strokeColor: "#18a45b", //折线颜色
      });
      map.addOverlay(polyline);
      map.setViewport(pointArr);
    },
    addMarkerFun(point, imgType, index, title) {
      var url;
      var width;
      var height;
      var myIcon;
      // imgType:1的场合，为起点和终点的图；2的场合为车的图形
      if (imgType == 1) {
        url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
        width = 42;
        height = 34;
        myIcon = new BMap.Icon(url, new BMap.Size(width, height), {
          offset: new BMap.Size(14, 32),
          imageOffset: new BMap.Size(0, 0 - index * height),
        });
      } else {
        url = "http://lbsyun.baidu.com/jsdemo/img/trans_icons.png";
        width = 22;
        height = 25;
        var d = 25;
        var cha = 0;
        var jia = 0;
        if (index == 2) {
          d = 21;
          cha = 5;
          jia = 1;
        }
        myIcon = new BMap.Icon(url, new BMap.Size(width, d), {
          offset: new BMap.Size(10, 11 + jia),
          imageOffset: new BMap.Size(0, 0 - index * height - cha),
        });
      }

      var marker = new BMap.Marker(point, { icon: myIcon });
      if (title != null && title != "") {
        marker.setTitle(title);
      }

      // 起点和终点放在最上面
      if (imgType == 1) {
        marker.setTop(true);
      }
      map.addOverlay(marker);
      this.showEntinfo = true;
    },
    getLayerInformation() {
      // console.log(overlays[0].getPath());
    },
    addMarkerFun1(point, imgType, index, title, label) {
      var url;
      var width;
      var height;
      var myIcon;
      // imgType:1的场合，为起点和终点的图；2的场合为车的图形
      if (imgType == 1) {
        if (index == 2) {
          url = "../../../../static/css/images/map/chanfei_red.png";
          myIcon = new BMap.Icon(url, new BMap.Size(30, 50));
        } else {
          url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
          width = 42;
          height = 34;
          myIcon = new BMap.Icon(url, new BMap.Size(width, height), {
            offset: new BMap.Size(14, 32),
            imageOffset: new BMap.Size(0, 0 - index * height),
          });
        }
      } else {
        url = "http://lbsyun.baidu.com/jsdemo/img/trans_icons.png";
        width = 22;
        height = 25;
        var d = 25;
        var cha = 0;
        var jia = 0;
        if (index == 2) {
          d = 21;
          cha = 5;
          jia = 1;
        }
        myIcon = new BMap.Icon(url, new BMap.Size(width, d), {
          offset: new BMap.Size(10, 11 + jia),
          imageOffset: new BMap.Size(0, 0 - index * height - cha),
        });
      }

      var marker = new BMap.Marker(point, { icon: myIcon });
      // if (title != null && title != "") {
      //   marker.setTitle(title);
      // }

      // 起点和终点放在最上面
      // if (imgType == 1) {
      //   marker.setTop(true);
      // }
      var labelContext =
        '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' +
        +'"); class="title-box" data-toggle="tooltip" data-placement="top" title="' +
        label +
        '"><div class="title-text">' +
        label +
        "</div>  ";
      map.addOverlay(marker);
      var label = new BMap.Label(labelContext, {
        offset: new BMap.Size(20, -10),
      });
      marker.setLabel(label);
      this.showEntinfo = true;
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
            setTimeout(() => {
              _this.getRegionChildrenList();
              _this.standardApiActionVehicleStatus();
            }, 555);
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
          // 地图
          _this.initPage();
        });
    },
    IsInPolygon() {
      let pt = new BMap.Point(118.28392152973998, 35.03893254555622);
      //  let  pt = new BMap.Point(Math.random() * 2 + 118, Math.random() * 2 + 34);
      let marker = new BMap.Marker(pt);
      map.addOverlay(marker);
      let polygon = new BMap.Polygon(overlays[0].getPath());
      if (BMapLib.GeoUtils.isPointInPolygon(pt, polygon)) {
        alert("在区域内");
      } else {
        alert("不在区域内");
      }
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

    // 查询当前用户区域信息
    this.selectRegionInfoByUser();
    // 行政区域级联

    //  this.selectPoints();
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
