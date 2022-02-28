<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
       <img  style="width:100%;margin-top:15px" src="../../../../static/css/images/reedit@2x.png" alt />

    </div>
   
 
  </div>

</template>

<script>
  // import statisticsProductionList from "../statisticalAnalysis/statisticsProductionList";
  import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "HomePage",

  mounted() {
    this.init();
   
    // setTimeout(this.queryInOutInformationByRegionCode,1000)
  },
  components: {
 
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
    

    };
  },
  created: function () {

  },
  methods: {

      
  
  },
  destroyed () {
    clearInterval(this.timer)
  },
};
</script>

<style scoped>

</style>
