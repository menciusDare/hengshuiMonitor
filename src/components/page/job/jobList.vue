<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"  class="text-conent"><i class="icon icon-zhuanyun"></i>定时任务</a><span class="sep">></span><span class="text-primary">任务管理</span>
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
              <div class="filter-label">任务状态：</div>
              <div class="filter-con">
                <el-select v-model="queryParams.status" placeholder="请选择任务状态" style="width: 150px">
                  <el-option
                      v-for="dict in statusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  />
                </el-select>
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
                  type="primary"
                  plain
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAdd"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                  type="success"
                  plain
                  icon="el-icon-edit"
                  size="mini"
                  :disabled="single"
                  @click="handleUpdate"
              >修改</el-button>
            </el-col>
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
<!--            <el-col :span="1.5">
              <el-button
                  type="warning"
                  plain
                  icon="el-icon-download"
                  size="mini"
                  @click="handleExport"
              >导出</el-button>
            </el-col>-->
            <el-col :span="1.5">
              <el-button
                  type="info"
                  plain
                  icon="el-icon-s-operation"
                  size="mini"
                  @click="handleJobLog"
              >日志</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="width: 100%;" >
        <el-table v-loading="loading" :data="jobList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="任务编号" align="center" prop="jobId" />
          <el-table-column label="任务名称" align="center" prop="jobName" :show-overflow-tooltip="true" />
          <el-table-column label="任务组名" align="center" prop="jobGroup" :formatter="jobGroupFormat" />
          <el-table-column label="调用目标字符串" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
          <el-table-column label="cron执行表达式" align="center" prop="cronExpression" :show-overflow-tooltip="true" />
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
              >删除</el-button>
              <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-d-arrow-right el-icon--right"
                >更多</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="handleRun" icon="el-icon-caret-right"
                                    >执行一次</el-dropdown-item>
                  <el-dropdown-item command="handleView" icon="el-icon-view"
                                    >任务详细</el-dropdown-item>
                  <el-dropdown-item command="handleJobLog" icon="el-icon-s-operation"
                                    >调度日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
      <!-- 添加或修改定时任务对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称" prop="jobName">
                <el-input v-model="form.jobName" placeholder="请输入任务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务分组" prop="jobGroup">
                <el-select v-model="form.jobGroup" placeholder="请选择">
                  <el-option
                      v-for="dict in jobGroupOptions"
                      :key="dict.dictValue"
                      :label="dict.dictLabel"
                      :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="invokeTarget">
              <span slot="label">
                调用方法
                <el-tooltip placement="top">
                  <div slot="content">
                    Bean调用示例：ryTask.ryParams('ry')
                    <br />Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
                    <br />参数说明：支持字符串，布尔类型，长整型，浮点型，整型
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
                <el-input v-model="form.invokeTarget" placeholder="请输入调用目标字符串" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="cron表达式" prop="cronExpression">
                <el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式">
                  <template slot="append">
                    <el-button type="primary" @click="handleShowCron">
                      生成表达式
                      <i class="el-icon-time el-icon--right"></i>
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="错误策略" prop="misfirePolicy">
                <el-radio-group v-model="form.misfirePolicy" size="small">
                  <el-radio-button label="1">立即执行</el-radio-button>
                  <el-radio-button label="2">执行一次</el-radio-button>
                  <el-radio-button label="3">放弃执行</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否并发" prop="concurrent">
                <el-radio-group v-model="form.concurrent" size="small">
                  <el-radio-button label="0">允许</el-radio-button>
                  <el-radio-button label="1">禁止</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio
                      v-for="dict in statusOptions"
                      :key="dict.dictValue"
                      :label="dict.dictValue"
                  >{{dict.dictLabel}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Cron表达式生成器" :visible.sync="openCron" append-to-body destroy-on-close class="scrollbar">
        <crontab @hide="openCron=false" @fill="crontabFill" :expression="expression"></crontab>
      </el-dialog>
      <!-- 任务日志详细 -->
      <el-dialog title="任务详细" :visible.sync="openView" width="700px" append-to-body>
        <el-form ref="form" :model="form" label-width="120px" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务编号：">{{ form.jobId }}</el-form-item>
              <el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务分组：">{{ jobGroupFormat(form) }}</el-form-item>
              <el-form-item label="创建时间：">{{ form.createTime }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="cron表达式：">{{ form.cronExpression }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次执行时间：">{{ parseTime(form.nextValidTime) }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调用目标方法：">{{ form.invokeTarget }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务状态：">
                <div v-if="form.status == 0">正常</div>
                <div v-else-if="form.status == 1">暂停</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否并发：">
                <div v-if="form.concurrent == 0">允许</div>
                <div v-else-if="form.concurrent == 1">禁止</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行策略：">
                <div v-if="form.misfirePolicy == 0">默认策略</div>
                <div v-else-if="form.misfirePolicy == 1">立即执行</div>
                <div v-else-if="form.misfirePolicy == 2">执行一次</div>
                <div v-else-if="form.misfirePolicy == 3">放弃执行</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openView = false">关 闭</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import Crontab from '../../../components/Crontab/index'
export default {
  name: "jobList",
  components: {
    Crontab
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
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 定时任务表格数据
      jobList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示详细弹出层
      openView: false,
      // 是否显示Cron表达式弹出层
      openCron: false,
      // 传入的表达式
      expression: "",
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
      statusOptions: [
        {
          "dictValue":"0",
          "dictLabel":"正常"
        },{
          "dictValue":"1",
          "dictLabel":"暂停"
        }
      ],
      // 查询参数
      queryParams: {
        jobName: "",
        jobGroup: "",
        status: ""
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jobName: [
          { required: true, message: "任务名称不能为空", trigger: "blur" }
        ],
        invokeTarget: [
          { required: true, message: "调用目标字符串不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron执行表达式不能为空", trigger: "blur" }
        ]
      }
    };
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
    /** 查询定时任务列表 */
    getList() {
      var that = this;
      that.loading = true;
      var url = '/api/cronjob/job/list';
      var params = new URLSearchParams();
      params.append('pageNum', that.cur_page);
      params.append('pageSize', that.pageSize);
      params.append('jobName', that.queryParams.jobName);
      params.append('jobGroup', that.queryParams.jobGroup);
      params.append('status', that.queryParams.status);
      that.$axios.get(url,{params}).then(function (response) {
        that.jobList = response.rows;
        that.total = response.total;
        that.loading = false;
      }).catch(function (err) {
        that.$message.error("登录失败,连接服务器失败!")
      })
    },
    // 任务组名字典翻译
    jobGroupFormat(row, column) {
      return this.selectDictLabel(this.jobGroupOptions, row.jobGroup);
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        jobId: "",
        jobName: "",
        jobGroup: "",
        invokeTarget: "",
        cronExpression: "",
        misfirePolicy: 1,
        concurrent: 1,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 表单重置*/
    resetForm(refName) {
      if (this.$refs[refName]) {
        this.$refs[refName].resetFields();
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.cur_page=1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.jobId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleRun":
          this.handleRun(row);
          break;
        case "handleView":
          this.handleView(row);
          break;
        case "handleJobLog":
          this.handleJobLog(row);
          break;
        default:
          break;
      }
    },
    // 任务状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.jobName + '"任务吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.changeJobStatus(row.jobId, row.status).then(response => {
          if(response.code==200){
            this.$message.success(text + "成功");
          }else{
            this.$message.warning(response.msg);
          }
        }).catch(err=>{
          this.$message.error(text+"异常,请重试!")
        });
      }).catch(()=> {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    /** 修改任务状态*/
    changeJobStatus(jobId, status){
      const data = {
        jobId,
        status
      }
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/job/changeStatus',
            data
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /* 立即执行一次 */
    handleRun(row) {
      this.$confirm('确认要立即执行一次"' + row.jobName + '"任务吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.runJob(row.jobId, row.jobGroup).then(response => {
          if(response.code==200){
            this.$message.success(row.jobName + "任务执行一次成功");
          }else{
            this.$message.warning(response.msg);
          }
        }).catch(err=>{
          this.$message.error(row.jobName+"任务执行一次异常,请重试!")
        });
      }).catch(() => {

      });
    },
    /** 执行一次任务*/
    runJob(jobId,jobGroup){
      const data = {
        jobId,
        jobGroup
      }
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/job/run',
            data
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 任务详细信息 */
    handleView(row) {
      this.getJob(row.jobId).then(response => {
        this.form = response.data;
        this.openView = true;
      });
    },
    /** 任务日志列表查询 */
    handleJobLog(row) {
      const jobId = row.jobId || 0;
      this.$router.push({ path: '/jobRecord', query: { jobId: jobId } })
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加任务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const jobId = row.jobId || this.ids;
      this.getJob(jobId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改任务";
      }).catch(err=>{
        this.$message.error("获取任务信息异常,请重试!")
      });
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
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.jobId != "") {
            this.updateJob(this.form).then(response => {
              if(response.code==200){
                this.$message.success("修改成功");
                this.open = false;
                this.getList();
              }else{
                this.$message.warning(response.msg);
              }
            }).catch(err=>{
              this.$message.error("修改异常,请重试!")
            });;
          } else {
            this.addJob(this.form).then(response => {
              if(response.code==200){
                this.$message.success("新增成功");
                this.open = false;
                this.getList();
              }else{
                this.$message.warning(response.msg);
              }
            }).catch(err=>{
              this.$message.error("新增异常,请重试!")
            });
          }
        }
      });
    },
    /** 新增任务提交*/
    addJob(from){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/job',
            from
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 更新任务*/
    updateJob(from){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/job/update',
            from
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const jobIds = row.jobId || this.ids;
      this.$confirm('是否确认删除定时任务编号为"' + jobIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        this.delJob(jobIds).then(response => {
          if(response.code==200){
            this.$message.success("删除编号为:"+jobIds + "的任务成功");
            this.getList();
          }else{
            this.$message.warning(response.msg);
          }
        }).catch(err=>{
          this.$message.error("删除编号为:"+jobIds+"的任务异常,请重试!")
        });
      }).catch(() => {

      });
    },
    delJob(jobIds){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.post(
            '/api/cronjob/job/deleteJob/'+jobIds
        ).then(function (res) {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      // this.download('schedule/job/export', {
      //   ...this.queryParams
      // }, `job_${new Date().getTime()}.xlsx`)
    },
    /** cron表达式按钮操作 */
    handleShowCron() {
      this.expression = this.form.cronExpression;
      this.openCron = true;
    },
    /** 确定后回传值 */
    crontabFill(value) {
      this.form.cronExpression = value;
    },
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>

</style>
