<template>
  <div class="main wasteList">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-zhuanyun"></i>
          <span class="text-primary-font">统计分析</span>
        </a>
        <span class="sep">&gt;</span>
        <span class="text-primary">衡水市主要产废单位清单</span>
      </div>
    </div>
    <div class="panel">
      <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;">
        <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="90">
          <template slot-scope="scope">
              {{ scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="企业名称"
          width="250px">
        </el-table-column>
        <el-table-column
          prop="qu"
          align="center"
          label="区县"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="危废类别">
        </el-table-column>
        <el-table-column
          prop="num"
          align="center"
          label="产生量（吨）">
        </el-table-column>
        <el-table-column
          prop="weituoNum"
          align="center"
          label="委外处置利用量（吨）">
        </el-table-column>
        <el-table-column
          prop="zixingNum"
          align="center"
          label="自行利用处置量（吨）">
        </el-table-column>
        <el-table-column
          prop="cunchu"
          align="center"
          label="贮存量（吨）">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      rowList: [],
      spanArr: [],
      position: 0,
      tableData: []
    }
  },
  methods: {
    queryData(){
      this.tableData = [
        {
          id: '1',
          name: '河钢集团衡水板业有限公司',
          type: 'HW34废酸',
          qu: '武邑县',
          num: '21863.4',
          weituoNum: '0',
          zixingNum: '21863.4',
          cunchu: '0'
        }, {
          id: '2',
          name: '河钢集团衡水板业有限公司',
          type: 'HW09油/水、烃/水混合物或乳化液7',
          qu: '武邑县',
          num: '606.0000',
          weituoNum: '0.0000',
          zixingNum: '7,606.00000.0000',
          cunchu: '0'
        }, {
          id: '3',
          name: '河钢集团衡水板业有限公司',
          qu: '武邑县',
          type: 'HW17表面处理	 废物',
          num: '2,190.0000',
          weituoNum: '0',
          zixingNum: '2,190.0000',
          cunchu: '0'
        },{
          id: '4',
          name: '河钢集团衡水板业有限公司',
          qu: '武邑县',
          type: 'HW17表面处理	 废物',
          num: '396.9710',
          weituoNum: '210.7250',
          zixingNum: '',
          cunchu: '362.3970'
        },
        {
          id: '5',
          name: '衡水京华制管有限公司',
          type: 'HW08废矿物油与含矿物油废物',
          qu: '工业新区',
          num: '173.7100',
          weituoNum: '173.2600',
          zixingNum: '',
          cunchu: '27.3240'
        },
        {
          id: '6',
          name: '衡水京华制管有限公司',
          type: 'HW17表面处理	 废物',
          qu: '工业新区',
          num: '24,461.6732',
          weituoNum: '431.3203',
          zixingNum: '24,220.8333',
          cunchu: '206.9444'
        },
        {
          id: '7',
          name: '衡水京华制管有限公司',
          qu: '工业新区',
          type: 'HW23含锌废物',
          num: '3,698.7000',
          weituoNum: '0.0000',
          zixingNum: '3,698.7000',
          cunchu: '0.0000'
        },
        {
          id: '8',
          name: '河北燕赵蓝天板业集团有限	责任公司',
          qu: '景县',
          type: 'HW34	废酸',
          num: '12,359.8400',
          weituoNum: '0.0000',
          zixingNum: '12,532.6400',
          cunchu: '97.2000'
        },
        {
          id: '8',
          name: '邯钢集团衡水薄板有限责任	公司',
          qu: '桃城区',
          type: 'HW34	废酸',
          num: '8,783.1400',
          weituoNum: '0.0000',
          zixingNum: '8,899.7200',
          cunchu: '0.0000'
        }
      ],
      this.rowspan()
    },
    rowspan() {
  		this.tableData.forEach((item,index) => {
	    	if( index === 0){
	    		this.spanArr.push(1);
	    		this.position = 0;
	    	}else{
	    		if(this.tableData[index].name === this.tableData[index-1].name ){
	    			this.spanArr[this.position] += 1;
	    			this.spanArr.push(0);
	    		}else{
	    			this.spanArr.push(1);
	    			this.position = index;
	    		}
	    	}
	    })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
      // if(columnIndex === 0){
    	// 	const _row = this.spanArr[rowIndex];
    	// 	const _col = _row>0 ? 1 : 0;
    	// 	return {
    	// 		rowspan: _row,
    	// 		colspan: _col
    	// 	}
    	// }
    	if(columnIndex === 1){
    		const _row = this.spanArr[rowIndex];
    		const _col = _row>0 ? 1 : 0;
    		return {
    			rowspan: _row,
    			colspan: _col
    		}
      }
      if(columnIndex === 2){
    		const _row = this.spanArr[rowIndex];
    		const _col = _row>0 ? 1 : 0;
    		return {
    			rowspan: _row,
    			colspan: _col
    		}
    	}
    }
  },
  mounted() {
    this.queryData();
  }
}
</script>
<style >
.wasteList{
  height: 100%;
}
.wasteList .el-table{
  color: #333;
}
.wasteList .el-table thead{
  color: #333
}
.wasteList .el-table--border{
  /* 2px solid # */
  border: 1px solid #8C939D;
}
.wasteList .el-table th.is-leaf, .el-table td{
  border-bottom: 1px solid #8C939D;
}
.wasteList .el-table--border th, .el-table--border td{
  border-right: 1px solid #8C939D;
}
.wasteList .el-form-item__label{
  color: #333;
}
.wasteList .el-table th, .el-table td{
  padding: 10px 0;
}
.wasteList .el-table th{
  background: rgba(223, 234, 251, 0.3);
}
.wasteList .panel{
  padding: 10px;
  box-sizing: border-box;
  height: 9%;
}
</style>