<template>
  <!-- 主体 -->
  <div class="main smsPush">
    <BreadcrumbComponent :routePath="routePath"/>
	<el-card class="box-card">
		<div>
			<el-button type="primary" @click="open()">推送</el-button>
		</div>
		<el-table :data="tableData" class="table-default" style="height:100%">
			<el-table-column   label="序号" width="100%" align="center" >
				<template slot-scope="scope">
					<span>
						<span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>   
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="content" label="推送内容" align="center" width="300%"></el-table-column>
			<el-table-column prop="createDate" label="推送时间" align="center"></el-table-column>
			<el-table-column prop="receive" label="接收对象" align="center"></el-table-column>
			<el-table-column prop="createBy" label="创建人" align="center"></el-table-column>
		</el-table>
		<div class="el-pagination is-background mt-lg">
		  <span class="el-pagination__total">共 {{count}}条，每页显示</span>
		  <span >
		    <el-pagination
		          @size-change="handleSizeChange"
		          @current-change="handleCurrentChange"
		          :page-sizes="[5,10, 15, 20]"
		          :page-size="10"
		          layout="total, sizes, prev, pager, next"
		          :total="count">
		        </el-pagination>
		  </span>
		  <span class="el-pagination__total">共 {{totalPageCount}} 页</span>
		</div>
	</el-card>
	<div class="messageMain">
		<el-dialog
		  title="推送"
		  :visible.sync="dialogVisible"
		  :modal-append-to-body="false" 
		  :close-on-click-modal="false"
			style="margin-top:0">
		  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
		    <el-form-item label="接收类型" prop="entKind">
		      <el-select v-model="form.entKind" placeholder="请选择企业类型">
		        <el-option
		          v-for="item in entsKinds"
		          :key="item.value"
		          :label="item.label"
		          :value="item.value"
		        ></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="推送内容" prop="content">
		      <el-input
		        type="textarea"
		        :autosize="{ minRows: 8, maxRows: 10}"
		        placeholder="请输入内容"
		        v-model="form.content"
		      	style="width: 520px;">
		      </el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sms()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
  </div>
</template>

<script>
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
	components: { BreadcrumbComponent },
  data() {
    return {
		routePath: this.$route.path,
		userId: window.sessionStorage.getItem("userId"),
		content:'',
		entKind:'',
		tableData:[],
		pageNo: 1,
		pageSize: 10,
		dialogVisible:false,
		totalPageCount:'',
		count:0,
		form:{
			entKind:'',
			content:''
		},
	  entsKinds: [
	    { value: -1, label: "全部" },
	    { value: 1, label: "产废企业" },
	    { value: 3, label: "收集企业"},
	    { value: 2, label: "经营企业"}
	  ],
	  rules: {
		entKind: [
		  { required: true, message: '请选择接收对象', trigger: 'change' }
		],
		content: [
		  { required: true, message: '请输入推送内容', trigger: 'blur' }
		]
	  }
      
    };
  },
  created() {
  	this.loadingData()
  },
  methods: {
	open(){
		if (this.$refs['form'] !== undefined) {
		    this.$refs['form'].resetFields();
		}
		this.dialogVisible=true;	
		
	},
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/smsPush/getSmsPushList";
      let params = new URLSearchParams();
      params.append("pageNo", _this.pageNo);
      params.append("pageSize", _this.pageSize);
      // params.append("entKind", _this.entKind);
      // params.append("name", _this.search);
      _this.$axios
        .get(url,{params})
        .then(response => {
          if (response.code == 0) {
			_this.tableData = response.data.list
             _this.totalPageCount = response.data.totalPageCount;
             _this.count = response.data.count;
          } else {
            // console.log(response.msg);
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
        //   console.log(error);
        });
    },
	handleSizeChange(newSize) {
	  this.pageSize=newSize
	  this.loadingData();
	},
	handleCurrentChange(newPage) {
	  this.pageNo=newPage
	  this.loadingData();
	},
	sms(){
		var _this = this;
		_this.$refs['form'].validate((valid) => {
			if (valid) {
				var url = "/api/regulatory/smsPush/smsPushMessage";
				let params = new URLSearchParams();
				params.append("content", _this.form.content);
				params.append("userId", _this.userId);
				params.append("entKind", _this.form.entKind);
				// params.append("name", _this.search);
				_this.$axios.post(url, params).then(response => {
				    if (response.code == 0) {
						_this.$message.success("推送成功")
						_this.dialogVisible=false
						_this.loadingData()
				    } else {
						_this.$message.warning("推送失败，请重试！")
						// console.log(response.msg);
				    }
				  })
				  .catch(error => {
				    // catch 指请求出错的处理
					_this.$message.error("推送失败，请重试！")
				    // console.log(error);
				  });
			} else {
				return false;
			}
		})
	}
  }
};
</script>
<style>
.smsPush .el-table{
	margin-top: 1%;
}
.smsPush .el-card{
	width: 100%;
	border: 0;
}
.smsPush .el-card__body{
	
	box-sizing: border-box;
}
.smsPush .el-table th{
	padding: 15px 5px;
  font-size: 16px;
  background-color: rgba(223, 234, 251, 0.3);
	color: #333;
}
.smsPush .messageMain .el-dialog__wrapper{
	display: flex;
	justify-content: center;
	align-items: center;
}
.smsPush .messageMain  .el-dialog{
	margin: 0!important;
	width: auto;
	border-radius: 5px;
}
.smsPush .messageMain .el-dialog__header{
	border-radius: 4px 4px 0 0;
}
.smsPush .el-table th.is-leaf, .el-table td{
	border: 0;
}
.smsPush .el-table::before{
	height: 0;
}
</style>
