<template>
    <div>
        <!-- 右侧 -->
        <div class="company-box" style="width: 360px;">
            <div class="company-hd">
                <div class="company-logo">
                    <img style="width: 60px;height: 43px;" :src="entCommonImg"/>
                </div>

                <div class="company-title">
                    <h2>{{Transdata.carVo.carNo}}</h2>
                    <h3>{{Transdata.carVo.entName}}</h3>
                    <div style="margin-left: -70px;width: 270px;">
                        <span style="padding-right: 10px;">{{Transdata.carVo.driver}}</span>
                        <i class="el-icon-mobile"></i>
                        <span style="padding-right: 10px;">{{Transdata.carVo.driverPhone}}</span>
<!--                        <i class="el-icon-video-camera"></i>-->
<!--                        <el-link @click="jumpAddress(Transdata.carVo)">实时监控</el-link>-->
                    </div>
                </div>
                <div v-if="!Transdata.carVo.carStatus" style="border: 1px solid #6DD400;height: 25px;margin-right: -21px;margin-top: -15px;background-color: #6DD400;width: 100px;text-align: center;line-height: 1.7;color: white;">车辆正常</div>
                <div v-if="Transdata.carVo.carStatus" style="border: 1px solid #F70D1A;height: 25px;margin-right: -21px;margin-top: -15px;background-color: #F70D1A;width: 100px;text-align: center;line-height: 1.7;color: white;">车辆报警</div>
            </div>
            <div class="company-bd">
                <li class="menu-item" v-if="Transdata.transInfoVo.length>0">
                    <a @click="openwfzyxx" data-toggle="tooltip" title="危废转运信息">
                        <span class="menu-text">危废转运信息</span>
                        <i :class="'icon '+(isShowzyxx?'icon-top':'icon-down')+' menu-toggle '" style="position: absolute;right: 20px;"></i>
                    </a>
                    <ul class="menu-child" v-if="isShowzyxx">
                        <div>
                            <table class="table-default">
                                <thead></thead>
                                <tbody>
                                <tr v-for="(item,i)  in Transdata.transInfoVo">
                                    <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
                                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.storageTime">{{item.dictName}}</td>
                                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.operationType">{{item.weight}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </ul>
                </li>
                <li class="menu-item" v-else="Transdata.transInfoVo.length>0">
                    <span class="menu-text">危废转运信息</span>
                    <div style="padding: 10px 120px;">
                        暂无数据
                    </div>
                </li>
                <template v-for="(item,index) in Transdata.fiveCoupletsVo">
                    <li class="menu-item">
                        <a :ref="'refa'+index" @click="openwld(index)" :style="'display: block;height: 32px;margin-top: 10px;line-height: 2;'+(iswld[index]?('background-color: rgba(216, 216, 216, 1);'):'')" data-toggle="tooltip">
                            <i :class="'iconfont icon-'+(index+1)" :ref="'refi'+index" :style="iswld[index]?'color: rgba(0, 145, 255, 1);':''"></i>
                            <span class="menu-text" style="color: rgba(66, 66, 66, 1);">联单:{{item.fiveNo}}</span>
                            <span v-if="item.statustr" class="menu-text" style="position: absolute;right: 40px;background-color: grey;opacity: 0.7;">{{item.statustr}}</span>
                            <i :ref="'refii'+index" style="position: absolute;right: 20px;" :class="'icon '+(iswld[index]?'icon-top':'icon-down')+' menu-toggle '"></i>
                        </a>
                        <ul class="menu-child" :ref="'ref'+index" v-show="iswld[index]" style="margin-top: 10px;">
                            <div style="float:left;width:12%">
                                <span>移出企业</span>
                                <br />
                                <br />
                                <br />
                                <span>接收企业</span>
                            </div>
                            <div style="width:88%;padding-top: 8px;">
                                <el-steps direction="vertical" :active="item.activeNumber">
                                    <el-step
                                            icon="iconfont icon-10014"
                                            :description="'申请重量：30kg'+ '\n'+'交接时间：2020-07-01 12:33'"
                                    >
                                        <template slot="title">
                                            <i class="el-icon-office-building"></i>
                                            {{item.moveOutEntName}}
                                        </template>
                                        <template slot="description">
                                            <div style="height: 0px;">申请重量：{{item.saidToWeight}}kg</div>
                                            <div style="height: 20px;">交接时间：{{item.handoverTime}}</div>
                                            <el-link
                                                    style="margin-left: 111px;color:#0091FF;"
                                                    @click="selectJJAndJSDetails(item,'交接详情')"
                                            >交接详情></el-link>
                                        </template>
                                    </el-step>
                                    <el-step
                                            :icon="item.status==1?'iconfont icon-10014':'iconfont icon-yuanxing'"
                                            title="万物生长处置有限公司"
                                    >
                                        <template slot="title">
                                            <i class="iconfont icon-huishou"></i>
                                            {{item.receiveEntName}}
                                        </template>
                                        <template slot="description">
                                            <div style="height: 0px;">接收重量：{{item.receiveWeigt}}kg</div>
                                            <div style="height: 20px;">接收时间：{{item.receiveTime}}</div>
                                            <el-link
                                                    style="margin-left: 111px;color:#0091FF;"
                                                    @click="selectJJAndJSDetails(item,'接收详情')"
                                                    :disabled="item.status==1?true:false"
                                            >接收详情></el-link>
                                        </template>
                                    </el-step>
                                </el-steps>
                            </div>
                        </ul>
                    </li>
                    <el-divider></el-divider>
                </template>
            </div>
        </div>
        <!-- 交接详情 -->
        <el-dialog
                :modal="true"
                :modal-append-to-body="false"
                :title="handoverInfo.dialogTitle"
                :visible.sync="handoverInfo.dialogTableVisible"
                width="600px"
        >
            <div class="company-hd" style="padding-bottom: 14px">
                <div class="company-logo" style="float: left;">
                    <img style="width: 100px;height: 60px;" :src="entCommonImg" class="logo-sub"/>
                </div>
                <div class="company-title">
                    <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
                    <h2>{{Transdata.carVo.carNo}}</h2>
                    <span style="padding-right: 10px;">{{Transdata.carVo.driver}}</span>
                    <i class="el-icon-mobile"></i>
                    <span style="padding-right: 10px;">{{Transdata.carVo.driverPhone}}</span>
                    <!--</el-tooltip>-->
                </div>
            </div>
            <el-divider></el-divider>
            <div style=" padding-top: 6px;
      display: inline-flex;
      padding-bottom: 5px;
    ">
                <div style="width: 70px; text-align: center;border: 1px solid;border-radius: 30px;border-color: #0190DA;margin-right: 8px;height: 20px;">
                    <img src="../../../../static/css/images/map/yichu@2x.png" style="height: 11px;" />
                    <span style="color: #0190DA;">产废</span>
                </div>
                <div>
                    <b>{{handoverInfo.cfAndZyInfoVo.productionEntName}}</b>
                    <br />
                    <span style="margin-left: -75px;line-height: 2;">经办人：{{handoverInfo.cfAndZyInfoVo.handledByName}}</span>
                    <br />
                    <span style="margin-left: -75px;    letter-spacing: 14px;">时间</span>
                    <span style="margin-left: -17px;">：{{handoverInfo.cfAndZyInfoVo.transportDate}}</span>
                </div>
                <div
                        style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
     border-color: #F7B844;
    margin-left: 40px;margin-right: 8px;height: 20px;"
                >
                    <img src="../../../../static/css/images/map/jieshou@2x.png" style="height: 11px;" />
                    <span style="color: #F7B844;">接收</span>
                </div>
                <div>
                    <b>{{handoverInfo.cfAndZyInfoVo.transportEntName}}</b>
                    <br />
                    <span style="margin-left: -75px;line-height: 2;">经办人：{{handoverInfo.cfAndZyInfoVo.zyhandledByName}}</span>
                    <br />
                    <span style="margin-left: -75px;    letter-spacing: 14px;">时间</span>
                    <span style="margin-left: -17px;">：{{handoverInfo.cfAndZyInfoVo.zytransportDate}}</span>
                </div>
            </div>
            <el-divider></el-divider>
            <div style="height: 184px;overflow-y: auto;">
                <table class="table-default">
                    <thead></thead>
                    <tbody>
                    <tr v-for="(item,i)  in handoverInfo.tableData">
                        <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                                :title="item.storageTime"
                        >{{item.dictName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.operationType"
                        >{{item.weight}}kg</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
        <!-- 实时监控(北斗) -->
        <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>
    </div>
</template>

<script>
    import productionVideoHuiKan from "./realTimeVideo";
    export default {
        name: "transferPlanInfoWindow",
        props: {},
        components: {
            productionVideoHuiKan
        },
        computed: {},
        data() {
            return {
                entCommonImg:'../../../../static/css/images/map/commonCar.jpg',//this.AppConfig.appInfo.IMG_URL+"/group1/M00/00/17/rBGuPF7PJ5uAHTJYAAV7fB4Ykps780.jpg",
                isShowzyxx: true,
                iswld: [1],
                Transdata: {
                    carVo: {
                        carNo: " -- ", entName: " -- ", carModel: " -- ", driver: " -- ", driverPhone: " -- ", carStatus:""
                    },
                    transInfoVo: [
                    ],
                    fiveCoupletsVo: [
                    ],
                },
                TransdataBak: {
                    carVo: {carNo: " -- ", entName: " -- ", carModel: " -- ", driver: " -- ", driverPhone: " -- ", carStatus:""},
                    transInfoVo: [],
                    fiveCoupletsVo: [],
                },
                handoverInfo:{
                    tableData:[],
                    dialogTitle:'',
                    dialogTableVisible:false,
                    cfAndZyInfoVo:'',
                }
            }
        },
        methods: {
            openwfzyxx() {
                this.isShowzyxx = !this.isShowzyxx;
            },
            openwld(index) {
                let status = !this.iswld[index];
                this.$set(this.iswld, index, status);
            },
            jumpAddress(item) {
                if(item==null){
                    this.$message.warning("暂无监控数据!");
                    return;
                }
                this.$refs.closeMouleHK.getBeiDouMonitorVideoUrlGroup(item);
            },
            selectJJAndJSDetails(item, title) {
                var _this = this;
                _this.$axios.get("/api/regulatory/tEnterpriseTransferStandingBook/selectJJORJSInfo",
                    {
                        params: {
                            fiveNo: item.fiveNo
                        },
                    }
                ).then(function (res) {
                    if (res.code == 0) {
                        _this.handoverInfo.tableData = res.data.transInfoVo;
                        _this.setCfAndZyInfoVo(item);
                        // _this.handoverInfo.cfAndZyInfoVo = res.data.cfAndZyInfoVo;
                        _this.handoverInfo.dialogTableVisible = true;
                        _this.handoverInfo.dialogTitle = title;
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            setCfAndZyInfoVo(item){
                var obj = {};
                obj.productionEntName = item.moveOutEntName?item.moveOutEntName:"--";
                obj.handledByName = item.handledByName?item.handledByName:"--";
                obj.transportDate = item.handoverTime?item.handoverTime:"--";
                obj.transportEntName = item.receiveEntName?item.receiveEntName:"--";
                obj.zyhandledByName = item.jshandledByName?item.jshandledByName:"--";
                obj.zytransportDate = item.receiveTime?item.receiveTime:"--";
                this.handoverInfo.cfAndZyInfoVo = obj;
            }
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>