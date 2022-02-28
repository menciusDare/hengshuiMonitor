<template>
    <!-- 主体 -->
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd">
                <!-- 收起后样式名.filter-more-mini -->
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
                                    <el-select v-model="search.entKind"  clearable>
                                        <el-option
                                                v-for="item in entKinds"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">贮存状态：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.storageStatusStr"  clearable>
                                        <el-option
                                                v-for="item in storageStatusStrOptions"
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
                                <!--<button type="button" @click="searchEntEarlyWarn" class="button-type">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="searchEntEarlyWarn" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="total-number" style="margin-left: 3px;">
                    <!-- <div class="total-name">
                        全部企业
                        <span class="num">{{count.all}}</span>家
                    </div> -->
                    <div class="total-text">
                        正常企业
                        <span class="num" style="color:green">{{count.one}}</span>家
                    </div>
                    <div class="total-text is-offline">
                        储量预警企业
                        <span class="num" style="color:red">{{count.two}}</span>家
                    </div>
                    <div class="total-text is-offline">
                        有超期企业
                        <span class="num" style="color:red">{{count.three}}</span>家
                    </div>
                </div>
                <table class="table-default table-full">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 10%">企业名称</th>
                        <th style="text-align:center;width: 10%">企业类型</th>
                        <th style="text-align:center;width: 8%">所在地</th>
                        <th style="text-align:center;width: 8%">所属行业</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 10%">电话</th>
                        <th style="text-align:center;width: 5%">贮存能力(KG)</th>
                        <th style="text-align:center;width: 10%">贮存比(%)</th>
                        <th style="text-align:center;width: 10%">贮存状态</th>
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.entName">{{item.entName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entKind">{{item.entKind}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.regionName">{{item.regionName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.categoryName">{{item.categoryName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.contacts">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%" :title="item.storageAbility">
                            <span v-if="item.storageAbility">{{item.storageAbility}}</span>
                            <span v-else>--</span>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.storageScale">
                            <span v-if="item.storageScale!=null">
                                <!--<el-progress :percentage="item.storageScale" :format="formatStorageScale(item.storageScale)"></el-progress>-->
                                <el-progress :text-inside="true" :stroke-width="20" :percentage="item.storageScale"></el-progress>
                            </span>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.storageStatusStr" class="text-warn">
                            <div v-if="!item.storageStatusStr">--</div>
                            <div v-if="item.storageStatusStr=='正常'" class="text-state">{{item.storageStatusStr}}</div>
                            <div v-if="item.storageStatusStr=='有超期'" class="text-state" style="background-color: red;">{{item.storageStatusStr}}</div>
                            <div v-if="item.storageStatusStr=='储量预警'" class="text-state state-off" style="background-color: red;">{{item.storageStatusStr}}</div>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div class="btn-opreate">
                                <a v-if="item.storageAbility" @click="lookInfo(item.entId,item.entName)" href="javascript:;" class="text-primary text-underline">查看</a>
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
            <el-dialog
                    :modal="true"
                    :modal-append-to-body="false"
                    :title="entName"
                    top="9vh"
                    :visible.sync="dialogVisible"
                    width="1100px"
                    :close="dialogVisibleClose"
            >
                <div style="height: 670px;">
                    <el-tabs :tab-position="tabPosition" :stretch="true" v-model="productionName" @tab-click="groupClick">
                        <el-tab-pane v-for="item in containeGroupDataList"
                                     :key="item.name"
                                     :label="item.name"
                                     :name="item.name"
                        ></el-tab-pane>
                    </el-tabs>
                    <div style="height: 600px;overflow: auto">
                        <table class="table-default table-full" style=" color: #222;">
                            <thead>
                            <tr>
                                <th style="text-align:center;width: 6%">序号</th>
                                <th style="text-align:center;width: 20%">危废名称</th>
                                <th style="text-align:center;width: 10%">危废类别</th>
                                <th style="text-align:center;width: 20%">危废编码</th>
                                <th style="text-align:center;width: 15%">存量(KG)</th>
                                <!--  <th style="text-align:center;width: 15%">贮存能力(%)</th>-->
                                <th style="text-align:center;width: 15%">最久已贮存时(天)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in containeGroupItemDataList.containeInfoList">
                                <td style="text-align:center;width: 6%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null">{{(cur_page-1)*pageSize+index+1}}</td>
                                <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.dictDetailName">{{item.dictDetailName}}</td>
                                <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.typeName">{{item.typeName}}</td>
                                <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.dictDetailCode">{{item.dictDetailCode}}</td>
                                <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.currentAmount">
                                    <span v-if="item.currentAmount!=null">{{item.currentAmount}}</span>
                                </td>
                                <!--     <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.storageAbility">
                                         <el-progress v-if="item.storageAbility!=null" :text-inside="true" :stroke-width="26" :percentage="item.storageAbility"></el-progress>
                                     </td>-->
                                <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.storageDay">{{item.storageDay}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <span style="padding-left: 47%;">
                <el-button @click="dialogVisibleClose">关闭</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import RegionList from '../../../components/common/unit/RegionList.vue'
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: "storageFacilityMonitoring",
          components: {
            RegionList,
            BreadcrumbComponent
        },
        data(){
            return {
                routePath: this.$route.path,
                isDisabled:false,
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                regionCode:[],
                regionLevel:this.AppConfig.appInfo.regionLevel,
                parentCode:this.AppConfig.appInfo.parentCode,
                regionName:this.AppConfig.appInfo.regionName,
                entTypeOptions: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '重点企业'
                }, {
                    value: '2',
                    label: '一般企业'
                }],
              entKinds: [
                {"value": -1,"label": "全部"},
                {"value": 1,"label": "产废企业"},
                {"value": 2,"label": "经营企业"},
                {"value": 3,"label": "收集企业"},
              ],
                warningOptions: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '企业连续5天未更新企业台账'
                }, {
                    value: '2',
                    label: '企业储藏设施变动异常'
                }, {
                    value: '3',
                    label: '企业危费储存即将超时'
                }],
                standardSituationOptions:[{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '达标'
                }, {
                    value: '2',
                    label: '基本达标'
                }, {
                    value: '3',
                    label: '不达标'
                }],
                storageStatusStrOptions:[{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '正常'
                }, {
                    value: '2',
                    label: '储量预警'
                }, {
                    value: '3',
                    label: '有超期'
                }],
                search:{
                    regionCode:sessionStorage.getItem('regionCode'),
                    entType:'',
                    entKind:-1,
                    entSubclass:1002,
                    standardSituation:'',
                    entName:'',
                    regionName :this.AppConfig.appInfo.regionName,
                    regionLevel:sessionStorage.getItem('regionLevel'),
                    regionParentCode:'',
                    endTime:'',
                    startime:'',
                    warningType:'',
                    timeValue:'',
                    storageStatusStr:''
                },
                dataList:[],
                productionName:'',
                count:{
                    all: 0,
                    one: 0,
                    two: 0,
                    three: 0
                },
                regionOptions:[],
                tabPosition: 'top',
                containeGroupDataList:[],
                containeGroupItemDataList:[],
                entName:''
            }
        },
        created: function () {
            if(this.search.regionLevel==3){
                this.isDisabled = true;
            }
            this.searchEntEarlyWarn();
            // 行政区域级联
            this.getRegionChildrenList();
        },
        methods: {
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
            timeChange(){
                var timeValueArr = this.search.timeValue;
                if(timeValueArr!=null){
                    this.search.startime = timeValueArr[0];
                    this.search.endTime = timeValueArr[1];
                }else{
                    this.search.startime = '';
                    this.search.endTime = '';
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
            searchEntEarlyWarn(){
                var _this = this;
                var region = sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode');
                if(null!=_this.regionCode&&_this.regionCode.length>0){
                  region =_this.regionCode[_this.regionCode.length-1]
                }
              _this.search.regionCode = region;
              _this.initCountData();
              _this.cur_page = 1;
              _this.selectStorageFacilitiesCountEnt();
              _this.pageList();
            },
            initCountData(){
                this.count.all=0;
                this.count.one=0;
                this.count.two=0;
                this.count.three=0;
            },
            selectStorageFacilitiesCountEnt(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.regionCode);
                params.append('entType', _this.search.entType);
                params.append('entKind', _this.search.entKind);
                params.append('storageStatusStr', _this.search.storageStatusStr);
                params.append('entName', _this.search.entName);
                params.append('entSubclass', _this.search.entSubclass);
                _this.$axios.get('/api/regulatory/index/selectStorageFacilitiesCountEnt',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            let data = res.data;
                            _this.count.one = data.one;
                            _this.count.two = data.two;
                            _this.count.three = data.three;
                            _this.setCountData(_this.search.storageStatusStr);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            setCountData(storageStatusStr){
                if(storageStatusStr===1){ // 正常
                    this.count.two=0;
                    this.count.three=0;
                }else if(storageStatusStr===2){ // 预警
                    this.count.one=0;
                    this.count.three=0;
                }else if(storageStatusStr===3){ // 有超期
                    this.count.one=0;
                    this.count.two=0;
                }
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.regionCode);
                params.append('entType', _this.search.entType);
                params.append('entKind', _this.search.entKind);
                params.append('storageStatusStr', _this.search.storageStatusStr);
                params.append('entName', _this.search.entName);
                _this.$axios.get('/api/regulatory/index/selectStorageFacilitiesPage',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data.records;
                            _this.totalPage = res.data.pages;
                            _this.total = res.data.total;
                            _this.count.all = res.data.total;
                            /*_this.count.one = res.data.one;
                           _this.count.two = res.data.two;
                           _this.count.three = res.data.three;*/
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
            lookInfo(entId,entName){
                this.entName = entName;
                this.getEntContaineGroup(entId);
            },
            getEntContaineGroup(entId){
                var _this=this;
                _this.$axios.get('/api/regulatory/index/getEntContaineGroup/'+entId).then(
                    function (res) {
                        if(res.code == 0){
                            _this.containeGroupDataList = res.data;
                            if(res.data!=null && res.data.length>0){
                                _this.productionName = _this.containeGroupDataList[0].name;
                              
                                
                                                                          
let harzardousTypeList= sessionStorage.getItem('harzardousTypeList')
                            let harzardousList = JSON.parse(harzardousTypeList)
                           _this.containeGroupDataList[0].containeInfoList.forEach((item)=>{
            harzardousList.forEach(ele=>{
                if(item.typeName==ele.typeName){
item.typeName=ele.dicTypeExplain
                }
            })      
                           })  
                               _this.containeGroupItemDataList  = _this.containeGroupDataList[0];
                            }else{
                                _this.containeGroupItemDataList = [];
                            }
                        }
                        _this.dialogVisible = true;
                    }

                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            groupClick(tab, event){
                this.containeGroupItemDataList = this.containeGroupDataList[tab.index];
            },
            dialogVisibleClose(){
                this.productionName = '';
                this.dialogVisible = false;
                this.containeGroupItemDataList = [];
            },
            formatStorageScale(value){
                return value+"%";
            }
        }
    }
</script>

<style>
    .el-progress-bar__innerText {
        display: inline-block;
        vertical-align: middle;
        color: #303133;
        font-size: 12px;
        margin: 0 5px;
    }
    .breadcrumb {
        line-height: 59px;
        height: 59px;
        font-size: 18px;
        color: #172033;
    }
    /* .filter-more {
        padding: 20px 0px 0 20px;
    } */
</style>
