<template>
    <div style="width:98%;margin-left: 1%;" >
        <div class="main-top">
            <div class="breadcrumb">
                <a href="javascript:;" @click="superior()"><i class="icon icon-zhuanyun"></i><span class="text-primary-font">企业管理</span></a><span class="sep">></span><span class="text-primary-font">企业详情</span>
            </div>
            <!-- <div style="float: right"><el-link type="primary" @click="superior">返回上级</el-link></div> -->
        </div>
        <div class="panel">
            <div class="panel-hd">
                <h2 class="panel-tit01">企业基本信息</h2>
            </div>
            <div class="panel-bd pdb-0">
                <form class="form-box el-form">
                    <div class="el-row">
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">单位名称：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" readonly="readonly" placeholder="" class="el-input__inner"  v-model="enterprise.name" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">所属行业：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" readonly="readonly" placeholder="" class="el-input__inner"  v-model="enterprise.categoryName" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">社会统一信用代码：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder=""  readonly="readonly" id = "creditCode" class="el-input__inner" v-model="enterprise.creditCode" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">规模：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder=""  readonly="readonly"  class="el-input__inner" v-model="enterprise.enterpriseScale" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col-6">
                            <div class="el-form-item">
                                <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">省/市/区：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder=""  readonly="readonly" id = "scale" class="el-input__inner" v-model="region" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">法人：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"  readonly="readonly" id = "legal" v-model="enterprise.legal" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">联系人：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"  readonly="readonly" id = "contacts" v-model="enterprise.contacts" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">法人电话：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"  readonly="readonly" id = "legalPhone" v-model="enterprise.legalPhone" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                        <div class="el-col-6">
                            <div class="el-form-item"><label class="el-form-item__label" style="width: 160px;font-weight: 900">联系人电话：</label><div class="el-form-item__content" style="margin-left: 160px;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"  readonly="readonly" id = "contactsPhone" v-model="enterprise.contactsPhone" style="border: 0px"><!----><!----><!----><!----></div><!----></div></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- <div class="panel mt-lg" v-if="type == 2">
            <div class="panel-hd">
                <h2 class="panel-tit01">处置能力</h2>
            </div>
            <div style="width:100%;">
                <table class="table-default table-full">
                    <thead>
                    <tr>
                        <th style="text-align:center">危废类别</th>
                        <th style="text-align:center">危废代码</th>
                        <th style="text-align:center">危废俗称</th>
                        <th style="text-align:center">处置限额（吨）</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item  in tcapacityDtos">
                        <td style="text-align:center">{{item.hazardousType}}</td>
                        <td style="text-align:center">{{item.hazardousCode}}</td>
                        <td style="text-align:center">{{item.hazardousName}}</td>
                        <td style="text-align:center">{{item.hazardousTNum}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div> -->
        <div class="panel">
            <div class="panel-hd">
                <h2 class="panel-tit01">资质文件</h2>
            </div>
            <div class="panel-bd" v-if="url != ''">
				<div class="demo-image__preview" style="    height: 315px !important;overflow-y: auto;">
				  <!--<el-image
				    style="width: 100px; height: 100px"
				    :src="url"
				    :preview-src-list="srcList">
				  </el-image>-->
                    <viewer :images="showImageList">
                        <el-image
                                   v-for="(item,index) in srcList" :key="index"
                                   :src="item"
                                   style="width: 100px; height: 100px;margin-right: 10px;"
                                   @click="showImg(url,index,srcList)"></el-image>
                    </viewer>
				</div>
            </div>

            <div class="panel-bd" v-else>
                <div class="demo-image__preview">
                    <div
                            style="width: 100px; height: 100px;text-align: center"
                            >
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="panel mt-lg">
            <div class="panel-hd">
                <h2 class="panel-tit01">生产信息</h2>
            </div>
            <div class="panel-bd pd-t">
                <el-tabs v-model="activeName" type="card" >
                    <el-tab-pane label="产废信息" name="first" style="min-height: 400px;width: 100%" v-if="type == 1">
                        <enterprisesOrderList ref="enterprises"></enterprisesOrderList>
                    </el-tab-pane>
                    <el-tab-pane label="运输信息" name="second" style="min-height: 400px;width: 100%" v-if="type == 1">
                        <enterprisesCFList ref="enterprisesCF"></enterprisesCFList>
                    </el-tab-pane>
                    <el-tab-pane label="接收信息" name="third" style="min-height: 400px;width: 100%" v-if="type == 2">
                        <enterprisesCZList ref="enterprisesCZ" ></enterprisesCZList>
                    </el-tab-pane>
                    <el-tab-pane label="处置信息" name="fourth" style="min-height: 400px;width: 100%" v-if="type == 2">
                        <CZInfoList ref="CZInfo"></CZInfoList>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="panel mt-lg">
            <div class="panel-hd">
                <h2 class="panel-tit01">危废监控</h2>
            </div>
            <div class="panel-bd">
                <div class="el-form-item">
                    <div class="el-form-item__content" style="left: 40px">
                        <el-button type="primary" plain style="border-radius: 15px"  @click="jumpAddress('ss')">查看当前视频</el-button>
                        <el-button type="primary" plain  style="border-radius: 15px" @click="jumpAddress('hk')">查看视频监控</el-button>
                    </div>
                </div>
            </div>
        </div> -->

    </div>
</template>

<script>
	import { IMG_URL } from '../../../../static/ApplicationConfig.js'
    export default {
        data(){
            return{
				region: '',
				entId : this.$route.query.entId,
				regionCode : this.$route.query.regionCode,
				correlationId:this.$route.query.correlationId !=null?this.$route.query.correlationId:'' ,
				enterprise:{},
                data :{},
                titel:this.$route.params.titel,
                type: this.$route.params.type,
                options:[],
                tcapacityDtos:[],
                tattachments:[],
                dialogOrder:false,
                imgUrl : '',
                activeName:'',
                superiorName: this.$route.params.superiorName,
                imageList:[],

				url: '',
				srcList: [],
                showImageList: [],
            }
        },
        methods:{
            //图片展示
            showImg(item,index,total) {
                this.showImageList = [];
                this.showImageList.push(item);
                for (var i = 0; i < total.length; i++) {
                    if (index != i) {
                        this.showImageList.push(total[i]);
                        // console.log(this.showImageList)
                    }
                }
            },
            superior(){
                var _this = this;
                _this.$router.push("enterpriseManagement");
            },


			selectEnterpriseInfoByEntId(){
				var _this = this;
				var url = "/api/regulatory/tEnterpriseManagement/selectEnterpriseInfoByEntId";
				let params = new URLSearchParams();
				params.append("entId", _this.entId);
				_this.$axios
				  .get(url, { params })
				  .then(response => {
				    if (response.code == 0) {
						_this.enterprise = response.data
				    } else {
				    //   console.log(response.msg);
				    }
				  })
				  .catch(error => {
				    // catch 指请求出错的处理
				    // console.log(error);
				  });
			},


			selectRegionByRegionCode(){
				var _this = this;
				var url = "/api/regulatory/tEnterpriseManagement/selectRegioByRegionCode";
				let params = new URLSearchParams();
				params.append("regionCode", _this.regionCode);
				_this.$axios
				  .get(url, { params })
				  .then(response => {
				    if (response.code == 0) {
						_this.region = response.data.province + response.data.city + response.data.area;
				    } else {
				    //   console.log(response.msg);
				    }
				  })
				  .catch(error => {
				    // catch 指请求出错的处理
				    // console.log(error);
				  });
			},

			selectcorrelation(){
				var _this = this;
				var url = "/api/regulatory/tEnterpriseManagement/selectAttachmentByCorrelationId";
				let params = new URLSearchParams();
				params.append("correlationId", _this.correlationId);
                params.append("type", 0);
				_this.$axios
				  .get(url, { params })
				  .then(response => {
				    if (response.code == 0) {
						var imgs = response.data;
						for(var i=0;i<imgs.length;i++){
							_this.srcList.push(_this.IMG_URL + imgs[i].locationUrl);
						}
						if(imgs.length>0){
							_this.url = _this.IMG_URL + imgs[0].thumbnailUrl;
						}

				    } else {
				    //   console.log(response.msg);
				    }
				  })
				  .catch(error => {
				    // catch 指请求出错的处理
				    // console.log(error);
				  });
			},

            showRegion() {
                var _this = this;
                var url = "/api/regulatory/regionInfo/getRegionChildrenList?regionCode=0";
                _this.$nextTick(() => {
                    _this.$axios.get(url).then((response) => {
                        if(response.code == 0) {
                            _this.region = response.data[0].children;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
            jumpAddress(adress){
                var _this = this;
                var entId = _this.entId;
                if(adress=="ss"){
                    _this.$nextTick(() => {
                        _this.$refs.closeDialogSS.openVideo(entId,1,"");
                    })
                }else if(adress=="hk"){
                    _this.$refs.closeMouleHK.openVideo(entId,1,"");
                }
            },
        },
        created: function () {
            var _this = this;
			_this.selectEnterpriseInfoByEntId()
			_this.selectRegionByRegionCode();
			_this.selectcorrelation();

        },
    }
</script>

<style scoped>

</style>
