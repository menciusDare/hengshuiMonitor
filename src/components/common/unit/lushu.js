/**
 * @author weizhuang 2020-07-30
 * @param self this
 * @param pathPointArray 走航点位数据数组
 * @param type 操作类型 start-开始走航 pause-暂停 hua-画轨迹线
 */
export default function lushuInstall(self,pathPointArray,type) {
    if(type=='start'){
        if(!self.isEnd){
            // 开始走航
            zouhangstart(pathPointArray,self);
        }else if(self.isPause){// 取消暂停
            zouhangstart(pathPointArray,self);
        }else{
            self.$message.info("请勿重复走航!")
        }
    }else if(type=='pause'){
        self.videoButtenStatus = true;
        self.isPause=true;
    }else if(type=='hua'){
        createMap(self,pathPointArray);
    }

    /**
     * 初始化地图
     * @param self
     * @param PointArr
     */
    function createMap(self,PointArr){
        self.map.clearOverlays();//清空地图覆盖物
        self.map.setViewport(PointArr);// 根据提供的地理区域或坐标设置地图视野
        addStartMarker(new BMap.Point(PointArr[0].lng, PointArr[0].lat),'起点',self.map);
        addEndMarker(new BMap.Point(PointArr[PointArr.length-1].lng, PointArr[PointArr.length-1].lat),'终点',self.map);
        initPolyline(pathPointArray,self);
    }

    /**
     * 添加起始图标
     */
    function addStartMarker(point, name,mapInit) {
        if(name=="起点"){
            var width = 42;
            var height = 34;
            var url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
            var myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - 0 * height)});
            /*var myIcon = new BMap.Icon("../../../../static/img/chanpaiwu2.svg", new BMap.Size(45,45),{
                anchor: new BMap.Size(20, 45),//这句表示图片相对于所加的点的位置mapStart
                imageSize:new BMap.Size(45, 45)//图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
                // offset: new BMap.Size(-10, 45), // 指定定位位置
                // imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
            });*/
            window.marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
            mapInit.addOverlay(marker);               // 将标注添加到地图中
            //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    }

    /**
     * 添加终点图标
     */
    function addEndMarker(point, name,mapInit) {
        if(name=="终点"){
            var width = 42;
            var height = 34;
            var url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
            var myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - 1 * height)});
            /*var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/dest_markers.png", new BMap.Size(42,34),{
                anchor: new BMap.Size(20, 45),//这句表示图片相对于所加的点的位置mapStart
                imageSize:new BMap.Size(45, 45)//图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
                // offset: new BMap.Size(-10, 45), // 指定定位位置
                // imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
            });*/
            window.marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
            mapInit.addOverlay(marker);               // 将标注添加到地图中
            //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    }

    /**
     * 绘制当前走航线路
     */
    function initPolyline(PointArr,self){
        //小车行驶图标
        var drivingPoint = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/car.png', new BMap.Size(52,26), {
            anchor : new BMap.Size(27, 13),
            imageSize:new BMap.Size(52,26)
        });
        self.drivingPoint = drivingPoint;
        if(!PointArr || PointArr.length<1){
            return;
        }
        self.zouhangCount = PointArr.length;
        // 路线pointArr
        var i = 0;
        var intervalhua = setInterval(function () {
            if(PointArr[i+1]===PointArr[PointArr.length-1]){
                return;
            }
            drowLine(self.map,PointArr[i],PointArr[i+1]);//画线调用
            i = i + 1;
        }, 0);
        self.intervalhua= intervalhua;
    }

    /**
     * 划线
     * @param map
     * @param PointArr
     * @param PointArrNext
     */
    function drowLine(map,PointArr,PointArrNext) {
        var strokeColor = "green";
        var value = (PointArr.tvoc?PointArr.tvoc:0+PointArrNext.tvoc?PointArrNext.tvoc:0)/2;
        if(value<60){
            strokeColor = "green";
        }else if(value>=60 && value<80){
            strokeColor = "yellow";
        }else if(value>=80){
            strokeColor = "red";
        }
        if(PointArrNext!=undefined) {
            var polyline = new BMap.Polyline(
                [
                    new BMap.Point(PointArr.lng, PointArr.lat),
                    new BMap.Point(PointArrNext.lng, PointArrNext.lat)
                ],
                {
                    strokeColor: strokeColor,
                    strokeWeight: 7,
                    strokeOpacity: 1
                });   //创建折线
            map.addOverlay(polyline);
        }
    }
    /**
     *  开始走航
     */
    function zouhangstart(PointArr,self){
        if(!PointArr || PointArr.length<1){
            return;
        }
        self.isEnd = true;// 当前走航开始
        // 路线pointArr
        var i = 0;
        if(self.nowIndex!=0){
            i = self.nowIndex;
            self.isPause = false;// 不是暂停
        }
        var interval = setInterval(function () {

            if(self.isPause){ //是否暂停
                clearInterval(interval);
            }
            if(PointArr[i+1]===PointArr[PointArr.length-1]){
                clearInterval(interval);
                self.isEnd = false;// 当前走航结束
                self.nowIndex = 0;
                self.$message.success("走航结束")
                self.map.removeOverlay(self.carMk);
                self.map.removeOverlay(self.infoWindow);
                self.videoButtenStatus = true;
                return;
            }
            addMarkerEnd(new BMap.Point(PointArr[i+1].lng, PointArr[i+1].lat), '小车行驶', self.map, PointArr[i+1], new BMap.Point(PointArr[i].lng, PointArr[i].lat),PointArr[i],PointArr[i+1],self);//画线调用
            i = i + 1;
            self.nowIndex = i;
        }, 500);
        self.interval = interval;
    }

    /**
     * 实例小车
     */
    function addMarkerEnd(point, name,mapInit,trackUnit,prePoint,PointArr,PointArrNext,self) {
        if(name=="小车行驶"){
            if(self.carMk){//先判断第一次进来的时候这个值有没有定义，有的话就清除掉上一次的。然后在进行画图标。第一次进来时候没有定义也就不走这块，直接进行画图标
                self.map.removeOverlay(self.carMk);
            }
            var carMk = new BMap.Marker(point,{icon:self.drivingPoint});  // 创建标注
            carMk.setRotation(trackUnit.route);//trackUnit.route
            //getAngle(point,prePoint);// js求解两点之间的角度
            carMk.setRotation(getAngle(point,prePoint)-270);// 旋转的角度
            self.map.addOverlay(carMk);
            self.carMk = carMk;
            /*// 将标注添加到地图中
            var opts = {
                width : 100,     // 信息窗口宽度
                height: 50,     // 信息窗口高度
            }
            var content='<div>tvoc:'+PointArrNext.tvoc+'</div>'
            var infoWindow = new BMap.InfoWindow(content, opts);// 创建信息窗口对象
            self.infoWindow = infoWindow;
            self.map.openInfoWindow(infoWindow,point);// 打开信息窗口*/
            //carMk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            self.percentage = ((self.nowIndex/self.zouhangCount)*100).toFixed(2);
            self.percentage = parseInt(self.percentage);
        }
    }
    /**
     * 获取走向旋转角度工具类
     */
    function getAngle(n,next){
        var ret
        var w1 = n.lat/180 * Math.PI
        var j1 = n.lng/180 * Math.PI

        var w2 = next.lat/180 * Math.PI
        var j2 = next.lng/180 * Math.PI

        ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
        ret = Math.sqrt(ret);

        // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
        var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
        ret = ret/temp;

        ret = Math.atan(ret) / Math.PI * 180 ;
        ret += 90;

        // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
        if(j1-j2 < 0){
            // console.log('j1<j2')
            if(w1-w2 < 0){
                // console.log('w1<w2')
                ret;
            }else{
                // console.log('w1>w2')
                ret = -ret+180;
            }
        }else{
            // console.log('j1>j2')
            if(w1-w2 < 0){
                // console.log('w1<w2')
                ret = 180+ret;
            }else{
                // console.log('w1>w2')
                ret = -ret;
            }
        }
        return ret ;
    }
}
