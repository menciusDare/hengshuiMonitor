<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"  class="text-conent"><i class="icon icon-zhuanyun"></i>定时任务</a><span class="sep">></span><span class="text-primary">调度日志</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">任务名称：</div>
              <div class="filter-con">
                <div class="el-input w160">
                  <el-input
                      placeholder="请输入任务名称"
                      v-model="queryParams.jobName" >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">任务组名：</div>
              <div class="filter-con">
                <el-select v-model="queryParams.jobGroup" placeholder="请选择任务组名" style="width: 150px">
                  <el-option
                      v-for="dict in jobGroupOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  />
                </el-select>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">执行状态：</div>
              <div class="filter-con">
                <el-select v-model="queryParams.status" placeholder="请选择任务状态" style="width: 150px">
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
              <div class="filter-label">执行时间：</div>
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
            <el-col :span="1.5">
              <el-button
                  type="info"
                  plain
                  icon="el-icon-s-operation"
                  size="mini"
                  @click="handleClose"
              >任务</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="width: 100%;" >
        <el-table v-loading="loading" :data="jobLogList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="日志编号" width="80" align="center" prop="jobLogId" />
          <el-table-column label="任务名称" align="center" prop="jobName" :show-overflow-tooltip="true" />
          <el-table-column label="任务组名" align="center" prop="jobGroup" :formatter="jobGroupFormat" />
          <el-table-column label="调用目标字符串" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
          <el-table-column label="日志信息" align="center" prop="jobMessage" :show-overflow-tooltip="true" />
          <el-table-column label="执行状态" align="center" prop="status" :formatter="commonStatusFormat"/>
          <el-table-column label="执行时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-view"
                  @click="handleView(scope.row)"
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
    <!-- 调度日志详细 -->
    <el-dialog title="调度日志详细" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日志序号：">{{ form.jobLogId }}</el-form-item>
            <el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分组：">{{ form.jobGroup }}</el-form-item>
            <el-form-item label="执行时间：">{{ form.createTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调用方法：">{{ form.invokeTarget }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日志信息：">{{ form.jobMessage }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="执行状态：">
              <div v-if="form.status == 0">正常</div>
              <div v-else-if="form.status == 1">失败</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status == 1">{{ form.exceptionInfo }}</el-form-item>
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
name: "jobRecord",
components:{

},
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
    // 调度日志表格数据
    jobLogList: [],
    // 是否显示弹出层
    open: false,
    // 日期范围
    dateRange: [],
    // 默认排序
    defaultSort: {prop: 'createTime', order: 'descending'},
    // 表单参数
    form: {},
    // 任务组名字典
    jobGroupOptions: [
      {
        "dictValue":"DEFAULT",
        "dictLabel":"默认"
      },{
        "dictValue":"SYSTEM",
        "dictLabel":"系统"
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
      jobName: "",
      jobGroup: "",
      status: "",
      orderByColumn:"operTime",
      isAsc:"descending"
    }
  };
},
created() {
  const jobId = this.$route.query.jobId;
  if (jobId !== undefined && jobId != 0) {
    this.getJob(jobId).then(response => {
      this.queryParams.jobName = response.data.jobName;
      this.queryParams.jobGroup = response.data.jobGroup;
      this.getList();
    });
  } else {
    this.getList();
  }
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
  /** 排序触发事件 */
  handleSortChange(column, prop, order) {
    this.queryParams.orderByColumn = column.prop;
    this.queryParams.isAsc = column.order;
    this.getList();
  },
  // 查询任务信息
  getJob(jobId){
    return new Promise((resolve, reject) => {
      let self = this;
      self.$axios.get('/api/cronjob/job/'+jobId).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        resolve(err);
      })
    })
  },
  // 任务组名字典翻译
  jobGroupFormat(row, column) {
    return this.selectDictLabel(this.jobGroupOptions, row.jobGroup);
  },
  // 状态字典翻译
  commonStatusFormat(row, column) {
    return this.selectDictLabel(this.commonStatusOptions, row.status);
  },
  /** 查询调度日志列表 */
  getList() {
    var that = this;
    that.loading = true;
    var url = '/api/cronjob/job/log/list';
    var params = new URLSearchParams();
    params.append('pageNum', that.cur_page);
    params.append('pageSize', that.pageSize);
    params.append('jobName', that.queryParams.jobName);
    params.append('jobGroup', that.queryParams.jobGroup);
    params.append('status', that.queryParams.status);
    if(that.queryParams.isAsc!=null){
      params.append('orderByColumn', that.queryParams.orderByColumn);
      params.append('isAsc', that.queryParams.isAsc);
    }
    that.$axios.get(url,{params}).then(function (response) {
      that.jobLogList = response.rows;
      that.total = response.total;
      that.loading = false;
    }).catch(function (err) {
      that.$message.error("登录失败,连接服务器失败!")
    })
  },
  // 返回按钮
  handleClose() {
    this.$router.push({ path: '/jobList'})
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
    this.handleQuery();
  },
  // 多选框选中数据
  handleSelectionChange(selection) {
    this.ids = selection.map(item => item.jobLogId);
    this.multiple = !selection.length;
  },
  /** 详细按钮操作 */
  handleView(row) {
    this.open = true;
    this.form = row;
  },
  /** 删除按钮操作 */
  handleDelete(row) {
    const jobLogIds = this.ids;
    this.$confirm('是否确认删除调度日志编号为"' + jobLogIds + '"的数据项？', "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(()=> {
      // delJobLog(jobLogIds);
      this.delJobLog(jobLogIds).then(response => {
        if(response.code==200){
          this.$message.success("删除调度日志编号为:"+jobLogIds + "的数据项成功");
          this.getList();
        }else{
          this.$message.warning(response.msg);
        }
      }).catch(err=>{
        this.$message.error("删除调度日志编号为:"+jobLogIds + "的数据项异常,请重试!")
      });
    }).catch(() => {

    });
  },
  /** 执行删除*/
  delJobLog(jobLogIds){
    return new Promise((resolve, reject) => {
      let self = this;
      self.$axios.post(
          '/api/cronjob/job/log/delete/' + jobLogIds
      ).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        resolve(err);
      })
    })
  },
  /** 清空按钮操作 */
  handleClean() {
    this.$confirm('是否确认清空所有调度日志数据项？', "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(()=> {
      this.cleanJobLog().then(response => {
        if(response.code==200){
          this.$message.success("清空所有调度日志数据项成功");
          this.getList();
        }else{
          this.$message.warning(response.msg);
        }
      }).catch(err=>{
        this.$message.error("清空所有调度日志数据项异常,请重试!")
      });
    }).catch(() => {

    });
  },
  /** 执行清空*/
  cleanJobLog(){
    return new Promise((resolve, reject) => {
      let self = this;
      self.$axios.post(
          '/api/cronjob/job/log/clean'
      ).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        resolve(err);
      })
    })
  },
  /** 导出按钮操作 */
  // handleExport() {
  //   this.download('schedule/job/log/export', {
  //     ...this.queryParams
  //   }, `log_${new Date().getTime()}.xlsx`)
  // }
}
}
</script>

<style scoped>

</style>
