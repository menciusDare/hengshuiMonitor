import Vue from 'vue'
import Router from 'vue-router'
import LoginHtml from '../components/loginHtml'
import loginByToken from '../components/loginByToken'
import amfHomeHtml from '@/components/common/page/AmfHomeHtml'
/************************************ zys start ***************************************/
import menu from '../components/page/role/menuManager'

import roleList from '../components/page/role/RoleList'
import userList from '../components/page/role/UserList'
import videoMonitor from '../components/page/standingBook/VideoMonitor'
import provincialFiveLinked from '../components/page/fiveLinked/ProvincialFiveLinkedList'
import fiveLinkedInfo from '../components/page/fiveLinked/FiveLinkedInfo'
import cityFiveLinkedList from '../components/page/fiveLinked/CityFiveLinkedList'
import medicalTransfer from '../components/page/fiveLinked/medicalTransfer'
import transferCity2 from "../components/page/transfer/TransferCity2.vue";
import newEntBase from "../components/page/standingBook/newEntBase.vue"
import entManagementMonthReport from '../components/page/realTime/entManagementMonthReport';
import entManagementYearReport from '../components/page/realTime/entManagementYearReport';
/************************************ zys end ***************************************/


/************************************* zxl start ***************************************/
import collectVideoMonitor from '../components/page/standingBook/collectVideoMonitor'
import managementVideoMonitor from '../components/page/standingBook/managementVideoMonitor'
import wasteVideoMonitor from '../components/page/standingBook/wasteVideoMonitor'
import collectEnterpriseMonitor from '../components/page/standingBook/collectEnterpriseMonitor'
import managermentEnterpriseMonitor from '../components/page/standingBook/managermentEnterpriseMonitor'
import wasteEnterpriseMonitor from '../components/page/standingBook/wasteEnterpriseMonitor'
import medicalEnterpriseMonitor from '../components/page/standingBook/medicalEnterpriseMonitor'
import collectProductionBook from "../components/page/standingBook/collectProductionBook";
import wasteProductionBook from "../components/page/standingBook/wasteProductionBook";
import medicalProductionBook from "../components/page/standingBook/medicalProductionBook";
import managementProductionBook from "../components/page/standingBook/managementProductionBook";
import collectStorageFacilityMonitorin from '../components/page/realTime/collectStorageFacilityMonitorin'
import managerStorageFacilityMonitoring from '../components/page/realTime/managerStorageFacilityMonitoring'
import wasteStorageFacilityMonitoring from '../components/page/realTime/wasteStorageFacilityMonitoring'
import enterpriseManagement from '../components/page/standingBook/enterpriseManagement'
import wxenterpriseManagement from '../components/page/standingBook/wxenterpriseManagement'
import ylenterpriseManagement from '../components/page/standingBook/ylenterpriseManagement'
import enterprisesInfo from '../components/page/standingBook/enterprisesInfo'
import enterpriseProductionBook from '../components/page/standingBook/enterpriseProductionBook'
import collectEnterpriseProductionBook from '../components/page/standingBook/collectEnterpriseProductionBook'
import managementEnterpriseProductionBook from '../components/page/standingBook/managementEnterpriseProductionBook'
import smspush from '../components/page/smspush/smspush'
import wasteproDuctionManagement from '../components/page/standingBook/ProductionAndWasteUnit' //产废单位管理
import businessDuctionManagement from '../components/page/standingBook/ManagementOfBusinessUnit' //经营单位管理
import WasteProductionCompanyManagement from '../components/page/microEnterprise/WasteProductionCompanyManagement.vue' //小微产废单位管理
import EnterpriseStandingBook from '../components/page/microEnterprise/EnterpriseStandingBook.vue' //小微台账管理
import TransferRecordManagement from '../components/page/microEnterprise/TransferRecordManagement.vue' //小微转移记录管理
import IndustrialWasteReport from '../components/page/generalIndustrialWaste/IndustrialWasteReport.vue' //一般工业固废年报月报
import hazardousWasteReport from '../components/page/hazardousWasteControl/hazardousWasteReport.vue' //危险废物年报月报
import statisticalReport from '../components/page/standingBook/StatisticalReport' //统计分析
import analysisAndReport from '../components/page/standingBook/analysisAndReport' //统计和报表
/************************************* zxl end ***************************************/



/************************************ lx start ***************************************/
import transferCity from "../components/page/transfer/TransferCity";
import transferCityProvince from "../components/page/transfer/TransferCityProvince";
import areaManage from "../components/page/dataDictionary/areaManage";
import entBase from "../components/page/ReportAndRegister/EntBase";
import homePage from "../components/page/home/HomePage";
import noCityIndicator from "../components/page/noCityIndicator/NoCityIndicator";
import administrativeDisposition from '../components/page/administrativeDisposition/administrativeDisposition.vue'
import homeAlarmList from "../components/page/home/HomeAlarmList";

/************************************ lx end ***************************************/

/************************************ cxf start ***************************************/
import qyStatisticalAnalysis from '../components/page/statisticalAnalysis/qyStatisticalAnalysis'
import wfStatisticalAnalysis from '../components/page/statisticalAnalysis/wfStatisticalAnalysis'
import lastYearReview from '../components/page/ReportAndRegister/lastYearReview'
import transferPlanLiveMap from '../components/page/transferPlanLive/transferPlanLiveMap'
import transferPlanLiveMap1 from '../components/page/transferPlanLive/transferPlanLiveMap1'
import transferPlanLiveList from '../components/page/transferPlanLive/transferPlanLiveList'
import transferPlanLiveEarlyWarning from '../components/page/transferPlanLive/transferPlanLiveEarlyWarning'
import wasteProductionMonitor from '../components/page/standingBook/wasteProductionMonitor'
import monitorPoints from '../components/page/standingBook/monitorPoints'
import enterpriseMonitor1 from '../components/page/standingBook/enterpriseMonitor1'
import informationTable from '../components/page/information/informationTable'
import editor1 from '../components/page/information/editorHtml1'
import transferPlanLiveMap2 from '../components/page/transferPlanLive/transferPlanLiveMap2'

/************************************ cxf end ***************************************/

/************************************ gjx start ***************************************/
import wfMap from '../components/page/realTime/wfMap'
import wfMapBak from '../components/page/realTime/wfMapBak'
import entScreen from '../components/page/realTime/entScreen'
import entEarlyWarn from '../components/page/realTime/entEarlyWarn'
import storageFacilityMonitoring from '../components/page/realTime/storageFacilityMonitoring'
import entMonthReport from '../components/page/realTime/entMonthReport'
import entYearReport from '../components/page/realTime/entYearReport'
import entManagementPlanReport from '../components/page/realTime/entManagementPlanReport'
import faceTest from '../components/page/realTime/faceTest'
import beidouTest from '../components/page/realTime/beidouTest'
import transferRealTimeMonitor from '../components/page/transferPlanLive/transferRealTimeMonitor'
import transferRealTimeMonitorShow from '../components/page/transferPlanLive/transferRealTimeMonitorShow'
import transferEarlyWarning from '../components/page/transferPlanLive/transferEarlyWarning'
import fenceSet from '../components/page/transferPlanLive/fenceSet'
/************************************ gjx end ***************************************/

/************************************ gjx end ***************************************/

/************************************ sy start ***************************************/
import hazardousReductionPlan from "../components/page/ReportAndRegister/hazardousReductionPlan";
import hazardousProductInfo from "../components/page/ReportAndRegister/hazardousProductInfo";
import productInfo from "../components/page/ReportAndRegister/productInfo";
import RegisterHomeList from "../components/page/ReportAndRegister/RegisterHomeList";
import RegisterHome from "../components/page/ReportAndRegister/RegisterHome";
import transterPlan from "../components/page/ReportAndRegister/transterPlan";
import ToUseSelf from "../components/page/ReportAndRegister/ToUseSelf";
import otherUsed from "../components/page/ReportAndRegister/otherUsed";
import environmental from "../components/page/ReportAndRegister/environmental";
import entScreenInfo from "../components/page/realTime/entScreenInfo";
/************************************ sy end ***************************************/


/************************************ zh start ***************************************/
import WasteProductionList from "../components/page/statisticalAnalysis/WasteProductionList";
import YearWasteProductionList from "../components/page/statisticalAnalysis/YearWasteProductionList";
import permitPageList from "../components/page/permit/PageList";
import entRecord from "../components/page/permit/entRecord";
import riskAnalysis from '../components/page/enterpriseWholeProcessRiskAnalysis/index'
import riskAnalysisDetail from '../components/page/enterpriseWholeProcessRiskAnalysis/riskAnalysisDetail'
/************************************ zh end ***************************************/

// 固体废物监管路由
import gfentStandBook from '../components/page/SolidWasteControl/gfentStandBook'
import gfentMonthReport from '../components/page/SolidWasteControl/gfentMonthReport'
import gfentYearReport from '../components/page/SolidWasteControl/gfentYearReport'

// 机动车维修单位监管
import jdentStandBook from '../components/page/SupervisionOfMotor/jdentStandBook'
import jdentMonthReport from '../components/page/SupervisionOfMotor/jdentMonthReport'
import jdentYearReport from '../components/page/SupervisionOfMotor/jdentYearReport'

// 运输企业监管
import ysenterpriseManagement from '../components/page/SupervisionOfTransport/ysenterpriseManagement'



import enterpriseMonitor from "../components/page/standingBook/newEnterpriseMonitor";
import productionBook from "../components/page/standingBook/productionBook";

// 定时任务
import jobList from "../components/page/job/jobList"
import jobRecord from "../components/page/job/jobRecord"

// 操作日志
import operlogList from "../components/page/log/operlogList"

// 风险案件管理
import caseAssigned from './../components/page/riskCaseManagement/caseAssigned.vue'
// 数据字典
import dataList from './../components/page/dataDictionary/dataList'
// 企业小类管理
import entSublassList from './../components/page/entSublass/entSublassList'
// 一般固废企业管理
import gfWasteEnterprise from '../components/page/SolidWasteControl/gfWasteEnterprise'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/loginByToken',
            name: 'loginByToken',
            component: loginByToken
        },
        {
            path: '/',
            name: 'LoginHtml',
            component: LoginHtml
        },
        {
            path: '/amfHomeHtml',
            name: 'amfHomeHtml',
            component: amfHomeHtml,
            redirect: '/homePage',
            children: [
                /************************************ zys start ***************************************/
                {
                    path: '/menu',
                    name: 'menu',
                    meta: {
                        // auth: true //开启页面登陆状态校验
                    },
                    component: menu
                },
                //固体废物监管>企业管理
                {
                    path: '/gfWasteEnterprise',
                    name: 'gfWasteEnterprise',
                    component: gfWasteEnterprise
                },
                
                {
                    path: '/roleList',
                    name: 'roleList',
                    meta: {
                        // auth: true //开启页面登陆状态校验
                    },
                    component: roleList
                },
                {
                    path: '/userList',
                    name: 'userList',
                    meta: {
                        // auth: true //开启页面登陆状态校验
                    },
                    component: userList
                },
                {
                    path: '/videoMonitor',
                    name: 'videoMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: videoMonitor
                },
                {
                    path: '/provincialFiveLinked',
                    name: 'provincialFiveLinked',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: provincialFiveLinked
                },
                {
                    path: '/fiveLinkedInfo',
                    name: 'fiveLinkedInfo',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: fiveLinkedInfo
                },
                {
                    path: '/cityFiveLinkedList',
                    name: 'cityFiveLinkedList',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: cityFiveLinkedList
                },
                {
                    path: '/medicalTransfer',
                    name: 'medicalTransfer',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: medicalTransfer
                },
                {
                    path: '/newEntBase',
                    name: 'newEntBase',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: newEntBase
                },
                {
                    path: '/entManagementMonthReport',
                    name: 'entManagementMonthReport',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: entManagementMonthReport
                },
                {
                    path: '/entManagementYearReport',
                    name: 'entManagementYearReport',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: entManagementYearReport
                },
                /************************************ zys end ***************************************/

                /************************************ zxl start ***************************************/
                {
                    path: '/collectVideoMonitor',
                    name: 'collectVideoMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: collectVideoMonitor
                },
                {
                    path: '/managementVideoMonitor',
                    name: 'managementVideoMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: managementVideoMonitor
                },
                {
                    path: '/wasteVideoMonitor',
                    name: 'wasteVideoMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wasteVideoMonitor
                },

                {
                    path: '/collectEnterpriseMonitor',
                    name: 'collectEnterpriseMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: collectEnterpriseMonitor
                },
                {
                    path: '/managermentEnterpriseMonitor',
                    name: 'managermentEnterpriseMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: managermentEnterpriseMonitor
                },

                {
                    path: '/wasteEnterpriseMonitor',
                    name: 'wasteEnterpriseMonitor',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                    },
                    component: wasteEnterpriseMonitor
                },
                //固体废物监管>企业台账
                {
                    path: '/gfentStandBook',
                    name: 'gfentStandBook',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: gfentStandBook
                },
                //固体废物监管>企业月账
                {
                    path: '/gfentMonthReport',
                    name: 'gfentMonthReport',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: gfentMonthReport
                },
                // 一般工业固废年报月报
                {
                    path: '/IndustrialWasteReport',
                    name: 'IndustrialWasteReport',
                    component: IndustrialWasteReport
                },
                // 危险废物年报月报
                {
                    path: '/hazardousWasteReport',
                    name: 'hazardousWasteReport',
                    component: hazardousWasteReport
                },
                //固体废物监管>企业年账
                {
                    path: '/gfentYearReport',
                    name: 'gfentYearReport',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: gfentYearReport
                },
                //机动车维修单位监管>企业台账
                {
                    path: '/jdentStandBook',
                    name: 'jdentStandBook',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: jdentStandBook
                },
                //机动车维修单位监管>产废月报
                {
                    path: '/jdentMonthReport',
                    name: 'jdentMonthReport',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: jdentMonthReport
                },
                //固体废物监管>产废年报
                {
                    path: '/jdentYearReport',
                    name: 'jdentYearReport',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: jdentYearReport
                },
                //运输企业监管>企业管理
                {
                    path: '/ysenterpriseManagement',
                    name: 'ysenterpriseManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                            // auth: true//开启页面登陆状态校验
                    },
                    component: ysenterpriseManagement
                },
                {
                    path: '/medicalEnterpriseMonitor',
                    name: 'medicalEnterpriseMonitor',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: medicalEnterpriseMonitor
                },
                {
                    path: '/collectProductionBook',
                    name: 'collectProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: collectProductionBook
                },
                {
                    path: '/wasteProductionBook',
                    name: 'wasteProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wasteProductionBook
                },
                {
                    path: '/medicalProductionBook',
                    name: 'medicalProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: medicalProductionBook
                },
                {
                    path: '/managementProductionBook',
                    name: 'managementProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: managementProductionBook
                },
                {
                    path: '/collectStorageFacilityMonitorin',
                    name: 'collectStorageFacilityMonitorin',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: collectStorageFacilityMonitorin
                },
                {
                    path: '/managerStorageFacilityMonitoring',
                    name: 'managerStorageFacilityMonitoring',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: managerStorageFacilityMonitoring
                },
                {
                    path: '/wasteStorageFacilityMonitoring',
                    name: 'wasteStorageFacilityMonitoring',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wasteStorageFacilityMonitoring
                },
                {
                    path: '/enterpriseManagement',
                    name: 'enterpriseManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                            // auth: true//开启页面登陆状态校验
                    },
                    component: enterpriseManagement
                },
                {
                    path: '/wxenterpriseManagement',
                    name: 'wxenterpriseManagement',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wxenterpriseManagement
                },
            
                //产废单位管理
                {
                    path: '/wasteproDuctionManagement',
                    name: 'wasteproDuctionManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wasteproDuctionManagement
                },
                //统计分析
                {
                    path: '/statisticalReport',
                    name: 'statisticalReport',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: statisticalReport
                },
                  //统计报表
                  {
                    path: '/analysisAndReport',
                    name: 'analysisAndReport',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: analysisAndReport
                },

                //小微产废单位管理
                {
                    path: '/WasteProductionCompanyManagement',
                    name: 'WasteProductionCompanyManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                    },
                    component: WasteProductionCompanyManagement
                },
                //小微台账管理
                {
                    path: '/EnterpriseStandingBook',
                    name: 'EnterpriseStandingBook',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                    },
                    component: EnterpriseStandingBook
                },
                //小微转移记录管理
                {
                    path: '/TransferRecordManagement',
                    name: 'TransferRecordManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                    },
                    component: TransferRecordManagement
                },
                //经营单位管理
                {
                    path: '/businessDuctionManagement',
                    name: 'businessDuctionManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: businessDuctionManagement
                },
                {
                    path: '/ylenterpriseManagement',
                    name: 'ylenterpriseManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                        // auth: true//开启页面登陆状态校验
                    },
                    component: ylenterpriseManagement
                },
                {
                    path: '/enterprisesInfo',
                    name: 'enterprisesInfo',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: enterprisesInfo
                },
                {
                    path: '/collectEnterpriseProductionBook',
                    name: 'collectEnterpriseProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: collectEnterpriseProductionBook
                },
                {
                    path: '/enterpriseProductionBook',
                    name: 'enterpriseProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: enterpriseProductionBook
                },
                {
                    path: '/managementEnterpriseProductionBook',
                    name: 'managementEnterpriseProductionBook',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: managementEnterpriseProductionBook
                },
                {
                    path: '/smspush',
                    name: 'smspush',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: smspush
                },



                /************************************ zxl end ***************************************/


                /************************************ lx start ***************************************/
                {
                    path: '/transferCity',
                    name: 'transferCity',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferCity
                },
                {
                    path: '/transferCity2',
                    name: 'transferCity2',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferCity2
                },
                {
                    path: '/transferCityProvince',
                    name: 'transferCityProvince',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferCityProvince
                },
                {
                    path: '/areaManage',
                    name: 'areaManage',
                    meta: {
                        
                    },
                    component: areaManage
                },
                {
                    path: '/dataList',
                    name: 'dataList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: dataList
                },
                {
                    path: '/homePage',
                    name: 'homePage',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: homePage
                },
                    // 无废城市指标
                    {
                        path: '/noCityIndicator',
                        name: 'noCityIndicator',
                        meta: {
                            // auth: true//开启页面登陆状态校验
                        },
                        component: noCityIndicator
                    },
                {
                    path: '/administrativeDisposition',
                    name: 'administrativeDisposition',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: administrativeDisposition
                },
                {
                    path: '/homeAlarmList',
                    name: 'homeAlarmList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: homeAlarmList
                },


                /************************************ lx end ***************************************/
                //zh
                {
                    path: '/wasteProductionList',
                    name: 'WasteProductionList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: WasteProductionList
                },
                {
                    path: '/YearWasteProductionList',
                    name: 'YearWasteProductionList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: YearWasteProductionList
                },
                
                /************************************ cxf start ***************************************/

                {
                    path: '/qyStatisticalAnalysis',
                    name: 'qyStatisticalAnalysis',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: qyStatisticalAnalysis
                }, {
                    path: '/editor1',
                    name: 'editor1',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: editor1
                },

                {
                    path: '/informationTable',
                    name: 'informationTable',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: informationTable
                },
                {
                    path: '/wfStatisticalAnalysis',
                    name: 'wfStatisticalAnalysis',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: wfStatisticalAnalysis
                },
                {
                    path: '/transferPlanLiveMap',
                    name: 'transferPlanLiveMap',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: transferPlanLiveMap
                },
                {
                    path: '/transferPlanLiveMap1',
                    name: 'transferPlanLiveMap1',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: transferPlanLiveMap1
                },
                {
                    path: '/transferPlanLiveList',
                    name: 'transferPlanLiveList',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: transferPlanLiveList
                },
                {
                    path: '/wasteProductionMonitor',
                    name: 'wasteProductionMonitor',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: wasteProductionMonitor
                }, {
                    path: '/monitorPoints',
                    name: 'monitorPoints',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: monitorPoints
                }, {
                    path: '/transferPlanLiveEarlyWarning',
                    name: 'transferPlanLiveEarlyWarning',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: transferPlanLiveEarlyWarning
                }, {
                    path: '/enterpriseMonitor1',
                    name: 'enterpriseMonitor1',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: enterpriseMonitor1
                }, {
                    path: '/transferPlanLiveMap2',
                    name: 'transferPlanLiveMap2',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: transferPlanLiveMap2
                },
                /************************************ cxf end ***************************************/

                /************************************ gjx start ***************************************/

                {
                    path: '/wfMap',
                    name: 'wfMap',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: wfMap
                },
                {
                    path: '/wfMapBak',
                    name: 'wfMapBak',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: wfMapBak
                },
                {
                    path: '/entScreen',
                    name: 'entScreen',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: entScreen
                },
                {
                    path: '/entEarlyWarn',
                    name: 'entEarlyWarn',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: entEarlyWarn
                },
                {
                    path: '/storageFacilityMonitoring',
                    name: 'storageFacilityMonitoring',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: storageFacilityMonitoring
                },
                {
                    path: '/entMonthReport',
                    name: 'entMonthReport',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: entMonthReport
                },
                {
                    path: '/entYearReport',
                    name: 'entYearReport',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: entYearReport
                },
                {
                    path: '/faceTest',
                    name: 'faceTest',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: faceTest
                },
                {
                    path: '/beidouTest',
                    name: 'beidouTest',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: beidouTest
                },
                {
                    path: '/transferRealTimeMonitor',
                    name: 'transferRealTimeMonitor',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferRealTimeMonitor
                }, {
                    path: '/transferRealTimeMonitorShow',
                    name: 'transferRealTimeMonitorShow',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferRealTimeMonitorShow
                },
                {

                    path: '/transferEarlyWarning',
                    name: 'transferEarlyWarning',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: transferEarlyWarning
                }, {
                    path: '/entManagementPlanReport',
                    name: 'entManagementPlanReport',
                    meta: {
                        
                        // auth: true//开启页面登陆状态校验
                    },
                    component: entManagementPlanReport
                }, {
                    path: '/fenceSet',
                    name: 'fenceSet',
                    meta: {
                        // auth: true//开启页面登陆状态校验
                    },
                    component: fenceSet
                },
                /************************************ gjx end ***************************************/

                /************************************ sy start ***************************************/

                {
                    path: '/RegisterHomeList',
                    name: 'RegisterHomeList',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: RegisterHomeList
                },
                {
                    path: '/HazardousWasteManagementPlan',
                    name: 'HazardousWasteManagementPlan',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: RegisterHomeList
                },
                {
                    path: '/IndustrialWasteManagement',
                    name: 'IndustrialWasteManagement',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: RegisterHomeList
                },

                {
                    path: '/entScreenInfo',
                    name: 'entScreenInfo',
                    meta: {
                        /*  auth: true//开启页面登陆状态校验*/
                    },
                    component: entScreenInfo
                },
                {
                    path: '/caseAssigned',
                    name: 'caseAssigned',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: caseAssigned
                },
                {
                    path: '/RegisterHome',
                    name: 'RegisterHome',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: RegisterHome,
                    children: [{
                            path: '/entBase',
                            name: 'entBase',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: entBase
                        },
                        {
                            path: '/transterPlan',
                            name: 'transterPlan',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: transterPlan
                        },

                        {
                            path: '/ToUseSelf',
                            name: 'ToUseSelf',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: ToUseSelf
                        },

                        {
                            path: '/otherUsed',
                            name: 'otherUsed',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: otherUsed
                        },

                        {
                            path: '/environmental',
                            name: 'environmental',
                            meta: {
                                //auth: true//开启页面登陆状态校验
                            },
                            component: environmental
                        },
                        {
                            path: '/lastYearReview',
                            name: 'lastYearReview',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: lastYearReview
                        },
                        {
                            path: '/hazardousReductionPlan',
                            name: 'hazardousReductionPlan',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: hazardousReductionPlan
                        },
                        {
                            path: '/hazardousProductInfo',
                            name: 'hazardousProductInfo',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: hazardousProductInfo
                        },

                        {
                            path: '/productInfo',
                            name: 'productInfo',
                            meta: {
                                auth: true //开启页面登陆状态校验
                            },
                            component: productInfo
                        },
                    ]
                },



                /************************************ sy end ***************************************/
                {
                    path: '/enterpriseMonitor',
                    name: 'enterpriseMonitor',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: enterpriseMonitor
                },
                {
                    path: '/productionBook',
                    name: 'productionBook',
                    meta: {
                        //auth: true//开启页面登陆状态校验
                    },
                    component: productionBook
                },
                {
                    path: '/permitPageList',
                    name: 'permitPageList',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: permitPageList
                },
                {
                    path: '/entRecord',
                    name: 'entRecord',
                    meta: {
                        
                        auth: true //开启页面登陆状态校验
                    },
                    component: entRecord
                },
                {
                    path: '/riskAnalysis',
                    name: 'riskAnalysis',
                    meta: {
                        keepAlive: true,
                        isUseCache: false,
                        auth: true //开启页面登陆状态校验
                    },
                    component: riskAnalysis
                },
                {
                    path: '/riskAnalysisDetail',
                    name: 'riskAnalysisDetail',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: riskAnalysisDetail
                },
                {
                    path: '/jobList',
                    name: 'jobList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: jobList
                },
                {
                    path: '/jobRecord',
                    name: 'jobRecord',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: jobRecord
                },
                {
                    path: '/operlogList',
                    name: 'operlogList',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: operlogList
                },
                {
                    path: '/entSublass',
                    name: 'entSublass',
                    meta: {
                        auth: true //开启页面登陆状态校验
                    },
                    component: entSublassList
                },
            ]
        }
    ]

})