<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel" style=" box-sizing: border-box;">
      <div class="panel-bd">
        <ul class="filter-box">
          <!-- <li class="filter-item ml-lger">
            <div class="filter-label">资讯类型</div>
            <div class="filter-con">
              <el-select v-model="value" style="width: 140px;" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
          <li class="filter-item">
            <div class="filter-label">资讯名称</div>
            <div class="filter-con">
              <el-input v-model="infoName" placeholder="输入资讯名称" style="width: 140px;"></el-input>
            </div>
          </li>-->
          <li class="filter-item">
            <div class="filter-label">发布时间：</div>
            <div class="filter-con">
              <el-date-picker
                v-model="value1"
                type="daterange"
                align="right"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              ></el-date-picker>
            </div>
          </li>
          <li class="filter-item">
            <button
              style="width: 80px;"
              type="button"
              class="el-button el-button--primary"
              @click="addAinformationViwer({fkEquipmentTypeId:''},'发布内容')"
            >
              <!---->
              <!---->
              <span>发布</span>
            </button>
          </li>
          <li class="filter-item" >
            <button
              style="width: 80px;    margin-right: 40px;"
              type="button"
              class="el-button el-button--primary"
              @click="onQuery()"
            >
              <!---->
              <!---->
              <span>查询</span>
            </button>
          </li>
        </ul>
      </div>
    <!-- <el-divider></el-divider> -->
      <div>
        <div>
          <el-table
            class="table-default"
            :data="tableData"
            style="width: 100%"
            stripe
          >
            <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
            <el-table-column prop="type" align="center" label="消息类型" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-if="scope.row.type=='1'">短信</span>
                <span v-if="scope.row.type=='2'">公众号</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createByName"
              align="center"
              label="创建人"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="createDate"
              align="center"
              label="发布时间"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-link
                  style="color:#119B8D"
                  @click="addAinformationViwer(scope.row,'修改发布内容')"
                  type="text"
                  size="small"
                >编辑</el-link>
                <el-link
                  type="text"
                  style="color:#119B8D"
                  size="small"
                  @click="deleteinformationViwer(scope.row,)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="el-pagination is-background mt-lg" style="height:55px ;margin-top: 20px">
        <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
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
        <span class="el-pagination__total">共 {{totalPage}} 页</span>
      </div>
      <el-dialog
        :title="titleDialog"
        width="840px"
        height="400px"
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
        :modal-append-to-body="false"
      >
        <template>
          <div>
            <editorHtml1 ref="editorHtml" @closeDialog="closeDialog()"></editorHtml1>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import editorHtml1 from "./editorHtml1";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  components: { editorHtml1, BreadcrumbComponent },
  name: "informationManagement",
  data() {
    return {
      routePath: this.$route.path,
      // dialogTableVisible:false,
      options: [
        { value: 1, label: "国家政策" },
        { value: 2, label: "地方政策" },
        { value: 3, label: "标准规范" },
        { value: 4, label: "法律法规" },
        { value: 5, label: "环保" },
      ],
      infoName: "",
      options1: [],
      titleDialog: "",
      value: "",
      port: "/api/regulatory",
      tableData: [],
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      title: "",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      value1: "",
    };
  },
  mounted() {
    this.defalutDate();
    this.selectInformation();
  },
  methods: {
    selectInformation() {
      var _this = this;
      let startTime = _this.value1
        ? _this.timestampToTime(_this.value1[0])
        : null;
      let endTime = _this.value1
        ? _this.timestampToTime(_this.value1[1])
        : null;
      var url = _this.port + "/information/selectMessagePushRecord";
      _this.$axios
        .post(url, {
          page: _this.cur_page,
          limit: _this.pageSize,
          startTime: startTime,
          endTime: endTime,
        })
        .then(function (response) {
          if (response.code == 0) {
            _this.tableData = response.data.records;
            _this.totalPage = response.data.pages;
            _this.total = response.data.total;
          } else {
            _this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    //初始化时间
    defalutDate() {
      var now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      this.value1 = [];
      this.value1.push(start);
      this.value1.push(end);
    },
    //
    addOrUpdateinformation() {
      var _this = this;
      var url = _this.port + "/information/saveOrUpdate";
      _this.$axios
        .post(url, _this.form)
        .then(function (response) {
          if (response.code == 0) {
            _this.$message.success("保存成功");
          } else {
            _this.$message.error("保存失败");
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
          _this.$message.error("保存失败");
        });
    },

    deleteInformation(item) {
      var _this = this;
      var url = _this.port + "/information/deleteMessagePushRecord";
      _this.$axios
        .post(url, item)
        .then(function (response) {
          if (response.code == 0) {
            _this.$message.success("删除成功");
          } else {
            _this.$message.error("删除失败");
          }
          _this.selectInformation();
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
          _this.$message.error("删除失败");
        });
    },
    changeinformationType() {
      this.cur_page = 1;
      this.pageSize = 10;
      this.selectInformation();
    },
    addAinformationViwer(item, title) {
      // this.$router.push({
      //   name: "editor1",
      //   params: item,
      // });
      this.titleDialog = title;
      this.dialogFormVisible = true;
        this.$nextTick(function () {
        this.$refs["editorHtml"].pageShow = JSON.parse(JSON.stringify(item));
        this.$refs["editorHtml"].Value = item.content;
         window.tinymce.activeEditor.setContent(item.content);
      });
     
      
    },
    closeDialog(){
      this.dialogFormVisible=false;
       this.selectInformation();
    },
    addOrUpdateAinformationSubmit() {
      this.dialogFormVisible = false;
      this.selectInformation();
      this.addOrUpdateinformation();
    },
    handleSizeChange(value) {
      this.cur_page = 1;
      this.pageSize = value;
      this.selectInformation();
    },
    handleCurrentChange(value) {
      this.cur_page = value;
      this.selectInformation();
    },
    onQuery() {
      this.cur_page = 1;
      this.selectInformation();
    },
    deleteinformationViwer(item) {
      this.$confirm("此操作将永久删除该资讯, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      })
        .then(() => {
          this.deleteInformation(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style >
.el-table tr th {
  border-bottom: 0px;
  padding: 15px 5px;
  font-size: 16px;
  background-color: rgba(223, 234, 251, 0.3);
	color: #333;
}
.el-date-editor .el-range-separator{
  width: 10%;
}
/* .el-table th.is-leaf, .el-table td{
	border: 0;
} */
.el-table::before{
	height: 0;
}
/* 
.el-table--border th,
.el-table--border td {
  border-right: none;
}
.el-table--group,
.el-table--border {
  border: none;
} */
</style>>

