<template>
    <div>
        <div>
            <el-form :inline="true">
                <el-form-item label="经度：">
                    <el-input v-model="lng" style="width: 150px" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="纬度：">
                    <el-input v-model="lat" style="width: 150px" :readonly="true"></el-input>
                </el-form-item>
                <!--<el-form-item label="地址：">
                    <el-input v-model="addresstext" style="width: 150px" :readonly="true"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="confrimMarket" style="margin-left: 10px;">确定</el-button>
                    <el-button  @click="clearMarkerSearchMap">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="allmap" id="markerSearchMap"></div>
        <div style="position: absolute;left: 25px;top: 150px;width: 250px;">
            <el-input
                    id="suggestId"
                    size="mini"
                    v-model="searchKeyWord"
                    placeholder="请输入检索关键字"
                    suffix-icon="el-icon-search">
            </el-input>
            <div id="searchResultPanel" style="display: none;height:auto"></div>
        </div>
    </div>
</template>

<script>
    import loadBMapApi from "../../../components/common/unit/loadBMapApi1";
    import customOverlay from '../../page/realTime/js/customOverlay';
    export default {
        name: "markerSearch",
        components: {},
        data() {
            return {
                map:'',
                lat:'',
                lng:'',
                searchKeyWord:'',
                addresstext:'',
                nowPoint:''
            }
        },
        methods: {
            // 初始化百度地图js
            initTransferMap(){
                var _this = this;
                loadBMapApi(_this.AppConfig.appInfo.baiDuMapAk).then(() => {
                    _this.initBMap();
                }).catch((err) => {
                    _this.$message.error("地图加载失败!");
                    // console.log(err);
                });
            },
            // 初始化地图
            initBMap(){
                this.createMap().then(val => {
                    this.setMapEvent();//设置地图事件
                    this.addMapControl();//向地图添加控件
                }); //创建地图
            },
            // 创建地图
            createMap(){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    var map = new BMap.Map("markerSearchMap",
                        {
                            // minZoom:9,// 显示级别
                            // maxZoom: 14,
                            enableMapClick: false// 构造底图时，关闭底图可点功能
                        }
                    );//在百度地图容器中创建一个地图
                    var point = null;
                    if(_this.lat && _this.lng){
                        point = new BMap.Point(_this.lng, _this.lat);//定义一个中心点坐标
                        map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
                        map.addOverlay(new BMap.Marker(point));    //添加标注
                    }else{
                        point = new BMap.Point(sessionStorage.getItem("lng"), sessionStorage.getItem("lat"));//定义一个中心点坐标
                        map.centerAndZoom(point, 9);  // 初始化地图,设置中心点坐标和地图级别
                    }
                    _this.map = map;
                    customOverlay.queryDistrict(_this,sessionStorage.getItem("regionName"));
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
                /*function showInfo(e){
                    alert(e.point.lng + ", " + e.point.lat);
                }
                // 地图点击事件
                _this.map.addEventListener("click", showInfo);*/
                _this.map.addEventListener('click', function (e) {
                    _this.lat = e.point.lat;
                    _this.lng = e.point.lng;
                    _this.map.clearOverlays();//清空地图覆盖物
                    let pp = e.point;//定义一个中心点坐标
                    // _this.map.centerAndZoom(pp, 16);
                    _this.map.addOverlay(new BMap.Marker(pp));    //添加标注
                    _this.nowPoint = pp;
                    // _this.pointToAddress(e.point);
                });
            },
            addMapControl(){
                this.searchKeyWordFunction();// 地图检索
            },
            searchKeyWordFunction(){
                var _this = this;
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {"input" : "suggestId"
                        ,"location" : _this.map
                    });

                ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                    var str = "";
                    var _value = e.fromitem.value;
                    var value = "";
                    if (e.fromitem.index > -1) {
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                    value = "";
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                    document.getElementById("searchResultPanel").innerHTML = str;
                });

                var myValue;
                ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                    setPlace();
                });

                function setPlace(){
                    _this.map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun(){
                        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                        _this.lat = pp.lat;
                        _this.lng = pp.lng;
                        _this.map.centerAndZoom(pp, 16);
                        _this.map.addOverlay(new BMap.Marker(pp));    //添加标注
                        _this.nowPoint = pp;
                        // _this.pointToAddress(pp);
                    }
                    var local = new BMap.LocalSearch(_this.map, { //智能搜索
                        onSearchComplete: myFun
                    });
                    local.search(myValue);
                }
            },
            clearMarkerSearchMap(){
                var _this = this;
                _this.map.clearOverlays();    //清除地图上所有覆盖物
                var point = new BMap.Point(_this.AppConfig.appInfo.lng, _this.AppConfig.appInfo.lat);//定义一个中心点坐标
                _this.map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
                _this.searchKeyWord = '';
                _this.lng = '';
                _this.lat = '';
                _this.addresstext = '';
                _this.nowPoint = '';
            },
            confrimMarket(){
                if(!this.lng || !this.lat){
                    this.$message.warning("点坐标为空!");
                    return;
                }
                this.pointToAddress(this.nowPoint);
                this.$parent.$parent.markerSearchDialogHandleClose();
            },
            pointToAddress(pt){
                var _this = this;
                if (pt) {
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(pt, function(rs){
                        var addComp = rs.addressComponents;
                        _this.addresstext = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    })
                }
            },

        },
        mounted: function () {

        },
        created() {
            this.initTransferMap();
        }
    }
</script>

<style scoped>
    .allmap{
        width:100%;
        height:600px;
        position:relative;
        padding: 61px 10px 10px 10px;background: #ffffff;
    }
</style>