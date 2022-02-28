<template>
    <!-- 主体 -->
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="total-area">
            <div style="height: 78px;background-color: #ffffff;width: 100%;display: flex">
                <el-form inline="true"  ref="form" label-width="100px">
                    <el-form-item label="所在地" label-width="width: 74px;">
                        <el-input v-model="address" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业类型">
                        <el-select v-model="entType" placeholder="请选择" style="width: 100px">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监控状态">
                        <el-select v-model="status" placeholder="请选择" style="width: 100px">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业名称" label-width="width: 74px;">
                       <el-input v-model="entName" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right; display:flex;align-items:stretch" >
                       <!-- <el-button type="primary" class="button-type" @click="show">查询</el-button>-->
                        <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                            <span>查询</span></el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="width:100%;padding: 61px 10px 10px 10px;background: #ffffff;margin-top: 20px">
            <table class="table-default table-full" style="table-layout: fixed;width:100%;word-wrap:break-word;">
                <thead>
                <tr>
                    <th  style="text-align:center;width: 6%">序号</th>
                    <th style="text-align:center;width: 14%">企业名称</th>
                    <th style="text-align:center;width: 10%">企业类型</th>
                    <th style="text-align:center;width: 10%">所在地</th>
                    <th style="text-align:center;width: 10%">所属行业</th>
                    <th style="text-align:center;width: 10%">联系人</th>
                    <th style="text-align:center;width: 10%">电话</th>
                    <th style="text-align:center;width: 10%">监控状态</th>
                    <th style="text-align:center;width: 10%">最新更改时间</th>
                    <th style="text-align:center;width: 10%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index)  in tableData">

                    <td style="text-align:center;width: 6%">{{getIndex(index)}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.name">{{item.name}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entType">{{entTypeMethod(item.entType)}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.address">{{item.address}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.categoryId">{{item.categoryId}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contacts">{{item.contacts}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.bookType">{{bookTypeMethod(item.bookType)}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.updatedBy">{{formatterDate(item.updatedBy,"yyyy-MM-dd")}}</td>
                    <td style="text-align:center;width: 10%">
                        <a href="javascript:;" class="text-second text-underline" @click="infoFun(item.id)">详情</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="el-pagination is-background mt-lg">
                <span class="el-pagination__total">共 {{total}} 个转移计划，每页显示</span>
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
</template>

<script>
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: "TransferCity",
        components: {
            BreadcrumbComponent
        },
        data(){
            return {
                routePath: this.$route.path,
                entName: '',
                time: '',
                options: [
                     ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData: [],
                total:0,
                totalPage:0,
                tiem:['',''],
                status:"",
                fiveNo:"",
                centerDialogVisibleOpen:false,
                titleNo:'',
             }
        },
        created: function () {
            this.loadingData();
        },
     methods:{

         infoFun(entId){
             this.$router.push({name: 'productionBook', params: {entId: entId}});
         },
         formatterDate(value,str){
             if(value!=null){
                 let val= new Date(value).format(str);
                 return val;
             }else{
                 return '--';
             }
         },
         entTypeMethod:function(sta){
             if(1==sta){
                 return "重点企业"
             }
             if(2==sta){
                 return "一般企业"
             }
             if(3==sta){
                 return "收集企业"
             }
             if(4==sta){
                 return "经营企业"
             }
         },
         bookTypeMethod:function(sta){
             if(1==sta){
                 return "正常"
             }
             if(2==sta){
                 return "异常"
             }
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
             this.loadingData();
         },
         getIndex(index){
             let curPage = this.cur_page;
             let limitPage = this.pageSize;
             return (index+1) + (curPage - 1) * limitPage;
         },
         foldBox(){
             $(".fold-box").parents(".filter-more").toggleClass("filter-more-mini");
         },
         show(){
             this.cur_page=1;
             this.loadingData();
         },
         loadingData() {
             var _this = this;
             var url = "/api5/tEnterpriseInfo/page";
            let params =new URLSearchParams();
             params.append('page',_this.cur_page);
             params.append('size',_this.pageSize);
      /*       params.append('type',1);
             params.append('entName',_this.entName);
             params.append('status',_this.status);
             params.append('startTime',_this.tiem[0]);
             params.append('endTime',_this.tiem[1]);
             params.append('fiveNo',_this.fiveNo);*/
             _this.$nextTick(() => {
                 _this.$axios.get(url,params).then((response) => {
                     if(response.code == 0) {
                         //
                         _this.total = response.data.total;
                         _this.tableData = response.data.records;
                         _this.totalPage = response.data.pages;
                     }
                 }).catch((error) => {
                     // catch 指请求出错的处理
                    //  console.log(error);
                 });
             })
         },

         closeData(){
             var _this = this;
             _this.dialogLink = false;
             _this.$refs.fiveLinkVo.data ={
                 linkId: '',
                 pwName:'',
                 transportName:'',
                 pwPersonName:'',
                 carNo:'',
                 dictDetailName:'',
                 managementName:'',
                 dictDetailCode:'',
                 cWasteForm:'',
                 transportDate:'',
                 createTime:'',
                 cPackagingMethod:'',
                 amount:'',
                 cProcessingMode:'',
                 driverName:'',
                 operationName:''
             };
         }
     },
    }
</script>

<style>
    .tdOolor{
        width: 70px;height: 20px;background: rgba(96, 96, 96, 0.65);text-align: center;
    }
    .tdOolorAs{
        width: 70px;height: 20px;background: #67c23aa6;text-align: center;;
    }
</style>
