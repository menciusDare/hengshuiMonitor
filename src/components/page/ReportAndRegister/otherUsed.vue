<template>
    <div style="overflow: auto">

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">基本信息</div>
        </div>


        <table class="tableClass" style="margin-left: 20px">
            <tr>
                <th>序号 </th>
                <th>危险废物委托利用处置单位名称 </th>
                <th>许可证编号 </th>
                <th>危险废物的名称 </th>
                <th>利用处置方式 </th>
                <th  style="width: 100px">本年度计划委托利用处置量（吨） </th>
                <th  style="width: 100px">上年度实际委托利用处置量（吨） </th>
            </tr>
            <tbody id = "tbodyHtml">

            </tbody>


        </table>
    </div>
</template>

<script>
    export default {
        name: "otherUsed",
        data(){
            return{
                entId:this.$route.params.entId,
                dataTable:[],
                year:this.$route.params.year,
                tableClassAct:{
                    height: 'auto',
                    minHeight: '44px',
                    lineHeight:' 24px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    textAlign: 'center',
                    border:'1px solid #333',
                    fontWize: '16px',
                    fontWeight: 'bolder',
                },
                sumLastNum:0,
                sumThisNum:0,

            }
        },
        mounted(){
            this.queryOthers();
            var that = this;
            window.vm.$on("otherUsed", function (year) {
                that.year = year
                that.queryOthers();
            })
        },
        destroyed: function() {
            window.vm.$off("otherUsed")
        },
        methods:{
            queryOthers(){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/othersUse';
                that.$axios.get(url, {params: {
                        year: that.year,
                        id: that.entId
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            if(res.data == null){
                                that.dataTable = res.data
                                $('#tbodyHtml').html( '' );
                            }else{
                            that.dataTable = res.data
                            var htmlTable = '';
                            that.sumLastNum=0;
                            that.sumThisNum=0
                            for (var i = 0 ; i< res.data.length ; i++){
                                htmlTable +=    "           <tr>\n" +
                                                "                <td class='tableClassAct' rowspan="+ res.data[i].dataList.length  +">"+res.data[i].rownum+"</td>\n" +
                                                "                <td class='tableClassAct' rowspan="+ res.data[i].dataList.length  +">"+res.data[i].name+"</td>\n" +
                                                "                <td class='tableClassAct' rowspan="+ res.data[i].dataList.length  +">"+res.data[i].licence+"</td>\n" +
                                                that.formatTableFun(res.data[i].dataList)+
                                                "           </tr>"


                            }
                            htmlTable+=
                                "<tr>\n" +
                                "                <td colspan=\"5\">合计</td>\n" +
                                "                <td >"+(that.sumThisNum).toFixed(2)+"</td>\n" +
                                "                <td >"+(that.sumLastNum).toFixed(2)+"</td>\n" +
                                "            </tr>"

                            $('#tbodyHtml').html( htmlTable );
                        }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });

            },

            formatTableFun(data){
                var htmlChil = "";
                var that = this;
                for(var i = 0 ; i< data.length ; i++){
                    if(i == 0 ){
                        htmlChil +=
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].hazardousName2)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].czMode)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].thisYearNumber)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].lastYearNumber)+"</td>\n"

                        that.sumLastNum += data[i].lastYearNumber;
                        this.sumThisNum += data[i].thisYearNumber;

                    }else{
                        htmlChil += "           <tr>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].hazardousName2)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].czMode)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].thisYearNumber)+"</td>\n" +
                            "<td :style='tableClassAct'>"+ that.formatString(data[i].lastYearNumber)+"</td>\n" +
                            "           </tr>"
                        that.sumLastNum += data[i].lastYearNumber;
                        that.sumThisNum += data[i].thisYearNumber;
                    }

                }
                return htmlChil;
            },
            formatString(str){
                return (str == null || str == "" || str == undefined) ? "--" : str
            }
        },
        updated() {

        }
    }
</script>

<style >
    .tableClass{
        width: 1250px;
        border: 1px solid #333;
        border-collapse:collapse;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .tableClass tr td{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #333;
        font-size: 16px;
    }
    .tableClass tr th{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #333;
        font-size: 16px;
        font-weight: bolder;
    }

</style>