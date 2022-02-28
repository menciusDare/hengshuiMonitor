<template>
    <!-- 内容区域 -->
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd">
                <div>
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <RegionList @RegionChange="regionChange"></RegionList>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <!--<el-select v-model="search.entType" clearable>
                                        <el-option
                                                v-for="item in entTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>-->
                                    <el-select v-model="search.entKind" clearable>
                                        <el-option
                                                v-for="item in entKindOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">备案年份：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-date-picker
                                                    style="width:130px"
                                                    :clearable="false"
                                                    v-model="search.reportYear"
                                                    :picker-options="pickerOptions"
                                                    type="year"
                                                    value-format="yyyy"
                                                    placeholder="选择年">
                                    </el-date-picker>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">备案状态：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.reportStatus"  clearable>
                                        <el-option
                                                v-for="item in reportStatusOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span><el-input type="text" autocomplete="off" placeholder="搜索企业名称" v-model.trim="search.entName"
                                ></el-input>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                              <!--  <button type="button" @click="searchEntManagementPlanReport" class="button-type">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="searchEntManagementPlanReport" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="total-number" style="margin-left: 3px;">
                    <!-- <div class="total-name">所有企业{{count.all}}家</div> -->
                    <div class="total-text ">已备案企业<span class="num" style="color:green">{{count.one}}</span>家</div>
                    <div class="total-text is-offline">未备案企业<span class="num" style="color:red">{{count.two}}</span>家</div>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 14%">企业名称</th>
                        <th style="text-align:center;width: 10%">企业类型</th>
                        <th style="text-align:center;width: 10%">所在地</th>
                        <th style="text-align:center;width: 10%">所属行业</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 10%">电话</th>
                        <th style="text-align:center;width: 10%">备案状态</th>
                        <th style="text-align:center;width: 10%">备案时间</th>
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.entName">
                            {{item.entName}}
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entKind">{{item.entKind}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.regionName">{{item.regionName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.categoryName">{{item.categoryName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contacts">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div v-if="item.filingTime" class="text-state">已备案</div>
                            <div v-else class="text-state state-off">未备案</div>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.filingTime">
                            <div v-if="item.filingTime" > {{item.filingTime}}</div>
                            <div v-else >--</div>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%">
                            <div class="btn-opreate">
                                <a v-if="item.filingTime" @click="lookEntPeportPlanInfo(item.entId,item.filingTime,item.entName)" href="javascript:;" class="text-primary text-underline">查看</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  条，每页显示</span>
                    <span class="el-pagination__total">
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="cur_page"
                                                    :page-sizes="pageSizes"
                                                    :page-size="pageSize"
                                                    layout="sizes, prev, pager, next"
                                                    :total="total">
                    </el-pagination>
                    </span>

                    <span class="el-pagination__total">共 {{totalPage}} 页</span>
                </div>
            </div>
        </div>
        <el-dialog
                :title="entName"
                :modal="true"
                :modal-append-to-body="false"
                :visible.sync="dialogVisible"
                top="9vh"
                width="1000px"
                height="50%">
            <div style="margin-top: -10px">
                <div style="height: 170px; display: flex;justify-content: space-between;">
                    <div style="width:50%; border-right: 1px solid #d2d2d2;padding-right: 30px;box-sizing: border-box;">
                        <div style="width:100%;float: left">
                            <div style="float: left;    padding-top: 15px;">
                                <img src="../../../../static/css/images/pic/logo02.png">
                            </div>
                            <div style="float: left;padding-top: 28px;width: 288px;font-size: large;color: black;">{{managementPlanFilingEntInfo.name}}</div>
                            <div style="float: right;padding-top: 28px;">
                                <span style="padding-top: 8px;padding-bottom: 8px;padding-left: 10px;padding-right: 10px;background: #d8dce4;border-radius: 5px;color: black;">
                                    <span v-if="managementPlanFilingEntInfo.entKind==1">产废企业</span>
                                    <span v-if="managementPlanFilingEntInfo.entKind==2">处置企业</span>
                                </span>
                            </div>
                        </div>
                        <div style="width:100%;float: left;padding-left: 35px;">
                            <div style="color: #222">
                                <span style="font: unset;">法人:
                                    {{managementPlanFilingEntInfo.legal}}
                                </span>
                                <span style="padding-left: 15px;font: unset;">邮政编码:{{managementPlanFilingEntInfo.postCode}}</span>
                            </div>
                            <div style="padding-top: 10px;color: #222">
                                <span style="font: unset;">{{managementPlanFilingEntInfo.numOfEmps}}人以上</span>
                                <span  style="padding-left: 15px;font: unset;">信用代码: {{managementPlanFilingEntInfo.creditCode}} </span>
                                <span  style="padding-left: 15px;font: unset;">行业类别: {{managementPlanFilingEntInfo.categoryName}} </span>
                            </div>
                            <div style="padding-top: 2px;color: #222">
                                <span style="font: unset;">地址: {{managementPlanFilingEntInfo.registeredAddress}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="width:50%; padding-left: 30px;box-sizing: border-box;">
                        <div style="width:100%;float: left">
                            <div style="padding-top: 28px;color: #222">
                                <span style="font-size: larger">联系人: {{managementPlanFilingEntInfo.contacts}}</span>
                                <span style="float:right;padding-right: 50px;"> 状态
                                            <span style="padding-top: 8px;padding-bottom: 8px;padding-left: 10px;padding-right: 10px;">
                                                <div v-if="managementPlanFilingEntInfo.filingTime" class="text-state">已备案</div>
                                                <div v-else class="text-state state-off">未备案</div>
                                            </span>
                                        </span>
                            </div>
                            <div style="padding-top: 17px;font-size: larger;color: #222">电话: {{managementPlanFilingEntInfo.contactsPhone}}</div>
                            <div style="padding-top: 17px;font-size: larger;color: #222">邮箱: {{managementPlanFilingEntInfo.mailBox}}</div>
                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <div style="height: 350px">
                    <div style="padding-left: 34px;font-size: large;color: black;">
                        <span style="padding-right: 3px">|</span>废物详情
                    </div>
                    <div style="padding-top: 25px;">
                        <div style="border: 1px solid #c0c4cc;width:250px;height:80px;float: left;margin-left: 42px;padding: 16px;">
                            <div>
                                <font style="font-size: large;color:black" v-if="managementPlanFilingEntInfo.eroductionScale"> {{managementPlanFilingEntInfo.eroductionScale}}</font>
                                <font style="font-size: large;color:black" v-else>
                                    --
                                </font>
                            </div>
                            <div style="padding-top: 1px;padding-bottom: 1px;"></div>
                            <div>危险废物生产规模及数量</div>
                        </div>
                        <div style="border: 1px solid #c0c4cc;width:250px;height:80px;float: left;margin-left: 42px;padding: 16px;">
                            <div>
                                <font style="font-size: large;color:black" v-if="managementPlanFilingEntInfo.entrustedScale"> {{managementPlanFilingEntInfo.entrustedScale}}</font>
                                <font style="font-size: large;color:black" v-else>
                                    --
                                </font>
                            </div>
                            <div style="padding-top: 1px;padding-bottom: 1px;"></div>
                            <div>计划委托利用/处置危险废物数量</div>
                        </div>
                        <div style="border: 1px solid #c0c4cc;width:250px;height:80px;float: left;margin-left: 42px;padding: 16px;">
                            <div>
                                <font style="font-size: large;color:black" v-if="managementPlanFilingEntInfo.voluntarilyScale">
                                    {{managementPlanFilingEntInfo.voluntarilyScale}}
                                </font>
                                <font style="font-size: large;color:black" v-else>
                                    --
                                </font>
                            </div>
                            <div style="padding-top: 1px;padding-bottom: 1px;"></div>
                            <div>计划自行利用/处置危险废物数量</div>
                        </div>
                    </div>
                    <div style="padding-top: 110px;">
                        <div style="height: 180px;overflow: auto;padding-left: 41px;padding-right: 83px;">
                            <table class="table-default" style=" color: #222;">
                                <thead>
                                <tr>
                                    <th style="text-align:center;width: 6%">序号</th>
                                    <th style="text-align:center;width: 40%">危险废物名称</th>
                                    <th style="text-align:center;width: 40%">危废类别</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in entHazardousInfoList">
                                    <td style="text-align:center;">{{(cur_page-1)*pageSize+index+1}}</td>
                                    <td style="text-align:center;">
                                        <!--<a href="javascript:;" class="text-second text-underline">-->
                                        {{item.value}}
                                        <!--</a>-->
                                    </td>
                                    <td style="text-align:center;">{{item.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    import RegionList from '../../../components/common/unit/RegionList.vue'
    export default {
        name: "entManagementPlanReport",
        components: {
            RegionList,
            BreadcrumbComponent
        },
        data(){
            return {
                routePath: this.$route.path,
                pickerOptions: {
                    disabledDate(time) {
                        // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
                        // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
                        return time.getTime() > Date.now();
                    }
                },
                isDisabled:false,
                entName:'',
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                regionCode: sessionStorage.getItem('regionCode'),
                regionLevel:this.AppConfig.appInfo.regionLevel,
                parentCode:this.AppConfig.appInfo.parentCode,
                regionName:this.AppConfig.appInfo.regionName,
                entKindOptions:[
                    {
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
                    },
                    // {
                    //     value: 4,
                    //     label: "运输企业",
                    // },
                ],
                entTypeOptions: [{
                    value: '',
                    label: '全部企业'
                }, {
                    value: '1',
                    label: '重点企业'
                }, {
                    value: '2',
                    label: '一般企业'
                }/*,{value: 3,label: "收集企业"},
                    {value: 4,label: "经营企业"}*/],
                reportStatusOptions:[{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '已备案'
                }, {
                    value: '2',
                    label: '未备案'
                }],
                search:{
                    regionCode:sessionStorage.getItem('regionCode'),
                    entType:'',
                    entKind:'',
                    standardSituation:'',
                    entName:'',
                    regionName :this.AppConfig.appInfo.regionName,
                    regionLevel:sessionStorage.getItem('regionLevel'),
                    regionParentCode:'',
                    reportStatus:'',
                    reportYear:new Date().format("yyyy")
                },
                dataList:[],
                count:{
                    all: 0,
                    one: 0,
                    two: 0,
                    three: 0
                },
                regionOptions:[],
                managementPlanFilingEntInfo:'',
                entHazardousInfoList:[]
            }
        },
        created: function () {
            if(this.search.regionLevel==3){
                this.isDisabled = true;
            }
            this.searchEntManagementPlanReport();
            // 行政区域级联
            this.getRegionChildrenList();
        },
        methods:{
            regionChange(value) {
                this.regionCode = value
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
                this.pageList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.pageList();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            initCountData(){
                this.count.all=0;
                this.count.one=0;
                this.count.two=0;
                this.count.three=0;
            },
            setCountData(reportStatus){
                if(reportStatus==1){
                    this.count.two=0;
                }else if(reportStatus==2){
                    this.count.one=0;
                }
            },
            getRegionChildrenList(){
                var _this=this;
                _this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList',{params:{
                        "regionCode":sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode')
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.regionOptions = res.data;
                          _this.regionCode = [res.data[0].value+''];
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            searchEntManagementPlanReport(){
                var _this = this;
                var region = sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode');
                if(null!=_this.regionCode&&_this.regionCode.length>0){
                  region =_this.regionCode[_this.regionCode.length-1]
                }
              _this.search.regionCode = region;
              _this.initCountData();
              _this.cur_page = 1;
              _this.selectManagementPlanFilingCountEnt();
              _this.pageList();
            },
            selectManagementPlanFilingCountEnt(){
                var _this=this;
                let baYear = '';
                if(_this.search.reportYear!="" && _this.search.reportYear!=null){
                    baYear = _this.search.reportYear;
                }
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.regionCode);
                params.append('entType', _this.search.entType);
                params.append('entKind',_this.search.entKind);
                params.append('baYear', baYear);
                params.append('applyStatus', _this.search.reportStatus);
                params.append('entName', _this.search.entName);
                _this.$axios.get('/api/regulatory/index/selectManagementPlanFilingCountEnt',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            let data = res.data;
                            _this.count.all = data.all;
                            _this.count.one = data.one;
                            _this.count.two = data.two;
                            _this.count.three = data.three;
                            _this.setCountData(_this.search.reportStatus);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                let baYear = '';
                if(_this.search.reportYear!="" && _this.search.reportYear!=null){
                    baYear = _this.search.reportYear;
                }
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.regionCode);
                params.append('entType', _this.search.entType);
                params.append('entKind',_this.search.entKind);
                params.append('baYear', baYear);
                params.append('applyStatus', _this.search.reportStatus);
                params.append('entName', _this.search.entName);
                _this.$axios.get('/api/regulatory/index/selectManagementPlanFilingCountEntPage',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data.records;
                            _this.totalPage = res.data.pages;
                            _this.total = res.data.total;
                            _this.count.all = res.data.total;
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
                    this.search.regionLevel= regionInfo[0].level+1;
                    this.search.regionCode = regionInfo[0].value;
                    let parentRegionInfo = regionInfo[0].parent;
                    if(parentRegionInfo!=null){
                        this.search.regionParentCode = parentRegionInfo.value;
                    }else{
                        this.search.regionName = this.regionName;
                        this.search.regionLevel= this.regionLevel;
                        this.search.regionCode = this.regionCode;
                        this.search.regionParentCode = this.parentCode;
                    }
                }else{
                    this.search.regionName = this.regionName;
                    this.search.regionLevel= this.regionLevel;
                    this.search.regionCode = this.regionCode;
                    this.search.regionParentCode = this.parentCode;
                }
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            },
            selectManagementPlanFilingEntInfo(entId,year){
                var _this=this;
                var url = '';
                if(year!=null){
                    url = '/api/regulatory/index/selectManagementPlanFilingEntInfo/'+entId+"/"+year;
                }else{
                    url = '/api/regulatory/index/selectManagementPlanFilingEntInfo/'+entId;
                }
                _this.$axios.get(url).then(
                    function (res) {
                        if(res.code == 0){
                            _this.managementPlanFilingEntInfo = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            selectEntHazardousInfo(entId,year){
                var _this=this;
                _this.$axios.get('/api/regulatory/index/selectEntHazardousInfo/'+entId+"/"+year).then(
                    function (res) {
                        if(res.code == 0){
                            _this.entHazardousInfoList = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            lookEntPeportPlanInfo(entId,filingTime,entName){
                this.managementPlanFilingEntInfo = "";
                this.entHazardousInfoList=[];
                this.entName = entName;
                var year = null;
                if(filingTime!=null){
                    year = parseInt(filingTime.substring(0,4));
                    this.selectEntHazardousInfo(entId,year);
                }
                this.selectManagementPlanFilingEntInfo(entId,year);
                this.dialogVisible = true;
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
    .filter-more {
        padding: 20px 0px 0 20px;
    }

    .dabiao{
        width: 70px;height: 20px;background: #5daf34;text-align: center;;
    }
    .jbdabiao{
        width: 70px;height: 20px;background: #f3d9b3;text-align: center;
    }
    .budabiao{
        width: 70px;height: 20px;background: #f56c6c;text-align: center;;
    }

</style>
