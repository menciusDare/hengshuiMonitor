<template>
    <div style="overflow: auto">
        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">基本信息</div>
        </div>

        <table class="table2">
            <tr>
                <td style="width: 200px;text-align: center;" rowspan="2">
                    <strong> <br>危<br>险<br>废<br>物<br>利<br>用<br>/<br>处<br>置<br>设<br>施<br>运<br>行<br>过<br>程<br>相<br>关<br>参<br>数<br>的<br>监<br>测<br><br></strong>
                </td>
                <td style="width: 1050px" >
                    <br>
                    <div id = "table2One" style="padding-left: 25px">

                    </div>
                    <br><br>
                </td>
            </tr>
            <tr>
                <td style="width: 1050px" >
                    <br>
                    <div id = "table2Two" style="padding-left: 25px">

                    </div>
                    <br><br>
                </td>
            </tr>
        </table>

        <table class="table2">
            <tr>
                <td style="width: 200px;text-align: center;min-height: 300px;padding-top: 130px;padding-bottom: 130px" rowspan="2">
                    <strong>  <br>监<br>测<br>情<br>况<br></strong>
                </td>
                <td style="width: 1050px" >
                    <br>
                    <div id = "table3One" style="padding-left: 25px">

                    </div>
                    <br><br>
                </td>
            </tr>
            <tr>
                <td style="width: 1050px" >
                    <br>
                    <div id = "table3Two" style="padding-left: 25px">

                    </div>
                    <br><br>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "environmental",
        data(){
            return{
                year:this.$route.params.year,
                entId:this.$route.params.entId,
            }
        },
        mounted() {
            this.queryEm();
            var that = this;
            window.vm.$on("environmental", function (year) {
                that.year = year
                that.queryEm();
            })
        },
        destroyed: function() {
            window.vm.$off("environmental")
        },
        methods:{
            queryEm(){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/environmental';
                that.$axios.get(url, {params: {
                        year: that.year,
                        id: that.entId
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            if(res.data.length == 0 ){
                                $('#table2One').html('<strong> 利用处置设施运行参数监测情况:</strong>  <br><br>');
                                $('#table2Two').html('<strong> 污染物检测指标及频次:</strong> <br> <br> ');

                                $('#table3One').html('<strong> 自行监测情况:</strong>  <br><br> ');
                                $('#table3Two').html('<strong> 委托监测情况:</strong> <br> <br>');
                            }else{
                                $('#table2One').html('<strong> 利用处置设施运行参数监测情况:</strong>  <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ res.data[0].parameterMonitor );
                                $('#table2Two').html('<strong> 污染物检测指标及频次:</strong> <br> <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ res.data[0].contaminantsMonitor );

                                $('#table3One').html('<strong> 自行监测情况:</strong>  <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+  res.data[0].voluntarilyMonitor );
                                $('#table3Two').html('<strong> 委托监测情况:</strong> <br> <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+  res.data[0].entrustMonitor );
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

    .table2{
        border:1px solid #333;
        width: 1250px;
        border-collapse:collapse;
        font-size: 16px;
        margin-left: 20px;
        margin-top: 20px;

    }
    .table2 tr td{
        border:1px solid #333;
        vertical-align: top;
    }

</style>