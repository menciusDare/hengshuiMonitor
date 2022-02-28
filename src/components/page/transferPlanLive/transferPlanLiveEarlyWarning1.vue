<template>
    <!-- 内容区域 -->
    <div class="main main-full">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-all"></i>危废转移风险预警</a><span class="sep">&gt;</span><span
                    class="text-primary">转移计划</span>
            </div>
        </div>
        <div class="map-box">
            <!-- 地图 -->
            <div class="allmap" id="wfMap"></div>
            <!-- 左侧 -->
            <div class="map-left">
                <!-- 筛选 -->
                <div class="filter-area" style="width: 1150px">
                    <ul class="filter-box">
                        <li class="filter-item" style="width: 370px;margin-right: 0px">
                            <div class="filter-label">时间：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <div class="el-input el-input--suffix">
                                        <el-date-picker style="width: 300px;height: 35px"
                                                        v-model="value1" value-format="yyyy-MM-dd"
                                                        type="daterange"
                                                        range-separator="—"
														:picker-options="pickerOptions"
                                                        start-placeholder="开始日期"
                                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <el-divider direction="vertical"></el-divider>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select w180">
                                    <el-select placeholder="危废类型" v-model="dictDetailCode">
                                        <el-option label="全部" value></el-option>
                                        <el-option
                                                v-for="item in dicTypes"
                                                :key="item.id"
                                                :label="item.typeNname"
                                                :value="item.typeNname">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select w180">
                                    <el-cascader
                                            placeholder="选择所在地"
                                            ref="regionElCascader"
                                            :disabled="isDisabled"
                                            v-model="search.regionCode"
                                            :options="regionOptions"
                                            :props="{ checkStrictly: true }">
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <!---->
                                    <el-input v-model.trim="searchValue" placeholder="请输入转运单位">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
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
                                <el-button type="button" size="small" @click="searchMap"
                                           class="el-button el-button--primary">
                                    <span>搜索</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 右侧 -->
			<div class="map-right" id="entInfo" style="top: 25px;display: none">
				<div class="company-box" style="width: 320px;">
					<div class="company-hd">
						<div class="company-logo">
							<img src="../../../../static/css/images/pic/logo02.png" class="logo-sub">
						</div>
						<div class="company-title">
							<!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
							<h2> {{entMapInfo.name}} </h2>
							<!--</el-tooltip>-->
							<div class="company-location">
								<i class="icon icon-location"></i>
								<!--<el-tooltip class="item" effect="dark" :content="entMapInfo.registeredAddress" placement="top-start">-->
								<span>{{entMapInfo.registeredAddress}}</span>
								<!--</el-tooltip>-->
							</div>
						</div>
					</div>
					
					<div v-if="outInlibraryVoList!=null && outInlibraryVoList.length>0">
					    <ul v-for="(item,index) in outInlibraryVoList">
					        <div class="sub-name" style="font-size: 16px;font-weight:bold" align="center">
					            {{item.transportDates | parseTime('{y}-{m}-{d}') }}
					        </div>
					        <div class="waste-box mt-sm" v-for="(containeInfo,index) in item.list">
					            <div class="waste-item"><span class="waste-name" :title="containeInfo.enterpriseName" style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 38%">{{index+1}}. {{containeInfo.enterpriseName}} </span><span>{{containeInfo.dictDetailName}}</span><span class="waste-num">{{containeInfo.totalTransportNumber}}kg</span></div>
					        </div>
					    </ul>
					</div>
					<div class="step-box step02" style="padding: 7px 100px;" v-else>
					    暂无数据
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import {asyncLoadBaiduMapJsApi} from '../../../components/common/unit/loadBMapApi';
	import { parseTime } from '../../common/unit/index1';
    export default {
        name: "wfMap",
		filters: {
		  parseTime(time, cFormat) {
		    return parseTime(time, cFormat)
		  }
		},
        data() {
            return {
                value1: ['', ''],//时间,
                searchValue: '', //转运单位输入值
                dicTypes: [],//危废类型
                dictDetailCode: '',//危废类型值,
                thisRegionCode: sessionStorage.getItem('regionCode'),//区域编号
				regionOptions: [],//区域数组
				regionCode: sessionStorage.getItem('regionCode'),//当前区域编码
				parentCode: this.AppConfig.appInfo.parentCode,//当前父级：临沂市编码
				regionName: this.AppConfig.appInfo.regionName,//临沂市
				lng: this.AppConfig.appInfo.lng,//临沂市经度
				lat: this.AppConfig.appInfo.lat,//临沂市纬度
				initBssw: this.AppConfig.appInfo.bssw,// 可视区域西南角经纬度
				initBsne: this.AppConfig.appInfo.bsne,// 可视区域东北角经纬度
				pickerOptions: {
				  disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
					// return date.getTime() <= Date.now();    //禁用今天以及以前的日期
				  }
				},
				outInlibraryVoList:[],
				
				
                isDisabled: false,
                map: null,
                markerArr: [],
                regionMaker: '',
                areaOptions: [],
                cityOptions: [],
                cityCode: "",
                areaCode: "",
                cfUnit: "",
                regionLevel: sessionStorage.getItem('regionLevel') == null ? this.AppConfig.appInfo.regionLevel : sessionStorage.getItem('regionLevel'),
                
                centerLevel: 8,
                
                level: 5,
                entType: '',
                registeredAddress: '',
                userRegionCode: '',
                zoom: '',
                dataList: [],
                
                search: {
                    regionCode: sessionStorage.getItem('regionCode'),
                    regionLevel: sessionStorage.getItem('regionLevel') == null ? this.AppConfig.appInfo.regionLevel : sessionStorage.getItem('regionLevel'),
                },
                outInStackLimit: 5,
                entMapInfo: {},
                stockScale: 0,
                groupStorageCurrentSum: 0,
                containeGroupVoList: [],
				//产废重点
				cfAbnormalImgUrlPath :"../../../../static/css/images/map/chanfei_red.png",
				//经营
				czImgUrlPath :"../../../../static/css/images/map/chuzhi.png",
				//产废一般
				cfNormalImgUrlPath :"../../../../static/css/images/map/normalEnterprise.png",
				//收集
				sjImgUrlPath :"../../../../static/css/images/map/yunashu.png"
            }
        },
        methods: {
            initType() {
                var _this = this;
                _this.$axios.post('/api/regulatory/type/showDicType').then(res => {
                    _this.dicTypes = res.data;
                })
            },
            initDate() {
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let day = nowDate.getDate();
                let endTime = `${year}-${month}-${day}`;
                this.nowTime = endTime; // 当前的时间点
                let befDate = new Date(nowDate.getTime() + 7 * 24 * 3600 * 1000);
                let byear = befDate.getFullYear();
                let bmonth = befDate.getMonth() + 1;
                let bday = befDate.getDate();
                let startTime = `${byear}-${bmonth}-${bday}`;
                this.weekBeforeTime = startTime; // 向前推迟一周的时间点

                // 默认日期赋值
                this.value1 = [new Date(year + ', ' + month + ', ' + day).format('yyyy-MM-dd'), new Date(byear + ', ' + bmonth + ', ' + bday).format('yyyy-MM-dd')];
            },
            initPage() {
                var _this = this;
                asyncLoadBaiduMapJsApi(_this.AppConfig.appInfo.baiDuMapAk, 1).then(() => {
                    _this.initBMap();
                }).catch(err => {
                    // console.log(err);
                    // console.log("地图加载失败");
                })
            },
            initBMap() {
                this.createMap(); //创建地图
                this.setMapEvent();//设置地图事件
                this.addMapControl();//向地图添加控件
                this.getRegionCountData();// 请求统计数据
            },
            searchRegionChange() {
                this.thisRegionCode = this.search.regionCode[1];
                let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
                if (regionInfo.length > 0) {
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
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            },
            getBoundary() {
                var bdary = new BMap.Boundary();
                // /this.level = 3

                bdary.get(this.regionName, function (rs) {       //获取行政区域
                    map.clearOverlays();        //清除地图覆盖物
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    var pointArray = [];
                    for (var i = 0; i < count; i++) {
                        // var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000", strokeOpacity:0.5}); //建立多边形覆盖物
						var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
                        map.addOverlay(ply);  //添加覆盖物
                    }
                    map.setViewport(pointArray);    //调整视野
                });

            },
            searchMap() {
                this.map.clearOverlays();//清空地图覆盖物
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
                }else */
                // if (this.search.regionLevel == 3 || this.search.regionLevel == 2) {
                    var centerLevel = 12;
                    // if (this.regionLevel == 3) {
                    //     centerLevel = 12;
                    // }
                    map.centerAndZoom(this.regionName + this.search.regionName, centerLevel);
                    //this.getRegionCountData(this.search.regionParentCode,this.search.regionCode,3,sw,ne,this.search.entType,this.search.regionCode);// 请求统计数据
                    this.getRegionCountData();// 请求统计数据
                    //this.getIndexMaps(this.search.regionCode,this.search.entType);
                // }
            },
            initEntInfo() {
                this.entMapInfo = {};
                this.stockScale = 0;
                this.groupStorageCurrentSum = 0;
                this.containeGroupVoList = [];
            },
            createMap() {
                var self = this;
                var map = new BMap.Map("wfMap",
                    {
                        //minZoom:4,// 显示级别
                        maxZoom: 14,
                        enableMapClick: false// 构造底图时，关闭底图可点功能
                    }
                );//在百度地图容器中创建一个地图

                var point = new BMap.Point(this.lng, this.lat);//定义一个中心点坐标
                //map.centerAndZoom(point,this.centerLevel);//设定地图的中心点和坐标并将地图显示在地图容器中
                var centerLevel = 10;
                if (self.regionLevel == 3) {
                    centerLevel = 12;
                }
                map.centerAndZoom(new BMap.Point(sessionStorage.getItem("lng") == null ? this.lng : sessionStorage.getItem("lng"), sessionStorage.getItem("lat") == null ? this.lat + 0.2 : sessionStorage.getItem("lat")), centerLevel);

                window.map = map;//将map变量存储在全局

                self.map = map;
                /*map.setMapStyleV2({styleJson:this.AppConfig.styleJson});*/
                // 监听停止拖拽地图时可视区域四角
                map.addEventListener('dragend', function (e) {
                    if (self.level != 3) {
                        self.searchData();
                    } else {
                        return;
                    }
                });
                // 地图加载完毕
                map.addEventListener("tilesloaded", function () {
                    // $("#entInfo").fadeOut();
                    self.initEntInfo();
                    let zoom = map.getZoom();
                    if (zoom < 13) {
                        self.level = '';
                    }
                });
                // 监听层级
                map.addEventListener('zoomend', function (e) {
                    if (self.level != 3) {
                        self.searchData();
                    } else {
                        return;
                    }
                });
            },
			
			
			addArrow(polyline,length,angleValue){ //绘制箭头的函数
			        var linePoint=polyline.getPath();//线的坐标串
			        var arrowCount=linePoint.length;
			        for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头
			            var pixelStart=map.pointToPixel(linePoint[i-1]);
			            var pixelEnd=map.pointToPixel(linePoint[i]);
			            var angle=angleValue;//箭头和主线的夹角
			            var r=length; // r/Math.sin(angle)代表箭头长度
			            var delta=0; //主线斜率，垂直时无斜率
			            var param=0; //代码简洁考虑
			            var pixelTemX,pixelTemY;//临时点坐标
			            var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点
			            if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时
			                pixelTemX=pixelEnd.x;
			                if(pixelEnd.y>pixelStart.y)
			                {
			                pixelTemY=pixelEnd.y-r;
			                }
			                else
			                {
			                pixelTemY=pixelEnd.y+r;
			                }    
			                //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
			                pixelX=pixelTemX-r*Math.tan(angle); 
			                pixelX1=pixelTemX+r*Math.tan(angle);
			                pixelY=pixelY1=pixelTemY;
			            }
			            else  //斜率存在时
			            {
			                delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);
			                param=Math.sqrt(delta*delta+1);
			
			                if((pixelEnd.x-pixelStart.x)<0) //第二、三象限
			                {
			                pixelTemX=pixelEnd.x+ r/param;
			                pixelTemY=pixelEnd.y+delta*r/param;
			                }
			                else//第一、四象限
			                {
			                pixelTemX=pixelEnd.x- r/param;
			                pixelTemY=pixelEnd.y-delta*r/param;
			                }
			                //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
			                pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;
			                pixelY=pixelTemY-Math.tan(angle)*r/param;
			
			                pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;
			                pixelY1=pixelTemY+Math.tan(angle)*r/param;
			            }
			
			            var pointArrow=map.pixelToPoint(new BMap.Pixel(pixelX,pixelY));
			            var pointArrow1=map.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));
			            var Arrow = new BMap.Polyline([
			                pointArrow,
			             linePoint[i],
			                pointArrow1
			            ], {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
			            map.addOverlay(Arrow);
			            return Arrow;
			        }
			},
				
				
				
				// 
				
				
            searchData() {
                map.clearOverlays();//清空地图覆盖物
                let zoom = map.getZoom();
                var self = this;
                var entType = self.search.entType;
                //alert("当前地图层级为:"+zoom+"级");
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                var sw = bssw.lng + "," + bssw.lat;
                var ne = bsne.lng + "," + bsne.lat;
                if (zoom >= 1 && zoom <= 12 && self.level != 3) {
                    /*if (zoom <= 6) {// 省
                        //self.getRegionCountData('','', 1, sw, ne, entType,self.regionCode);
                        self.getRegionCountData('','', 2, sw, ne, entType,self.search.regionCode);
                    } else if (zoom > 6 && zoom <= 8) {// 市
                        self.getRegionCountData('','', 2, sw, ne, entType,self.search.regionCode);
                    } else*/
                    if (/*zoom > 8 && */zoom <= 11) {// 区县
                        self.getRegionCountData();
                    } else if (zoom > 11 && zoom <= 12) {
                        self.getEntMaps('', '', sw, ne, entType, self.search.regionCode);
                    }
                } else {
                    self.getEntMaps('', '', self.initBssw, self.initBsne, entType, self.search.regionCode);
                    //console.log("层级大于12级,不再刷新数据");
                }
            },
            getEntMaps(regionCode, regionName, bssw, bsne, entType, userRegionCode) {
                map.clearOverlays();//清空地图覆盖物
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getEntMaps', {
                    params: {
                        "qxCode": regionCode,// 行政区域code
                        "czCode": '',// 无用
                        "entType": entType, // 企业类型
                        "bssw": bssw,// 可视区域西南角经纬度
                        "bsne": bsne, // 可视区域东北角经纬度
                        "userRegionCode": userRegionCode,

                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.dataList = res.data;
                            // _this.addEntMaker(res.data);//向地图中添加统计点
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            setMapEvent() {
                map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard();//启用键盘上下左右键移动地图
                map.enableInertialDragging();// 启用地图惯性拖拽，默认禁用。
                map.enableContinuousZoom();// 启用连续缩放效果，默认禁用。
            },
            addMapControl() {
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    type: BMAP_NAVIGATION_CONTROL_LARGE
                });
                //map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
                //map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
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
            getRegionCountData() {
                var _this = this;
                _this.$axios.get('/api/regulatory/getTEnterpriseTransportPlanWarning', {
                    params: {
						"startDate": _this.value1[0],
						"endDate": _this.value1[1],
						"dictDetailType": _this.dictDetailCode,
                      //  "parentRegionCode": parentRegionCode,// 父级点位code
                        "regionCode": _this.search.regionCode,// 当前
						"transportEnterpriseName": _this.searchValue,//搜索内容
                        // "userRegionCode": userRegionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.dataList = res.data;
                            // console.log(_this.dataList)

                            if (_this.dataList[0] !== null) {
                                _this.addEntMaker(res.data);//向地图中添加统计点
								_this.getBoundary();
                            } else {
                                _this.getBoundary();
                            }
							_this.getStatistics();
							$("#entInfo").fadeIn();
                        }else{
							_this.$message.warning(res.info);
						}
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
			getStatistics(){
				var _this = this;
				_this.$axios.get('/api/regulatory/getTEnterpriseTransportPlanWarningStatistics').then(
				    function (res) {
						// console.log(res)
				        if (res.code == 0) {
				            _this.outInlibraryVoList = res.data;
				        }else{
							_this.$message.warning(res.info);
						}
				    }
				).catch((error) => {
				    // catch 指请求出错的处理
				    // console.log(error);
				});
			},
			
            addEntMaker(dataList) {
                var mycfIcon = new BMap.Icon(this.cfAbnormalImgUrlPath, new BMap.Size(30,50))
                var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(30,50));
                var mysjIcon = new BMap.Icon(this.sjImgUrlPath, new BMap.Size(30,50));
                for (var i = 0; i < dataList.length; i++) {//遍历
					var infoA = dataList[i].removeEnterpriseLng;
					var infoB = dataList[i].removeEnterpriseLat;
					var infoC = dataList[i].acceptEnterprisLng;
					var infoD = dataList[i].acceptEnterprisLat;
					// 添加区域信息点位
					var removeEntInfoMaker = null;
					var acceptEntInfoMaker = null;
					if (dataList[i].removeEnterpriseKind == 1) {
						removeEntInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {icon: mycfIcon});  // 创建标注
					} else if (dataList[i].removeEnterpriseKind == 2) {
						removeEntInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {icon: myczIcon});  // 创建标注
					} else if (dataList[i].removeEnterpriseKind == 3) {
						removeEntInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {icon: mysjIcon});  // 创建标注
					}
					if (dataList[i].acceptEnterprisKind == 1) {
						acceptEntInfoMaker = new BMap.Marker(new BMap.Point(infoC, infoD), {icon: mycfIcon});  // 创建标注
					} else if (dataList[i].acceptEnterprisKind == 2) {
						acceptEntInfoMaker = new BMap.Marker(new BMap.Point(infoC, infoD), {icon: myczIcon});  // 创建标注
					} else if (dataList[i].acceptEnterprisKind == 3) {
						acceptEntInfoMaker = new BMap.Marker(new BMap.Point(infoC, infoD), {icon: mysjIcon});  // 创建标注
					}
					// var zlabelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' + JSON.stringify(dataList[i]).replace(/\"/g, "'") + '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' + dataList[i].name + '"><div class="title-text"><i class="ico">重</i>' + dataList[i].name + '</div></a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
					// var labelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' + JSON.stringify(dataList[i]).replace(/\"/g, "'") + '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' + dataList[i].name + '"><div class="title-text">' + dataList[i].name + '</div>   </a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
					// var label = null;
					// if (dataList[i].entType == "1") {
					// 	label = new BMap.Label(zlabelContext, {
					// 		offset: new BMap.Size(-100, -50)
					// 	});
					// } else if (dataList[i].entType == "2") {
					// 	label = new BMap.Label(labelContext, {
					// 		offset: new BMap.Size(-100, -50)
					// 	});
					// }
					// label.setStyle({
					// 	background: 'none', color: '#red', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
					// });
					// entInfoMaker.setLabel(label);// 给点位添加文本
					var _this = this;
					// 全局,待优化
					// window.entClickInfo = function (item) {
					// 	var entInfo = JSON.parse(item.replace(/'/g, '"'));
					// 	_this.entInfoLook(entInfo);
					// }

					map.addOverlay(removeEntInfoMaker);// 添加点
					map.addOverlay(acceptEntInfoMaker);// 添加点
					this.entMakerClickHandler(removeEntInfoMaker, dataList[i]);// 添加点击事件
					this.entMakerClickHandler(acceptEntInfoMaker, dataList[i]);// 添加点击事件
					this.getBoundary();
					
                }
            },
            entMakerClickHandler(entInfoMaker, entInfo) {
                var _this = this;
                entInfoMaker.addEventListener("click", function (e) {
                    _this.entInfoLook(entInfo);
                })
            },
			
			// entInfoLook(entInfo){
			//     var _this = this;
			//     _this.registeredAddress = '';
			//     // 查询企业详情
			//     _this.$axios.get('/api/regulatory/index/getEntMapInfo',{params:{
			//             "entId":entInfo.entId,
			//             "outInStackLimit":_this.outInStackLimit
			//         }}).then(
			//         function (res) {
			//             if(res.code == 0) {
							
			// 				if(res.data.entKind==1){
			// 					$("#entInfo_jy").fadeOut();
			// 					$("#entInfo_sj").fadeOut();
			// 					$("#entInfo_wf").fadeIn();
			// 				}
			// 				if(res.data.entKind==2){
			// 					$("#entInfo_wf").fadeOut();
			// 					$("#entInfo_sj").fadeOut();
			// 					$("#entInfo_jy").fadeIn();
			// 				}
			// 				if(res.data.entKind==3){
			// 					$("#entInfo_wf").fadeOut();
			// 					$("#entInfo_jy").fadeOut();
			// 					$("#entInfo_sj").fadeIn();
			// 				}
			//                 _this.entMapInfo = res.data;
			//                 _this.registeredAddress = res.data.registeredAddress.length > 12 ? res.data.registeredAddress.substring(0, 12) + "..." : res.data.registeredAddress;
			//                 if (res.data && res.data.realTimeStockVo) {
			//                     _this.containeGroupVoList = res.data.realTimeStockVo.containeGroupVoList;
			//                     _this.stockScale = res.data.realTimeStockVo.stockScale;
			//                     _this.groupStorageCurrentSum = res.data.realTimeStockVo.currentStockNum;
			//                 }
			//             }
			//         }
			//     ).catch((error) => {
			//         // catch 指请求出错的处理
			//         console.log(error);
			//     });
			// },
			
     //        addRegionMarker(dataList) {
     //            for (var i = 0; i < dataList.length; i++) {//遍历
     //                // if(dataList[i].transportNumber >=0){
     //                // 过滤0数据
     //                var infoA = dataList[i].removeEnterpriseLng;
     //                var infoB = dataList[i].removeEnterpriseLat;
					// var infoC = dataList[i].acceptEnterprisLng;
					// var infoD = dataList[i].acceptEnterprisLat;
     //                var myIcon = new BMap.Icon("../../../../static/css/images/map/形状结合备份@1x备份 2@2x2.png", new BMap.Size(200, 65));
     //                // 添加区域信息点位
     //                var regionInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {icon: myIcon});  // 创建标注
     //                var labelContext = '<div><em style=" display: inline-block; padding: 4px 8px;font-size:25px;height: 23px;background-color: #ffb700;color: #fff; position: relative;">' + dataList[i].regionName + '</em><div style="position: absolute;display: inline;padding-left: 12px;padding-right: 8px;height: 48px;border-bottom: 2px solid #cf9236;border-right: 2px solid #cf9236;border-top: 2px solid #cf9236;margin-top: -2px;margin-left: 2px;padding: 4px 8px;font-size: 25px;border-radius: 5px;background: #f5f7fa;">' + dataList[i].transportNumber + 'KG</div></div>';
     //                var label = new BMap.Label(labelContext, {
     //                    offset: new BMap.Size(1, 1)
     //                });
     //                label.setStyle({
     //                    background: 'none', color: '#red', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
     //                });
     //                // 000
     //                regionInfoMaker.setLabel(label);// 给点位添加文本
     //                map.addOverlay(regionInfoMaker);// 添加点
     //                // this.regionCodeMakerClickHandler(regionInfoMaker,dataList[i]);// 添加点击事件
     //                // }else {
     //                //     this.getBoundary()
     //                // }
     //            }
     //            this.getBoundary();
     //        },
            // regionCodeMakerClickHandler(regionInfoMaker, regionInfo) {
            //     var self = this;
            //     var entType = self.search.entType;
            //     regionInfoMaker.addEventListener("click", function (e) {
            //         self.level = 3;
            //         // 查询当前点位下级点位 省查市
            //         map.clearOverlays();//清空地图覆盖物
            //         // 设置可视区域
            //         var bs = map.getBounds();   //获取可视区域
            //         var bssw = bs.getSouthWest();   //可视区域左下角
            //         var bsne = bs.getNorthEast();   //可视区域右上角
            //         var sw = bssw.lng + "," + bssw.lat;
            //         var ne = bsne.lng + "," + bsne.lat;
            //         var thisLevel = regionInfo.level;
            //         /*if(thisLevel==1){//省
            //             // 查询该省下市
            //             map.centerAndZoom(new BMap.Point(regionInfo.lng,regionInfo.lat),7);
            //             self.getRegionCountData(regionInfo.regionCode,'', 2, sw, ne,entType,self.search.regionCode);
            //         }else */
            //         if (thisLevel == 2 || thisLevel == 1) {// 市
            //             // 查询该市下区县
            //             map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 9);
            //             self.getRegionCountData(regionInfo.regionCode, '', 3, sw, ne, entType, self.search.regionCode);
            //         } else if (thisLevel == 3) {// 区县
            //             // 查询企业点位数据
            //             map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 13);
            //             self.getIndexMaps(regionInfo.regionCode, entType);
            //         }
            //     })
            // },
            getIndexMaps(regionCode, entType) {
                map.clearOverlays();//清空地图覆盖物
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getIndexMaps', {
                    params: {
                        "regionCode": regionCode,
                        "entType": entType
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            var entCountData = res.data;
                            if (entCountData.length > 0) {
                                _this.addEntMaker(res.data);
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getRegionChildrenList() {
                var _this = this;
                _this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList', {
                    params: {
                        "regionCode": _this.regionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.regionOptions = res.data;
                            //_this.search.regionCode = res.data[0].value+'';
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            selectRegionInfoByUser() {
                var _this = this;
                var userId = sessionStorage.getItem('userId');
                _this.$axios.get('/api/regulatory/index/selectRegionInfoByUser/' + userId).then(
                    function (res) {
                        if (res.code == 0) {
                            if (res.data != null) {
                                _this.lng = res.data.lng;
                                _this.lat = res.data.lat;
                                _this.regionName = res.data.regionName;
                                // if (res.data.regionLevel = 3) {
                                //     _this.centerLevel = 13;
                                // } else if (res.data.regionLevel = 2) {
                                //     _this.centerLevel = 8;
                                // }
                            }
                            // 地图
                            _this.initPage();
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                    // 地图
                    _this.initPage();
                });
            }

        },
        mounted() {
            var oJs = document.createElement('script');
            oJs.setAttribute("type", "text/javascript");
            oJs.setAttribute("src", "realTime.js"); //文件的地址 ,可为绝对及相对路径
            document.getElementsByTagName("head")[0].appendChild(oJs); //绑定
            if (this.search.regionLevel == 3) {
                this.isDisabled = true;
            }
            // 行政区域级联
            this.getRegionChildrenList();
            // 查询当前用户区域信息
            this.selectRegionInfoByUser();
            this.initType();
            this.initDate();
        }
    }
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

    .myZhongEntMakerClass {
        position: absolute;
        background: #FFFFFF;
        min-width: 150px;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
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
        display: none
    }
</style>
