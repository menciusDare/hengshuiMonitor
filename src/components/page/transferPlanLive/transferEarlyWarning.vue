<template>
    <!-- 内容区域 -->
    <div class="main main-full" style="padding-bottom: 0px;">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="map-box">
            <!-- 地图 -->
            <div class="allmap" id="waitForTransferMap"></div>
            <!-- 左侧查询条件 -->
            <div class="map-left">
                <!-- 筛选 -->
                <div style="height: 54px;background-color: white;">
                    <ul class="filter-box" style="padding-top: 10px;margin-left: 25px; margin-right: 15px;">
                        <li class="filter-item" style="width: 370px;margin-right: 0px">
                            <div class="filter-label">时间：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <div class="el-input el-input--suffix">
                                        <el-date-picker
                                                style="width: 300px;height: 35px"
                                                v-model="search.times"
                                                value-format="yyyy-MM-dd"
                                                type="daterange"
                                                range-separator="—"
                                                @change="searchData"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                        ></el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select w180">
                                    <el-select placeholder="危废类型" @change="searchData" v-model="search.dictDetailCode">
                                        <el-option label="全部" value></el-option>
                                        <el-option
                                                v-for="item in dicTypesOptions"
                                                :key="item.id"
                                                :label="item.typeName"
                                                :value="item.id"
                                        ></el-option>
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
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <el-input v-model.trim="search.zyUnit" placeholder="请输入转运单位">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
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
<!--          <div class="legend-box" style="left: 20px;">-->
<!--            <div class="legend-hd">图例</div>-->
<!--            <div class="legend-bd">-->
<!--              <ul class="legend-list">-->
<!--                <li><span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/bar05.png"></span>排名前五</li>-->
<!--                <li><span class="tuli" style="margin-right: 10px"><img style="width: 20px;" src="../../../../static/css/images/map/bar03.png"></span>其余</li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
        </div>
    </div>
</template>

<script>
    import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
    import customOverlay from '../realTime/js/customOverlay';
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: "transferEarlyWarning",
        props: {},
        components: {
            BreadcrumbComponent
        },
        computed: {},
        data() {
            return {
                routePath: this.$route.path,
                regionOptions: [],
                dicTypesOptions:[],
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
                    lng: sessionStorage.getItem('lng'),
                    lat: sessionStorage.getItem('lat'),
                    times:["",""],
                    dictDetailCode:'',
                    zyUnit:''
                },
                redCarImgUrlPath: "../../../../static/css/images/map/redCar.png",
                blackCarImgUrlPath: "../../../../static/css/images/map/blackCar.png",
            }
        },
        methods: {
            // 查询button
            searchData(){
                customOverlay.clearMap("all",this);
                this.changeRegionBoundary();
                this.getWaitForTransferWfCount();
                // this.getWaitForTransferWfCountShow();
            },
            // 清除覆盖物
            clearOver(){
                customOverlay.clearMap("regionInfoMaker",this);
            },
            // 初始化百度地图js
            initTransferMap(){
                var _this = this;
                loadBMapApi(_this.AppConfig.appInfo.baiDuMapAk).then(() => {
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
                        this.initWfTypeOptions();
                        this.drawRegionBoundary();
                        this.getWaitForTransferWfCount();
                        // this.getWaitForTransferWfCountShow();
                    });// 行政区域下拉集
                }); //创建地图
            },
            // 创建地图
            createMap(){
                return new Promise((resolve, reject) => {
                    var self = this;
                    var map = new BMap.Map("waitForTransferMap",
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
            // 查询危废类型options
            initWfTypeOptions() {
                var _this = this;
                _this.$axios.post("/api/regulatory/type/showDicType").then((res) => {
                   
                    let harzardousTypeList= sessionStorage.getItem('harzardousTypeList')
                            let harzardousList = JSON.parse(harzardousTypeList)
                            
                           res.data.forEach((item)=>{
            harzardousList.forEach(ele=>{
                if(item.typeName==ele.typeName){
item.dicTypeExplain=ele.dicTypeExplain
                }
            })      
                           })     
                    console.log(res.data)      
              let filteredList = res.data.filter(item=>{
              
                  if(item.dicTypeExplain!=undefined ){
                      return item
                  }
                   
                });   
                 _this.dicTypesOptions = filteredList;
                        //  _this.vfTypeList =  filteredList 
                    // 
                });
            },
            // 查询统计数据
            getWaitForTransferWfCount(){
                var _this = this;
                _this.$axios.get('/api/regulatory/getWaitForTransferWfCount', {
                    params: {
                        "stime": _this.search.times!=null?_this.search.times[0]:'',
                        "etime": _this.search.times!=null?_this.search.times[1]:'',
                        "wfType": _this.search.dictDetailCode,
                        "regionCode": _this.search.regionCode,
                        "zyEntName": _this.search.zyUnit,
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            // 画统计点
                            _this.drawRegionCountMaker(res.data);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getWaitForTransferWfCountShow(){
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getRegionWfCountData', {
                    params: {
                        "level": 3,// 行政区域等级
                        "parentRegionCode": '',// 父级点位code
                        "thisRegionCode": _this.search.zyUnit==''||_this.search.zyUnit==null||_this.search.zyUnit=="山东尚康环保科技有限公司"?'':'122',// 当前
                        "wfType": _this.search.dictDetailCode, // 危废类型,危废Id
                        "dataType": 1, // 数据类型[产废量-1;贮存量-2;转移量-3;接收量-4;处置量-5;]
                        "bssw": '65.89630158504319,7.330286361787131',// 可视区域西南角经纬度
                        "bsne": '145.29903476211402,57.65074046432375', // 可视区域东北角经纬度
                        "userRegionCode": _this.search.regionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.drawRegionCountMaker(res.data);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            // 画行政区统计柱状图
            drawRegionCountMaker(dataList){
                if(dataList==null || dataList.length<1){
                    return;
                }
                var _this = this;
                var temp = [];
                // 过滤空值
                for(let i in dataList){
                    if(dataList[i].count && dataList[i].count!=0){
                        temp.push(dataList[i]);
                    }
                }
                dataList = [];
                dataList = temp;
                for(let i=0;i<dataList.length;i++){
                    // 高度:最低20px;最高120px;
                    var height = 20;
                    var yearAmount = dataList[i].count;
                    var yearNum = (yearAmount?yearAmount:0)/1000;
                    var count = parseInt((yearNum).toFixed(2));
                    height = height+parseInt(count.toFixed(0));
                    if(height>120){
                        height=120;
                    }
                    let _level = 'map-sign level-02';
                    // 前五使用红色
                    if(i<=4){
                        _level = 'map-sign level-04';
                    }else{
                        _level = 'map-sign level-02';
                    }
                    customOverlay.drawWfRegionCountDataCylinder(dataList[i],_level,height,_this);
                }
            },
            // 柱图点击事件
            regionInfoMakerClick(itemInfo){
                // console.log(itemInfo);
            },
            // 默认日期赋值
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
                this.search.times = [
                    new Date(year + ", " + month + ", " + day).format("yyyy-MM-dd"),
                    new Date(byear + ", " + bmonth + ", " + bday).format("yyyy-MM-dd"),
                ];
            },
        },
        mounted() {
            this.initDate();
            // 初始化地图
            this.initTransferMap();
        },
        created() {
        }
    }
</script>

<style >
    @import url('../realTime/wfMap.css');
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