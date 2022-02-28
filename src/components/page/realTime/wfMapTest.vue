<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font">智慧监管</span></a><span class="sep">></span><span class="text-primary-font">危费地图</span>
            </div>
        </div>
        <div class="map-box">
            <!-- 地图 -->
            <div class="allmap" id="wfMap"></div>
            <!-- 左侧筛选 -->
            <div class="map-left">
                <div class="filter-area">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">省/市/区：</div>
                            <div class="filter-con">
                                <el-cascader
                                        ref="regionElCascader"
                                        @change="searchRegionChange"
                                        v-model="search.regionCode"
                                    :options="regionOptions"
                                    :props="{ checkStrictly: true }"
                                    clearable>
                                </el-cascader>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <el-select v-model="search.entType" clearable>
                                    <el-option
                                        v-for="item in entTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-input el-input-group el-input-group--append el-input--prefix">
                                  <!--  <span class="el-input__prefix">
                                        <i class="el-input__icon el-icon-search"></i>
                                    </span>
                                    <input type="text" autocomplete="off" placeholder="请输入关键词搜素" class="el-input__inner">
                                    <div class="el-input-group__append">
                                        <el-button type="button" @click="searchMap" class="el-button">搜索</el-button>
                                    </div>-->
                                    <el-button type="info" size="small" plain @click="searchMap">查询</el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 右侧公司介绍 -->
            <div class="company-box" id="entInfo" style="top: 25px;display: none">
                <div class="company-hd" style="height: 114px;">
                    <div class="company-title" style="background: #0ea4dd;"><img src="../../../../static/css/images/pic/logo02.png" class="logo-sub">{{entMapInfo.name}}</div>
                    <div class="company-info">
                        <p><i class="icon icon-weizhi"></i>{{entMapInfo.registeredAddress}}</p>
                    </div>
                </div>
                <div class="company-bd" >
                    <div class="wf-name">
                        最近出入库
                    </div>
                    <div class="collapse-box-area" style="height: 200px;overflow: auto;">
                        <div class="collapse-box">
                            <div class="collapse-item" v-for="(item ,index) in entMapInfo.outInlibraryVoList">
                                <div class="collapse-hd" style="width: 290px;">
                                    <i class="num">{{index+1}}</i>
                                    <div class="collapse-title"><span class="date-text">{{item.storageTime}}</span><span class="time-text">{{item.operationTypeStr}}</span></div>
                                    <div class="collapse-name">
                                        <span>{{item.dictDetailCode}} {{item.typeName}}</span>
                                        <span>{{item.number}} kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="company-bd" >
                    <div class="wf-name">
                        实时库存
                        <span style="float: right">
                            库存比
                            {{stockScale}}
                            %
                        </span>
                    </div>
                    <div class="collapse-box-area" style="height: 250px;overflow: auto;">
                        <div class="collapse-box">
                            <div class="collapse-item is-open" v-for="(item,index) in containeGroupVoList">
                                <div class="collapse-hd">
                                    <i class="num">{{index+1}}</i>
                                    <div class="collapse-title"><span class="date-text">{{item.name}}</span></div>
                                    <a href="javascript:;" class="toggle-down"><i class="icon icon-down"></i></a>
                                </div>
                                <div class="collapse-bd">
                                    <div style="padding-top: 10px" v-for="(containeInfo,index) in item.containeInfoList">
                                        <span>{{index+1}}.</span>
                                        <span>{{containeInfo.dictDetailCode}}</span>
                                        <span>{{containeInfo.typeName}}</span>
                                        <span style="float: right">{{containeInfo.currentAmount}}kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loadBMap from '../../../components/common/unit/loadBMapApi'
    export default {
        name: "wfMap",
        data(){
            return {
                addressName:'',
                map: null,
                markerArr:[],
                regionMaker:'',
                areaOptions:[],
                cityOptions:[],
                cityCode:"",
                areaCode:"",
                cfUnit:"",
                regionCode:"370000",
                regionName:"",
                lng:"105.994848",
                lat:"36.354387",
                initBssw:"47.414136835427634,11.994565579433543",
                initBsne:"171.48550674256398,55.78536321622567",
                level:5,
                entType:'',
                userRegionCode:'',
                zoom:'',
                dataList:[],
                entTypeOptions: [{
                    value: '',
                    label: '全部企业'
                }, {
                    value: '1',
                    label: '重点企业'
                }, {
                    value: '2',
                    label: '一般企业'
                },{value: 3,label: "收集企业"},
                    {value: 4,label: "经营企业"}],
                regionOptions:[],
                search:{
                    entType:'',
                    regionCode:'',
                    regionName :'',
                    regionLevel:1,
                    regionParentCode:''
                },
                outInStackLimit:5,
                entMapInfo:{},
                stockScale:0,
                containeGroupVoList:[],
                cfImgUrlPath :"../../../../static/css/images/map/chanfei.png",
                czImgUrlPath :"../../../../static/css/images/map/chuzhi.png"
            }
        },
        created: function () {
            // 行政区域级联
            this.getRegionChildrenList();
            // 地图
            this.initPage();
        },
        methods:{
            initPage(){
                loadBMap(_this.AppConfig.appInfo.baiDuMapAk,1).then(() => {
                    this.initBMap();
                }).catch(err => {
                    // console.log(err);
                    // console.log("地图加载失败");
                })
            },
            initBMap(){
                this.createMap() ; //创建地图
                this.setMapEvent();//设置地图事件
                this.addMapControl();//向地图添加控件
                this.getRegionCountData(0,this.search.regionCode,1,this.initBssw,this.initBsne,this.search.entType);// 请求统计数据
            },
            searchMap(){
                this.map.clearOverlays();//清空地图覆盖物
                if(this.$refs.regionElCascader.getCheckedNodes().length<1){
                    this.map.reset();
                }
                var bs = this.map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                var sw = bssw.lng + "," + bssw.lat;
                var ne = bsne.lng + "," + bsne.lat;
                this.level = 3;
                if(this.search.regionLevel==1){
                    map.centerAndZoom(this.search.regionName,7);
                    this.getRegionCountData(0,this.search.regionCode,1,sw,ne,this.search.entType);// 请求统计数据
                }else if(this.search.regionLevel==2){
                    map.centerAndZoom(this.search.regionName,9);
                    this.getRegionCountData(this.search.regionParentCode,this.search.regionCode,2,sw,ne,this.search.entType);// 请求统计数据
                }else if(this.search.regionLevel==3){
                    map.centerAndZoom(this.search.regionName,13);
                    this.getIndexMaps(this.search.regionCode,this.search.entType);
                }
            },
            initEntInfo(){
                this.entMapInfo={};
                this.stockScale=0;
                this.containeGroupVoList=[];
            },
            createMap(){
                var map = new BMap.Map("wfMap",
                    {
                        minZoom:5,// 显示级别
                        //maxZoom:11,
                        enableMapClick:false// 构造底图时，关闭底图可点功能
                    }
                );//在百度地图容器中创建一个地图
                var point = new BMap.Point(this.lng,this.lat);//定义一个中心点坐标
                map.centerAndZoom(point,this.level);//设定地图的中心点和坐标并将地图显示在地图容器中
                window.map = map;//将map变量存储在全局
                var self = this;
                self.map = map;
                /*map.setMapStyleV2({styleJson:this.AppConfig.styleJson});*/
                // 监听停止拖拽地图时可视区域四角
                map.addEventListener('dragend', function(e) {
                    if(self.level!=3){
                        self.searchData();
                    }else{
                        return;
                    }
                });
                // 地图加载完毕
                map.addEventListener("tilesloaded",function(){
                    $("#entInfo").fadeOut();
                    self.initEntInfo();
                    let zoom = map.getZoom();
                    if(zoom<13){
                        self.level = '';
                    }
                });
                // 监听层级
                map.addEventListener('zoomend', function(e) {
                    if(self.level!=3){
                        self.searchData();
                    }else{
                        return;
                    }
                });
            },
            searchData(){
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
                if(zoom>=1 && zoom<=12 && self.level!=3) {
                    if (zoom <= 6) {// 省
                        self.getRegionCountData('','', 1, sw, ne, entType);
                    } else if (zoom > 6 && zoom <= 8) {// 市
                        self.getRegionCountData('','', 2, sw, ne, entType);
                    } else if (zoom > 8 && zoom <= 11) {// 区县
                        self.getRegionCountData('', '',3, sw, ne, entType);
                    } else if (zoom > 11 && zoom <= 12) {
                        self.getEntMaps('', '', sw, ne,entType);
                    }
                }else{
                    // console.log("层级大于12级,不再刷新数据");
                }
            },
            getEntMaps(regionCode,regionName,bssw,bsne,entType) {
                map.clearOverlays();//清空地图覆盖物
                var _this=this;
                _this.$axios.get('/api/index/getEntMaps',{params:{
                        "qxCode":regionCode,// 行政区域code
                        "czCode":'',// 无用
                        "entType":entType, // 企业类型
                        "bssw":bssw,// 可视区域西南角经纬度
                        "bsne":bsne // 可视区域东北角经纬度
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data;
                            _this.addEntMaker(res.data);//向地图中添加统计点
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            setMapEvent(){
                map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard();//启用键盘上下左右键移动地图
                map.enableInertialDragging();
                map.enableContinuousZoom();
            },
            addMapControl(){
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                //map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
                //map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                //map.addControl(ctrl_sca);
                // 城市列表控件
                var size = new BMap.Size(10, 20);
                var ctrl_cti =  new BMap.CityListControl({
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
            getRegionCountData(parentRegionCode,thisRegionCode,level,bssw,bsne,entType){
                var _this=this;
                _this.$axios.get('/api/index/getRegionCountData',{params:{
                    "level":level,// 行政区域等级
                    "parentRegionCode":parentRegionCode,// 父级点位code
                    "thisRegionCode":thisRegionCode,// 当前
                    "entType":entType, // 企业类型
                    "bssw":bssw,// 可视区域西南角经纬度
                    "bsne":bsne // 可视区域东北角经纬度
                }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data;
                            _this.addRegionMarker(res.data);//向地图中添加统计点
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            addEntMaker(dataList){
                var mycfIcon = new BMap.Icon(this.cfImgUrlPath, new BMap.Size(30,50));
                var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(30,50));
                for (var i = 0; i < dataList.length; i++) {//遍历
                    if(dataList[i].count!=0){
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
                        if(dataList[i].entKind==1){
                            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB),{icon:mycfIcon});  // 创建标注
                        }else if(dataList[i].entKind==2){
                            entInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB),{icon:myczIcon});  // 创建标注
                        }
                        var zlabelContext = '<div><span style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #c0c4cc; position: relative;">重</span><em style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #c0c4cc; position: relative;">'+dataList[i].name+'</em><span style="position: relative;display: inline-block;background-color: #c0c4cc;padding-left: 15px;padding-right: 8px;height: 23px;">油量:'+dataList[i].currentAmount+'吨</span></div>';
                        var labelContext = '<div><em style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #dcdfe6; position: relative;">'+dataList[i].name+'</em><span style="position: relative;display: inline-block;background-color: #dcdfe6;padding-left: 15px;padding-right: 8px;height: 23px;">油量:'+dataList[i].currentAmount+'吨</span></div>';
                        var label = null;
                        if(dataList[i].entKind==1){
                            label = new BMap.Label(zlabelContext, {
                                offset : new BMap.Size(-100,-25)
                            });
                        }else if(dataList[i].entKind==2){
                            label = new BMap.Label(labelContext, {
                                offset : new BMap.Size(-100,-25)
                            });
                        }
                        label.setStyle({
                            background:'none',color:'#red',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                        });
                        entInfoMaker.setLabel(label);// 给点位添加文本
                        map.addOverlay(entInfoMaker);// 添加点
                        this.entMakerClickHandler(entInfoMaker,dataList[i]);// 添加点击事件
                    }
                }
            },
            entMakerClickHandler(entInfoMaker,entInfo){
                var _this = this;
                var entType = _this.search.entType;
                entInfoMaker.addEventListener("click",function(e){
                    // 查询企业详情
                    _this.$axios.get('/api/index/getEntMapInfo',{params:{
                            "entId":entInfo.entId,
                            "outInStackLimit":_this.outInStackLimit
                        }}).then(
                        function (res) {
                            if(res.code == 0){
                                _this.entMapInfo = res.data;
                                if(res.data && res.data.realTimeStockVo){
                                    _this.containeGroupVoList = res.data.realTimeStockVo.containeGroupVoList;
                                    _this.stockScale = res.data.realTimeStockVo.stockScale;
                                }
                                $("#entInfo").fadeIn();
                            }
                        }
                    ).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
            addRegionMarker(dataList){
                for (var i = 0; i < dataList.length; i++) {//遍历
                    if(dataList[i].count!=0){
                        // 过滤0数据
                        var infoA = dataList[i].lng;
                        var infoB = dataList[i].lat;
                        var myIcon = new BMap.Icon("../../../../static/css/images/map/sanjiao.png", new BMap.Size(100,40));
                        // 添加区域信息点位
                        var regionInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB),{icon:myIcon});  // 创建标注
                        var labelContext = '<div><em style=" display: inline-block;  padding: 0 8px;height: 23px;background-color: #ffb700;color: #fff; position: relative;">'+dataList[i].regionName+'</em><span style="position: relative;display: inline-block;background: #fff;padding-left: 8px;padding-right: 8px;height: 23px;">'+dataList[i].count+'家</span></div>';
                        var label = new BMap.Label(labelContext, {
                            offset : new BMap.Size(1,1)
                        });
                        label.setStyle({
                            background:'none',color:'#red',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                        });
                        regionInfoMaker.setLabel(label);// 给点位添加文本
                        map.addOverlay(regionInfoMaker);// 添加点
                        this.regionCodeMakerClickHandler(regionInfoMaker,dataList[i]);// 添加点击事件
                    }
                }
            },
            regionCodeMakerClickHandler(regionInfoMaker,regionInfo){
                var self = this;
                var entType = self.search.entType;
                regionInfoMaker.addEventListener("click",function(e){
                    self.level = 3;
                    // 查询当前点位下级点位 省查市
                    map.clearOverlays();//清空地图覆盖物
                    // 设置可视区域
                    var bs = map.getBounds();   //获取可视区域
                    var bssw = bs.getSouthWest();   //可视区域左下角
                    var bsne = bs.getNorthEast();   //可视区域右上角
                    var sw = bssw.lng + "," + bssw.lat;
                    var ne = bsne.lng + "," + bsne.lat;
                    var thisLevel = regionInfo.level;
                    if(thisLevel==1){//省
                        // 查询该省下市
                        map.centerAndZoom(new BMap.Point(regionInfo.lng,regionInfo.lat),8);
                        self.getRegionCountData(regionInfo.regionCode,'', 2, sw, ne,entType);
                    }else if(thisLevel==2){// 市
                        // 查询该市下区县
                        map.centerAndZoom(new BMap.Point(regionInfo.lng,regionInfo.lat),10);
                        self.getRegionCountData(regionInfo.regionCode, '',3, sw, ne,entType);
                    }else if(thisLevel==3){// 区县
                        // 查询企业点位数据
                        map.centerAndZoom(new BMap.Point(regionInfo.lng,regionInfo.lat),13);
                        self.getIndexMaps(regionInfo.regionCode,entType);
                    }
                })
            },
            getIndexMaps(regionCode,entType) {
                map.clearOverlays();//清空地图覆盖物
                var _this=this;
                _this.$axios.get('/api/index/getIndexMaps',{params:{
                        "regionCode":regionCode,
                        "entType":entType
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            var entCountData = res.data;
                            if(entCountData.length>0){
                                _this.addEntMaker(res.data);
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getRegionChildrenList(){
                var _this=this;
                _this.$axios.get('/api/regionInfo/getRegionChildrenList',{params:{
                        "regionCode":_this.regionCode
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.regionOptions = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            searchRegionChange(){
                let regionInfo =this.$refs.regionElCascader.getCheckedNodes();
                if(regionInfo.length>0){
                    this.search.regionName = regionInfo[0].label;
                    this.search.regionLevel= regionInfo[0].level;
                    this.search.regionCode = regionInfo[0].value;
                    let parentRegionInfo = regionInfo[0].parent;
                    if(parentRegionInfo!=null){
                        this.search.regionParentCode = parentRegionInfo.value;
                    }else{
                        this.search.regionName = '山东省';
                        this.search.regionLevel= 1;
                        this.search.regionCode = '370000';
                        this.search.regionParentCode = '0';
                    }
                }else{
                    this.search.regionName = '山东省';
                    this.search.regionLevel= 1;
                    this.search.regionCode = '370000';
                    this.search.regionParentCode = '0';
                }
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            }
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
    .allmap{
        width:100%;
        height:770px;
        position:relative;
        padding: 61px 10px 10px 10px;background: #ffffff;
    }

    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
</style>
