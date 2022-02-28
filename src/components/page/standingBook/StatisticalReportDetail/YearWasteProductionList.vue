<template>
  <div class="main_yw wasteList">
    <!-- <BreadcrumbComponent :routePath="routePath"/> -->
    <div style="height: 100%" class="panel">
      <div class="tab">
        <div
          v-for="(item, index) in tabMain"
          :key="index"
          class="tabMain"
          @click="slectedClick(item.key)"
          :class="selected === item.key ? 'selected' : ''"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="tableContainer" v-if="selected === 'type'" style="height: 80%">
        <wasteCategoryStatistical></wasteCategoryStatistical>
      </div>
      <div class="tableContainer" v-if="selected === 'hangye'" style="height: 80%">
        <industryStatistics></industryStatistics>
      </div>
      <div class="tableContainer" v-if="selected === 'qiye'" style="height: 80%">
        <businessCategory></businessCategory>
      </div>
      <div class="tableContainer" v-if="selected === 'statistics'" style="height: 80%">
        <statisticsProductionList ref="statisticsProductionList"></statisticsProductionList>
      </div>
    </div>
  </div>
</template>
<script>
// import BreadcrumbComponent from "./BreadcrumbComponent.vue"
import statisticsProductionList from "./statisticsProductionList.vue";
import wasteCategoryStatistical from "./wasteCategoryStatistical.vue";
import industryStatistics from './industryStatistics.vue';
import businessCategory from './businessCategory.vue';
export default {
  components: {
    statisticsProductionList,
    wasteCategoryStatistical,
    industryStatistics,
    businessCategory,
    // BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      tabMain: [
        { name: "产废单位月汇总(按危废类别统计)", key: "type" },
        { name: "产废单位月汇总(按行业统计)", key: "hangye" },
        { name: "产废单位月汇总(按企业类别)", key: "qiye" },
        { name: "产废数据汇总", key: "statistics" },
      ],
      regionName: sessionStorage.getItem("regionName"),
      selected: "type",
      newtableDataCompany: [
        {
          entName: "",
          region: "",
          typeName: "",
          name: "",
          code: "",
          suName: "",
          lastNum: "",
          yield: "",
          inventoryAdjustment: "",
          weiwaiNum: "",
          shengwai: "",
          shengnei: "",
          zixing: "",
          ciNum: "",
          storage: "",
          yearStorage: "",
          mouth: "",
        },
      ],
    };
  },
  created() {
  },
  methods: {
    slectedClick(key) {
      this.selected = key;
    }
  }
};
</script>
<style>
.main_yw {
  height: 100%;
  box-sizing: border-box;
}
.wasteList .tableContainer {
  padding: 1%;
  box-sizing: border-box;
}
.wasteList .tab {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f4f4f4;
}
.wasteList .tab .tabMain {
  cursor: pointer;
  margin-top: 1%;
  height: 35px;
  line-height: 35px;
  padding: 0 1%;
}
.wasteList .tab .tabMain.selected {
  font-weight: bold;
  background: #fff;
  border-bottom: 2px solid #35a1ec;
  color: #35a1ec;
}
.wasteList .tableMain {
  overflow: scroll;
  height: 100%;
}
.wasteList .queryInput {
  margin-top: 1%;
}
.wasteList .el-form--inline .el-form-item {
  margin-bottom: 1%;
}
.wasteList .el-table {
  color: #333;
}
.wasteList .el-table thead {
  color: #333;
}
.wasteList .el-table--border {
  /* 2px solid # */
  border: 1px solid #8c939d;
}
.wasteList .el-table th.is-leaf,
.el-table td {
  border-bottom: 1px solid #8c939d;
}
.wasteList .el-table--border th,
.el-table--border td {
  border-right: 1px solid #8c939d;
}
.wasteList .el-form-item__label {
  color: #333;
}
.wasteList .el-button {
  /*background: #35a1ec;*/
  padding: 0 20px;
  line-height: 35px;
}
.wasteList .panel {
  padding: 10px;
  box-sizing: border-box;
  height: 95%;
}
</style>
