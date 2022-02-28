<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#" @click="goRoutleS('/homePage')"><i class="icon icon-zhuanyijihuajianguan menu-icon"></i>首页概览</a><span class="sep">&gt;</span><span
                    class="text-primary">企业预警</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <div class="filter-more"  style="padding: 0px">
                    <ul class="filter-box">
                        <li class="filter-item" style="margin-right: 10px;">
                            <div class="filter-label">报警状态：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="status" clearable  placeholder="全部" style="width: 120px;">
                                        <el-option
                                                   v-for="item in options"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item" style="width: 430px;margin-right: 0px">
                            <div class="filter-label">报警时间：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <div class="el-input el-input--suffix">
                                        <el-date-picker style="width: 300px;"
                                                        v-model="tiem"  value-format="yyyy-MM-dd"
                                                        type="daterange"
                                                        range-separator="—"
                                                        start-placeholder="开始日期"
                                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="filter-item"  style="margin-right: 0px">
                            <div class="filter-label" >企业名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">

                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span>
                                    <input class="el-input__inner" style="width: 160px" autocomplete="off"  v-model="entName" placeholder="搜索企业名称"></input>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" class="button-type"  @click="show">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="total-number" style="margin-left: 0px">
                </div>
                <table class="table">
                    <colgroup>
                        <col style="width: 60px;">
                        <col style="width: 20%;">
                        <col style="width: 15%;">
                        <col style="width: 15%;">
                        <col style="width: 12%;">
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th  style="text-align:center;">序号</th>
                        <th style="text-align: center">企业名称</th>
                        <th style="text-align: center">报警时间</th>
                        <th style="text-align: center">报警类型</th>
                        <th style="text-align: center">状态</th>
                        <th style="text-align: center">说明</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for=" (item,index) in dataTwo">
                        <td class="text-center">{{getIndex(index)}}</td>
                        <td class="text-center" :title="item.name">{{item.name}}</td>
                        <td class="text-center">{{item.time}}</td>
                        <td class="text-center" :title="statusToType(item.typeName)">{{statusToType(item.typeName)}}</td>
                        <td class="text-center">{{statusTo(item.status)}}</td>
                        <td class="text-center" :title="item.remark">
                            {{item.remark}}
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}} 条，每页显示</span>

                    <span class="el-pagination__sizes">
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
    </div>
</template>

<script>
    export default {
        name: "HomeAlarmList",
        data(){
            return {
                entName: '',
                time: '',
                options: [
                    {label:'处理',value:'1'},
                    {label:'未处理',value:'0'}
                ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                dataTwo: [],
                total:0,
                totalPage:0,
                tiem:['',''],
                status:"",
                regionCode:this.AppConfig.appInfo.regionCode,
            }
        },
        created: function () {
            this.loadingData();
        },
        methods:{
            formatterDate(value,str){
                if(value!=null){
                    let val= new Date(value).format(str);
                    return val;
                }else{
                    return '--';
                }
            },
            statusToType:function(str){
                if(str==1){
                    return '企业连续5天未更新企业台账';
                }
                if(str==2){
                    return '企业储藏设施变动异常';
                }
                if(str==3){
                    return '危废贮存超时';
                }
                if(str==4){
                    return '危废贮存间储存率预警';
                }
                if(str==5){
                    return '生产线危废未入库';
                }
                if(str==6){
                    return '生产线危废产量异常';
                }
                if(str==7){
                    return '生产线设备离线';
                }
                if(str==4){
                    return '危废贮存间储存率预警';
                }
                if(str==8){
                    return '危废贮存间非法入侵';
                }
                if(str==9){
                    return '危废贮存间储量异常变化';
                }
                if(str==10){
                    return '危废贮存间烟气报警';
                }
                if(str==11){
                    return '危废贮存间人员姿态异常';
                }
                if(str==12){
                    return '转移车辆运输超时';
                }
                if(str==13){
                    return '转移车辆载重异常';
                }
                if(str==14){
                    return '转移车辆偏离路线';
                }
                if(str==15){
                    return '转移车辆载货驶出管控区';
                }
                if(str==16){
                    return '危废处置合同即将到期';
                }
                if(str==17){
                    return '危废管理台账未提交';
                }
            },
            statusTo:function(str){
                if(str==0){
                    return '未处理';
                }
                if(str==1){
                    return '已处理';
                }
            },
            goRoutleS:function(str){
                this.$router.push(str);
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1;
                this.loadingData();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.tableData=[];
                this.loadingData();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            show(){
                this.cur_page=1;
                this.loadingData();
            },
            loadingData() {
                var _this = this;
                // let url = "http://localhost:8006/tEnterpriseTransportPlan/getTranByParams";
                let url = "/api/regulatory/home/queryEntAlarmByRegionCode";
                let params =new URLSearchParams();
                params.append('page',_this.cur_page);
                params.append('size',_this.pageSize);
                params.append("regionCode",_this.regionCode);
                params.append('entName',_this.entName);
                params.append('status',_this.status);
                if(null!=_this.tiem){
                    params.append('startTime',_this.tiem[0]);
                    params.append('endTime',_this.tiem[1]);
                }
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.total = response.data.total;
                            _this.dataTwo = response.data.records;
                            _this.totalPage = response.data.pages;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
        }
    }
</script>

<style>

</style>
