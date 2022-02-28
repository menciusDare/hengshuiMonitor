<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"  class="text-conent"><i class="icon icon-zhuanyun"></i>定时任务</a><span class="sep">></span><span class="text-primary">操作日志</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">系统模块：</div>
              <div class="filter-con">
                <div class="el-input w160">
                  <el-input
                      placeholder="请输入系统模块"
                      v-model="queryParams.title" >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">操作人员：</div>
              <div class="filter-con">
                <div class="el-input w160">
                  <el-input
                      placeholder="请输入操作人员"
                      v-model="queryParams.operName" >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">操作类型：</div>
              <div class="filter-con">
                <el-select v-model="queryParams.businessType" placeholder="请选择操作类型" style="width: 150px">
                  <el-option
                      v-for="dict in sysOperTypeOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  />
                </el-select>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">操作状态：</div>
              <div class="filter-con">
                <el-select v-model="queryParams.status" placeholder="请选择操作状态" style="width: 150px">
                  <el-option
                      v-for="dict in commonStatusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  />
                </el-select>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">操作时间：</div>
              <div class="filter-con">
                <el-date-picker
                    v-model="dateRange"
                    size="small"
                    style="width: 240px"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button type="primary"  size="medium"  @click="handleQuery" class="el-button el-icon-search">
                  <span>搜索</span></el-button>
              </div>
            </li>
          </ul>
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="mini"
                  :disabled="multiple"
                  @click="handleDelete"
              >删除</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleClean"
              >清空</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="width: 100%;" >
        <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="日志编号" align="center" prop="operId" />
          <el-table-column label="系统模块" align="center" prop="title" />
          <el-table-column label="操作类型" align="center" prop="businessType" :formatter="businessTypeFormat"/>
          <el-table-column label="请求方式" align="center" prop="requestMethod" />
          <el-table-column label="操作人员" align="center" prop="operName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" width="100"/>
          <el-table-column label="主机" align="center" prop="operIp" width="130" :show-overflow-tooltip="true" />
          <el-table-column label="操作状态" align="center" prop="status" :formatter="commonStatusFormat"/>
          <el-table-column label="操作日期" align="center" prop="operTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.operTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-view"
                  @click="handleView(scope.row,scope.index)"
              >详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{total}} 条</span>
        <span class="el-pagination__total">
          <el-pagination
              v-if="total>1"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total">
          </el-pagination>
        </span>
      </div>
    </div>
    <!-- 操作日志详细 -->
    <el-dialog title="操作日志详细" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块：">{{ form.title }} / {{ typeFormat(form) }}</el-form-item>
            <el-form-item
                label="登录信息："
            >{{ form.operName }} / {{ form.operIp }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
            <el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态：">
              <div v-if="form.status === 0">正常</div>
              <div v-else-if="form.status === 1">失败</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间：">{{ parseTime(form.operTime) }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status === 1">{{ form.errorMsg }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "operlogList",
  components: {},
  data() {
    return {
      // 总条数
      total: 0,
      totalPage:0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,


      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 默认排序
      defaultSort: {prop: 'operTime', order: 'descending'},
      // 表单参数
      form: {},
      // 任务组名字典
      sysOperTypeOptions: [
        {
          "dictValue":"1",
          "dictLabel":"新增"
        },{
          "dictValue":"2",
          "dictLabel":"修改"
        },{
          "dictValue":"3",
          "dictLabel":"删除"
        },{
          "dictValue":"4",
          "dictLabel":"授权"
        },{
          "dictValue":"5",
          "dictLabel":"导出"
        },{
          "dictValue":"6",
          "dictLabel":"导入"
        },{
          "dictValue":"8",
          "dictLabel":"生成代码"
        },{
          "dictValue":"9",
          "dictLabel":"清空数据"
        }
      ],
      // 状态字典
      commonStatusOptions: [
        {
          "dictValue":"0",
          "dictLabel":"成功"
        },{
          "dictValue":"1",
          "dictLabel":"失败"
        }
      ],
      // 查询参数
      queryParams: {
        title: "",
        operName: "",
        businessType: "",
        status: "",
        orderByColumn:"operTime",
        isAsc:"descending"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize=val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page=1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getList();
    },
    // 操作日志类型字典翻译
    typeFormat(row) {
      return this.selectDictLabel(this.sysOperTypeOptions, row.businessType);
    },
    // 操作类型翻译
    businessTypeFormat(row, column) {
      return this.selectDictLabel(this.sysOperTypeOptions, row.businessType);
    },
    // 状态字典翻译
    commonStatusFormat(row, column) {
      return this.selectDictLabel(this.commonStatusOptions, row.status);
    },
    /** 查询登录日志 */
    getList() {
      // list(this.addDateRange(this.queryParams, this.dateRange)).then( response => {
      //       this.list = response.rows;
      //       this.total = response.total;
      //       this.loading = false;
      //     }
      // );
      var that = this;
      that.loading = true;
      var url = '/api/cronjob/operlog/list';
      var params = new URLSearchParams();
      params.append('pageNum', that.cur_page);
      params.append('pageSize', that.pageSize);
      params.append('title', that.queryParams.title);
      params.append('operName', that.queryParams.operName);
      params.append('businessType', that.queryParams.businessType);
      params.append('status', that.queryParams.status);
      if(that.queryParams.isAsc!=null){
        params.append('orderByColumn', that.queryParams.orderByColumn);
        params.append('isAsc', that.queryParams.isAsc);
      }
      that.$axios.get(url,{params}).then(function (response) {
        that.list = response.rows;
        that.total = response.total;
        that.loading = false;
      }).catch(function (err) {
        that.$message.error("登录失败,连接服务器失败!")
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order)
      this.handleQuery();
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.operId)
      this.multiple = !selection.length
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    /** 详细按钮操作 */
    handleView(row) {
      this.open = true;
      this.form = row;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const operIds = row.operId || this.ids;
      this.$confirm('是否确认删除日志编号为"' + operIds + '"的数据项？', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.delOperlog(operIds).then(response => {
          if(response.code==200){
            this.$message.success("删除日志编号为:"+operIds + "的数据项成功");
            this.getList();
          }else{
            this.$message.warning(response.msg);
          }
        }).catch(err=>{
          this.$message.error("删除日志编号为:"+operIds + "的数据项异常,请重试!")
        });
      }).catch(() => {

      });
    },
    /**执行删除*/
    delOperlog(operIds){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/operlog/delete/' + operIds
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 清空按钮操作 */
    handleClean() {
      this.$confirm('是否确认清空所有操作日志数据项？', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.cleanOperlog().then(response => {
          if(response.code==200){
            this.$message.success("清空所有操作日志数据项成功");
            this.getList();
          }else{
            this.$message.warning(response.msg);
          }
        }).catch(err=>{
          this.$message.error("清空所有操作日志数据项异常,请重试!")
        });
      }).catch(() => {

      });
    },
    /** 执行清空*/
    cleanOperlog(){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/operlog/clean'
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 导出按钮操作 */
    // handleExport() {
    //   this.download('system/operlog/export', {
    //     ...this.queryParams
    //   }, `operlog_${new Date().getTime()}.xlsx`)
    // }
  }
}
</script>

<style scoped>

</style>
