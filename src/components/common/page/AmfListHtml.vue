<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="dialogMap" v-if="dialogMap" :modal-append-to-body="false" width="800px" :close-on-click-modal="false"  top="10px" @close="close">
      <table class="table-default table-full">
        <thead>
        <tr>
          <th  style="text-align:center;width: 80px">序号</th>
          <th style="text-align:center;width: 120px">订单号</th>
          <th style="text-align:center;width: 80px;">运输企业</th>
          <th style="text-align:center;width: 100px">司机</th>
          <th style="text-align:center;width: 100px">预计运输时间</th>
          <th style="text-align:center;width: 100px">订单状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item  in tableData">

          <td style="text-align:center;width: 80px">{{item.id}}</td>
          <td style="text-align:center;width: 120px">{{item.orderNo}}</td>
          <td style="text-align:center;width: 80px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;" :title="item.entName">{{item.entName}}</td>
          <td style="text-align:center;width: 80px;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;":title="item.deleteName">{{item.deleteName}}</td>
          <td style="text-align:center;width: 100px">{{item.transportDate}}</td>
          <td style="text-align:center;width: 100px">{{item.statusName}}</td>
        </tr>
        </tbody>
      </table>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{total}} 个超时订单，每页显示</span>
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
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "AmfListHtml",
        data(){
          return{
            total:0,
            cur_page: 1,
            pageSizes: this.AppConfig.appInfo.pageSizes,
            pageSize: this.AppConfig.appInfo.pageSize,
            regionCode: sessionStorage.getItem("regionCode"),
            dialogMap:false,
            tableData:[],
            totalPage: 0
          }
        },
        methods: {
          open(){
            this.$nextTick(() => {
              this.dialogMap = true;
              this.loadingData();
            })
          },
          close(){
            this.cur_page = 1;
            this.pageSize = this.AppConfig.appInfo.pageSize;
            this.tableData = [];
            this.totalPage =  0
            this.total =0;
          },
          handleSizeChange(val) {
            // 改变每页显示的条数
            this.pageSize=val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.cur_page=1
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
          loadingData() {
            var _this = this;
            var url =  '/api/regulatory/tOrder/queryOrderList?entId='+sessionStorage.getItem('entId')+'&page='+_this.cur_page+"&limit="+_this.pageSize+"&entType="+_this.AppConfig.appInfo.loginType;
            _this.$axios.get(
                    url,{}
            ).then((response) => {
              if(response.code == 0){
                // console.log(response)
                _this.total = response.data.total;
                _this.totalPage = response.data.pages;
                var datas = [];
                for(var i=0;i<response.data.records.length;i++){
                  var cFEntIntiVo = response.data.records[i];
                  var param = {
                    'id':_this.getIndex(i),
                    'orderNo':cFEntIntiVo.orderNo,
                    'linkId':cFEntIntiVo.linkId,
                    'entName':cFEntIntiVo.entName,
                    'typeName':cFEntIntiVo.typeName,
                    'statusName':cFEntIntiVo.statusName,
                    'czName':cFEntIntiVo.czName,
                    'detailsName':cFEntIntiVo.detailsName,
                    'cfName':cFEntIntiVo.cfName,
                    'transportDate':cFEntIntiVo.transportDate,
                    'deleteName':cFEntIntiVo.deleteName
                  }
                  datas.push(param);
                }
                _this.tableData =datas ;
                var url = "/api/tOrder/queryOrderNum?regionCode="+sessionStorage.getItem("regionCode");
                _this.$axios.get(url).then(function(response) {
                  if(response.code==0){
                    sessionStorage.removeItem("orderNum");
                    sessionStorage.setItem("orderNum", response.data.orderNum);
                  }
                });
              }

            }).catch((error) => {
              // catch 指请求出错的处理
              // console.log(error);
            });
          },
        },
        created() {

        }
    }
</script>

<style scoped>
  table{table-layout:fixed;word-break:break-all}
</style>
