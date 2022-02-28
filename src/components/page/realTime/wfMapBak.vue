<template>
    <!-- 内容区域 -->
    <div class="main main-full">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-all"></i></a><span class="sep">&gt;</span>
                <span class="text-primary">危废地图</span>
            </div>
        </div>
        <div class="map-box">
            <!-- 地图 -->
            <div class="allmap" id="wfMap"></div>
            <!-- 分类 -->
            <div class="type">
                <div class="typeTitle">
                    <div class="typeMain" v-for="(item, index) in typeData" :key="index" :class="item.key === typeSelected ? 'selected' : ''">
                        <div class="mainList" @click="typeTab(item.key)">
                            <div class="iconMain">
                                <i :class="item.class"></i>
                            </div>
                            {{item.name}}
                            <i :class="item.key === typeSelected ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
                        </div>
                        <div class="typeContainer" :class="item.key === typeSelected ? 'show' : ''">
                            <div class="typeList">
                                <div class="listMain" v-for="(item, index) in item.children" :key="index">{{item.name}}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- 左侧 -->
            <div class="map-left" style="margin-top: -16px;">
                <!-- 筛选 -->
                <div class="filter-area">
                    <ul class="filter-box" v-if="typeSelected === 'qiye' ">
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select">
                                    <el-cascader
                                            placeholder="选择所在地"
                                            ref="regionElCascader"
                                            :disabled="isDisabled"
                                            @change="searchRegionChange()"
                                            v-model="search.regionCode"
                                            :options="regionOptions"
                                            :props="{  expandTrigger: 'hover'}">
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select">
                                    <el-select v-model="search.entType" clearable @change="searchMap">
                                        <el-option
                                                v-for="item in entTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul class="filter-box" v-if="typeSelected === 'shuju' ">
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select">
                                    <el-cascader
                                            placeholder="选择所在地"
                                            ref="regionElCascader"
                                            :disabled="isDisabled"
                                            @change="searchRegionChange()"
                                            v-model="search.regionCode"
                                            :options="regionOptions"
                                            :props="{  expandTrigger: 'hover'}">
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-select">
                                    <el-select v-model="typeId" clearable @change="searchMap">
                                        <el-option
                                                v-for="item in hazardousWasteTypeOptions"
                                                :key="item.id"
                                                :label="item.typeNname"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>


            <!-- 右侧企业---数据-->
            <div class="enterpriseRight" >
                <div class="" v-for= "(item, index) in enterpriseAndData" :key="index">
                    <div v-if="item.key === typeSelected" class="EnterpriseMain">
                        <div class="detailTop" >
                            <div class="name" v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'">{{item.title}}</div>
                            <div class="name" v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'">{{item.title}}</div>
                            <v-chart :options="item.EnterpriseEchars" autoresize id="EnterpriseEchars" v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'"></v-chart>
                            <div v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'" class="count">{{count}}kg</div>

                        </div>
                        <div class="detailMain">
                            <div class="listMain" v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'" v-for= "(item2, index) in item.data" :key="index">
                                <div class="top" style="position:relative">
                                    <span>NO.{{index+1}}</span>
                                    <span v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'">
                                            <span>{{item2.regionName}}</span>
                                        <!--<span>{{item2.name}}</span>-->
                                        </span>
                                    <span v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'">
                                            <span>{{item2.typeName}}</span>
                                            <span style="font-size:12px;position:absolute; right:0;font-weight: bold">申报: {{item2.thisYearNumber}} kg</span>
                                        </span>
                                </div>
                                <div class="progress" v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'">
                                    <div class="num"><span>实际: </span>{{item2.total}}kg</div>
                                    <el-progress :percentage="item2.percentage" color="#7E90C4"  :stroke-width="14"></el-progress>
                                </div>
                                <div class="progress" v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'">
                                    <div class="num"><span >实际: </span>{{item2.productionNumber}}kg</div>
                                    <el-progress :percentage="item2.percentage" color="#7E90C4"  :stroke-width="14"></el-progress>
                                </div>
                            </div>

                            <div class="listMain" v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'" v-for= "(item2, index) in enterpriseAndData.dataMain.data" :key="index">
                                <div class="top" style="position:relative">
                                    <span>NO.{{index+1}}</span>
                                    <span v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'">
                                        <span>{{item2.regionName}}</span>
                                        <!--<span>{{item2.name}}</span>-->
                                    </span>
                                    <span v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'">
                                        <span>{{item2.typeName}}</span>
                                        <span style="font-size:12px;position:absolute; right:0;font-weight: bold">申报: {{item2.thisYearNumber}} kg</span>
                                    </span>
                                </div>
                                <div class="progress" v-if="item.key === 'shuju'&typeSelectedShuJu === 'region'">
                                    <div class="num"><span>实际: </span>{{item2.total}}kg</div>
                                    <el-progress :percentage="item2.percentage" color="#7E90C4"  :stroke-width="14"></el-progress>
                                </div>
                                <div class="progress" v-if="item.key === 'shuju'&typeSelectedShuJu === 'enter'">
                                    <div class="num"><span >实际: </span>{{item2.productionNumber}}kg</div>
                                    <el-progress :percentage="item2.percentage" color="#7E90C4"  :stroke-width="14"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧（产废） -->
            <div class="map-right" style="display:none">
                <!--  v-if="entMapInfo.entKind === 1" -->
                <div class="companyDetail">
                    <div class="detailTop" :class="entMapInfo.entKind === 1 ? 'chanfei' :(entMapInfo.entKind  === 2?'shouji':'jingying')">
                        <div class="TopMain">
                            <div class="topLeft">
                                <div class="entKindIcon">
                                    <i class="iconBox"></i>
                                </div>
                                <div class="name">{{entMapInfo.name}}</div>
                            </div>
                            <div class="TopText">
                                <div id="dataTop"></div>
                                <div class="text">{{yuanData}}</div>
                                <div class="bian">目标分值</div>
                            </div>

                        </div>
                        <div class="company-location" :class="entMapInfo.entKind === 3 ? 'none' : ''">
                            <i class="video-camera"></i>
                            <el-link @click="jumpAddres(entMapInfo)" class="videoHref">实时监控</el-link>
                        </div>
                        <!-- 贮存信息 -->
                        <div class="chucunInform">
                            <div class="informName">贮存信息</div>
                            <!-- 产废企业 -->
                            <div v-if="entMapInfo.entKind === 1">
                                <div class="informMain">
                                    <div class="informDetail">
                                        实时库存<span>{{groupStorageCurrentSum}}kg</span>
                                    </div>
                                    <div class="informDetail">
                                        库存比
                                        <span v-if="stockScale!=null" >{{stockScale}}%</span>
                                        <span v-else>10%</span>
                                    </div>
                                </div>
                                <el-progress :percentage="stockScale" ></el-progress>
                            </div>
                            <!-- 经营企业 -->
                            <div v-if="entMapInfo.entKind === 2">
                                <div class="informMain">
                                    <div class="informDetail">
                                        产能<span>30kg</span>
                                    </div>
                                    <div class="informDetail">
                                        累计处置量
                                        <span >30kg</span>
                                    </div>
                                </div>
                                <div class="informMain">
                                    <div class="informDetail">
                                        当前库存<span>{{groupStorageCurrentSum}}kg</span>
                                    </div>
                                    <div class="informDetail">
                                        处置效率
                                        <span >30%</span>
                                    </div>
                                </div>
                                <!-- <el-progress :percentage="stockScale" ></el-progress> -->
                            </div>
                            <!-- 收集企业 -->
                            <div v-if="entMapInfo.entKind === 3">
                                <div style="font-size:12px; font-weight:bold;">
                                    储存危废类型
                                </div>
                                <el-scrollbar wrap-class="list" wrap-style="color: red;"
                                              view-class="view-line" view-style="font-weight: bold;height:100%;"
                                              :native="false" style="height: 100%;">
                                    <div style="display:flex;justify-content: space-between">
                                        <ul v-for="(item, index) in entMapInfo.realTimeStockWithHazardousWasteTypeVo"
                                            :key="index">
                                            <li class="text">
                                                <h3 style="color:#269E4C;font-weight:bold;">{{ item.withHazardousWasteType }}</h3>
                                                <h3 style="color:#269E4C;font-weight:bold;">{{ item.currentStockNum }}kg</h3>
                                            </li>
                                        </ul>
                                    </div>
                                </el-scrollbar>
                                <!-- 作业异常 回收及时率 -->
                                <div class="yichang">
                                    <div class="" style="display:flex;justify-content: space-between; margin-top:3%">
                                        <div class="informDetail">
                                            作业异常<span style="color:red;font-weight:bold">30次</span>
                                        </div>
                                        <div class="informDetail">
                                            回收及时率
                                            <span v-if="stockScale!=null" style="color:#47CA70;font-weight:bold">34.32%</span>
                                            <span v-else>10%</span>
                                        </div>
                                    </div>
                                    <!-- <el-progress :percentage="34.32"></el-progress> -->

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 库存信息 -->
                    <div class="stockInform">
                       <div>
                            <div v-if="containeGroupVoList!=null && containeGroupVoList.length>0">
                                <ul v-for="(item,index) in containeGroupVoList" :key="index">
                                    <div class="stockName">
                                        <span>{{item.name}}</span>
                                        <div class="buttonBox" @click="stockClick()">
                                            <span v-if="stockOpen">收起</span>
                                            <span v-else>展开</span>
                                            <i :class="stockOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
                                        </div>
                                    </div>
                                    <div v-if="stockOpen">
                                       <div class="wasteBox mt-sm" v-for="(containeInfo,index) in item.containeInfoList" :key="index" >
                                            <div class="waste-item">
                                                <span class="waste-name">
                                                    {{index + 1}}. {{containeInfo.dictDetailName}} {{containeInfo.dictDetailCode}}
                                                </span>
                                                <span class="waste-num">
                                                    {{containeInfo.currentAmount}}kg
                                                </span>
                                            </div>
                                            <el-progress :percentage="containeInfo.currentAmount/groupStorageCurrentSum" color="#269E4C"></el-progress>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div  v-else>
                                暂无数据
                            </div>
                       </div>
                    </div>
                    <!-- 最近出入库 -->
                    <div class="wareHousing">
                        <div class="informName">最近出入库</div>
                         <div v-if="entMapInfo.outInlibraryVoList!=null && entMapInfo.outInlibraryVoList.length>0" class="step-box step02">
                            <ol class="step-list">
                                <li :class="item.operationTypeStr=='入库'?'is-out':''"
                                    v-for="(item ,index) in entMapInfo.outInlibraryVoList" :key="index">
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                    </div>
                                    <div class="stepCon">
                                        <div class="lineCon">
                                            <div class="left time">{{item.storageTime}}</div>
                                            <div class="right lineName">{{item.operationTypeStr}}</div>
                                        </div>
                                        <div class="lineCon">
                                            <div class="left name">{{item.dictDetailName}} {{item.dictDetailCode}} </div>
                                            <div class="right">{{item.number}}kg</div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                            <div class="ConXian"></div>
                        </div>
                        <div v-else>
                                暂无数数据
                        </div>
                    </div>
                    <!-- 今日库存 -->
                    <div class="kucunEcharsMain">
                       <div class="informName">今日库存量</div>
                        <v-chart :options="optionchanfei" autoresize id="kucunEchars" v-if="entMapInfo.entKind ===1"></v-chart>
                        <v-chart :options="optionshouji" autoresize id="kucunEchars" v-if="entMapInfo.entKind ===2"></v-chart>
                        <v-chart :options="optionjingying" autoresize id="kucunEchars" v-if="entMapInfo.entKind ===3"></v-chart>
                    </div>
                </div>
            </div>

        </div>
        <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>
    </div>
</template>

<script>
    import {asyncLoadBaiduMapJsApi} from '../../../components/common/unit/loadBMapApi';

    import productionVideoHuiKan from "../standingBook/ProductionVideoHuiKanNew";

    import customOverlay from './js/customOverlay';
    export default {
        name: "wfMapBak",
        components: {
            productionVideoHuiKan
        },
        data(){
            return {
                isDisabled: false,
                addressName: '',
                map: null,
                markerArr: [],
                regionMaker: '',
                areaOptions: [],
                cityOptions: [],
                cityCode: "",
                areaCode: "",
                cfUnit: "",
                regionCode: sessionStorage.getItem('regionCode'),
                regionLevel: sessionStorage.getItem('regionLevel') == null ? this.AppConfig.appInfo.regionLevel : sessionStorage.getItem('regionLevel'),
                parentCode: this.AppConfig.appInfo.parentCode,
                regionName: this.AppConfig.appInfo.regionName,
                lng: this.AppConfig.appInfo.lng,
                lat: this.AppConfig.appInfo.lat,
                centerLevel: 8,
                initBssw: this.AppConfig.appInfo.bssw,
                initBsne: this.AppConfig.appInfo.bsne,
                level: 5,
                entType: '',
                registeredAddress: '',
                userRegionCode: '',
                zoom: '',
                dataList: [],
                typeId:'',
                entTypeOptions: [{
                    value: '',
                    label: '全部企业'
                }, {
                    value: '1',
                    label: '产废企业'
                }, {
                    value: '2',
                    label: '经营企业'
                }, {
                    value: '3',
                    label: '收集企业'
                }],
                hazardousWasteTypeOptions: [],
                regionOptions: [],
                search: {
                    entType: '',
                    regionCode: sessionStorage.getItem('regionCode'),
                    regionName: this.AppConfig.appInfo.regionName,
                    regionLevel: sessionStorage.getItem('regionLevel') == null ? this.AppConfig.appInfo.regionLevel : sessionStorage.getItem('regionLevel'),
                    regionParentCode: ''
                },
                outInStackLimit: 5,
                entMapInfo: {},
                stockScale: 0,
                groupStorageCurrentSum: 0,
                containeGroupVoList: [],
                // cfImgUrlPath :"../../../../static/css/images/map/chanfei.png",
                //产废重点
                // cfAbnormalImgUrlPath: "../../../../static/css/images/map/chanfei_red.png",
                cfAbnormalImgUrlPath: "../../../../static/css/images/map/normalEnterprise.png",
                //经营
                czImgUrlPath: "../../../../static/css/images/map/chuzhi.png",
                //产废一般F
                cfNormalImgUrlPath: "../../../../static/css/images/map/normalEnterprise.png",
                //收集
                sjImgUrlPath: "../../../../static/css/images/map/yunashu.png",
                // 库存open
                stockOpen: true,
                //企业产废总量
                count:0,
                //行政区域边界点的集合
                boundarySpot:[],
                //typeSelected=='shuju'时，再次判断时使用
                typeSelectedShuJu:'region',
                option: {
                    grid: [
                         {x: '12%', y: '5%', width: '80%', height: '80%'}
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        data: ['00:00', '04:00', '06:00','14:00','15:00','19:00'],
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,.1)'
                            }
                        }
                    },
                    series: [{
                        lineStyle: {
                            color: 'none',
                            width: 1
                        },
                        smooth: true,
                        symbol: 'none',
                        data: [30, 45, 30,40,70,30],
                        type: 'line',
                        areaStyle: {
                            color: '#2198E2'
                        }
                    }]
                },
                optionshouji: {
                    grid: [
                         {x: '12%', y: '5%', width: '80%', height: '80%'}
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        data: ['00:00', '04:00', '06:00','14:00','15:00','19:00'],
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,.1)'
                            }
                        }
                    },
                    series: [{
                        lineStyle: {
                            color: 'none',
                            width: 1
                        },
                        smooth: true,
                        symbol: 'none',
                        data: [30, 45, 30,40,70,30],
                        type: 'line',
                        areaStyle: {
                            color: '#42E4B7'
                        }
                    }]
                },
                optionjingying: {
                    grid: [
                         {x: '12%', y: '5%', width: '80%', height: '80%'}
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        data: ['00:00', '04:00', '06:00','14:00','15:00','19:00'],
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,.1)'
                            }
                        }
                    },
                    series: [{
                        lineStyle: {
                            color: 'none',
                            width: 1
                        },
                        smooth: true,
                        symbol: 'none',
                        data: [30, 45, 30,40,70,30],
                        type: 'line',
                        areaStyle: {
                            color: '#F8CE9B'
                        }
                    }]
                },
                // type类型切换
                typeData: [
                    {name: '企业', class: 'el-icon-office-building', key: 'qiye',
                        children: []
                    },
                    {name: '数据', class: 'el-icon-s-data', key: 'shuju',
                        children: [
                            {
                                name: ' 产废量',
                            },
                            {
                                name: '储存量',
                            },
                            {
                                name: '转移量',
                            },
                            {
                                name: '接受量',
                            },
                            {
                                name: '出质量',
                            }
                        ]
                    }
                ],
                typeSelected: 'qiye',
                // 企业总和数据
                enterpriseAndData: {
                    enterprise:{
                        key: 'shuju',
                        title: '产废产量占比',
                        //危废站产量站比
                        EnterpriseEchars:{
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            legend: {
                                width: "55%",
                                right: "5%",
                                top: 'center',
                                itemWidth: 10,
                                itemHeight: 10,
                                // data: data.name,
                                formatter: name=>{
                                    return name;
                                }
                            },
                            toolbox: {
                                show: true
                            },
                            series: [
                                {
                                    name: '产废产量',
                                    type: 'pie',
                                    radius: [10, 60],
                                    center: ['25%', '50%'],
                                    roseType: 'radius',
                                    label: {
                                        show: false
                                    },
                                    //value 是控制统计图没个位置的大小的
                                    data: [

                                    ]
                                }
                            ]
                        },
                        data: [
//                            {name: '凌云处置企业', num: '1', qu: '朝阳区', count: '12200000', percentage:90},

                        ]
                    },
                    dataMain:{
                        key: 'enter',
                        title: '产废量',
                        count: 0,
                        data: [
//                            {name: 'Hww111', num: '1',  count: '12200000', percentage:30}
                        ]
                    }
                },
                yuanData: 30,
            }
        },
        methods: {
            getTEnterpriseHazardousStatisticsWithType(entId){
                var _this = this;
                _this.count = 0;
                _this.typeSelectedShuJu = 'enter'
                _this.$axios.get('/api/regulatory/AnnualReportStatistics/getTEnterpriseHazardousStatisticsWithType', {
                    params: {
                        "entId": entId,
                        "typeId":_this.typeId
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.enterpriseAndData.dataMain.data=res.data
                            for(var i = 0;i<_this.enterpriseAndData.dataMain.data.length;i++){
                                _this.count += _this.enterpriseAndData.dataMain.data[i].productionNumber;
                            }
                            $(".EnterpriseMain").fadeIn();
                        }else {
                            $(".EnterpriseMain").fadeOut();
                            // _this.getBoundary();
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getAllHazardousWasteType(){
                var _this = this;
                _this.$axios.get('/api/regulatory/AnnualReportStatistics/getAllHazardousWasteType')
                    .then(function (res) {
                        if (res.code == 0) {
                            _this.hazardousWasteTypeOptions=res.data
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getAnnualReportStatisticsTotal(){
                var _this = this;
                _this.$axios.get('/api/regulatory/AnnualReportStatistics/getAnnualReportStatisticsTotal', {
                    params: {
                        "regionCode": _this.regionCode,
                        "typeId":_this.typeId
                    }
                }).then(
                    function (res) {
//                        console.log(res)
                        if (res.code == 0) {
                            _this.enterpriseAndData.enterprise.data=res.data
                            _this.addRegionMarker(_this.dataList);//向地图中添加统计点
//                            _this.enterpriseAndData.enterprise.EnterpriseEchars.series[0].data = res.data;
                        }else {
                            // _this.getBoundary();
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            //饼状图数据
            proportionOfOutPutStatistics(){
                var _this = this;
                _this.$axios.get('/api/regulatory/AnnualReportStatistics/proportionOfOutPutStatistics', {
                    params: {
                        "regionCode": _this.regionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.enterpriseAndData.enterprise.EnterpriseEchars.series[0].data=res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            // 库存展开收起
            stockClick(){
                this.stockOpen = !this.stockOpen;
            },
            // 数据和企业切换
            typeTab(key){
                this.typeSelected = key;
            },
            initPage(){
                var _this = this;
                asyncLoadBaiduMapJsApi(_this.AppConfig.appInfo.baiDuMapAk, 1).then(() => {
                    _this.initBMap();
                }).catch(err => {
                    // console.log(err);
                    // console.log("地图加载失败");
                })
            },
            jumpAddres(item) {
                this.$refs.closeMouleHK.openVideo(item);
            },
            /**初始化地图**/
            initBMap(){
                this.createMap(); //创建地图
                this.drawRegionBoundary();// 绘制行政区划
                this.setMapEvent();//设置地图事件
                this.addMapControl();//向地图添加控件
                this.getRegionCountData('', '', 3, this.initBssw, this.initBsne, this.search.entType, this.search.regionCode);// 请求统计数据
            },
            drawRegionBoundary(){
                customOverlay.queryDistrict(this,this.AppConfig.appInfo.regionName);
            },
            getBoundary(){
                var bdary = new BMap.Boundary();
                ///this.level = 3

                bdary.get(this.search.regionName, function (rs) {       //获取行政区域
                    // map.clearOverlays();        //清除地图覆盖物
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    var pointArray = [];
                    for (var i = 0; i < count; i++) {
                        var ply = new BMap.Polygon(rs.boundaries[i], {
                            strokeWeight: 2,
                            strokeColor: "#C04742",
                            fillColor: '#ffc1076e',
                            fillOpacity: 0.3
                        }); //建立多边形覆盖物
                        map.addOverlay(ply);  //添加覆盖物
                    }
                });

            },
            getRegionBoundary(regionName){
                var bdary = new BMap.Boundary();
                ///this.level = 3

                bdary.get(regionName, function (rs) {       //获取行政区域
                    //map.clearOverlays();        //清除地图覆盖物
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    var pointArray = [];
                    for (var i = 0; i < count; i++) {
                        var ply = new BMap.Polygon(rs.boundaries[i], {
                            strokeWeight: 3,
                            strokeColor: "#ff0000",
                            strokeOpacity: 0.5
                        }); //建立多边形覆盖物
                        map.addOverlay(ply);  //添加覆盖物
                    }
                });

            },
            clearOver(){
                customOverlay.clearMap("regionInfoMaker",this);
                customOverlay.clearMap("entInfoMaker",this);
            },
            searchMap(){
                // console.log(this.typeId)
                // this.map.clearOverlays();//清空地图覆盖物/
                this.clearOver();
                if (this.$refs.regionElCascader.getCheckedNodes().length < 1) {
                    this.map.reset();
                }
                var sw = this.initBssw;
                var ne = this.initBsne;
                this.level = 3;
                if (this.search.regionLevel == 3 || this.search.regionLevel == 2) {
                    var centerLevel = 10;
                    if (this.regionLevel == 3) {
                        centerLevel = 12;
                    }
                    map.centerAndZoom(this.AppConfig.appInfo.regionName + this.search.regionName, centerLevel);
                    if(this.typeSelected === 'qiye'){
                        this.getRegionCountData('', '', 3, sw, ne, this.search.entType, this.search.regionCode);// 请求统计数据
                    }
                    if(this.typeSelected === 'shuju'){
                        this.getAnnualReportStatisticsTotal(this.search.regionCode,this.typeId);
                    }
                }
            },
            initEntInfo(){
                this.entMapInfo = {};
                this.stockScale = 0;
                this.groupStorageCurrentSum = 0;
                this.containeGroupVoList = [];
            },
            createMap(){
                // ;
                var self = this;
                var map = new BMap.Map("wfMap",
                    {
                        //minZoom:4,// 显示级别
                        maxZoom: 14,
                        enableMapClick: false// 构造底图时，关闭底图可点功能
                    }
                );//在百度地图容器中创建一个地图
                var point = new BMap.Point(this.lng, this.lat);//定义一个中心点坐标
                var centerLevel = 10;
                if (self.regionLevel == 3) {
                    centerLevel = 12;
                }
                map.centerAndZoom(new BMap.Point(sessionStorage.getItem("lng") == null ? this.lng : sessionStorage.getItem("lng"), sessionStorage.getItem("lat") == null ? this.lat + 0.2 : sessionStorage.getItem("lat")), centerLevel);
                window.map = map;//将map变量存储在全局
                self.map = map;
                map.setMapStyle({style: 'grayscale'});
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
                    // $(".EnterpriseMain").fadeOut();
                    $(".map-right").hide();
                    self.initEntInfo();
                    let zoom = map.getZoom();
                    if (zoom < 13) {
                        self.level = '';
                    }
                });
                // 监听层级
                map.addEventListener('zoomend', function (e) {
//                    console.log(self.level)
                    if (self.level != 3) {
                        self.searchData();
                    } else {
                        return;
                    }
                });
            },
            searchData(){
                // map.clearOverlays();//清空地图覆盖物
                this.clearOver();
                let zoom = map.getZoom();
                var self = this;
                var entType = self.search.entType;
                var typeId = self.typeId;
                //alert("当前地图层级为:"+zoom+"级");
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                var sw = bssw.lng + "," + bssw.lat;
                var ne = bsne.lng + "," + bsne.lat;
                if (zoom >= 1 && zoom <= 12 && self.level != 3) {
                    if (zoom <= 11) {// 区县
                        if(self.typeSelected === 'qiye'){
                            self.getRegionCountData('', '', 3, sw, ne, entType, self.search.regionCode);
                        }
                        if(self.typeSelected === 'shuju'){
                            self.getAnnualReportStatisticsTotal(self.search.regionCode,typeId);
                        }
                    } else if (zoom > 11 && zoom <= 12) {
                        if(self.typeSelected === 'qiye'){
                            self.getEntMaps('', '', sw, ne, entType, self.search.regionCode);
                        }
                        if(self.typeSelected === 'shuju'){
                            self.getAnnualReportStatisticsTotalWithRegion(self.search.regionCode);
                        }
                    }
                } else {
                    //console.log("层级大于12级,不再刷新数据");
                    if(self.typeSelected === 'qiye'){
                        self.getEntMaps('', '', self.initBssw, self.initBsne, entType, self.search.regionCode);
                    }
                    if(self.typeSelected === 'shuju'){
                        self.getAnnualReportStatisticsTotalWithRegion(self.search.regionCode);
                    }
                }
            },
            getEntMaps(regionCode, regionName, bssw, bsne, entType, userRegionCode) {
                // map.clearOverlays();//清空地图覆盖物
                this.clearOver();
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getEntMaps', {
                    params: {
                        "qxCode": regionCode,// 行政区域code
                        "czCode": '',// 无用
                        "entType": entType, // 企业类型
                        "bssw": bssw,// 可视区域西南角经纬度
                        "bsne": bsne, // 可视区域东北角经纬度
                        "userRegionCode": userRegionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
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
            /**统计可视化范围内行政区域单位数量统计信息**/
            getRegionCountData(parentRegionCode, thisRegionCode, level, bssw, bsne, entType, userRegionCode){
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getRegionCountData', {
                    params: {
                        "level": level,// 行政区域等级
                        "parentRegionCode": parentRegionCode,// 父级点位code
                        "thisRegionCode": thisRegionCode,// 当前
                        "entType": entType, // 企业类型
                        "bssw": bssw,// 可视区域西南角经纬度
                        "bsne": bsne, // 可视区域东北角经纬度
                        "userRegionCode": userRegionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.dataList = res.data;
                            _this.addRegionMarker(res.data);//向地图中添加统计点
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getRegionEnterpriseData(parentRegionCode, thisRegionCode, level, bssw, bsne, entType, userRegionCode){
                var _this = this;
                _this.$axios.get('/api/regulatory/index/getRegionCountData', {
                    params: {
                        "level": level,// 行政区域等级
                        "parentRegionCode": parentRegionCode,// 父级点位code
                        "thisRegionCode": thisRegionCode,// 当前
                        "entType": entType, // 企业类型
                        "bssw": bssw,// 可视区域西南角经纬度
                        "bsne": bsne, // 可视区域东北角经纬度
                        "userRegionCode": userRegionCode
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            _this.dataList = res.data;
                            _this.addRegionMarker(res.data);//向地图中添加统计点
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },

            /**添加企业点位覆盖物**/
            // 点击进入的页面
            addEntMaker(dataList){
                if(this.typeSelected === 'qiye'){
                    var mycfIcon = new BMap.Icon(this.cfAbnormalImgUrlPath, new BMap.Size(30, 50))
                    var myczIcon = new BMap.Icon(this.czImgUrlPath, new BMap.Size(30, 50));
                    var mysjIcon = new BMap.Icon(this.sjImgUrlPath, new BMap.Size(30, 50));
                    for (var i = 0; i < dataList.length; i++) {//遍历
                        // 过滤0数据
                        var infoA = dataList[i].lng;
                        var infoB = dataList[i].lat;
                        // 添加区域信息点位
                        var entInfoMaker = null;
                        var entInfoPoint = new BMap.Point(infoA, infoB);
                        if (dataList[i].entKind == 1) {
                            entInfoMaker = new BMap.Marker(entInfoPoint, {icon: mycfIcon});  // 创建标注
                        } else if (dataList[i].entKind == 2) {
                            entInfoMaker = new BMap.Marker(entInfoPoint, {icon: myczIcon});  // 创建标注
                        } else if (dataList[i].entKind == 3) {
                            entInfoMaker = new BMap.Marker(entInfoPoint, {icon: mysjIcon});  // 创建标注
                        }
                        var zlabelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' + JSON.stringify(dataList[i]).replace(/\"/g, "'") + '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' + dataList[i].name + '"><div class="title-text"><i class="ico">重</i>' + dataList[i].name + '</div></a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
                        var labelContext = '<div role="tooltip" id="el-popover-7937" aria-hidden="false" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 320px; transform-origin: center bottom; z-index: 2025; position: absolute; top: -15px; left: 24px;" x-placement="top-start"><a href="javascript:;" onclick=entClickInfo("' + JSON.stringify(dataList[i]).replace(/\"/g, "'") + '"); class="title-box" data-toggle="tooltip" data-placement="top" title="' + dataList[i].name + '"><div class="title-text">' + dataList[i].name + '</div>   </a><div x-arrow="" class="popper__arrow" style="left: 83px;"></div></div>';
                        var label = '';
                        if (dataList[i].entType == "1") {
                            label = new BMap.Label(zlabelContext, {
                                offset: new BMap.Size(-99, -50)
                            });
                        } else if (dataList[i].entType == "2") {
                            label = new BMap.Label(labelContext, {
                                offset: new BMap.Size(-99, -50)
                            });
                        }
                        label.setStyle({
                            background: 'none', color: '#red', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                        });
                        entInfoMaker.setLabel(label);// 给点位添加文本
                        var _this = this;
                        // 全局,待优化
                        window.entClickInfo = function (item) {
                            var entInfo = JSON.parse(item.replace(/'/g, '"'));
                            _this.entInfoLook(entInfo);
                        }
                        label.hide()
                        entInfoMaker.addEventListener("mouseover", function () {
                            var entInfoMakerLabel = this.getLabel();
                            entInfoMakerLabel.show()
                        });
                        entInfoMaker.addEventListener("mouseout", function (e) {
                            var entInfoMakerLabel = this.getLabel();
                            entInfoMakerLabel.hide()
                        });
                        map.addOverlay(entInfoMaker);// 添加点
                        entInfoMaker.imei = "entInfoMaker";
                        this.entMakerClickHandler(entInfoMaker, dataList[i]);// 添加点击事件
                    }
                }
                if(this.typeSelected === 'shuju') {
                    dataList.map(item => {
                        const {lng, lat, entName, total, id} = item
                        let width = ''
                        let height = '50'
                        let myIcon = new BMap.Icon("../../../../static/css/images/map/barbg.png", new BMap.Size(20, height));
                        var regionInfoMaker = new BMap.Marker(new BMap.Point(lng, lat), {icon: myIcon});  // 创建标注
//                        this.getRegionBoundary(regionName)
                        let labelContext = `
                                <div class="map-sign level-03" style="">
                                    <div class="map-sign-bar" style="height: 30px;">
                                        <div class="map-sign-num">${total}kg</div>
                                        <div class="map-sign-text">${entName}</div>
                                    </div>
                                </div>
                            `
                        var label = new BMap.Label(labelContext, {
                            offset: new BMap.Size(1, 50)
                        });
                        label.setStyle({
                            background: 'none', color: '#333', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                        });
                        regionInfoMaker.setLabel(label);// 给点位添加文本
                        // 鼠标经过时
                        regionInfoMaker.addEventListener("mouseover", function (e) {
                            this.setTop(true);
                        });
                        // 鼠标离开时
                        regionInfoMaker.addEventListener("mouseout", function (e) {
                            this.setTop(false);
                        });
                        map.addOverlay(regionInfoMaker);// 添加点
                        regionInfoMaker.imei = "regionInfoMaker";
                        this.entMakerClickHandlerShuJu(regionInfoMaker, item.id);// 添加点击事件

                    })
                }
            },
            entMakerClickHandler(entInfoMaker, entInfo){
                $(".map-right").fadeOut();
                $(".EnterpriseMain").fadeOut()
                var _this = this;
                entInfoMaker.addEventListener("click", function (e) {
                    _this.entInfoLook(entInfo);
                })
            },
            //数据界面点击企业，展示详情
            entMakerClickHandlerShuJu(entInfoMaker, entId){
                var _this = this;
                entInfoMaker.addEventListener("click", function (e) {
                    _this.getTEnterpriseHazardousStatisticsWithType(entId);
                })
            },
            //点击详情页面的点
            entInfoLook(entInfo){
                var _this = this;
                _this.registeredAddress = '';
                // 查询企业详情
                _this.$axios.get('/api/regulatory/index/getEntMapInfo', {
                    params: {
                        "entId": entInfo.entId,
                        "outInStackLimit": _this.outInStackLimit
                    }
                }).then((res)=> {
                        if (res.code == 0) {
                            $(".map-right").fadeIn();
                            let data = 89;
                            this.yuanData = data;
                            var myChart = echarts.init(document.getElementById('dataTop'))
                            if(res.data.entKind == 1){
                                var color1 = '#56B2E9'
                                var color2 = '#2198E2'
                                var color3 = '#2198E2'
                            }if(res.data.entKind == 2){
                                var color1 = '#46C96F'
                                var color2 = '#46C96F'
                                var color3 = '#46C96F'
                            }if(res.data.entKind == 3){
                                var color1 = '#FFF6D5'
                                var color2 = '#F7B500'
                                var color3 = '#F7B500'
                            }
                            // console.log(color1)
                            let option = {
                                grid: [
                                    {x: '0%', y: '20%', width: '100%', height: '90%'}
                                ],
                                series: [
                                    {
                                        name: '外部刻度',
                                        type: 'gauge',
                                        center: ['50%', '50%'],
                                        radius: '70%',
                                        min: 0, //最小刻度
                                        max: 100, //最大刻度
                                        splitNumber: 10, //刻度数量
                                        startAngle: 225,
                                        endAngle: -45,
                                        axisLine: {
                                            show: true,
                                            lineStyle: {
                                                color: [
                                                    [ 100 / 100,
                                                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                                        {
                                                            offset: 0,
                                                            color: color1 // 0% 处的颜色
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: color2 // 100% 处的颜色
                                                        }
                                                        ])
                                                    ], [1, "none"]
                                                ],
                                                width: 1
                                            }
                                        },
                                        //仪表盘轴线
                                        axisLabel: {
                                            show: false,
                                        }, //刻度标签。
                                        axisTick: {
                                            show: true,
                                            splitNumber: 5,
                                            lineStyle: {
                                                color: color3, //用颜色渐变函数不起作用
                                                width: 1,
                                            },
                                            length: -8
                                        }, //刻度样式
                                        splitLine: {
                                            show: true,
                                            length: -13,
                                            splitNumber: 2,
                                            lineStyle: {
                                                color: color3, //用颜色渐变函数不起作用
                                            }
                                        }, //分隔线样式
                                        detail: {
                                            show: false
                                        },
                                        pointer: {
                                            show: false
                                        }
                                    },
                                    {
                                        name: "内部进度条",
                                        type: "gauge",
                                        center: ['50%', '50%'],
                                        radius: '90%',
                                        splitNumber: 0, //刻度数量
                                        startAngle: 225,
                                        endAngle: -50,
                                        axisLine: {
                                            lineStyle: {
                                                color: [
                                                    [ data / 100,
                                                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                                        {
                                                            offset: 0,
                                                            color: color1 // 0% 处的颜色
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: color2 // 100% 处的颜色
                                                        }
                                                    ])
                                                    ], [1, "none"]
                                                ],
                                                shadowBlur: 5,
                                                shadowColor: color3,
                                                width: 10
                                            }
                                        },
                                        axisLabel: {
                                            show: false,
                                        },
                                        axisTick: {
                                            show: false,

                                        },
                                        splitLine: {
                                            show: false,
                                        },

                                        pointer: {
                                            show: false,
                                        },
                                    },
                                ]
                            }
                            myChart.setOption(option)

                            // if (res.data.entKind == 1) {

                            //     // $("#entInfo_jy").fadeOut();
                            //     // $("#entInfo_sj").fadeOut();
                            //     // $("#entInfo_wf").fadeIn();
                            //     // this.backColor = 'red'
                            //     console.log("产费企业")
                            // }
                            // if (res.data.entKind == 2) {
                            //     $("#entInfo_wf").fadeOut();
                            //     $("#entInfo_sj").fadeOut();
                            //     $("#entInfo_jy").fadeIn();
                            //     console.log(res.data)
                            //     // this.color = 'bule'
                            // }
                            // if (res.data.entKind == 3) {
                            //     $("#entInfo_wf").fadeOut();
                            //     $("#entInfo_jy").fadeOut();
                            //     $("#entInfo_sj").fadeIn();
                            //     console.log("3")
                            //     // this.colo
                            // }
                            _this.entMapInfo = res.data;
                            _this.registeredAddress = res.data.registeredAddress.length > 12 ? res.data.registeredAddress.substring(0, 12) + "..." : res.data.registeredAddress;
                            if (res.data && res.data.realTimeStockVo) {
                                _this.containeGroupVoList = res.data.realTimeStockVo.containeGroupVoList;
                                _this.stockScale = res.data.realTimeStockVo.stockScale;
                                _this.groupStorageCurrentSum = res.data.realTimeStockVo.currentStockNum;
                            }
                        }
                        _this.entMapInfo = res.data;
                        _this.registeredAddress = res.data.registeredAddress.length > 12 ? res.data.registeredAddress.substring(0, 12) + "..." : res.data.registeredAddress;
                        if (res.data && res.data.realTimeStockVo) {
                            _this.containeGroupVoList = res.data.realTimeStockVo.containeGroupVoList;
                            _this.stockScale = res.data.realTimeStockVo.stockScale;
                            _this.groupStorageCurrentSum = res.data.realTimeStockVo.currentStockNum;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            /**添加区域统计信息展示面板覆盖物**/
            //页面初始化显示
            addRegionMarker(dataList){
                var _this = this
                $(".EnterpriseMain").fadeIn();
                if(_this.typeSelected === 'qiye'){
                    for (var i = 0; i < dataList.length; i++) {//遍历
                        if (dataList[i].list.length != 0) {
                            // 过滤0数据
                            var infoA = dataList[i].lng;
                            var infoB = dataList[i].lat;
                            var code = dataList[i].regionCode;
                            var entCount = dataList[i].list;
                            var myIcon = '';
                            if (entCount.length == 1) {
                                myIcon = new BMap.Icon("../../../../static/css/images/map/whiteBg@2x.png", new BMap.Size(135, 97));
                            }
                            if (entCount.length == 2) {
                                myIcon = new BMap.Icon("../../../../static/css/images/map/whiteBg3@2x (1).png", new BMap.Size(135, 130));
                            }
                            if (entCount.length == 3) {
                                myIcon = new BMap.Icon("../../../../static/css/images/map/whiteBg3@2x.png", new BMap.Size(135, 165));
                            }
                            // 添加区域信息点位
                            var regionInfoMaker = new BMap.Marker(new BMap.Point(infoA, infoB), {icon: myIcon});  // 创建标注
                            // _this.getRegionBoundary(_this.regionName+dataList[i].regionName);
                            var labelContext = ''
                            // if(entCount !=null && entCount.length>0){
                            var str = ''
                            for (var j = 0; j < entCount.length; j++) {
                                str += entCount[j].entKind + ':&nbsp;&nbsp;' + entCount[j].count + '家</br>'
                            }
                            labelContext = '<div><em style=" display:block; padding-top:2px;padding-left:17px;margin:-3px auto;font-size:20px;line-height:32px;position: absolute;">' + str + '</em><div style="position: absolute;top:-66px;display: block;padding-left: 6px;padding-top: 5px;padding-right: 8px;height: 50px;width:135px;border: 2px solid #cf9236;margin-top: 16px;margin-left: -2px;font-size: 25px;border-radius: 5px;background-color: #ffb700;color: #fff;text-align:center ">' + dataList[i].regionName + '</div></div>';
                            var label = new BMap.Label(labelContext, {
                                offset: new BMap.Size(1, 50)
                            });
                            label.setStyle({
                                background: 'none', color: '#red', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                            });
                            regionInfoMaker.setLabel(label);// 给点位添加文本
                            // 鼠标经过时
                            regionInfoMaker.addEventListener("mouseover", function (e) {
                                this.setTop(true);
                            });
                            // 鼠标离开时
                            regionInfoMaker.addEventListener("mouseout", function (e) {
                                this.setTop(false);
                            });
                            regionInfoMaker.imei = "regionInfoMaker";
                            map.addOverlay(regionInfoMaker);// 添加点
                            regionInfoMaker.imei = "regionInfoMaker";
                            _this.regionCodeMakerClickHandler(regionInfoMaker, dataList[i]);// 添加点击事件
                        }
                    }
                    // _this.getBoundary();
                }
                if(_this.typeSelected === 'shuju'){
                  // map.clearOverlays();//清空地图覆盖物
                    _this.clearOver();
                    var list = _this.enterpriseAndData.enterprise.data;
                    // console.log(list.length)
                    if(list.length ===1){
                        _this.search.regionName = "";
                    }
                    dataList.map(item =>{
                        const {lng, lat, regionName, total} = item
                        for(let i=0;i<list.length;i++){
                            if(list[i].regionName==regionName){
                                let width = ''
                                let height = '50'
                                let myIcon = new BMap.Icon("../../../../static/css/images/map/barbg.png", new BMap.Size(20, height));
                                var regionInfoMaker = new BMap.Marker(new BMap.Point(list[i].lng, list[i].lat),{icon: myIcon});  // 创建标注
                                let labelContext = `
                                <div class="map-sign level-02" style="">
                                    <div class="map-sign-bar" style="height: 50px;">
                                        <div class="map-sign-num">${list[i].total}kg</div>
                                        <div class="map-sign-text">${list[i].regionName}</div>
                                    </div>
                                </div>
                            `

                                var label = new BMap.Label(labelContext, {
                                    offset: new BMap.Size(1, 50)
                                });
                                label.setStyle({
                                    background: 'none', color: '#333', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
                                });
                                regionInfoMaker.setLabel(label);// 给点位添加文本
                                // 鼠标经过时
                                regionInfoMaker.addEventListener("mouseover", function (e) {
                                    this.setTop(true);
                                });
                                // 鼠标离开时
                                regionInfoMaker.addEventListener("mouseout", function (e) {
                                    this.setTop(false);
                                });
                                map.addOverlay(regionInfoMaker);// 添加点
                                regionInfoMaker.imei = "regionInfoMaker";
                                _this.regionCodeMakerClickHandler(regionInfoMaker, list[i]);// 添加点击事件
                            }
                        }
                        // _this.getRegionBoundary(_this.regionName+regionName)
                    })
                }

            },
            // 初始化显示的白色部分显示的具体内容
            regionCodeMakerClickHandler(regionInfoMaker, regionInfo){
                var self = this;
                var entType = self.search.entType;
                regionInfoMaker.addEventListener("click", function (e) {
                    self.level = 3;
                    // 查询当前点位下级点位 省查市
                    // map.clearOverlays();//清空地图覆盖物
                    self.clearOver();
                    // 设置可视区域
                    var bs = map.getBounds();   //获取可视区域
                    var bssw = bs.getSouthWest();   //可视区域左下角
                    var bsne = bs.getNorthEast();   //可视区域右上角
                    var sw = bssw.lng + "," + bssw.lat;
                    var ne = bsne.lng + "," + bsne.lat;
                    var thisLevel = regionInfo.level;
                    if (thisLevel == 2 || thisLevel == 1) {// 市
                        // 查询该市下区县
                        map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 9);
                        if(this.typeSelected === 'qiye'){
                            self.getRegionCountData(regionInfo.regionCode, '', 3, sw, ne, entType, self.search.regionCode);

                        }else {
                            self.getAnnualReportStatisticsTotalWithRegion(regionInfo.regionCode);
                        }
                    } else if (thisLevel == 3) {// 区县
                        // 查询企业点位数据
                        map.centerAndZoom(new BMap.Point(regionInfo.lng, regionInfo.lat), 13);
//                        console.log("显示")
                        if(self.typeSelected === 'qiye'){
                            self.getIndexMaps(regionInfo.regionCode, entType);
                        }
                        if(self.typeSelected === 'shuju'){
                            $(".EnterpriseMain").fadeOut();
                            self.getAnnualReportStatisticsTotalWithRegion(regionInfo.regionCode);
                        }

                    }
                })
            },
            /**查询指定区域公司点位**/
            //点击页面具体的显示一个页面的小点
            getIndexMaps(regionCode, entType) {
                // map.clearOverlays();//清空地图覆盖物
                var _this = this;
                _this.clearOver();
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
            getAnnualReportStatisticsTotalWithRegion(regionCode) {
                // map.clearOverlays();//清空地图覆盖物
                var _this = this;
                _this.clearOver();
                _this.$axios.get('/api/regulatory/AnnualReportStatistics/getAnnualReportStatisticsTotalWithRegion', {
                    params: {
                        "regionCode": regionCode,
                        "typeId": _this.typeId
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

            searchRegionChange(){
                let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
//                console.log(regionInfo)
                if (regionInfo.length > 0) {
                    this.search.regionName = regionInfo[0].label;
                    this.search.regionLevel = regionInfo[0].level + 1;
                    this.search.regionCode = regionInfo[0].value;
                    this.regionCode = regionInfo[0].value;
                    let parentRegionInfo = regionInfo[0].parent;
                    if (parentRegionInfo != null) {
                        this.search.regionParentCode = parentRegionInfo.value;
                    } else {
                        this.search.regionName = this.regionName;
                        this.search.regionLevel = this.regionLevel;
                        this.search.regionCode = this.regionCode;
                        this.regionCode = this.regionCode;
                        this.search.regionParentCode = this.parentCode;
                    }
                } else {
                    this.search.regionName = this.regionName;
                    this.search.regionLevel = this.regionLevel;
                    this.search.regionCode = this.regionCode;
                    this.search.regionParentCode = this.parentCode;
                }
                customOverlay.queryDistrict(this,this.AppConfig.appInfo.regionName+this.search.regionName);
                // console.log(this.search.regionCode+"<<<当前省/市/区")
                this.searchMap();
            },
            /**查询当前登录用户信息**/
            selectRegionInfoByUser(){
                var _this = this;
                var userId = sessionStorage.getItem('userId');
                _this.$axios.get('/api/regulatory/index/selectRegionInfoByUser/' + userId).then(
                    function (res) {
                        if (res.code == 0) {
                            if (res.data != null) {
                                _this.lng = res.data.lng;
                                _this.lat = res.data.lat;
                                _this.search.regionName = res.data.regionName;
                                if (res.data.regionLevel = 3) {
                                    _this.centerLevel = 13;
                                } else if (res.data.regionLevel = 2) {
                                    _this.centerLevel = 8;
                                }
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
            },
            /**查询所在地集**/
            getRegionChildrenList(){
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
        },
        created(){
            this.proportionOfOutPutStatistics();
            this.getAnnualReportStatisticsTotal();
            this.getAllHazardousWasteType();
        },
        mounted(){
            if (this.search.regionLevel == 3) {
                this.isDisabled = true;
            }
            // 行政区域级联
            this.getRegionChildrenList();
            // 查询当前用户区域信息
            this.selectRegionInfoByUser();
        },
        watch: {
            typeSelected: function(){
                this.selectRegionInfoByUser();
                this.getRegionChildrenList();
            }
        }
    }
</script>

<style>
    @import url('wfMap.css');
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
