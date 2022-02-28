/**
 * 综合态势一张图相关方法
 * Jonem
 * 10点47分 2020年7月19日
 **/
let ComprehensiveMap = {
    /**通过echarts加载bmap格式baidu地图
     * 注：为了加载风场，所以基于echarts底图画baidu地图，不是基于baidu地图画echarts
     **/
    initBmap(self){
        self.myChart = echarts.init(document.getElementById('allmap'))
        let option = {
            visualMap: {
                left: 'right',
                min: self.minMag,
                max: self.maxMag,
                dimension: 4,
                inRange: {
                    color: ['green', 'blue', 'red']
                },
                realtime: false,
                calculable: true,
                textStyle: {
                    color: '#fff'
                },
                show: false //藏起来，因为不好看
            },
            bmap: {
                center: [self.AppConfig.appInfo.longitude, self.AppConfig.appInfo.latitude],
                zoom: self.AppConfig.appInfo.map_zoom,
                roam: true
            },
            series: [{
                type: 'flowGL',
                coordinateSystem: 'bmap',
                data: self.seriesData,
                supersampling: 4,
                particleType: 'line',
                particleDensity: 30,
                particleSpeed: 5,
                itemStyle: {
                    opacity: 0.7
                }
            }]
        }
        self.myChart.setOption(option)
        self.map = self.myChart.getModel().getComponent('bmap').getBMap();
        self.map.setMapStyle({style: 'grayscale'})
        self.map.addEventListener('click',function(e){
            ComprehensiveMap.clearMap('windMes', self)
            if (self.windFlag == true){
                let a = 0;
                let direction = '';
                let hit = false
                /**取经纬度相同得点得数据，由于经纬度数据不全，所以可能会有一次对应不到得情况
                 *若没有对应数据，则第二次取相邻经度+1数据，若还没有对应数据，则第三次取相邻
                 * 经度-1数据，三次基本差不多了
                 **/
                for (let d of self.seriesData){
                    if (d[0].toFixed(0) == e.point.lng.toFixed(0) && d[1].toFixed(0) == e.point.lat.toFixed(0)){
                        hit = true
                        a = Math.atan2(d[3], d[2]) * 180 / Math.PI
                        if (a >= -5 && a <= 5){
                            direction = '东风';
                        }else if (a > 5 && a< 85){
                            direction = '东北风';
                        }else if (a >= 85 && a<= 195){
                            direction = '北风';
                        }else if (a > 195 && a< 175){
                            direction = '西北风';
                        }else if ((a >= 175 && a<= 180) || (a>= -180 && a<= -175)){
                            direction = '西风';
                        }else if (a > -175 && a< -100){
                            direction = '西南风';
                        }else if (a >= 95 && a<= -85){
                            direction = '南风';
                        }else if (a > -85 && a<= -5){
                            direction = '东南风';
                        }
                        ComprehensiveMap.drawWindMes(e.point.lng, e.point.lat, direction, d[4].toFixed(2), self)
                    }
                }
                if (hit == false){
                    for (let d of self.seriesData){
                        if ((d[0].toFixed(0) + 1) == e.point.lng.toFixed(0) && d[1].toFixed(0) == e.point.lat.toFixed(0)){
                            hit = true
                            a = Math.atan2(d[3], d[2]) * 180 / Math.PI
                            if (a >= -5 && a <= 5){
                                direction = '东风';
                            }else if (a > 5 && a< 85){
                                direction = '东北风';
                            }else if (a >= 85 && a<= 195){
                                direction = '北风';
                            }else if (a > 195 && a< 175){
                                direction = '西北风';
                            }else if ((a >= 175 && a<= 180) || (a>= -180 && a<= -175)){
                                direction = '西风';
                            }else if (a > -175 && a< -100){
                                direction = '西南风';
                            }else if (a >= 95 && a<= -85){
                                direction = '南风';
                            }else if (a > -85 && a<= -5){
                                direction = '东南风';
                            }
                            ComprehensiveMap.drawWindMes(e.point.lng, e.point.lat, direction, d[4].toFixed(2), self)
                        }
                    }
                }
                if (hit == false){
                    for (let d of self.seriesData){
                        if ((d[0].toFixed(0) - 1) == e.point.lng.toFixed(0) && d[1].toFixed(0) == e.point.lat.toFixed(0)){
                            hit = true
                            a = Math.atan2(d[3], d[2]) * 180 / Math.PI
                            if (a >= -5 && a <= 5){
                                direction = '东风';
                            }else if (a > 5 && a< 85){
                                direction = '东北风';
                            }else if (a >= 85 && a<= 195){
                                direction = '北风';
                            }else if (a > 195 && a< 175){
                                direction = '西北风';
                            }else if ((a >= 175 && a<= 180) || (a>= -180 && a<= -175)){
                                direction = '西风';
                            }else if (a > -175 && a< -100){
                                direction = '西南风';
                            }else if (a >= 95 && a<= -85){
                                direction = '南风';
                            }else if (a > -85 && a<= -5){
                                direction = '东南风';
                            }
                            ComprehensiveMap.drawWindMes(e.point.lng, e.point.lat, direction, d[4].toFixed(2), self)
                        }
                    }
                }
            }
        });
    },
    /**获取全球实时风向数据
     * 注：使用接口为大气精细化管控gis风向数据接口
     * 请求格式例：http://39.97.239.112:8426/gis/wind/windresult/20200729/2020072913.json
     **/
    queryWindData(self){
        $.getJSON('/wind/gis/wind/windresult/' + new Date().format('yyyyMMdd') + '/' + new Date().format('yyyyMMddhh') + '.json', function(windData) {
            buildGrid(windData, function(header, grid) {
                for (let j = 0; j < header.ny; j++) {
                    for (let i = 0; i < header.nx; i++) {
                        let vx = grid[j][i][0];
                        let vy = grid[j][i][1];
                        let mag = Math.sqrt(vx * vx + vy * vy);
                        let lng = i / header.nx * 360;
                        if (lng >= 180) {
                            lng = 180 - lng;
                        }
                        // [ [经度, 维度，向量经度方向的值，向量维度方向的值，风速] ]
                        self.seriesData.push([
                            lng,
                            90 - j / header.ny * 180,
                            vx,
                            vy,
                            mag
                        ]);
                        self.maxMag = Math.max(mag, self.maxMag);
                        self.minMag = Math.min(mag, self.minMag);
                    }
                }
                let option = self.myChart.getOption();
                option.visualMap.min = self.minMag;
                option.visualMap.max = self.maxMag;
                option.series[0].data = self.seriesData;
                self.myChart.setOption(option);
            });
        });
        let createWindBuilder = function(uComp, vComp) {
            let uData = uComp.data,
                vData = vComp.data;
            return {
                header: uComp.header,
                data: function(i) {
                    return [uData[i], vData[i]];
                }
            }
        };
        let createBuilder = function(data) {
            let uComp = null,
                vComp = null,
                scalar = null;
            data.forEach(function(record) {
                switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
                    case "2,2":
                        uComp = record;
                        break;
                    case "2,3":
                        vComp = record;
                        break;
                    default:
                        scalar = record;
                }
            });
            return createWindBuilder(uComp, vComp);
        };
        let buildGrid = function(data, callback) {
            let builder = createBuilder(data);

            let header = builder.header;
            let λ0 = header.lo1,
                φ0 = header.la1;
            let Δλ = header.dx,
                Δφ = header.dy;
            let ni = header.nx,
                nj = header.ny;
            let date = new Date(header.refTime);
            date.setHours(date.getHours() + header.forecastTime);
            let grid = [],
                p = 0;
            let isContinuous = Math.floor(ni * Δλ) >= 360;
            for (let j = 0; j < nj; j++) {
                let row = [];
                for (let i = 0; i < ni; i++, p++) {
                    row[i] = builder.data(p);
                }
                if (isContinuous) {
                    row.push(row[0]);
                }
                grid[j] = row;
            }
            callback(header, grid);
        };
    },
    /**获取地图边界坐标集合**/
    queryDistrict(self){
        let that = this;
        self.districtLoading++
        let bdary = new BMap.Boundary()
        bdary.get(self.areaName, function (rs) {
            let count = rs.boundaries.length
            for (let i = 0; i < count; i++) {
                self.blist.push({ points: rs.boundaries[i], name: self.areaName })
            };
            self.districtLoading--
            if (self.districtLoading == 0) {
                that.drawBoundary(self)
            }
        })
    },
    /**绘制地图边界**/
    drawBoundary(self){
        let pointArray = []
        for (let i = 0; i < self.blist.length; i++) {
            let ply = new BMap.Polygon(self.blist[i].points, {
                strokeWeight: 3,
                strokeColor: '#C04742',
                fillColor: '#ffc1076e',
                fillOpacity: 0.3
            })
            ply.name = self.blist[i].name
            ply.imei = 'ply'
            self.map.addOverlay(ply)
            if (self.zoom == 12){
                let path = ply.getPath()
                pointArray = pointArray.concat(path)
            }
        }
        self.map.setViewport(pointArray)
    },
    /**填充区域底图**/
    drawBaseMap(self){
        let SW = new BMap.Point(self.AppConfig.appInfo.SW[0], self.AppConfig.appInfo.SW[1]);
        let NE = new BMap.Point(self.AppConfig.appInfo.NE[0], self.AppConfig.appInfo.NE[1]);
        let groundOverlayOptions = {
            opacity: 1,
            displayOnMinLevel: 1,
            displayOnMaxLevel: 20
        };
        let groundOverlay = new BMap.GroundOverlay(new BMap.Bounds(SW, NE), groundOverlayOptions);
        groundOverlay.setImageURL('../../../../../static/css/css/img/aqi.png');
        groundOverlay.imei = 'baseMap' //标识
        self.map.addOverlay(groundOverlay);
    },
    /**绘制污染源柱图**/
    drawInformation(siteInfo, self){
        let map = self.map;
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let div = this._div = document.createElement("div");
            if (siteInfo.data < 2.0){
                if (self.alarmFlag == true){
                    return false;
                }
                div.className = 'map-sign level-01'
                self.lgnoreAlarmIns.push(siteInfo.informationId)
            }
            if (siteInfo.status != 0){
                self.lgnoreAlarmIns2.push(siteInfo.informationId)
            }
            if (siteInfo.data >= 2.0 && siteInfo.data < 10.0){
                if (self.lgnoreAlarmIns2.indexOf(siteInfo.informationId) == -1){
                    div.className = 'map-sign level-02'
                }else{
                    div.className = 'map-sign level-02-no'
                }
            }
            if (siteInfo.data >= 10.0){
                if (self.lgnoreAlarmIns2.indexOf(siteInfo.informationId) == -1){
                    div.className = 'map-sign level-03'
                }else{
                    div.className = 'map-sign level-03-no'
                }
            }
            if (siteInfo.data == null){
                div.className = 'map-sign level-00'
                self.lgnoreAlarmIns.push(siteInfo.informationId)
            }
            let div_item = document.createElement("div");
            div_item.className = 'map-sign-bar'
            div_item.style = 'height: ' + siteInfo.data * 6 + 'px'
            if (self.mapModel.indexOf('number') != -1){
                let div_item_item = document.createElement("div");
                div_item_item.className = 'map-sign-num'
                if (siteInfo.data == null){
                    div_item_item.innerText = ''
                }else{
                    div_item_item.innerText = siteInfo.data
                }
                div_item.appendChild(div_item_item);
            }
            div.appendChild(div_item);
            if (self.mapModel.indexOf('name') != -1){
                let div_item_item = document.createElement("div");
                div_item_item.innerText = siteInfo.informationName
                div_item_item.style = 'font-size: 12px;color: #333333;margin-left: -40px;width: 100px;text-align: center;font-weight: bold'
                div.appendChild(div_item_item);
            }
            let tmpfun = map.onclick;
            map.onclick = null;
            div.addEventListener("click", function() {
                map.onclick = tmpfun;
                self.dialogVisible = true
                self.informationName = siteInfo.informationName
                self.informationId = siteInfo.informationId
                self.status = siteInfo.status
                self.alarmId = siteInfo.alarmId
                self.showInformationMes()
            });
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 45 + "px";
            this._div.style.top  = pixel.y - 30 + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(siteInfo.longitude,siteInfo.latitude));
        myCompOverlay.imei = 'information' //标识
        map.addOverlay(myCompOverlay);
    },
    /**绘制动态污染源方向轨迹**/
    drawTrajectory(pointA, pointB, self){
        let red = Math.random().toString(36).substr(2);
        let angel = this.getAngle(pointA, pointB)
        this.queryPoints(pointA, pointB, angel, red, self)
    },
    /**获取两个污染源坐标偏离角度**/
    getAngle(firstPoint, nextPoint) {
        if (!(firstPoint && nextPoint)) {
            return 0;
        }
        let dRotateAngle = Math.atan2(
            Math.abs(firstPoint.longitude - nextPoint.longitude),
            Math.abs(firstPoint.latitude - nextPoint.latitude)
        );
        if (nextPoint.longitude >= firstPoint.longitude) {
            if (nextPoint.latitude >= firstPoint.latitude) {
            } else {
                dRotateAngle = Math.PI - dRotateAngle;
            }
        } else {
            if (nextPoint.latitude >= firstPoint.latitude) {
                dRotateAngle = 2 * Math.PI - dRotateAngle;
            } else {
                dRotateAngle = Math.PI + dRotateAngle;
            }
        }
        dRotateAngle = (dRotateAngle * 180) / Math.PI;
        return dRotateAngle;
    },
    /**绘制污染源方向轨迹**/
    drawInformationTrajectory(siteInfo, angel, red, self){
        let map = self.map
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let div = this._div = document.createElement("div");
            div.className = "map-show-item";
            div.style.position = "absolute";
            let icon = document.createElement("div");
            div.appendChild(icon);
            let con = document.createElement("div");
            con.className = "map-show-con";
            icon.className="map-show-icon-online";
            let mapItem = document.createElement("img");
            mapItem.src = '../../../static/img/jiantou.png'
            mapItem.id = red
            mapItem.style = "width: 18px; height: 18px;visibility: hidden;transform: rotate(" + angel + "deg)"
            con.appendChild(mapItem);
            div.appendChild(con);
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 45 + "px";
            this._div.style.top  = pixel.y - 30 + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(siteInfo.longitude,siteInfo.latitude));
        myCompOverlay.imei = 'trajectory' //标识
        map.addOverlay(myCompOverlay);
    },
    /**根据比例尺获取两个污染源轨迹中散点坐标**/
    queryPoints(A, B, angel, red, self){
        let map = self.map;
        let pointA = new BMap.Point(A.longitude, A.latitude);
        let pointB = new BMap.Point(B.longitude, B.latitude);
        let d = (map.getDistance(pointA,pointB)).toFixed(6);
        let n =  Math.ceil(d/1000);
        let dx = 1000*(B.longitude - A.longitude)/d;
        let dy = 1000*(B.latitude - A.latitude)/d;
        if (n != 0){
            for (let i=1; i<n-1; i++){
                let siteInfo = {
                    longitude: i*dx + A.longitude,
                    latitude: i*dy + A.latitude,
                }
                this.drawInformationTrajectory(siteInfo, angel + 180, red + i, self)
            }
            this.recursionFunction(n, red, self)
        }
    },
    /**迭代动态控制轨迹方向css渲染**/
    recursionFunction(n, red, self){
        for (let i=1; i<n-1; i++){
            let idName = red + i
            setTimeout(()=>{
                if (self.alarmFlag == false){
                    return false;
                }else{
                    document.getElementById(idName).style.visibility = 'visible'
                }
            },i*200)
        }
        setTimeout(()=>{
                for (let z=1; z<n-1; z++){
                    if (self.alarmFlag == false) {
                        return false;
                    }else{
                        let idName2 = red + z
                        document.getElementById(idName2).style.visibility = 'hidden'
                    }
                }
                this.recursionFunction(n, red, self)
            },n*200)
    },
    /**清除当前图层**/
    clearMap(name, self){
        let allOverlay = self.map.getOverlays();

        if (name == 'all'){
            for (let i = 0; i < allOverlay.length ; i++){
                self.map.removeOverlay(allOverlay[i]);
            }
        }else{
            for (let i = 0; i < allOverlay.length ; i++){
                if(allOverlay[i].imei == name){
                    self.map.removeOverlay(allOverlay[i]);
                }
            }
        }
    },
    /**绘制溯源点**/
    drawPollutantFrom(point, self){
        let map = self.map;
        let picImg = '../../../../static/img/yuanquan.png'
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let div = this._div = document.createElement("div");
            div.className = "map-show-item";
            div.style = "cursor:pointer; position:absolute";
            let icon = document.createElement("div");
            div.appendChild(icon);
            let con = document.createElement("div");
            con.className = "map-show-con";
            icon.className="map-show-icon-online";
            let mapItem = document.createElement("img");
            mapItem.src = picImg
            mapItem.style = "width: 18px; height: 18px;"
            con.appendChild(mapItem);
            div.appendChild(con);
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 45 + "px";
            this._div.style.top  = pixel.y - 30 + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(point.longitude,point.latitude));
        myCompOverlay.imei = 'pollutantFrom' //标识
        map.addOverlay(myCompOverlay);
    },
    /**绘制污染点**/
    drawPollutant(point, self){
        let map = self.map;
        let picImg = '../../../../static/img/yuan.gif'
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let div = this._div = document.createElement("div");
            div.className = "map-show-item";
            div.style = "cursor:pointer; position:absolute";
            let icon = document.createElement("div");
            div.appendChild(icon);
            let con = document.createElement("div");
            con.className = "map-show-con";
            icon.className="map-show-icon-online";
            let mapItem = document.createElement("img");
            mapItem.src = picImg
            mapItem.style = "width: 22px; height: 22px;"
            con.appendChild(mapItem);
            div.appendChild(con);
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 45 + "px";
            this._div.style.top  = pixel.y - 30 + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(point.longitude,point.latitude));
        myCompOverlay.imei = 'pollutant' //标识
        map.addOverlay(myCompOverlay);
    },
    /**绘制风向风速显示框**/
    drawWindMes(lo, la, direction, speed, self){
        // console.log(lo + '-' + la)
        let map = self.map;
        function ComplexCustomOverlay(point){
            this._point = point;
        }
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function(map){
            this._map = map;
            let div = this._div = document.createElement("div");
            div.className = "map-show-item";
            div.style = "cursor:pointer; position:absolute;width: 130px; height: 54px; background-color: #c1c1c1;border-radius: 5px";
            let div_item = document.createElement("div");
            div_item.style = 'margin-top:5px'
            let p1 = document.createElement("p");
            p1.innerText = '风向：' + direction;
            p1.style = 'font-size: 16px; font-width: 700;margin-left:10px'
            let p2 = document.createElement("p");
            p2.innerText = '风速：' + speed + ' m/s';
            p2.style = 'font-size: 16px; font-width: 700;margin-left:10px'
            div_item.appendChild(p1)
            div_item.appendChild(p2)
            div.appendChild(div_item)
            map.getPanes().labelPane.appendChild(div);
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function(){
            let map = this._map;
            let pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 45 + "px";
            this._div.style.top  = pixel.y - 30 + "px";
        }
        let myCompOverlay = new ComplexCustomOverlay(new BMap.Point(lo, la));
        myCompOverlay.imei = 'windMes' //标识
        map.addOverlay(myCompOverlay);
    }
}
export default ComprehensiveMap;
