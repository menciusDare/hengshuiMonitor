<template>
    <div class="" style="overflow: auto" >

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">原辅材料及消耗量</div>
        </div>

        <div style="width: 1350px;padding-left: 20px">
            <table class="tableClass"  >
                <thead>
                <tr>
                    <th style="text-align:center;width: 10% " >序号</th>
                    <th style="text-align:center; width: 20%" >原辅料名称</th>
                    <th style="text-align:center; width: 20%" >上年度消耗（吨）</th>

                    <th style="text-align:center;width: 10% " >序号</th>
                    <th style="text-align:center;width: 20% " >原辅材料名称</th>
                    <th style="text-align:center; width: 20%" >本年度计划消耗量（吨）</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="item  in tableDataSource">
                    <td style="text-align:center;width: 10%">{{item.rownum}}</td>
                    <td style="text-align:center;width: 20%">{{item.auxiliaryMaterials}}</td>
                    <td style="text-align:center;width: 20%">{{item.lastYearConsume}}</td>

                    <td style="text-align:center;width: 10%">{{item.rownum}}</td>
                    <td style="text-align:center;width: 20%">{{item.auxiliaryMaterials}}</td>
                    <td style="text-align:center;width: 20%">{{item.thisYearConsume}}</td>

                </tr>
                </tbody>
            </table>
        </div>


        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">生产设备及数量</div>
        </div>


        <div style="width: 1350px;padding-left: 20px">
            <table class="tableClass"  >
                <thead>
                <tr>
                    <th style="text-align:center;width: 10% " >序号</th>
                    <th style="text-align:center;width: 20%" >设备名称</th>
                    <th style="text-align:center;width: 20% " >上年度数量</th>

                    <th style="text-align:center;width: 10% " >序号</th>
                    <th style="text-align:center;width: 20% " >设备名称</th>
                    <th style="text-align:center;width: 20% " >本年度数量（吨）</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="item  in tableDataEquipment">
                    <td style="text-align:center">{{item.rownum}}</td>
                    <td style="text-align:center">{{item.equipmentName}}</td>
                    <td style="text-align:center">{{item.lastYearNumber}}</td>
                    <td style="text-align:center">{{item.rownum}}</td>

                    <td style="text-align:center">{{item.equipmentName}}</td>
                    <td style="text-align:center">{{item.thisYearNumber}}</td>
                </tr>
                </tbody>
            </table>
        </div>


        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">产品及产量</div>
        </div>


        <div style="width: 1350px;padding-left: 20px">
            <table class="tableClass"  >
                <thead>
                <tr>
                    <th style="text-align:center; width: 10%" >序号</th>
                    <th style="text-align:center; width: 20%" >产品名称</th>
                    <th style="text-align:center; width: 20% " >上年度产量（吨）</th>
                    <th style="text-align:center; width: 10%" >序号</th>

                    <th style="text-align:center; width: 20%" >产品名称</th>
                    <th style="text-align:center; width: 20%" >本年度产量（吨）</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="item  in tableDataProduct">
                    <td style="text-align:center">{{item.rownum}}</td>
                    <td style="text-align:center">{{item.productName}}</td>
                    <td style="text-align:center">{{item.lastYearNumber}}</td>
                    <td style="text-align:center">{{item.rownum}}</td>

                    <td style="text-align:center">{{item.productName}}</td>
                    <td style="text-align:center">{{item.thisYearNumber}}</td>
                </tr>
                </tbody>
            </table>
        </div>



        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">生产工艺流程图及说明</div>
        </div>
        <div id = "testFlow" style="padding-left: 20px;font-size: 18px;padding-top: 15px;margin-bottom: 20px">
            {{testFlow}}
        </div>

        <div>
            <img style="margin-top: 20px;margin-left: 20px" :src="imageUrl" class="avatar" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "productInfo",
        props: { //接收父组件传来的数据，并指定类型

         },
        data(){
            return{
                entId:this.$route.params.entId,
                year:this.$route.params.year,
                correlationId:this.$route.params.correlationId,
                tableDataSource:[],
                tableDataEquipment:[],
                tableDataProduct:[],
                imageUrl:'',
                testFlow:'',
            }
        },
        mounted(){
            this.querySource();
            this.queryEquipment();
            this.queryProduct();
            this.querytestFlow();
            this.getTAttachments(this.correlationId);
            var that = this;
            window.vm.$on("productInfo", function (year,correlationId) {
                that.year = year
                that.querySource();
                that.queryEquipment();
                that.queryProduct();
                that.getTAttachments(correlationId);
            })
        },
        methods:{

            querytestFlow() {
                var that = this;
                var idd = Number(that.entId)
                var url = 'api/regulatory/tEnterpriseInfo/'+ idd;
                var params = new URLSearchParams();
                // params.append('id', that.entId);// 附件关联Id
                that.$axios.get(url, {params}).then(
                    function (res) {
                        if(res.code == 0){
                            that.testFlow =res.data.processFlow
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },

            getTAttachments(correlationId){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/getAttByCorrelationId';
                var params = new URLSearchParams();
                params.append('correlationId', correlationId);// 附件关联Id
                params.append('type', '4');// 附件关联Id
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            var imgData = res.data;
                            if(imgData.length<1){
                                that.imageUrl=''

                                return;
                            }
                            that.imageUrl = that.IMG_URL + imgData[0].locationUrl
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },

            querySource() {
                /*alert('productInfo____'+this.entId)*/
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/tEnterpriseInfoMaterials';
                that.$axios.get(url, {params:{
                    year:that.year,
                    id:that.entId}
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableDataSource = res.data
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            queryEquipment() {
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/tEnterpriseInfoEquipmentInfo';
                var params = new URLSearchParams();
                params.append('year', that.year);// 附件关联Id
                params.append('id', that.entId);// 附件关联Id
                that.$axios.get(url, {params}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableDataEquipment = res.data
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            queryProduct() {
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/tEnterpriseProductInfo';
                that.$axios.get(url, {params:{
                    year:that.year,
                    id:that.entId
                }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableDataProduct = res.data
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
        },
        destroyed: function() {
            window.vm.$off("productInfo")
        }
    }
</script>

<style scoped>
    .title{
        margin-top: 30px;
        font-size: 18px;
        width: 100%;
        height: 40px;
        background-color: #F7F7F7;
        line-height: 40px;
        margin-bottom: 20px;
    }

    .tableClass{
        width: 1250px;
        border: 2px solid #8C939D;
        border-collapse:collapse;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-right: 20px;
    }
    .tableClass tr td{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #8C939D;
        font-size: 16px;
    }
    .tableClass tr th{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #8C939D;
        font-size: 16px;
        font-weight: bolder;
    }
</style>