<template>
  <div >
    <div class="overflowX">
      <el-table
          :data="dataList"
          height="400"
          border
          style="width: 100%"
          :row-style="rowStyleCus"
      >
        <el-table-column
            prop="solidWasteName"
            label="危废名称">
        </el-table-column>
        <el-table-column
            prop="solidWasteType"
            label="危废类型">
          <template v-slot="scope">
            <span v-if="scope.row.solidWasteType!=null">{{scope.row.solidWasteType}}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="solidWasteCode"
            label="危废编号">
          <template v-slot="scope">
            <span v-if="scope.row.solidWasteCode!=null">{{scope.row.solidWasteCode}}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="solidWasteOutput"
            label="排污许可证申报产量(吨)">
          <template v-slot="scope">
            <span v-if="scope.row.solidWasteOutput!=null">{{scope.row.solidWasteOutput}}</span>
            <span v-else>未申报</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="yearOutput"
            label="年实际产量(吨)">
          <template v-slot="scope">
            <span v-if="scope.row.yearOutput!=null">{{scope.row.yearOutput}}</span>
            <span v-else>未上报数据</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "entInfoSolid",
  components: {},
  data() {
    return {
      dataList:[]
    }
  },
  methods: {
    rowStyleCus({row,rowIndex}){
      let styleJson = {}
      if(row.solidWasteOutput==null || row.yearOutput==null || row.yearOutput>row.solidWasteOutput){
          styleJson = {
            'color':'red'
          }
      }
      return styleJson
    },
    loadingData(item) {
      var _this = this;
      var url = "/api/regulatory/permit/getPermitEntSolid/"+item.licenseNumber;
      _this.$axios.get(url).then(response => {
        if (response.code == 0) {
          _this.dataList = response.data;
        } else {
          // console.log(response.msg);
        }
      })
      .catch(error => {
        // catch 指请求出错的处理
        // console.log(error);
      });
    },
  },
  mounted: function () {

  },
  created() {

  }
}
</script>

<style scoped>

</style>