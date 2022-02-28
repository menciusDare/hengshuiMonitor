<template>
  <div class="container" style="width: 100%">
    <div class="breadcrumb">
      当前位置：<span class="current">企业小类管理</span>
    </div>
    <el-container style="border: 1px solid #eee" class="container-head">
      <div style="margin-left: 10px">
        <span>企业类型：</span>
        <el-select
          v-model="enterpriseId"
          clearable
          placeholder="请选择企业类型"
        >
          <el-option
            v-for="item in filterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          size="small"
          @click="queryData"
          icon="el-icon-search"
        ></el-button>
      </div>
      <el-button
        type="primary"
        size="small"
        style="margin-right: 10px"
        @click="openProjectAdd"
        >新建</el-button
      >
    </el-container>
    <div class="container_table" style="margin-top: 20px">
      <el-table :data="tableData.slice()" height="400" border v-loading="loading">
        <template v-for="(item, index) in columnList">
          <el-table-column
            :key="index"
            align="center"
            v-if="item.value == 'index'"
            width="80px"
            :label="item.label"
            :prop="item.value"
          ></el-table-column>
          <el-table-column
            :key="index"
            align="center"
            v-else-if="item.value == 'status'"
            :label="item.label"
          >
            <template slot-scope="scope">
              {{ scope.row.status === 'Y' ? "启用" : "禁用" }}
            </template>
          </el-table-column>
          <el-table-column
            :key="index"
            fixed="right"
            align="center"
            v-else-if="item.value == 'operation'"
            :label="item.label"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="sysDictDetailsEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="sysDictEnableDisable(scope.row)"
                >{{scope.row.status === 'N' ? "启用" : "禁用"}}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            :key="index"
            align="center"
            v-else
            :label="item.label"
            :prop="item.value"
          ></el-table-column>
        </template>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next,sizes,jumper"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        :page-sizes="pageSizes"
        :total="total"
        :current-page="currentPage"
        :page-size="pagesize"
        background
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogadd"
      class="dlogBox"
      :modal-append-to-body="false"
      :destroy-on-close="true"
      width="400px"
    >
      <el-form
        label-width="80px"
        :model="labelForm"
        ref="addProjectForm"
        :rules="addProjectRules"
      >
        <el-form-item label="小类名称" prop="name">
          <el-input v-model="labelForm.name" placeholder="请输入小类名称" class="dialog-width"></el-input>
        </el-form-item>
        <el-form-item label="小类code" prop="code">
          <el-input v-model="labelForm.code" placeholder="请输入小类code" class="dialog-width"></el-input>
        </el-form-item>
        <el-form-item label="父类名称" prop="parentId">
          <el-select
            class="dialog-width"
            v-model="labelForm.parentId"
            placeholder="请选择父类名称"
          >
            <el-option
              label="无"
              :value="0"
            >
            </el-option>
            <el-option
              v-for="(item,index) in tableData"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            class="dialog-width"
            v-model="labelForm.status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogadd = false">取 消</el-button>
        <el-button type="primary" @click="sysDictTypeAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "entSublassList",
  data() {
    return {
      filterOptions: [
        {
          value: 0,
          label: "运营企业",
        },
        {
          value: 1,
          label: "产废企业",
        },
        {
          value: 2,
          label: "经营企业",
        },
        {
          value: 3,
          label: "收集企业",
        },
        {
          value: 4,
          label: "运输企业",
        },
      ],
      enterpriseId: "",
      pageSizes: [10, 20, 50, 100],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      columnList: [
        {
          label: "序号",
          value: "index",
        },
        {
          label: "小类名称",
          value: "name",
        },
        {
          label: "小类code",
          value: "code",
        },
        {
          label: "父类名称",
          value: "parentName",
        },
        {
          label: "状态",
          value: "status",
        },
        {
          label: "创建时间",
          value: "createTime",
        },
        {
          label: "操作",
          value: "operation",
        },
      ],
      title: "",
      labelForm: {
        id: '',
        name: '',
        code: '',
        parentId: undefined,
        status: undefined
      },
      options: [
        {
          value: 'Y',
          label: "启用",
        },
        {
          value: 'N',
          label: "禁用",
        },
      ],
      typeFlag: '',
      tableData: [],
      loading: false,
      dialogadd: false,
      addProjectRules: {
        name: [
          { required: true, message: "请输入小类名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入小类code", trigger: "blur" },
        ],
        parentId: [
          { required: true, message: "请选择父类名称", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
      },
    }
  },
  methods: {
    // 获取列表
    entClassFindList() {
      const params = {
        type: this.enterpriseId,
        pageSize: this.pagesize,
        currentPage:this.currentPage
      }
      this.loading = true
      axios
        .get(`/api/permissions/entClass/find`,{
          params
        })
        .then((resp) => {
          if (!resp.code) {
            this.loading = false
            const { data } = resp
            data.list.forEach((item, index) => {
              item.index = (this.currentPage - 1) * this.pagesize + index + 1
            });
            this.tableData = data.list
            this.total = data.totalNumber
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error);
        });
    },
    // 查询
    queryData () {
      this.currentPage = 1
      this.entClassFindList()
    },
    // 每页显示的条数
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.entClassFindList()
    },
    // 当前页
    currentChange (val) {
      this.currentPage = val;
      this.entClassFindList()
    },
    // 新建
    openProjectAdd() {
      this.dialogadd = true;
      this.title = "新建";
      this.labelForm.id = ''
      this.labelForm.code = ''
      this.labelForm.name = ''
      this.labelForm.status = undefined
      this.labelForm.parentId = undefined
      this.typeFlag = 1
      this.$nextTick(() => {
        this.$refs.addProjectForm.clearValidate()
      })
    },
    // 编辑
    sysDictDetailsEdit(scope) {
      this.dialogadd = true;
      this.labelForm.id = scope.id
      this.labelForm.name = scope.name
      this.labelForm.code = scope.code
      this.labelForm.parentId = scope.parentD
      this.labelForm.status = scope.status
      this.title = '编辑'
      this.typeFlag = 0
      this.$nextTick(() => {
        this.$refs.addProjectForm.clearValidate()
      })
    },
    // 新建
     sysDictTypeAdd() {
      this.$refs["addProjectForm"].validate((valid) => {
        if (valid) {
          const params = {
            name: this.labelForm.name,
            status: this.labelForm.status,
            parentD: this.labelForm.parentId,
            code: this.labelForm.code,
          }
          if (this.typeFlag) {
            axios
              .post(`/api/permissions/entClass/add`,params)
              .then((response) => {
                if (response.code === 0) {
                  this.dialogadd = false;
                  this.entClassFindList();
                  this.$message({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                  });
                } else {
                  this.$message.error(response.msg);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            params['id'] = this.labelForm.id
            axios
              .put(`/api/permissions/entClass/edit`,params)
              .then((response) => {
                if (response.code === 0) {
                  this.dialogadd = false;
                  this.entClassFindList();
                  this.$message({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                  });
                } else {
                  this.$message.error(response.msg);
                }
              })
              .catch((error) => {
                console.log(error);
              });

          }
        }
      });
    },
    // 启用or禁用
    sysDictEnableDisable (scope) {
      const params = {
        name: scope.name,
        parentD: scope.parentD,
        code: scope.code,
        id: scope.id
      }
      let tips = ''
      if (scope.status == 'Y') {
        tips = '确认要禁用吗?'
        params['status'] = 'N'
      } else {
        tips = '确认要启用吗?'
        params['status'] = 'Y'
      }
      this.$confirm(tips, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios
              .put(`/api/permissions/entClass/edit`,params)
              .then((response) => {
                if (response.code === 0) {
                  this.entClassFindList();
                  this.$message({
                    title: "成功",
                    message: "操作成功",
                    type: "success",
                  });
                } else {
                  this.$message.error(response.msg);
                }
              })
              .catch((error) => {
                console.log(error);
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    }
  },
  created() {
    this.entClassFindList();
  },
};
</script>

<style scoped>
.container-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-width {
  width: 250px;
}
</style>
