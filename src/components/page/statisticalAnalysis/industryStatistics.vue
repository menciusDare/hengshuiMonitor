<template>
  <div style="height: 100%">
    <el-form :inline="true" :model="queryForm">
      <el-form-item label="年份">
        <el-date-picker
          v-model="queryForm.year"
          type="year"
          value-format="yyyy"
          :picker-options="pickerOptions"
          placeholder="选择年"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="queryForm.month"
          type="monthrange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="危废类型">
        <el-select
          v-model="queryForm.dicType"
          multiple
          collapse-tags
          style="width: 150px"
          placeholder="请选择"
          @change="getDetailsCodeByDicType()"
        >
          <el-option
            v-for="item in dicTypeOptions"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="危废编码">
        <el-select
          v-model="queryForm.detailsCode"
          multiple
          collapse-tags
          style="width: 180px"
          placeholder="请选择"
          :disabled="detailsCodeEnabled"
        >
          <el-option
            v-for="item in detailsCodeOptions"
            :key="item.detailsCode"
            :label="item.detailsCode"
            :value="item.detailsCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="button"
          size="medium"
          @click="queryInfo"
          class="el-button el-button--primary"
          ><span>查询</span></el-button
        >
        <el-button
          type="button"
          size="medium"
          @click="exportExcel"
          class="el-button el-button--primary"
          :loading="downLoading"
          ><span>导出</span></el-button
        >
      </el-form-item>
    </el-form>
    <div class="tableMain" id="tradeTableId">
      <el-table :data="newTypeTable" border height="100%" style="width: 100%" :span-method="arraySpanMethod">
        <el-table-column
          prop="type"
          label="行业名称"
          width="222px"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="region"
          label="市"
          width="100px"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="entCount"
          label="企业数"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="planOutput"
          label="计划产生量（吨）"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="outPut"
          label="产生量（吨）"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="adjustmentAmount"
          label="库存调整量（吨）"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalVolume"
          label="委外处置利用量（吨）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalVolumeManagement"
          label="其中委外处置量（吨）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalVolumeUti"
          label="其中委外利用量（吨）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="outsideDisposal"
          label="联单省外转出（吨）"
          width="150px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="internalDisposal"
          label="联单省内转出（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalYourself"
          label="自行利用处置量（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalYourselfUti"
          label="其中利用量（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="disposalYourselfManagement"
          label="其中处置量（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="secondaryQuantity"
          label="次生量（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="storageCapacity"
          label="贮存量（吨）"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="overOneyearStorage"
          label="超一年贮存量（吨）"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bequeathLastyearStorage"
          label="上年度遗留量（吨）"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cur_page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import downloadFile from "../../common/unit/DownloadFile";
export default {
  name: "industryStatistics",
  data() {
    return {
      downLoading: false,
      pageSize: 20,
      cur_page: 1,
      pageCount: 1,
      pageSizes: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      detailsCodeEnabled: false,
      queryForm: {
        month: [this.getJanuaryMonth(), this.getCurrentMonth()],
        dicType: [],
        detailsCode: [],
        year: this.getCurrentYear(),
      },
      dicTypeOptions: [],
      detailsCodeOptions: [],
      newTypeTable: [],
      allWasteCategory: {
        aa: [],
        bb: [],
        cc: [],
      },
      tableDataObj: {}
    };
  },
  created() {
    this.getDicTypeList();
    this.queryInfo()
  },
  methods: {
    queryInfo() {
      this.cur_page = 1;
      this.typeonSubmit()
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.typeonSubmit();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.typeonSubmit();
    },
    dealTable() {
      let getDate = [];
      let typeIndex = [0];
      let lengths;
      let t = 0;
      for (let v in this.tableDataObj) {
        if (this.tableDataObj[v] && this.tableDataObj[v].length) {
          lengths = 0;
          this.tableDataObj[v].forEach((subV, index, typeData) => {
            // 总长度  lengths = lengths + subv.length
            if (index === typeData.length - 1) {
              lengths = lengths + typeData.length;
              typeIndex.push(typeData.length);
            }
            getDate.push({
              type: v,
              entCount: subV.entCount,
              name: subV.name,
              outsideDisposal: subV.outsideDisposal,
              disposalVolume: subV.disposalVolume,
              planOutput: subV.planOutput,
              dicttypeName: subV.dicttypeName,
              dictDetailCode: subV.dictDetailCode,
              detailName: subV.detailName,
              lastissueBalance: subV.lastissueBalance,
              outPut: subV.outPut,
              adjustmentAmount: subV.adjustmentAmount,
              disposalVolumeUti: subV.disposalVolumeUti,
              disposalVolumeManagement: subV.disposalVolumeManagement,
              disposalVolumeUti: subV.disposalVolumeUti,
              internalDisposal: subV.internalDisposal,
              disposalYourself:subV.disposalYourself,
              disposalYourselfUti: subV.disposalYourselfUti,
              disposalYourselfManagement: subV.disposalYourselfManagement,
              secondaryQuantity: subV.secondaryQuantity,
              storageCapacity: subV.storageCapacity,
              overOneyearStorage: subV.overOneyearStorage,
              bequeathLastyearStorage: subV.bequeathLastyearStorage
            });
          });
        }
      }
      typeIndex.forEach((v, i, typeArr) => {
        if (typeArr[i + 1]) {
          getDate[t].typeIndex = typeArr[i + 1];
          t += typeArr[i + 1];
        }
      });
      this.newTypeTable = getDate;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.typeIndex) {
          // 如果有值,说明需要合并
          return [row.typeIndex, 1];
        } else return [0, 0];
      }
    },
    getDicTypeList() {
      this.$axios
        .post("/api/regulatory/type/showDicType", { params: { type: 1 } })
        .then((res) => {
          if (res.code == 0) {
            this.dicTypeOptions = res.data;
          }
        })
        .catch((error) => {});
    },
    getDetailsCodeByDicType() {
      if (
        !this.queryForm.dicType ||
        this.queryForm.dicType == null ||
        this.queryForm.dicType.length == 0
      ) {
        this.dicTypeFlag = true;
        return;
      }
      this.$axios
        .get(
          "/api/regulatory/type/getDetailsCodeByDicType?types=" +
            this.queryForm.dicType.join(",")
        )
        .then((res) => {
          if (res.code == 0) {
            this.detailsCodeOptions = res.data;
            this.detailsCodeEnabled = false;
            if (this.queryForm.dicType.length == 0) {
              this.detailsCodeEnabled = true;
            }
          }
        })
        .catch((error) => {});
    },
    typeonSubmit() {
      const typeNameList = this.queryForm.dicType.map((item) => {
        const typeName = this.dicTypeOptions.filter((ele) => {
          return ele.id === item;
        })[0].typeName;
        return typeName;
      });
      let params = new URLSearchParams();
      params.append("start", this.queryForm.month && this.queryForm.month[0] ? this.queryForm.month[0] : '');
      params.append("end", this.queryForm.month && this.queryForm.month[1] ? this.queryForm.month[1] : '');
      params.append("dictTypes", typeNameList);
      params.append("detailsCodes", this.queryForm.detailsCode);
      params.append("type", "hangye");
      params.append("year", this.queryForm.year);
      params.append("page", this.cur_page);
      params.append("limit", this.pageSize);
      this.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBook/getMonthlySummary",
          { params }
        )
        .then((response) => {
          this.newTypeTable = [];
          this.tableDataObj = response.data.records[0];
          this.pageCount = response.data.total;
          // this.pageSize = response.data.pages;
          this.dealTable()
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    exportExcel() {
      this.downLoading = true;
      const typeNameList = this.queryForm.dicType.map((item) => {
        const typeName = this.dicTypeOptions.filter((ele) => {
            return ele.id === item;
          })[0].typeName;
          return typeName;
      });
      var url = "/api/regulatory/tEnterpriseStorageStandingBook/export";
      let params = new URLSearchParams();
      params.append("month", this.queryForm.month);
      params.append("type", "hangye");
      params.append("year", this.queryForm.year);
      params.append("dictTypes", typeNameList);
      params.append("detailsCodes", this.queryForm.detailsCode);
      this.$axios
        .post(url, params, { responseType: "blob" })
        .then((response) => {
          this.downLoading = false;
          downloadFile(response);
        })
        .catch(() => {
          this.downLoading = false;
          _this.$message.info("导出异常,请重试!");
        });
    },
    getJanuaryMonth() {
      var date = new Date();
      var m = date.getFullYear() + "-" + 1;
      return m;
    },
    getCurrentMonth() {
      var date = new Date();
      var m = date.getFullYear() + "-" + (date.getMonth() + 1);
      return m;
    },
    getCurrentYear() {
      var date = new Date();
      var m = date.getFullYear();
      return m + "";
    },
  },
};
</script>
<style></style>
