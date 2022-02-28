<template>
   <div style="width: 100%">
       <div id="map_canvas" style="width: 100%;height: 650px"></div>
       <el-button id="run" v-on:click="lushuFunc('run')">开始</el-button>
       <el-button id="stop" v-on:click="lushuFunc('stop')">停止</el-button>
       <el-button id="pause" v-on:click="lushuFunc('pause')">暂停</el-button>
       <el-button id="hide" v-on:click="lushuFunc('hide')">隐藏信息窗口</el-button>
       <el-button id="show" v-on:click="lushuFunc('show')">展示信息窗口</el-button>
   </div>
</template>
<script>
    import loadBMap from '../../../components/common/unit/loadBMapApi'
    export default {
        name: "VehicleTrajectory",
        data(){
            return {
                map: '',
                lushu:'',
                vehicleTrajectoryData:'',
                lng: this.AppConfig.appInfo.lng,
                lat: this.AppConfig.appInfo.lat,
            }
        },
        methods:{
            initPage(){
                loadBMap('N9ZttRqRXqE1ZnxEr17ftskG',1).then(() => {
                    this.initBMap();
                }).catch(err => {
                    // console.log(err);
                    // console.log("地图加载失败");
                })
            },
            initBMap(){
                let _self = this;
                _self.map = new BMap.Map("map_canvas");// 创建地图实例
                _self.map.enableScrollWheelZoom();

                let point = new BMap.Point(_self.lng, _self.lat);// 创建点坐标
                _self.map.centerAndZoom(point, 13);// 初始化地图，设置中心点坐标和地图级别
                // this.map.centerAndZoom("汾阳市",12);      // 初始化地图,用城市名设置地图中心

                let map = _self.map;
                _self.map.addEventListener("tilesloaded",function(){
                    map.setMapStyleV2({
                        styleId: 'f3aa683ccf90c2918af89e228679a0b3'
                    });
                });
                _self.initLuShu();
                // _self.initVehicleTrajectory();
            },
            initVehicleTrajectory(){

                // console.log("请求轨迹数据");
                let _self = this;

                let params = new URLSearchParams();
                params.append('carNo','京A33334');
                params.append('startTime','2020-04-15 14:40:00');
                params.append('endTime','2020-04-15 14:40:59');

                _self.$axios.post('/api/regulatory/vehicle/getTrajectoryData',
                    params
                ).then(function (res) {
                    if (res.code == 0){
                        _self.vehicleTrajectoryData = res.data;
                        _self.initLuShu();
                    }
                }).catch(function (err) {
                    // console.log(err);
                })
            },
            initLuShu(){
                let _self = this;
                let arrPois = _self.vehicleTrajectoryData;

                var point = [];
                point.push(new BMap.Point('18.361627', '35.045066'));
                point.push(new BMap.Point('18.362662', '35.045138'));
                point.push(new BMap.Point('18.362783', '35.045136'));
                point.push(new BMap.Point('18.363758', '35.045199'));
                point.push(new BMap.Point('18.363828', '35.045198'));
                point.push(new BMap.Point('18.364683', '35.045253'));
                point.push(new BMap.Point('18.365015', '35.045267'));
                point.push(new BMap.Point('18.365899', '35.045313'));
                point.push(new BMap.Point('18.366592', '35.045352'));
                point.push(new BMap.Point('18.367105', '35.045384'));
                point.push(new BMap.Point('18.367637', '35.045415'));
                point.push(new BMap.Point('18.368813', '35.045477'));
                point.push(new BMap.Point('18.368873', '35.045487'));
                point.push(new BMap.Point('18.369174', '35.045502'));
              /*  for(var i = 0; i < arrPois.length; i++) {
                    point.push(new BMap.Point(arrPois[i].longitude, arrPois[i].latitude));
                }*/

                // 终点
                _self.addMarkerFun(point[point.length-1],1,1);
                // 开始点
                _self.addMarkerFun(point[0],1,0);

                var polyline = new BMap.Polyline(point, {
                    enableEditing: false, //是否启用线编辑，默认为false
                    enableClicking: true, //是否响应点击事件，默认为true
                    strokeWeight: '8', //折线的宽度，以像素为单位
                    strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
                    strokeColor: "#18a45b" //折线颜色
                });

                _self.map.addOverlay(polyline);

                _self.map.setViewport(point);

                _self.lushu = new BMapLib.LuShu(_self.map, point, {
                    defaultContent: "", //"从天安门到百度大厦"
                    autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52, 26), {
                        anchor: new BMap.Size(27, 13)
                    }),
                    speed: 4500,
                    enableRotation: true, //是否设置marker随着道路的走向进行旋转
                    landmarkPois: [{
                        lng: 118.3407680000,
                        lat: 35.0724090000,
                        html: '加油站',
                        pauseTime: 2
                    },
                        {
                            lng: 118.3408780000,
                            lat: 35.0725190000,
                            html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',
                            pauseTime: 3
                        },
                        {
                            lng: 118.3409080000,
                            lat: 35.0725190000,
                            html: '肯德基早餐',
                            pauseTime: 2
                        }
                    ]
                });
            },
            addMarkerFun(point,imgType,index,title){
                var url;
                var width;
                var height
                var myIcon;
                // imgType:1的场合，为起点和终点的图；2的场合为车的图形
                if(imgType == 1){
                    url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
                    width = 42;
                    height = 34;
                    myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - index * height)});
                }else{
                    url = "http://lbsyun.baidu.com/jsdemo/img/trans_icons.png";
                    width = 22;
                    height = 25;
                    var d = 25;
                    var cha = 0;
                    var jia = 0
                    if(index == 2){
                        d = 21;
                        cha = 5;
                        jia = 1;
                    }
                    myIcon = new BMap.Icon(url,new BMap.Size(width, d),{offset: new BMap.Size(10, (11 + jia)),imageOffset: new BMap.Size(0, 0 - index * height - cha)});
                }

                var marker = new BMap.Marker(point, {icon: myIcon});
                if(title != null && title != ""){
                    marker.setTitle(title);
                }
                // 起点和终点放在最上面
                if(imgType == 1){
                    marker.setTop(true);
                }
                this.map.addOverlay(marker);
            },
            lushuFunc(value){
                if (value == 'run'){
                    this.lushu.start();
                } else if (value == 'stop'){
                    this.lushu.stop();
                } else if (value == 'pause'){
                    this.lushu.pause();
                } else if (value == 'hide'){
                    this.lushu.hideInfoWindow();
                } else if (value == 'show'){
                    this.lushu.showInfoWindow();
                }
            },
        },
        created(){
            // this.initPage();
        }
    }
</script>

<style scoped>

</style>
