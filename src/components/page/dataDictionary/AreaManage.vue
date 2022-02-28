<template>
    <div class="title" style="width: 100%;">
        <BreadcrumbComponent :routePath="routePath"/>
        <el-container style="border: 1px solid #eee" >
            <el-aside width="30%">
                <ul id="treeDemo" ref="regionTree" class="ztree" style="height: 750px"></ul>
            </el-aside>

            <el-container>
                <el-main>
                    <div style="margin-bottom: 20px">
                        <el-button type="primary" @click="regionAddOrEdit('','add')">新建</el-button>
                    </div>
                    <div class="container_table">
                        <el-table
                            :data="tableData"
                            height="400"
                            border
                        >
                            <el-table-column type="index" :index="getIndex" label="序号" align="center" width="100px">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="regionName"
                                label="区域名称"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="regionCode"
                                label="区域编号"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="regionLever"
                                width="180"
                                label="行政级别" :formatter="formatterLever">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="parentCode"
                                label="父级编号"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="initials"
                                width="180"
                                label="首字母" >
                            </el-table-column>
                          <el-table-column
                              align="center"
                              :show-overflow-tooltip="true"
                              prop="lng"
                              width="180"
                              label="中心经度" >
                          </el-table-column>
                          <el-table-column
                              align="center"
                              :show-overflow-tooltip="true"
                              prop="lat"
                              width="180"
                              label="中心维度" >
                          </el-table-column>
                          <el-table-column
                              align="center"
                              :show-overflow-tooltip="true"
                              prop="bssw"
                              width="180"
                              label="行政区划西南角经纬度" >
                          </el-table-column>
                          <el-table-column
                              align="center"
                              :show-overflow-tooltip="true"
                              prop="bsne"
                              width="180"
                              label="行政区划东南角经纬度" >
                          </el-table-column>
                          <el-table-column
                              align="center"
                              :show-overflow-tooltip="true"
                              prop="remark"
                              width="180"
                              label="备注" >
                          </el-table-column>
                            <el-table-column label="操作" align="center" width="200" fixed="right">
                                <template  slot-scope="scope">
                                    <el-button type="text" size="small" @click="regionAddOrEdit(scope.row.id,'edit')">修改</el-button>
                                    <el-button type="text" size="small" @click="sysRegionDelete(scope.row.id,scope.row.regionName)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-pagination class="fy"
                                       layout="prev, pager, next,sizes,jumper"
                                       @current-change="current_change"
                                       :page-sizes="[10, 20, 50, 100]"
                                       @size-change="handleSizeChange"
                                       :total="total"
                                       :page-size="pagesize"
                                       background>
                        </el-pagination>
                    </div>

                    <el-dialog :title="title" :visible.sync="dialogaddOrEdit" class="dlogBox" :modal-append-to-body='false'
                                width="600px">
                        <el-form label-width="120px" ref="addRegion" :model="form" :rules="regionRules">
                            <el-form-item label="区域名称" prop="regionName">
                                <el-input v-model="form.regionName"></el-input>
                            </el-form-item>
                            <el-form-item label="区域编号" prop="regionCode">
                                <el-input v-model="form.regionCode"></el-input>
                            </el-form-item>
                            <el-form-item label="行政级别" prop="regionLevel">
                              <el-select v-model="form.regionLevel" style="width: 100%" clearable placeholder="请选择行政级别" class="fl">
                                <el-option
                                    v-for="item in regionLevelOptions"
                                    :key="item.warningCode"
                                    :label="item.name"
                                    :value="item.warningCode">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="父级编号" prop="parentCode">
                              <el-input v-model="form.parentCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="首字母" >
                              <el-input v-model="form.initials" ></el-input>
                            </el-form-item>
                            <el-form-item label="中心经度" >
                              <el-input v-model="form.lng" ></el-input>
                            </el-form-item>
                            <el-form-item label="中心维度" >
                              <el-input v-model="form.lat" ></el-input>
                            </el-form-item>
                            <el-form-item label="行政区划西南角经纬度" >
                              <el-input v-model="form.bssw" ></el-input>
                            </el-form-item>
                            <el-form-item label="行政区划东南角经纬度" >
                              <el-input v-model="form.bsne" ></el-input>
                            </el-form-item>
                            <el-form-item label="备注" >
                              <el-input v-model="form.remark" type="textarea"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogaddOrEdit = false">取 消</el-button>
                            <el-button type="primary" @click="submitAddOrEdit">确 定</el-button>
                        </div>
                    </el-dialog>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    import axios from "axios";
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    let parentIdbl;
    let parentChushiIdbl;
    let totalbl;
    var curExpandNode = null;
    export default {
      name: "roleManager",
      components: {
        BreadcrumbComponent
      },
      data() {
        return {
          routePath: this.$route.path,
          total: 0,//默认数据总数
          pagesize: 10,//每页的数据条数
          currentPage: 1,//默认开始页面
          istag: true,
          dialogadd: false,
          dialogedit: false,
          dialogdelete: false,
          multipleSelection: [],
          routers: [],
          sysDept: [],
          deptId: 0,// sessionStorage.getItem("regionCode"),// 全国=0
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          form: {
            regionName: '',
            regionCode: '',
            regionLevel: '',
            parentCode: '',
            initials: '',
            lng: '',
            lat: '',
            bssw: '',
            bsne: '',
            remark: ''
          },
          editForm: {
            regionName: '',
            regionCode: '',
            regionTel: '',
            regionLever: '',
            regionId: '',
            isPetitionRange: ''
          },
          options: [],
          value5: [],
          tableData: [],
          areaId: this.AppConfig.appInfo.regionCode,
          setting: {
            callback: {
              onClick: this.zTreeOnClick,
              onExpand: this.zTreeOnExpand,
              beforeExpand: this.zTreeBeforeExpand,
            },
            view: {
              fontCss: this.getFontCss
            },
          },
          zNodes: [],
          stationName: "", //搜索输入值
          lastValue: "",
          zTreeObj: null, //树初始化后对象
          nodeList: [],
          regionRules: {
            regionName: [
              {required: true, message: '请输入行政区域名称', trigger: 'blur'},
            ],
            regionCode: [
              {required: true, message: '请输入行政区域编号', trigger: 'blur'},
            ],
            regionLevel: [
              {required: true, message: '请选择行政区域级别', trigger: 'change'},
            ],
            parentCode: [
              {required: true, message: '请选择所属行政区域节点', trigger: 'blur'},
            ]
          },
          unitSysDicts: [],
          regionLevelOptions: [],
          dialogaddOrEdit: false,
          title: '新建行政区域',
          clickTreeNode:null,
        };
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 0) {
            return 'th';
          }
          return '';
        },
        switchChange() {
          this.istag = !this.istag;

        },
        changeFun(val) {
          this.multipleSelection = val
        },
        getIndex(index) {
          let curPage = this.currentPage;
          let limitPage = this.pagesize;
          return (index + 1) + (curPage - 1) * limitPage;
        },
        current_change: function (currentPage) {
          this.currentPage = currentPage;
          this.loadingData(parentIdbl);
        },

        // 每页显示的条数
        handleSizeChange(val) {
          // 改变每页显示的条数
          this.pagesize = val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage = 1
          this.loadingData(parentIdbl);
        },

        regionAddOrEdit(regionId, type) {
          if (!parentIdbl && type=='add') {
            this.$notify({
              title: '提示',
              message: '请在左侧选择区域节点',
              type: 'warning'
            })
            return
          }
          if (type == 'add') {
            this.title = "新建行政区域";
            this.initForm();
            this.dialogaddOrEdit = true;
          } else if (type == 'edit') {
            this.title = "修改行政区域";
            this.findOne(regionId).then(val => {
              if (val.code === 0) {
                val.data.regionLevel != null ? (val.data.regionLevel = val.data.regionLevel + "") : "";
                this.form = val.data;
                this.dialogaddOrEdit = true;
              } else {
                this.$message({
                  title: '失败',
                  message: val.msg,
                  type: 'error'
                });
              }
            }).catch(error => {
              this.$message({
                title: '异常',
                message: '服务异常,请重试!',
                type: 'error'
              });
            })
          }
        },
        submitAddOrEdit(){
          if(this.title === "修改行政区域"){
            this.sysRegionEdit();
          }else if(this.title === "新建行政区域"){
            this.sysRegionAdd();
          }
        },
        initForm(){
          this.form.regionName = '';
          this.form.regionCode = '';
          this.form.regionLevel = '';
          this.form.parentCode = parentIdbl;
          this.form.initials = '';
          this.form.lng = '';
          this.form.lat = '';
          this.form.bssw = '';
          this.form.bsne = '';
          this.form.remark = '';
        },
        zTreeOnClick(event, treeId, treeNode) {
          parentIdbl = treeNode.regionCode;
          this.form.parentCode = parentIdbl;
          this.clickTreeNode = treeNode;
          this.loadingData(parentIdbl)
        },
        zTreeOnExpand(event, treeId, treeNode) {
          curExpandNode = treeNode;
        },
        zTreeBeforeExpand(treeId, treeNode) {
          var zTree = this.zTreeObj;
          var pNode = curExpandNode ? curExpandNode.getParentNode():null;
          var treeNodeP = treeNode.parentTId ? treeNode.getParentNode():null;
          for(var i=0, l=!treeNodeP ? 0:treeNodeP.children.length; i<l; i++ ) {
            if (treeNode !== treeNodeP.children[i]) {
              zTree.expandNode(treeNodeP.children[i], false);
            }
          }
          while (pNode) {
            if (pNode === treeNode) {
              break;
            }
            pNode = pNode.getParentNode();
          }
          if (!pNode) {
            this.singlePath(treeNode);
          }
        },
        singlePath(newNode) {
          if (newNode === curExpandNode) return;
          var zTree = this.zTreeObj;
          var rootNodes,
              tmpRoot,
              tmpTId,
              i,
              j,
              n;

          if (!curExpandNode) {
            tmpRoot = newNode;
            while (tmpRoot) {
              tmpTId = tmpRoot.tId;
              tmpRoot = tmpRoot.getParentNode();
            }
            rootNodes = zTree.getNodes();
            for (i=0, j=rootNodes.length; i<j; i++) {
              n = rootNodes[i];
              if (n.tId != tmpTId) {
                zTree.expandNode(n, false);
              }
            }
          } else if (curExpandNode && curExpandNode.open) {
            if (newNode.parentTId === curExpandNode.parentTId) {
              zTree.expandNode(curExpandNode, false);
            } else {
              var newParents = [];
              while (newNode) {
                newNode = newNode.getParentNode();
                if (newNode === curExpandNode) {
                  newParents = null;
                  break;
                } else if (newNode) {
                  newParents.push(newNode);
                }
              }
              if (newParents!=null) {
                var oldNode = curExpandNode;
                var oldParents = [];
                while (oldNode) {
                  oldNode = oldNode.getParentNode();
                  if (oldNode) {
                    oldParents.push(oldNode);
                  }
                }
                if (newParents.length>0) {
                  zTree.expandNode(oldParents[Math.abs(oldParents.length-newParents.length)-1], false);
                } else {
                  zTree.expandNode(oldParents[oldParents.length-1], false);
                }
              }
            }
          }
          curExpandNode = newNode;
        },
        searchNode(e) {
          var zTree = this.zTreeObj;
          var value = this.stationName;
          var keyType = "name";
          if (this.lastValue === value) return;
          this.lastValue = value;
          if (value === "") return;
          this.updateNodes(false);
          var node = zTree.getNodeByParam(keyType, value);
          if (node === null) {
            this.nodeList = [];
          } else {
            this.nodeList = [node];
          }
          this.nodeList = zTree.getNodesByParamFuzzy(keyType, value);
          this.updateNodes(true);
        },
        updateNodes(highlight) {
          var zTree = this.zTreeObj;
          for (var i = 0, l = this.nodeList.length; i < l; i++) {
            this.nodeList[i].highlight = highlight;
            zTree.updateNode(this.nodeList[i]);
          }
        },
        getFontCss(treeId, treeNode) {
          return (!!treeNode.highlight) ? {color: "#0091da", "font-weight": "bold"} : {"font-weight": "normal"};
        },
        formatterLever(row, column) {
          for (var i = 0; i < this.regionLevelOptions.length; i++) {
            if (row.regionLevel == this.regionLevelOptions[i].warningCode) {
              return this.regionLevelOptions[i].name;
            }
          }
        },
        selectDeptId(val) {
          // parentChushiIdbl = val;
          this.init(val);
          parentIdbl = val;
          console.log(parentIdbl)
        },
        // 初始化树数据
        init(deptId) {
          deptId = deptId || 0
          var _this = this;
          var params = new URLSearchParams();
          params.append('regionCode', this.areaId);
          let url = '/api/permissions/regionInfo/getTree/' + deptId
          this.$axios.get(
              url,
          ).then(function (res) {
            if (res.code == 0) {
              _this.zNodes = res.data;
              _this.zTreeObj = $.fn.zTree.init($("#treeDemo"), _this.setting, _this.zNodes);
              _this.zTreeObj.expandAll(false);
              // _this.loadingData(_this.zNodes.regionCode);
              if(_this.clickTreeNode && _this.clickTreeNode!=null){
                _this.zTreeObj.expandNode(_this.clickTreeNode);
              }
              totalbl = res.data.length;
            }
          }).catch(function (err) {
            console.log(err);
          })
        },
        // 请求区域列表数据
        loadingData(regionCode) {
          parentIdbl = regionCode;
          axios.get('/api/permissions/regionInfo/page/', {
            params: {
              "page": this.currentPage,
              "limit": this.pagesize,
              "regionCode": regionCode
            }
          }).then((response) => {
            // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
            this.tableData = response.data.records;
            this.total = response.data.total;
          }).catch((error) => {
            // catch 指请求出错的处理
            console.log(error);
          });
        },
        // 查询行政级别options
        selectRegionLevelOptions() {
          axios.get('/api/regulatory/type/getTypeOptionsList/124').then((response) => {
            // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
            this.regionLevelOptions = response.data;
          }).catch((error) => {
            // catch 指请求出错的处理
            console.log(error);
          });
        },
        // 添加行政区划
        sysRegionAdd() {
          this.$refs['addRegion'].validate((valid) => {
            if (valid) {
              this.form.parentCode = parentIdbl;
              axios.post(`/api/permissions/regionInfo/save`, this.form)
                  .then((response) => {
                    if (response.code === 0) {
                      this.dialogaddOrEdit = false;
                      this.initForm();
                      this.$refs['addRegion'].resetFields();
                      this.loadingData(parentIdbl);
                      this.selectDeptId(this.deptId);
                      this.$message({
                        title: '成功',
                        message: '行政区域添加成功',
                        type: 'success'
                      });
                    } else {
                      this.$message({
                        title: '失败',
                        message: response.msg,
                        type: 'error'
                      });
                    }

                  }).catch((error) => {
                console.log(error);
              });
            }
          });
        },
        // 修改行政区划
        sysRegionEdit() {
          this.$refs['addRegion'].validate((valid) => {
            if (valid) {
              axios.post(`/api/permissions/regionInfo/edit`, this.form)
                  .then((response) => {
                    if (response.code === 0) {
                      this.dialogaddOrEdit = false;
                      this.initForm();
                      this.$refs['addRegion'].resetFields();
                      this.loadingData(parentIdbl);
                      this.selectDeptId(this.deptId);
                      this.$message({
                        title: '成功',
                        message: '行政区域修改成功',
                        type: 'success'
                      });
                    } else {
                      this.$message({
                        title: '失败',
                        message: response.msg,
                        type: 'error'
                      });
                    }

                  }).catch((error) => {
                console.log(error);
              });
            }
          });
        },
        // 删除行政区划
        sysRegionDelete(id, name) {
          this.$confirm('是否删除' + name, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post(`/api/permissions/regionInfo/delete/` + id)
                .then((response) => {
                  if (response.code == 0) {
                    this.loadingData(parentIdbl)
                    this.selectDeptId(this.deptId);
                    this.$message({
                      title: '成功',
                      message: '删除成功',
                      type: 'success'
                    });
                  } else {
                    this.$message({
                      title: '失败',
                      message: response.msg,
                      type: 'error'
                    });
                  }
                }).catch((error) => {
              console.log(error);
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        // 根据区域主键查询详情
        findOne(regionId) {
          return new Promise((resolve, reject) => {
            axios.get('/api/permissions/regionInfo/findOne/' + regionId)
                .then((response) => {
                  resolve(response);
                }).catch((error) => {
              resolve(error)
            });
          })
        }
      },
      created: function () {

      },
      mounted() {
        this.selectRegionLevelOptions();
        this.selectDeptId(this.deptId);
      },
      watch: {
        stationName(val) {
          this.searchNode(val);
          console.log(val)
        },
      },
    }
</script>
