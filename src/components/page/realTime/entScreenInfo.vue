<template>
    <div class="main" style="overflow: auto;width: 100%">

        <div id="top-first" style="font-size: 30px"></div>
        <div class="main-top" style="margin-top: 20px;margin-bottom: 20px;font-size: 18px">
            <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font" @click="backPage">返回</span></a>
            <span class="sep">丨</span>
            <span class="text-primary"><img src="../../../../static/css/images/pic/logo02.png" style="height: 30px;margin-bottom: -8px;margin-right: 8px"></span><span class="text-primary-font">{{entName}}</span>
        </div>


        <div style="font-size: 28px;margin-top: 50px;margin-bottom: 50px;text-align: center">“十四五”危险废物规范化环境管理评估指标</div>

        <div style="width: 100%;padding-left: 11%">
            <table class="tableClass" style="margin-left: 20px">
                <tr>
                    <th rowspan="2" style="width: 100px">检查项目 </th>
                    <th rowspan="2" style="width: 250px">检查主要内容 </th>
                    <th colspan="3">达标情况 </th>
                    <th rowspan="2" style="width: 100px">是否重点核查 </th>
                    <th rowspan="2" style="width: 300px">图片 </th>
                    <th rowspan="2">备注 </th>
                </tr>
                <tr>
                    <th style="width: 120px">达标</th>
                    <th style="width: 120px">基本达标</th>
                    <th style="width: 120px">不达标</th>
                </tr>
                <tbody id = "tbodyHtml">

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    export default {
        name: "entScreenInfo",
        data() {
            return {
                entName:this.$route.params.entName,
                entId:this.$route.params.entId,
                year : '2020',
                sorceBef:this.$route.params.sorce,
                showImageList:[],
                tokens:[]
            }
        },
        mounted() {
            this.tokens=[];
            this.query();
        },
        methods:{
            query(){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/tITest30';
                //var url = 'http://localhost:8006/ReportAndRegister/tITest30'
                that.$axios.get(url, {params: {
                        year: that.year,
                        entId: that.entId
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            var html = '';
                            var htmlCheck = '';
                            var sorce = that.sorceBef ;
                            if (sorce == null) {
                              sorce = '--'
                            }
                            if(res.data == null){
                                $('#tbodyHtml').html( '' );
                            }else{
                                for (var i = 0 ; i< res.data.length ; i++) {
                                    html +=
                                        '<tr>'
                                            +'<td  rowspan = ' +res.data[i].coun+ '>'+res.data[i].itemDesc+'</td>'
                                            + that.tdFunc(res.data[i].voList,i)

                                    //sorce += that.sumScore(res.data[i].voList);
                                }
                                htmlCheck = that.checkedOne(sorce)
                                //合计项
                                html+=
                                    '<tr>' +
                                        '<td colspan="2" style="text-align: left;padding-left: 2%">合计</td>' +
                                        '<td colspan="3" style="text-align: center">'+ sorce +'</td>' +
                                        '<td colspan="3"></td>' +
                                    '</tr>'+
                                    htmlCheck+
                                    '<tr>' +
                                        '<td colspan="8" style="text-align: left;padding-left: 2%">' +
                                    '综合评估标准：\n' +
                                    '</br>1.满分为60分。50分以上为达标；40-49分为基本达标；40分以下为不达标。\n' +
                                    '</br>2.第1条、18条和30条为否决项；即该荐不达标，则综合评估为不达标。\n' +
                                    '</br>3.考核年度内每次环境污染事故扣除10分；造成重大环境污染事故或人员伤亡的，则综合评估为不达标。' +
                                    '</td>' +
                                    '</tr>'

                                $('#tbodyHtml').html( html );
                                that.$nextTick(()=>{
                                  if(that.tokens.length>0){
                                   that.tokens.forEach(token=>{
                                     const ViewerDom = document.getElementById(token);
                                     const viewer = new Viewer(ViewerDom, {
                                       // 相关配置项,详情见下面
                                     });
                                   })
                                  }
                                })
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },

            tdFunc(voList,tokenIndex){
                var that = this;
                var htmlTd = '';
                var sorce = 0;
                for (var i = 0 ; i<voList.length ; i++) {

                    sorce += voList[i].score
                    if(i == 0){
                        htmlTd+=
                            '<td>'+voList[i].categoryDesc+'</td>'
                            +'<td> '+ (voList[i].score ==2 ? '√' : '') +'</td>'
                            +'<td> '+ (voList[i].score ==1 ? '√' : '') +'</td>'
                            +'<td> '+ (voList[i].score ==0 ||voList[i].score == -1 ? '×' : '') +'</td>'
                            +'<td>'+ that.isSingn(voList[i].sign) +'</td>'
                            +'<td>'+ that.getImageHtml(voList[i].tAttachmentVoList,tokenIndex) +'</td>'
                            +'<td>'+ that.getRemark(voList[i].remark) +'</td>'
                            +'</tr>'
                    }else{
                        htmlTd+=
                            '<tr>'
                            +'<td>'+voList[i].categoryDesc+'</td>'
                            +'<td> '+ (voList[i].score ==2 ? '√' : '') +'</td>'
                            +'<td> '+ (voList[i].score ==1 ? '√' : '') +'</td>'
                            +'<td> '+ (voList[i].score ==0 ||voList[i].score == -1 ? '×' : '') +'</td>'
                            +'<td>'+ that.isSingn(voList[i].sign) +'</td>'
                            +'<td>'+ that.getImageHtml(voList[i].tAttachmentVoList,tokenIndex) +'</td>'
                            +'<td>'+ that.getRemark(voList[i].remark) +'</td>'
                            +'</tr>'
                    }

                }
                return htmlTd
            },

            sumScore(voList){
                var sorce = 0;
                for (var i = 0 ; i<voList.length ; i++) {
                    sorce += voList[i].score
                }
               return  sorce
            },

            isSingn(sign){
                return sign == 0 ? '非重点' : '重点'
            },
            getImageHtml(tAttachmentVoList,tokenIndex){
              var url = this.AppConfig.appInfo.IMG_URL1;
              if(!tAttachmentVoList || tAttachmentVoList==null || tAttachmentVoList.length<1){
                return '无'
              }
              var token = "imgViewer"+tokenIndex;
              this.tokens.push(token);
              var html = '<div style="font-size: -webkit-xxx-large;" id="'+token+'">';
              var srcList = [];
              tAttachmentVoList.forEach(item=>{
                item.locationUrl = url+item.locationUrl;
                item.thumbnailUrl = url+item.thumbnailUrl;
                srcList.push(item.locationUrl)
              })
              for (let i = 0; i < tAttachmentVoList.length; i++) {
                var item = tAttachmentVoList[i];
                html+='<img style="width: 100px; height: 100px" index='+i+' src='+item.locationUrl+ '></img>'
              }
              return html+='</div>';
            },
            getUrl(pItem){
              return this.AppConfig.appInfo.IMG_URL1+pItem.locationUrl;
            },
            showImg(item,index,total) {
              this.showImageList.push(item);
              for (var i = 0; i < total.length; i++) {
                if (index != i) {
                  this.showImageList.push(total[i])
                //   console.log(this.showImageList)
                }
              }
            },
            getRemark(remark){
              if(remark==null){
                return '';
              }
              return remark;
            },
            backPage(){
                this.$router.push('/entScreen')
            },

            checkedOne(sorce ){
                var html = ''
                if(!sorce || sorce==null || sorce =='' || sorce =='--'){
                  html+=
                      '<tr>' +
                      '<td colspan="8" style="text-align: left;padding-left: 2%">综合评估：' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;达标&nbsp;&nbsp;<input onclick="return false;" value="1" name="db" type="checkbox" />\n' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;基本达标&nbsp;&nbsp;<input onclick="return false;" value="2" name="jbdb" type="checkbox" />' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;不达标&nbsp;&nbsp;<input onclick="return false;" value="3" name="bdb" type="checkbox" />' +
                      '</tr>'
                  return html
                }
                if(sorce >= 50){
                    html+=
                    '<tr>' +
                        '<td colspan="8" style="text-align: left;padding-left: 2%">综合评估：' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;达标&nbsp;&nbsp;<input onclick="return false;" value="1" name="db" type="checkbox" checked = "true"/>\n' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;基本达标&nbsp;&nbsp;<input onclick="return false;" value="2" name="jbdb" type="checkbox" />' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;不达标&nbsp;&nbsp;<input onclick="return false;" value="3" name="bdb" type="checkbox" />' +
                    '</tr>'
                }else if(sorce >= 40 && sorce< 50){
                  html+=
                      '<tr>' +
                      '<td colspan="8" style="text-align: left;padding-left: 2%">综合评估：' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;达标&nbsp;&nbsp;<input onclick="return false;" value="1" name="db" type="checkbox" />\n' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;基本达标&nbsp;&nbsp;<input onclick="return false;" value="2" name="jbdb" type="checkbox" checked = "true"/>' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;不达标&nbsp;&nbsp;<input onclick="return false;" value="3" name="bdb" type="checkbox" />' +
                      '</tr>'
                }else if(sorce < 40){
                  html+=
                      '<tr>' +
                      '<td colspan="8" style="text-align: left;padding-left: 2%">综合评估：' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;达标&nbsp;&nbsp;<input onclick="return false;" value="1" name="db" type="checkbox" />\n' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;基本达标&nbsp;&nbsp;<input onclick="return false;" value="2" name="jbdb" type="checkbox" />' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;不达标&nbsp;&nbsp;<input onclick="return false;" value="3" name="bdb" type="checkbox" checked = "true"/>' +
                      '</tr>'
                }

                return html;

            },

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
