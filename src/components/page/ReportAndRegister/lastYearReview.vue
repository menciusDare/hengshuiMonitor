<template>
  <!--危险废物生产状况-->
  <div class>
    <div
      data-v-792ed4e5
      style="margin-left: 20px; background-color: rgba(140, 147, 157, 0.16); height: 40px; padding-top: 10px; padding-left: 20px; margin-right: 20px;"
    >
      <div
        data-v-792ed4e5
        style="width: 7px; height: 22px; background-color: rgba(27, 27, 27, 0.38); float: left;"
      ></div>
      <div
        data-v-792ed4e5
        style="float: left; margin-left: 10px; font-weight: bold; font-size: 16px;"
      >检查、监测和公开</div>
    </div>
    <el-container
      style="
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
    font-weight: bold;
    font-size: 16px;
"
    >
      <el-aside
        width="100px"
        style="border:1px solid #000; height:286px;writing-mode:tb-rl;text-align: center;"
      >
        <span style="
    line-height: 96px;">检查、监测和公开</span>
      </el-aside>
      <el-main
        style="border:1px solid #000;border-left: 0px; height:286px;flex:0.7;word-wrap:break-word;padding:5px"
      >{{tableData.monitoringContent}}</el-main>
    </el-container>
    <div
      data-v-792ed4e5
      style="margin-left: 20px; background-color: rgba(140, 147, 157, 0.16); height: 40px; padding-top: 10px; padding-left: 20px; margin-right: 20px;"
    >
      <div
        data-v-792ed4e5
        style="width: 7px; height: 22px; background-color: rgba(27, 27, 27, 0.38); float: left;"
      ></div>
      <div
        data-v-792ed4e5
        style="float: left; margin-left: 10px; font-weight: bold; font-size: 16px;"
      >危险废物比较分析</div>
    </div>
    <el-container
      style="
    padding-top: 20px;
    padding-bottom: 20px;
     margin-left: 20px;
     font-weight: bold;
     font-size: 16px;
"
    >
      <el-aside
        width="100px"
        style="border:1px solid #000; height:286px;writing-mode:tb-rl;text-align: center;"
      >
        <span style="
    line-height: 96px;">危险废物比较分析</span>
      </el-aside>
      <el-main
        style="border:1px solid #000;border-left: 0px; height:286px;flex:0.7;word-wrap:break-word;padding:5px"
      >{{tableData.analysisContent}}</el-main>
    </el-container>
    <div
      data-v-792ed4e5
      style="margin-left: 20px; background-color: rgba(140, 147, 157, 0.16); height: 40px; padding-top: 10px; padding-left: 20px; margin-right: 20px;"
    >
      <div
        data-v-792ed4e5
        style="width: 7px; height: 22px; background-color: rgba(27, 27, 27, 0.38); float: left;"
      ></div>
      <div
        data-v-792ed4e5
        style="float: left; margin-left: 10px; font-weight: bold; font-size: 16px;"
      >管理制度执行情况</div>
    </div>
    <el-container
      style="
    padding-top: 20px;
    padding-bottom: 20px;
     margin-left: 20px;
     font-weight: bold;
     font-size: 16px;
"
    >
      <el-aside
        width="100px"
        style="border:1px solid #000; height:286px;writing-mode:tb-rl;text-align: center;"
      >
        <span style="
    line-height: 96px;">管理制度执行情况</span>
      </el-aside>
      <el-main
        style="border:1px solid #000;border-left: 0px; height:286px;flex:0.7;word-wrap:break-word;padding:5px"
      >
        <el-row style="border-bottom:1px dashed  #000;">危险废物经营许可证制度</el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">是否将危险废物委托给有资质单位收集、贮存、利用、处置：</span>
          <el-checkbox-group v-model="tableData.isEntrust" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">是否有资质单位签订危险废物利用处置合同协议：</span>
          <el-checkbox-group v-model="tableData.isQualifications" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">是否对危险废物许可证进行审查确定：</span>
          <el-checkbox-group v-model="tableData.isExamination" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">转移危险废物时候经过环保部门批准：</span>
          <el-checkbox-group v-model="tableData.isRatify" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">是否按照规定填写危险废物转移联单：</span>
          <el-checkbox-group v-model="tableData.isTransferVoucher" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">危险废物收集、贮存、处置设施场所是否设置危险废物识别标志：</span>
          <el-checkbox-group v-model="tableData.isSign" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">危险废物的容器和包装物是否设置危险废物标签：</span>
          <el-checkbox-group v-model="tableData.isLabel" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">是否安装国家规定建立危险废物台账：</span>
          <el-checkbox-group v-model="tableData.isStandingBook" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row style="border-bottom:1px dashed  #000;">
          <span style="float: left;">危险废物收集、贮存、处置等污染防治设施是否通过环评审批：</span>
          <el-checkbox-group v-model="tableData.isApproval" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row>
          <span style="float: left;">上述危险废物相关污染防治设施是否与主体工程同时通过环保验收：</span>
          <el-checkbox-group v-model="tableData.isAdopt" style="width:110px;float: left;">
            <el-checkbox label="0" disabled>是</el-checkbox>
            <el-checkbox label="1" disabled>否</el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "hazardousProductInfo",
  data() {
    return {
      tableData: {},
      entId: this.$route.params.entId,
      year: this.$route.params.year
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    getArray(value) {
      let a = [];
      a.push(value + "");
      return a;
    },
    query() {
      var that = this;
      var url =
        "api/regulatory/tEnterpriseManagementPlan/selectTEnterpriseManagementPlan";
      that.$axios
        .post(url, {
          recordYear: that.year,
          entId: that.entId
        })
        .then(function(res) {
          if (res.code == 0) {
            that.tableData = res.data;
            that.tableData.isEntrust = that.getArray(that.tableData.isEntrust);
            that.tableData.isQualifications = that.getArray(
              that.tableData.isQualifications
            );
            that.tableData.isExamination = that.getArray(
              that.tableData.isExamination
            );
            that.tableData.isRatify = that.getArray(that.tableData.isRatify);
            that.tableData.isTransferVoucher = that.getArray(
              that.tableData.isTransferVoucher
            );
            that.tableData.isSign = that.getArray(that.tableData.isSign);
            that.tableData.isLabel = that.getArray(that.tableData.isLabel);
            that.tableData.isStandingBook = that.getArray(
              that.tableData.isStandingBook
            );
            that.tableData.isApproval = that.getArray(
              that.tableData.isApproval
            );
            that.tableData.isAdopt = that.getArray(that.tableData.isAdopt);
          }
          // console.log(that.tableData);
        })
        .catch(error => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 30px;
  font-size: 18px;
  width: 100%;
  height: 40px;
  background-color: #f7f7f7;
  line-height: 40px;
  margin-bottom: 20px;
}
</style>