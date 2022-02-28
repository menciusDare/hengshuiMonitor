<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath" />
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item" v-if="this.username === 'linyi'">
              <div class="filter-label">所在地：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="regionCode" placeholder="请选择所在地">
                    <el-option
                      v-for="item in regionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">企业名称：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <el-input v-model.trim="search" placeholder="请输入企业名称">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">设备厂商：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <el-select
                    style="width: 100%"
                    v-model="ruleForm.deviceManufacturerNum"
                    multiple
                    collapse-tags
                    placeholder="请输入设备厂商"
                    @change="deviceManufacturerNumChange"
                  >
                    <el-option
                      v-for="(item, index) in deviceManufacturerList"
                      :key="index"
                      :label="item.supplierName"
                      :value="item.supplierCode"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">状态：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select
                    clearable
                    style="width: 100%"
                    v-model="productionStatus"
                    placeholder="请选择状态"
                    @change="check"
                  >
                    <el-option
                      v-for="(item, index) in monitoringTypeChcek"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="show"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="overflowX">
        <table class="table-default" v-loading="loading">
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">序号</th>
              <th style="text-align: center; width: 10%">企业名称</th>
              <th style="text-align: center; width: 9%">企业类型</th>
              <th style="text-align: center; width: 10%">联系人</th>
              <th style="text-align: center; width: 8%">联系人手机号</th>
              <th style="text-align: center; width: 8%">设备厂商</th>
              <th style="text-align: center; width: 8%">类型</th>
              <th style="text-align: center; width: 8%">状态</th>
              <th style="text-align: center; width: 8%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableDatas" :key="item.id">
              <td style="text-align: center; width: 5%">
                {{ getIndex(index) }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.name"
              >
                {{ item.name }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.entKind"
              >
                {{ item.entKind }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.managerName"
              >
                {{ item.managerName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.managerPhone"
              >
                {{ item.managerPhone }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.supplierName"
              >
                {{ item.supplierName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                v-html="addHtml(item.entType)"
              ></td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                {{ item.status == 1 ? "同步" : "不同步" }}
              </td>
              <td style="text-align: center; width: 7%">
                <div class="btn-opreate">
                  <a
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="
                      jumpAddress(
                        'newEntBase',
                        item.id,
                        item.regionCode,
                        item.correlationId,
                        item.entKind
                      )
                    "
                    >企业详情</a
                  >
                  <!--enterprisesInfo-->
                  <a
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="
                      jumpAddressToProductionBook(
                        item.id,
                        item.name,
                        item.regionName,
                        item.entKind
                      )
                    "
                    >管理台账</a
                  >
                  <!-- <a
                                        href=""
                                        class="text-primary text-underline"
                                        @click="handelEdit"
                                        >编辑</a
                                    > -->
                  <span
                    class="text-primary text-underline"
                    style="cursor: pointer"
                    @click="handelEdit(item)"
                    >编辑</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>

        <span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="10"
            layout=" sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </span>

        <span class="el-pagination__total">共 {{ totalPage }} 页</span>
      </div>
    </div>
    <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>

    <el-dialog
      title="企业信息"
      :visible.sync="entInfoOperationDialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="90%"
      :before-close="handleClose"
    >
      <entInfoOperation ref="entInfoOperation"></entInfoOperation>
    </el-dialog>

    <el-dialog
      :title="titleName"
      :visible.sync="addDialogVisible"
      width="40%"
      center
      :modal-append-to-body="false"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="134px"
        class="demo-ruleForm"
      >
        <ul class="Onlinedealil newOnlinedealil">
          <li class="Onlinedealli">
            <el-form-item label="企业名称">
              <el-input
                clearable
                v-model.trim="ruleForm.applicationTitle"
                size="small"
                disabled
                placeholder="请输入企业名称"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contacts">
              <el-input
                clearable
                v-model.trim="ruleForm.contacts"
                size="small"
                disabled
                placeholder="请输入联系人"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input
                clearable
                v-model.trim="ruleForm.iphone"
                size="small"
                disabled
                placeholder="请输入联系人电话"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <!-- 经营企业 -->
            <el-form-item label="企业类型" v-if="entKindStatus == '经营企业'">
              <el-select
                v-model="ruleForm.business"
                multiple
                placeholder="请选择"
                @change="statusChange"
              >
                <el-option
                  v-for="item in monitorPickerIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 产废企业 -->
            <el-form-item label="企业类型" v-else>
              <el-select
                v-model="ruleForm.business1"
                placeholder="请选择"
                @change="statusChange1"
              >
                <el-option
                  v-for="item in businessList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li class="Onlinedealli">
            <el-form-item label="监控类型">
              <el-checkbox-group v-model="ruleForm.checkList">
                <el-checkbox
                  v-for="(item, index) in monitoringTypeList"
                  :label="item.value"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </li>
          <li class="Onlinedealli" style="margin-left: 55px">
            <el-form-item label="是否与省平台同步">
              <!-- <el-checkbox-group v-model="ruleForm.check">
                                <el-checkbox
                                    v-for="(item, index) in monitoringTypeChcek"
                                    :label="item.value"
                                    :key="index"
                                    >{{ item.name }}</el-checkbox
                                >
                            </el-checkbox-group> -->
              <el-radio
                v-model="ruleForm.check"
                v-for="(item, index) in monitoringTypeChcek"
                :label="item.value"
                :key="index"
                >{{ item.name }}</el-radio
              >
            </el-form-item>
          </li>
        </ul>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handelSave('ruleForm')"
          style="
            background: rgba(42, 175, 255, 1);
            border-color: rgba(42, 175, 255, 1);
          "
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import productionVideoHuiKan from "../standingBook/ProductionVideoHuiKan.vue";
import entInfoOperation from "../standingBook/entInfoOperation.vue";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue";
export default {
  name: "WasteProductionCompanyManagement",
  components: {
    productionVideoHuiKan,
    entInfoOperation,
    BreadcrumbComponent,
  },
  data() {
    return {
      routePath: this.$route.path,
      username: sessionStorage.getItem("username"),
      addDialogVisible: false, //控制编辑弹窗显示隐藏
      entInfoOperationDialogVisible: false,
      loading: false,
      queryInfo: {
        query: "",
        pageNo: 1,
        pageSize: 10,
      },

      entsKinds: [
        { value: -1, label: "全部" },
        { value: 1, label: "产废企业" },
        { value: 2, label: "经营企业" },
        { value: 3, label: "收集企业" },
      ],
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      regionCode: sessionStorage.getItem("regionCode"), //[],
      monitorType: -1,
      entKind: 1,
      search: "",
      productionStatus: "",
      entTotal: {},
      roleType: sessionStorage.getItem("roleType"),
      entKindStatus: "", //判断是经营企业还是产废企业
      titleName: "", //标题
      status: "", //产废企业
      status1: [], //经营企业
      uid: "",
      nameList: "",
      deviceManufacturerList: [], //设备厂商
      ruleForm: {
        applicationTitle: "", //企业名称
        contacts: "", //联系人
        monitorPickerId: "", //经营企业
        ename: "", //监控类型
        iphone: "", //联系人电话
        business: [], //经营企业
        business1: "", //产废企业
        checkList: [], //监控类型
        enterpriseType: ['4'], //企业类型
        deviceManufacturerNum: [],
        check: "", //是否与省平台同步
      },
      //经营企业数组
      monitorPickerIdList: [
        {
          value: "2001",
          label: "危险废物利用处置单位",
        },
        {
          value: "2002",
          label: "危险废物豁免单位",
        },
        {
          value: "2003",
          label: "危险废物综合收集单位",
        },
        {
          value: "2004",
          label: "铅蓄电池",
        },
      ],
      //产废企业
      businessList: [
        {
          value: "1001",
          label: "一般固体废物",
        },
        {
          value: "1002",
          label: "危险废物",
        },
        {
          value: "1003",
          label: "医疗废物",
        },
        {
          value: "1004",
          label: "机动车维修",
        },
      ],
      //监控类型
      monitoringTypeList: [
        {
          value: "1",
          label: "国家级",
          name: "国家级",
        },
        {
          value: "2",
          label: "省级",
          name: "省级",
        },
        {
          value: "3",
          label: "市级",
          name: "市级",
        },
        {
          value: "4",
          label: "小微企业",
          name: "小微企业",
        },
        {
          value: "5",
          label: "一般",
          name: "一般",
        },
      ],
      //首页监控类型
      monitoringTypeList1: [
        {
          value: "1",
          label: "国家级",
          name: "国家级",
        },
        {
          value: "2",
          label: "省级",
          name: "省级",
        },
        {
          value: "3",
          label: "市级",
          name: "市级",
        },
        {
          value: "4",
          label: "小微企业",
          name: "小微企业",
        },
        {
          value: "5",
          label: "一般",
          name: "一般",
        },
      ],
      //是否与省平台同步
      monitoringTypeChcek: [
        {
          value: "1",
          label: "同步",
          name: "同步",
        },
        {
          value: "0",
          label: "不同步",
          name: "不同步",
        },
      ],
    };
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.reset();
      this.loadingData();
    }
    this.$route.meta.isUseCache = false;
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "newEntBase" || to.name == "enterpriseProductionBook") {
      from.meta.isUseCache = true;
    }
    next();
  },
  created: function () {
    this.username === "linyi" ? this.getRegionChildrenList() : null;
    this.deviceManufacturer();
    this.entClassFindList();
  },
  methods: {
    reset() {
      this.tableDatas = [];
      this.ruleForm.deviceManufacturerNum = [];
      this.ruleForm.check = "";
      this.search = "";
      this.cur_page = 1;
      this.regionCode = sessionStorage.getItem("regionCode");
    },
    // 获取企业类型列表
    entClassFindList(type = 1) {
      const params = {
        type,
        pageSize: 1000,
        currentPage: 1,
      };
      this.$axios
        .get(`/api/permissions/entClass/find`, { params })
        .then((resp) => {
          if (!resp.code) {
            const { data } = resp;
            this.businessList = data.list;
          }
        })
        .catch((error) => {});
    },
    //查询设备厂商
    deviceManufacturer() {
      this.$axios
        .get("/api/regulatory/supplier/selectSuppliers")
        .then((res) => {
          this.deviceManufacturerList = res.data;
        })
        .catch((err) => {});
    },
    //点击编辑按钮
    handelEdit(item) {
      this.ruleForm.business = [];
      this.ruleForm.business1 = "";
      this.addDialogVisible = true;
      this.nameList = item.entKind;
      this.ruleForm.applicationTitle = item.name; //企业名称回显
      this.ruleForm.contacts = item.managerName; //联系人回显
      this.ruleForm.iphone = item.contactsPhone; //后几号回显
      this.entKindStatus = item.entKind; //判断是经营企业还是产废企业
      this.titleName = item.name; //标题回显
      this.ruleForm.check = item.status; //是否与省平台同步回显
      this.uid = item.id;
      this.ruleForm.checkList = item.entType ? item.entType.split(",") : [];

      for (const key in item) {
        if (Object.keys(this.ruleForm).includes(key)) {
          this.ruleForm[key] = item[key];
        }
      }
      if (item.entKind == "经营企业") {
        this.ruleForm.business = item.entSubClass
          ? item.entSubClass.split(",")
          : [];
      } else {
        this.ruleForm.business1 = item.entSubClass ? item.entSubClass : "";
      }
    },
    deviceManufacturerNumChange(val) {
      this.ruleForm.deviceManufacturerNum = val;
    },
    statusChange(val) {
      this.ruleForm.business = val;
    },
    statusChange1(val) {
      this.ruleForm.business = val;
    },
    check(val) {
      this.productionStatus = val;
    },
    //点击保存
    handelSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id: this.uid,
            entType: this.ruleForm.checkList.join(","),
            entSubClass: this.ruleForm.business,
            status: this.ruleForm.check,
          };
          if (this.nameList == "经营企业") {
            params.entSubClass = this.ruleForm.business.join(",");
          } else {
            params.entSubClass = this.ruleForm.business1;
          }
          this.$axios
            .post("/api/regulatory/tEnterpriseInfo/editEnterpriseInfo", params)
            .then((res) => {
              if (res.code == 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.addDialogVisible = false;
                this.loadingData();
              } else {
                this.$message.error("保存失败");
              }
            })
            .catch((err) => {});
        }
      });
    },
    handleClose() {
      this.entInfoOperationDialogVisible = false;
      this.$refs.entInfoOperation.$refs.addEntInfo.$refs[
        "entRuleForm"
      ].clearValidate();
      this.$refs.entInfoOperation.activeName = "first";
    },
    add() {
      this.entInfoOperationDialogVisible = true;
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },

    jumpAddress(adress, entId, regionCode, correlationId, entKind) {
      if (null != adress && adress != "") {
        this.$router.push({
          path: "/" + adress,
          query: {
            entId: entId,
            regionCode: regionCode,
            correlationId: correlationId,
            entKind: entKind,
          },
        });
      }
    },
    jumpAddressToProductionBook(entId, entName, regionName, entKind) {
      if (entKind == "产废企业") {
        this.$router.push({
          path: "/" + "enterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
      if (entKind == "收集企业") {
        this.$router.push({
          path: "/" + "collectEnterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
      if (entKind == "经营企业") {
        this.$router.push({
          path: "/" + "managementEnterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
    },

    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.loadingData();
    },
    handleCurrentChange(newPage) {
      this.cur_page = newPage;
      this.loadingData();
    },
    show() {
      this.cur_page = 1;
      this.loadingData();
    },
    addHtml(item) {
      if (item == null) {
        return;
      }
      var items = item.toString().split(",");
      var html = "";
      for (var i = 0; i < items.length; i++) {
        var num = items[i];
        if (num == 1) {
          html =
            html +
            "<div style='height: 30px;width: 80px;background-color: #33FFFF;margin-right: 2px;padding:5px 5px;color: white;display:inline;'>国家级</div>";
        } else if (num == 2) {
          html =
            html +
            "<div style='height: 30px;width: 80px;background-color: #FFAA33;margin-right: 2px;padding:5px 5px;color: white;display:inline'>省级</div>";
        } else if (num == 3) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #33CCFF;margin-right: 2px;padding:5px 5px;color: white;display:inline'>市级</div>";
        } else if (num == 4) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #FF7744;margin-right: 2px;padding:5px 5px;color: white;display:inline'>小微企业</div>";
        } else if (num == 5) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #33FF33;margin-right: 2px;padding:5px 5px;color: white;display:inline'>一般固废</div>";
        }
      }
      return html;
    },
    loadingData() {
      var _this = this;
      let params = {
        pageNo: _this.cur_page,
        pageSize: _this.pageSize,
        entKind: _this.entKind,
        name: _this.search,
        supplierCode: _this.ruleForm.deviceManufacturerNum,
        entTypes: _this.ruleForm.enterpriseType,
        status: _this.productionStatus
          ? parseInt(_this.productionStatus)
          : null,
      };
      this.username === "linyi" ? (params.regionCode = _this.regionCode) : null;
      _this.loading = true;
      _this.$axios
        .post(
          "/api/regulatory/tEnterpriseManagement/selectEnterpriseDetails",
          params
        )
        .then((response) => {
          if (response.code == 0) {
            _this.loading = false;
            _this.tableDatas = response.data.records;
            _this.total = response.data.total;
            _this.totalPage = response.data.pages;
          }
        })
        .catch((error) => {
          _this.loading = false;
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
          if (res.code == 0 && res.data.length > 0) {
            const secondLevelRegin = res.data[0].children;
            secondLevelRegin.unshift({
              label: res.data[0].label,
              value: sessionStorage.getItem("regionCode"),
            });
            _this.regionOptions = secondLevelRegin;
          }
        })
        .catch((error) => {});
    },
    closeData() {},
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.regionCode = regionInfo[0].value;
      }
    },
  },
};
</script>

<style scoped>
.filter-item {
  display: flex !important;
}
.el-checkbox-group {
  display: flex !important;
}
.el-checkbox-group {
  margin-left: 15px;
}
.el-table {
  border: 0;
}
.el-table th.is-leaf,
.el-table th {
  background: rgba(223, 234, 251, 0.3);
}
.panel {
  box-sizing: border-box;
}
.el-table::before {
  height: 0;
}
</style>
