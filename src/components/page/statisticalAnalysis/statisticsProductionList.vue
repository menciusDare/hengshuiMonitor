<template>
  <div class="tableContainer">
    <el-form :inline="true" :model="queryStatistics" class="queryInput">
      <el-form-item label="所在地">
        <el-select style="width:100%" v-model="regionCode" placeholder="请选择所属区域">
          <el-option
              v-for="item in regionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="queryStatistics.time"
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
      <el-form-item label="数据类型">
        <el-select
          v-model="queryStatistics.typeId"
          style="width: 140px"
          @change="getTypeId"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="危废类型">
        <el-select
          v-model="queryStatistics.dicType"
          multiple
          collapse-tags
          style="width: 150px"
          placeholder="请选择"
          @change="getDetailsCodeByDicType()"
        >
          <el-option
            v-for="item in dicTypeOptions"
            :key="item.id"
            :label="item.dicTypeExplain"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="危废编码">
        <el-select
          v-model="queryStatistics.detailsCode"
          multiple
          collapse-tags
          style="width: 180px"
          placeholder="请选择"
          :disabled="dicTypeFlag"
          @change="getDetailsCode"
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
          @click="onSubmit"
          class="el-button el-button--primary"
        >
          <span>查询</span></el-button
        >
        <el-button
          type="button"
          size="medium"
          @click="exportEntTableData"
          class="el-button el-button--primary"
          :loading="downLoading"
        >
          <span>导出</span></el-button
        >
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="危废类型" name="first">
        <div class="tableMain">
          <el-table
            :data="newtableDataCompany"
            :span-method="objectSpanMethod"
            border
            height="600px"
            style="width: 100%"
          >
            <el-table-column
              prop="entName"
              label="企业名称"
              align="center"
              v-if="activeName === 'second'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.entName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dictTypeName"
              label="危废类别"
              align="center"
              v-if="activeName === 'first'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.dictTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="regionName"
              label="区县"
              align="center"
            ></el-table-column>
            <el-table-column
              label="危废类别"
              width="250px"
              align="center"
              v-if="activeName === 'second'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.dictTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dectDetailCode"
              label="危废编码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="detailName"
              label="俗称"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 1"
              prop="outPut"
              label="产生量（吨）"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 2"
              prop="disposalVomume"
              label="委外处置利用量（吨）"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 3"
              prop="storageCapacity"
              label="贮存量（吨）"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[50, 30, 20, 10]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="企业数据" name="second">
        <div class="tableMain">
          <el-table
            :data="newtableDataCompany"
            :span-method="objectSpanMethod"
            border
            height="600px"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="企业名称"
              align="center"
              v-if="activeName === 'second'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dictTypeName"
              label="危废类别"
              align="center"
              v-if="activeName === 'first'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.dictTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="regionName"
              label="区县"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="dictTypeName"
              label="危废类别"
              width="250px"
              align="center"
              v-if="activeName === 'second'"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.dictTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dectDetailCode"
              label="危废编码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="detailName"
              label="俗称"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 1"
              prop="outPut"
              label="产生量（吨）"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 2"
              prop="disposalVomume"
              label="委外处置利用量（吨）"
              align="center"
            ></el-table-column>
            <el-table-column
              v-if="queryStatistics.typeId === 3"
              prop="storageCapacity"
              label="贮存量（吨）"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[50, 30, 15, 10]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import downloadFile from "../../common/unit/DownloadFile";
import RegionList from '../../common/unit/RegionList.vue'
export default {
  data() {
    return {
      downLoading: false,
      userPermissions: sessionStorage.getItem("roleCode"),
      pageSize: 50,
      cur_page: 1,
      pageCount: 1,
      activeName: "first",
      regionOptions: [],
      regionCode: sessionStorage.getItem("regionCode"),
      pickerOptions: {
        shortcuts: [
          {
            text: "上月",
            onClick(picker) {
              const end = new Date();
              end.setMonth(end.getMonth() - 1);
              picker.$emit("pick", [end, end]);
            },
          },
          {
            text: "今年至上月",
            onClick(picker) {
              const end = new Date();
              end.setMonth(end.getMonth() - 1);
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 3);
              end.setMonth(end.getMonth() - 1);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      queryStatistics: {
        typeId: 1,
        time: [this.returnStart(), this.returnEnd()],
        dicType: [],
        detailsCode: [],
      },
      dicTypeFlag: true,
      dicTypeOptions: [],
      detailsCodeOptions: [],
      typeOptions: [
        { type: 1, name: "产生量" },
        { type: 2, name: "委外处置利用量" },
        { type: 3, name: "贮存量" },
      ],
      newtableDataCompany: [
        {
          entName: "",
          region: "",
          typeName: "",
          name: "",
          code: "",
          suName: "",
          lastNum: "",
          yield: "",
          inventoryAdjustment: "",
          weiwaiNum: "",
          shengwai: "",
          shengnei: "",
          zixing: "",
          ciNum: "",
          storage: "",
          yearStorage: "",
          mouth: "",
        },
      ],
    };
  },
  components: {
    RegionList
  },
  created() {
    this.loadingData();
    this.getRegionChildrenList();
    this.showDicType();
  },
  methods: {
    regionChange(value) {
      this.regionCode = value
    },
    getDetailsCode() {
      // var leng = this.queryStatistics.detailsCode.length;
      var leng = this.queryStatistics.dicType.length;
      if (leng == 0) {
        this.dicTypeFlag = true;
      }
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.loadingData();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.loadingData();
    },
    returnStart() {
      var date = new Date();
      var m = date.getFullYear() + "-" + "01";
      return m;
    },
    returnEnd() {
      const start = new Date();
      if (start.getMonth() < 10) {
        return start.getFullYear() + "-0" + (start.getMonth() + 1);
      } else {
        return start.getFullYear() + "-" + (start.getMonth() + 1);
      }
    },
    handleClick(tab, event) {
      this.newtableDataCompany = [];
      this.onSubmit();
    },
    getDetailsCodeByDicType() {
      var _this = this;
      if (
        !_this.queryStatistics.dicType ||
        _this.queryStatistics.dicType == null ||
        _this.queryStatistics.dicType.length == 0
      ) {
        _this.dicTypeFlag = true;
        return;
      }
      _this.$axios
        .get(
          "/api/regulatory/type/getDetailsCodeByDicType?types=" +
            _this.queryStatistics.dicType.join(",")
        )
        .then(function (res) {
          if (res.code == 0) {
            _this.detailsCodeOptions = [];
            for (var i = 0; i < res.data.length; i++) {
              _this.detailsCodeOptions.push(res.data[i]);
            }
            _this.dicTypeFlag = false;
            if (_this.queryStatistics.dicType.length == 0) {
              _this.dicTypeFlag = true;
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    showDicType() {
      var _this = this;
      _this.$axios
        .post("/api/regulatory/type/showDicType", {
          params: {
            type: 1,
          },
        })
        .then(function (res) {
          if (res.code == 0) {
let harzardousTypeList= sessionStorage.getItem('harzardousTypeList')
                            let harzardousList = JSON.parse(harzardousTypeList)
                            
                           res.data.forEach((item)=>{
            harzardousList.forEach(ele=>{
                if(item.typeName==ele.typeName){
item.dicTypeExplain=ele.dicTypeExplain
                }
            })      
                           })     
                          
              let filteredList = res.data.filter(item=>{
              
                  if(item.dicTypeExplain!=undefined ){
                      return item
                  }
                   
                });   
                        

            _this.dicTypeOptions = filteredList;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode:
              sessionStorage.getItem("regionCode") == null
                ? _this.AppConfig.appInfo.regionCode
                : sessionStorage.getItem("regionCode"),
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            let secondLevelRegin = []
            if (_this.userPermissions === 'area') {
                secondLevelRegin = res.data
            } else {
              secondLevelRegin = res.data[0].children
              secondLevelRegin.unshift({label: res.data[0].label, value: sessionStorage.getItem('regionCode'), level:res.data[0].level })
            }
            _this.regionOptions = secondLevelRegin
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    getTypeId() {
      this.onSubmit();
    },
    loadingData() {
      const typeNameList = this.queryStatistics.dicType.map((item) => {
        const typeName = this.dicTypeOptions.filter((ele) => {
          return ele.id === item;
        })[0].typeName;
        return typeName;
      });
      var _this = this;
      var start = "";
      var end = "";
      if (
        null != _this.queryStatistics.time &&
        _this.queryStatistics.time.length > 0
      ) {
        start = _this.queryStatistics.time[0];
        end = _this.queryStatistics.time[1];
      }
      _this.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBook/getProductionStatistics",
          {
            params: {
              regionCode: this.regionCode,
              start: start,
              end: end,
              dataType: _this.queryStatistics.typeId,
              orderType: 1,
              dicTypes: typeNameList.join(","),
              detailsCodes: _this.queryStatistics.detailsCode.join(","),
              activeName: _this.activeName,
              page: _this.cur_page,
              limit: _this.pageSize,
            },
          }
        )
        .then((response) => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          _this.newtableDataCompany = response.data.records;
          _this.pageCount = response.data.total;
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    exportEntTableData() {
      this.downLoading = true;
      const typeNameList = this.queryStatistics.dicType.map((item) => {
        const typeName = this.dicTypeOptions.filter((ele) => {
          return ele.id === item;
        })[0].typeName;
        return typeName;
      });
      var url =
        "/api/regulatory/tEnterpriseStorageStandingBook/getProductionStatisticsExport";
      let params = new URLSearchParams();
      var _this = this;
      var start = "";
      var end = "";
      if (
        null != _this.queryStatistics.time &&
        _this.queryStatistics.time.length > 0
      ) {
        start = _this.queryStatistics.time[0];
        end = _this.queryStatistics.time[1];
      }
      params.append(
        "regionCode",
        _this.regionCode[_this.regionCode.length - 1]
      );
      params.append("start", start);
      params.append("end", end);
      params.append("dataType", _this.queryStatistics.typeId);
      params.append("orderType", 1);
      params.append("dicType", typeNameList.join(","));
      params.append("detailsCode", _this.queryStatistics.detailsCode.join(","));
      params.append("activeName", _this.activeName);
      this.$axios
        .post(
          url,
          params,
          { responseType: "blob" } // 1.首先设置responseType对象格式为 blob:
          // {responseType: 'arraybuffer'}
        )
        .then((response) => {
          this.downLoading = false;
          downloadFile(response);
        })
        .catch(() => {
          this.downLoading = false;
          _this.$message.info("导出异常,请重试!");
        });
    },
    onSubmit() {
      this.cur_page = 1;
      this.loadingData();
    },
    objectSpanMethod() {},
  },
};
</script>
<style>
.wasteList .tableContainer {
  box-sizing: border-box;
  height: 100%;
}
.wasteList .tab {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f4f4f4;
}
.wasteList .tab .tabMain {
  cursor: pointer;
}
.wasteList .tab .tabMain.selected {
  font-weight: bold;
  background: #fff;
  border-bottom: 2px solid #35a1ec;
  color: #35a1ec;
}
.wasteList .tableMain {
  overflow: scroll;
  height: 100%;
}

.wasteList .el-form--inline .el-form-item {
  margin-bottom: 1%;
}
.wasteList .el-table {
  color: #333;
}
.wasteList .el-table thead {
  color: #333;
}
.wasteList .el-table--border {
  /* 2px solid # */
  border: 1px solid #8c939d;
}
.wasteList .el-table th.is-leaf,
.el-table td {
  border-bottom: 1px solid #8c939d;
}
.wasteList .el-table--border th,
.el-table--border td {
  border-right: 1px solid #8c939d;
}
.wasteList .el-form-item__label {
  color: #333;
}
.wasteList .el-button {
  /*background: #35a1ec;*/
  padding: 0 20px;
  line-height: 35px;
}
.wasteList .panel {
  padding: 10px;
  box-sizing: border-box;
  height: 95%;
}
</style>
