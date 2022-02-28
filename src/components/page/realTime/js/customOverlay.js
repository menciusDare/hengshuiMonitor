/**
 * guojianxin
 * 2020年8月14日
 **/

let CustomOverlay = {
    /**获取地图边界坐标集合**/
    queryDistrict(self,regionName){
        let that = this;
        let bdary = new BMap.Boundary();
        bdary.get(regionName, function (rs) {
            // that.clearMap("regionBoundaryOver",self);       //清除地图(行政区)覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                // console.log('未能获取'+regionName+'行政区域');
                return ;
            }
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: 2,
                    strokeColor: "#C04742",
                    fillColor: '#ffc1076e',
                    fillOpacity: 0.3
                }); //建立多边形覆盖物
                ply.imei = "regionBoundaryOver";
                self.map.addOverlay(ply);  //添加覆盖物
            }
        })
    },
    /**获取地图边界坐标集合**/
    drawNotBackgroudDistrict(self,regionName){
        let that = this;
        let bdary = new BMap.Boundary();
        bdary.get(regionName, function (rs) {
            // that.clearMap("regionBoundaryOver",self);       //清除地图(行政区)覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                // alert('未能获取'+regionName+'行政区域');
                return ;
            }
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: 2,
                    strokeColor: "#C04742",
                    fillColor: '',
                    fillOpacity: 0.3
                }); //建立多边形覆盖物
                ply.imei = "regionBoundaryOver";
                self.map.addOverlay(ply);  //添加覆盖物
            }
        })
    },
    /**清除当前图层**/
    clearMap(name, self){
        let allOverlay = self.map.getOverlays();
        if (name == 'all'){
            self.map.clearOverlays();
        }else{
            for (let i = 0; i < allOverlay.length ; i++){
                if(allOverlay[i].imei == name){
                    self.map.removeOverlay(allOverlay[i]);
                }
            }
        }
    },
    /**绘制行政区域数据统计柱图**/
    drawWfRegionCountDataCylinder(itemInfo,cyLinderColor,cyLinderHeight,self){
        var map = self.map;
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let that = this;
            let div = this._div = document.createElement("div");
            div.className = cyLinderColor;
            let div_item = document.createElement("div");
            div_item.className = 'map-sign-bar';
            div_item.style = 'height: ' + cyLinderHeight + 'px';
            let div_item_item = document.createElement("div");
            div_item_item.className = 'map-sign-num';
            div_item_item.innerText = itemInfo.count?(itemInfo.count/1000).toFixed(2)+"吨":"--吨";
            div_item.appendChild(div_item_item);
            div.appendChild(div_item);
            let div_item_item_label = document.createElement("div");
            div_item_item_label.innerText = itemInfo.regionName;
            div_item_item_label.className = 'map-sign-text';
            div.appendChild(div_item_item_label);
            div.addEventListener("click", function() {
                self.regionInfoMakerClick(itemInfo);
            });
            div.onmouseover = function(){
                this.style.position = "absolute";
                this.style.zIndex = 9999;
            };
            div.onmouseout = function(){
                this.style.position = "absolute";
                this.style.zIndex = 1;
            };
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        // 点位纠偏
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 8 + "px";
            this._div.style.top  = pixel.y - (-26) + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(itemInfo.lng,itemInfo.lat));
        myCompOverlay.imei = 'regionInfoMaker'; //标识
        map.addOverlay(myCompOverlay);
    },
    /**绘制企业数据统计柱图**/
    drawWfEntCountDataCylinder(itemInfo,cyLinderColor,cyLinderHeight,self){
        var map = self.map;
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let that = this;
            let div = this._div = document.createElement("div");
            div.className = cyLinderColor;
            let div_item = document.createElement("div");
            div_item.className = 'map-sign-bar';
            div_item.style = 'height: ' + cyLinderHeight + 'px';
            let div_item_item = document.createElement("div");
            div_item_item.className = 'map-sign-num';
            div_item_item.innerText = itemInfo.yearAmount?(itemInfo.yearAmount/1000).toFixed(2)+"吨":"--吨";
            div_item.appendChild(div_item_item);
            div.appendChild(div_item);
            let div_item_item_label = document.createElement("div");
            div_item_item_label.innerText = itemInfo.name;
            div_item_item_label.className = 'map-sign-text';
            div.appendChild(div_item_item_label);
            div.addEventListener("click", function() {
                self.getTEnterpriseHazardousStatisticsWithType(itemInfo.entId);
            });
            div.onmouseover = function(){
                this.style.position = "absolute";
                this.style.zIndex = 9999;
            };
            div.onmouseout = function(){
                this.style.position = "absolute";
                this.style.zIndex = 1;
            };
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        // 点位纠偏
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 8 + "px";
            this._div.style.top  = pixel.y - (-30) + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(itemInfo.lng,itemInfo.lat));
        myCompOverlay.imei = 'regionInfoMaker'; //标识
        map.addOverlay(myCompOverlay);
    },
    /**绘制转移车辆点**/
    drawTransferCarMaker(self,data){
        var redCar = new BMap.Icon(self.redCarImgUrlPath, new BMap.Size(40, 40));
        var blackCar = new BMap.Icon(self.blackCarImgUrlPath, new BMap.Size(40, 40));
        data.forEach(item => {
            const {carNo,carStatus,lng,lat,pos,regionCode,regionLevel,regionLng,regionLat} = item;
            // console.log(item);
            var point = null;
            if(lng!=null && lat!=null){
                point = new BMap.Point(lng, lat);
            }else{
                // 生产随机点
                // 获取当前所选行政区中心点位
                var maxRandmon = 0.1;
                if(regionLevel==2){
                    // 市级
                    maxRandmon = 0.4;
                }else if(regionLevel==3){
                    // 区县级
                    maxRandmon = 0.12;
                }
                point = new BMap.Point(regionLng+Math.random()*maxRandmon, regionLat+Math.random()*maxRandmon);
            }
            // 添加区域信息点位
            var carMaker = null;
            if (carStatus) {
                carMaker = new BMap.Marker(point, {icon: redCar,}); // 创建标注
            } else {
                carMaker = new BMap.Marker(point, {icon: blackCar,}); // 创建标注
            }
            carMaker.imei = "carOver";
            self.map.addOverlay(carMaker); // 添加点
            self.carMakerClickHandler(carMaker,item);
        });
    },
    /**
     * 添加起始图标 label
     * 添加终点图标 label
     */
    addStartMarker(lng,lat,labelText,markerName,self) {
        var point = new BMap.Point(lng,lat);
        var width = 42;
        var height = 34;
        var url = "";
        var myIcon = "";
        if(markerName=="起点"){
            url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
            myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - 0 * height)});
        }else if(markerName=="终点"){
            url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
            myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - 1 * height)});
        }
        var lushuMarker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
        var labelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;"  class="title-box" data-toggle="tooltip" data-placement="top" title="' + labelText + '"><div class="title-text">' + labelText + "</div>  ";
        var label = new BMap.Label(labelContext, {
            offset: new BMap.Size(20, -10),
        });
        lushuMarker.setLabel(label);// 给点位添加文本
        lushuMarker.imei = "lushuOver";
        self.map.addOverlay(lushuMarker);               // 将标注添加到地图中
    },
    setViewport(point,self){
        if(point!=null && point.length>0){
            self.map.setViewport(point);
        }
    },
    // 获取多边形中心点
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
    // 获取可视区域东南西北角坐标
    // return [bssw,bsne]
    getBsswAndNsne(map){
        var bs = map.getBounds();   //获取可视区域
        var bssw = bs.getSouthWest();   //可视区域左下角
        var bsne = bs.getNorthEast();   //可视区域右上角
        var sw = bssw.lng + "," + bssw.lat;
        var ne = bsne.lng + "," + bsne.lat;
        return [sw,ne];
    }

}
export default CustomOverlay;
