var app_config = {
    appInfo:{
        //title:"临沂市危废全过程监管平台",//系统名称
        //title:"衡水市危废全过程监管平台",
        // logoImg:"",// logo地址
        bigScreenUrl: 'http://121.17.30.65:6290/',
        title:"衡水市固废（危废）全过程智慧监管平台",//系统名称
        // title:"融通废油处置监管平台",//系统名称
        riverCode: '07CB000000',
        regionCode: sessionStorage.getItem('regionCode')==null?"371300":sessionStorage.getItem('regionCode'),
        regionLevel:2,
        parentCode:"370000",
        parentLevel:1,
        pageSizes: [5,10,15,20],
        pageSize: 10,
        // IMG_URL: 'http://59.110.152.155:8000/', // 线上
        IMG_URL: 'http://10.0.200.26/', // 测试
        IMG_URL1: 'http://10.0.200.26/',
        airMonitorFront: 'http://218.241.184.18:8411/#/loginByToken?token=',

        portraitUrl: '../../../../static/css/images/pic/head.png',
        userName: sessionStorage.getItem("name"),

        regionName:"临沂市",
        duLng:"118.3407680000",
        duLat:"35.0724090000",
        lng: "118.3407680000",
        lat: "35.0724090000",
        bssw: "65.89630158504319,7.330286361787131",// 中国视图
        bsne: "145.29903476211402,57.65074046432375",// 中国视图entMonthReport

        regionName:  sessionStorage.getItem('regionName'),
        baiDuYingYanServiceId:"222203",
        baiDuMapMCode:"E6:2B:BD:65:8F:C8:FE:AF:F3:EF:62:97:74:3E:BB:BB:A0:31:A0:4D;com.baidu.track",
        baiDuMapAk:"IGAhv4rnLVYAIiUoTpcquETTlUaIaLNr",
        wx_supplier_code:[100000,100001,100002,100003,100005,100006],
        yl_supplier_code:[100004]
    },
    authInfo: {
        username: 'talroad',
        password: 'talroad',
    },
    baiDou:{
        username: '',
        password: '',
    },
    datas:{
        menus:[],
    }
}

module.exports=app_config;
