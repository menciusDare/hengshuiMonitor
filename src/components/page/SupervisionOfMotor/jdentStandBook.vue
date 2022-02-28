<template>
    <!-- 主体 -->
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-select style="width:100%" v-model="regionCode" placeholder="请先选择所在地">
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
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-select
                                        v-model="entKind"
                                        placeholder="请选择企业类型"
                                    >
                                        <el-option
                                            v-for="item in entKinds"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <!-- <li class="filter-item">
              <div class="filter-label">监控状态：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="monitorType" placeholder="请选择监控状态">
                    <el-option
                      v-for="item in monitorTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li> -->
                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <div
                                    class="el-input w180 el-input-group el-input--prefix"
                                >
                                    <!---->
                                    <el-input
                                        v-model.trim="search"
                                        placeholder="请输入企业名称"
                                    >
                                        <i
                                            slot="prefix"
                                            class="el-input__icon el-icon-search"
                                        ></i>
                                    </el-input>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" class="button-type" @click="show">
                  <span>查询</span>
                </button>-->
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
            <!-- <div class="total-number" style="margin-left: 20px">
        <div class="total-name">
          全部企业
          <span class="num">{{entTotal.total}}</span>家
        </div>
        <div class="total-text">
          正常企业
          <span class="num">{{entTotal.normal}}</span>家
        </div>
        <div class="total-text is-offline">
          离线企业
          <span class="num">{{entTotal.offLine}}</span>家
        </div>
      </div> -->
            <table class="table-default" v-loading="showLoading">
                <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 14%">企业名称</th>
                        <th style="text-align:center;width: 10%">企业类型</th>
                        <th style="text-align:center;width: 10%">所在地</th>
                        <th style="text-align:center;width: 10%">所属行业</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 10%">电话</th>
                        <!-- <th style="text-align:center;width: 10%">监控状态</th> -->
                        <!--<th style="text-align:center;width: 10%">最近更新时间</th>-->
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in tableDatas">
                        <td style="text-align:center;width: 6%">
                            {{ item.index }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                            :title="item.name"
                        >
                            {{ item.name }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                            :title="item.entKind"
                        >
                            {{ item.entKind }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                            :title="item.regionName"
                        >
                            {{ item.regionName }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                            :title="item.categoryName"
                        >
                            {{ item.categoryName }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                            :title="item.contacts"
                        >
                            {{ item.contacts }}
                        </td>
                        <td
                            style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                            :title="item.contactsPhone"
                        >
                            {{ item.contactsPhone }}
                        </td>
                        <!-- <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.monitorType"
            >
              <div
                :class="item.monitorType=='正常'?'text-state':'text-state state-off'"
              >{{item.monitorType}}</div>
            </td> -->
                        <!--<td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.monitorTime"
            >{{item.monitorTime}}</td>-->
                        <td style="text-align:center;width: 10%">
                            <a
                                href="javascript:;"
                                class="text-primary text-underline"
                                @click="
                                    jumpAddress(
                                        'wasteProductionBook',
                                        item.entId,
                                        item.name,
                                        item.regionName
                                    )
                                "
                                >查看</a
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="el-pagination is-background mt-lg">
                <span class="el-pagination__total"
                    >共 {{ total }} 条，每页显示</span
                >
                <span class="el-pagination__total">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="cur_page"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="sizes, prev, pager, next"
                        :total="total"
                    ></el-pagination>
                </span>

                <span class="el-pagination__total">共 {{ totalPage }} 页</span>
            </div>
        </div>
        <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>
    </div>
</template>

<script>
import productionVideoHuiKan from "../standingBook/ProductionVideoHuiKan.vue";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
    name: "VideoMonitor",
    components: {
        productionVideoHuiKan,
        BreadcrumbComponent
    },
    data() {
        return {
            routePath: this.$route.path,
            showLoading: false,
            entTypes: [
                { value: -1, label: "全部" },
                { value: 1, label: "重点企业" },
                { value: 2, label: "一般企业" },
            ],
            entKinds: [
                { value: -1, label: "全部" },
                { value: 1, label: "产废企业" },
                { value: 2, label: "经营企业" },
                { value: 3, label: "收集企业" },
            ],
            isDisabled: false,
            monitorTypes: [
                { value: -1, label: "全部" },
                { value: 1, label: "正常" },
                { value: 2, label: "异常" },
            ],
            cur_page: 1,
            pageSizes: this.AppConfig.appInfo.pageSizes,
            pageSize: this.AppConfig.appInfo.pageSize,
            tableDatas: [],
            total: 0,
            totalPage: 0,
            regionOptions: [],
            regionCode: [], //[],
            monitorType: -1,
            entType: -1,
            entKind: -1,
            search: "",
            sort: 2,
            entTotal: {},
            regionLevel: sessionStorage.getItem("regionLevel"),
        };
    },
    created: function() {
        if (this.regionLevel == 3) {
            this.isDisabled = true;
        }
        this.getRegionChildrenList();
    },
    activated() {        
        if(!this.$route.meta.isUseCache){            
            this.reset();
            this.loadingData();
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == 'wasteProductionBook') {
            from.meta.isUseCache = true;    
        }        
        next();
    },
    methods: {
        reset() {
            this.tableDatas = [];
            this.search = '';
            this.entKind = '';
            this.cur_page = 1;
            this.regionCode = sessionStorage.getItem('regionCode');
        },
        jumpAddress(adress, entId, entName, regionName) {
            if (null != adress && adress != "") {
                this.$router.push({
                    path: "/" + adress,
                    query: {
                        entId: entId,
                        entName: entName,
                        regionName: regionName,
                    },
                });
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
        getIndex(index) {
            let curPage = this.cur_page;
            let limitPage = this.pageSize;
            return index + 1 + (curPage - 1) * limitPage;
        },
        show() {
            this.cur_page = 1;
            this.loadingData();
        },
        loadingData() {
            this.showLoading = true;
            var _this = this;
            var url =
                "/api/regulatory/tVideocamera/selectCollectOrManagementEnterprisePage";
            // var url = "/api2/tVideocamera/selectEnterprisePage";
            var region =
                sessionStorage.getItem("regionCode") == null
                    ? _this.AppConfig.appInfo.regionCode
                    : sessionStorage.getItem("regionCode");
            if (null != _this.regionCode && _this.regionCode.length > 0) {
                region = _this.regionCode[_this.regionCode.length - 1];
            }
            let params = new URLSearchParams();
            params.append("page", _this.cur_page);
            params.append("limit", _this.pageSize);
            params.append("entType", _this.entType);
            params.append("monitorType", _this.monitorType);
            params.append("regionCode", this.regionCode);
            params.append("search", _this.search);
            // params.append("entKind", _this.entKind);
            params.append("sort", _this.sort);
            params.append("entSubclass", 1004);
            _this.$axios
                .get(url, { params })
                .then((response) => {
                    this.showLoading = false;
                    if (response.code === 0) {
                        _this.tableDatas = [];
                        for (
                            var i = 0;
                            i < response.data.page.records.length;
                            i++
                        ) {
                            var da = response.data.page.records[i];
                            var obj = {
                                index: _this.getIndex(i),
                                entId: da.entId,
                                name: da.name,
                                entType: da.entType,
                                entKind: da.entKind,
                                regionName: da.regionName,
                                categoryName: da.categoryName,
                                contacts: da.contacts,
                                contactsPhone: da.contactsPhone,
                                monitorType: da.monitorType,
                                monitorTime: da.monitorTime,
                            };
                            _this.tableDatas.push(obj);
                        }
                        _this.entTotal = response.data.entTotal;
                        _this.total = response.data.page.total;
                        _this.totalPage = response.data.page.pages;
                    } else {
                        // console.log(response.msg);
                    }
                })
                .catch((error) => {
                    this.showLoading = false;
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
                .then((res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        const secondLevelRegin = res.data[0].children
                        secondLevelRegin.unshift({label: res.data[0].label, value: sessionStorage.getItem('regionCode')})
                        this.regionOptions = secondLevelRegin
                    }
                })
                .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
        },
        closeData() {
            var _this = this;
        },
        searchRegionChange() {
            let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
            if (regionInfo.length > 0) {
                this.regionCode = regionInfo[0].value;
            }
            /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
        },
    },
};
</script>

<style></style>
