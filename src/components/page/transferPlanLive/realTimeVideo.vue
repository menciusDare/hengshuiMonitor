<template>
  <el-dialog
          :visible.sync="dialogHK"
          v-if="dialogHK"
          title="实时监控"
          :center="true"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          top="10px"
          width="1000px"
          @close="closeBtn"
  >
    <div class="modal modal-lg is-show" style="overflow:hidden;width:1040px;height: 480px">
      <a href="javascript:;" class="modal-close icon icon-close" title="关闭" @click="closeBtn()"></a>
      <div class="modal-hd">
        <h2 class="modal-tit">
          <i class="icon icon-jiankong"></i>实时监控信息
        </h2>
      </div>
      <div class="modal-bd">
        <!-- 公司信息 -->
        <div class="company-detail">
          <div class="company-title">
            <img src="../../../../static/css/images/pic/logo01.png" />
            {{item.carNo}}
          </div>
        </div>
        <!--        <div style="padding-top: 5px;">
                    <div class="company-info">注册人：<span class="text-default">{{item.contacts}}&nbsp;&nbsp;&nbsp;&nbsp;</span>位置：<span class="text-default">{{item.address}}&nbsp;&nbsp;&nbsp;&nbsp;</span>电话：<span class="text-default">{{item.contactsPhone}}</span></div>
        </div>-->
        <!-- 监控 -->
        <div class="tab-video" style>
          <div class="tab-hd">
            <ul class="tab-head">
              <li class="is-active">
                <i class="icon icon-buju"></i>
              </li>
              <!--<li><i class="icon icon-buju1"></i></li><li class="ratio-txt"><span>16/9</span></li>-->
            </ul>
          </div>
          <div class="tab-bd">
            <div class="video-item is-active">
              <!-- 左侧车间 -->
              <div class="video-big">
                <div class="video-box" style="width: 640px;height: 425px">
                  <div :id="bigScreenVideoId"></div>
                  <div class="video-state">
                    <a>
                      {{cameraName}}
                      <i class="icon icon-shipin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <!-- 右侧车间 -->
              <div class="video-auto">
                <div
                        class="video-box"
                        v-for="(imte,index) in videoList"
                        :key="index"
                        style="width: 300px;height: 180px"
                >
                  <div class="video-image">
                    <div :id="bigScreenVideoId+index"></div>
                  </div>
                  <div class="video-state" @click="videoInfo(imte,index+1)">
                    <a>
                      设备{{index+1}}
                      <i class="icon icon-shipin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <!-- 操控台 -->
              <div
                      class="panel-box mt-sm"
                      style="width:320px;position:absolute;top: 290px;right:20px;background: rgb(37, 43, 58) none repeat scroll 0% 0%;"
              >
                <div
                        style="transform: translate(10px,9px);overflow: hidden;font-size: 18px;line-height: 20px;"
                >
                  <div class="title" style="background-color: #252b3a;width: 200px;">操控台</div>
                </div>
                <div class="panel-bd" style="padding: 0 10px 0px;transform: translate(0px,19px)">
                  <div class="operate-area">
                    <!-- 方向 -->
                    <div class="oper-direction">
                      <!-- 选中样式根据情况需要is-active -->
                      <div class="direction-cont top" @click="controlVideo(0)">
                        <i class="icon icon-shang"></i>
                      </div>
                      <div class="direction-cont is-active right" @click="controlVideo(3)">
                        <i class="icon icon-you"></i>
                      </div>
                      <div class="direction-cont bottom" @click="controlVideo(1)">
                        <i class="icon icon-xia"></i>
                      </div>
                      <div class="direction-cont left" @click="controlVideo(2)">
                        <i class="icon icon-zuo"></i>
                      </div>
                    </div>
                    <!-- 调节 -->
                    <div class="oper-adjust">
                      <div class="slide-box">
                        <div class="slide-name">焦距</div>
                        <div
                                role="slider"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-orientation="horizontal"
                                class="el-slider"
                                aria-valuetext="36"
                                aria-label="slider between 0 and 100"
                        >
                          <!---->
                          <div style="width: 50px">
                            <el-slider
                                    v-model="jiaoju"
                                    :show-tooltip="false"
                                    @change="chooseJiaoJu"
                            ></el-slider>
                          </div>
                        </div>
                        <div class="slide-text">{{parseInt(jiaoju*0.28)}}mm</div>
                      </div>
                      <div class="slide-box">
                        <div class="slide-name">缩放</div>
                        <div
                                role="slider"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-orientation="horizontal"
                                class="el-slider"
                                aria-valuetext="36"
                                aria-label="slider between 0 and 100"
                        >
                          <div style="width: 50px">
                            <el-slider
                                    v-model="suofang"
                                    :show-tooltip="false"
                                    @change="chooseSuoFang"
                            ></el-slider>
                          </div>
                        </div>
                        <div class="slide-text">{{ parseInt(suofang*0.28)}}mm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </el-dialog>
</template>

<script>
  import "xgplayer";
  import FlvPlayer from "xgplayer-flv.js";
  import e from "../../../../static/tinymce/tinymce.min";
  export default {
    name: "productionVideo",
    components: { FlvPlayer },
    data() {
      return {
        chooseDate: "",
        statTime: "",
        endTime: "",
        current: 0,
        entAddress: "",
        legalPhone: "",
        entName: "",
        contacts: "",
        videoList: [
          /*{
            url:"http://10.0.200.134:6604/rtmp/1599801947584/?MDU4NkY2Mjg2NThFMzBEMjUzRUMwNDUwNjc0Q0NBNDMsMSwwMjAyMDA4MDAzODUsMCwxLDAsMA==",
            id: "mse2",
          },
          {
             url:"http://10.0.200.134:6604/rtmp/1599801947584/?MDU4NkY2Mjg2NThFMzBEMjUzRUMwNDUwNjc0Q0NBNDMsMSwwMjAyMDA4MDAzODUsMSwxLDAsMA==",
            id: "mse3",
          },
          {
                url:"http://10.0.200.134:6604/rtmp/1599801947584/?MDU4NkY2Mjg2NThFMzBEMjUzRUMwNDUwNjc0Q0NBNDMsMSwwMjAyMDA4MDAzODUsMiwxLDAsMA==",
            id: "mse4",
          },
          {
                url:"http://10.0.200.134:6604/rtmp/1599801947584/?MDU4NkY2Mjg2NThFMzBEMjUzRUMwNDUwNjc0Q0NBNDMsMSwwMjAyMDA4MDAzODUsMywxLDAsMA==",
            id: "mse5",
          },*/
        ],
        videoUrl:
                "/beidou/808gps/open/player/video.html?lang=zh&vehiIdno=%E4%BA%ACA123456&account=admin&password=t1ch@TR&channel=1",
        dialogHK: false,
        entId: "",
        showWH: "",
        videoType: "",
        deviceNo: "",
        shiList: [],
        shitTime: "",
        item: {},
        chooseDateTimes: null,
        type: 1,
        cameraName: "设备1",
        path: "/api/regulatory/",
        videoId: "",
        jiaoju: 0,
        jiaojuCope: 0,
        suofang: 0,
        suofangCope: 0,
        statTime1: "",
        endTime1: "",
        player: {},
        player1: {},
        player2: {},
        player3: {},
        player4: {},
        bigScreenVideoUrl:'',
        bigScreenVideoId:'mse'
      };
    },
    methods: {
      chooseJiaoJu() {
        var _this = this;
        if (_this.jiaojuCope > _this.jiaoju) {
          _this.controlVideo(10);
        } else if (_this.jiaojuCope < _this.jiaoju) {
          _this.controlVideo(11);
        }
        _this.jiaojuCope = _this.jiaoju;
      },
      chooseSuoFang() {
        var _this = this;
        if (_this.suofangCope > _this.suofang) {
          _this.controlVideo(9);
        } else if (_this.suofangCope < _this.suofang) {
          _this.controlVideo(8);
        }
        _this.suofangCope = _this.suofang;
      },
      chooseVideoType() {
        this.videoId = "";
      },
      chooseVideo(id) {
        this.videoId = id;
      },
      getDateList() {
        var _this = this;
        if (_this.chooseDateTimes != null) {
          var dateTime = _this.chooseDateTimes.format("yyyyMMdd");
          _this.statTime = dateTime + "0000";
          _this.endTime = dateTime + "2359";
          _this.statTime1 =
                  _this.chooseDateTimes.format("yyyy-MM-dd") + " 00:00:00";
          _this.endTime1 =
                  _this.chooseDateTimes.format("yyyy-MM-dd") + " 23:59:59";
          _this.type = 2;
        } else {
          _this.type = 1;
        }
      },
      loadingData() {
        var _this = this;
        _this.$nextTick(() => {
          var url = _this.path + "tVideocamera/queryVideoListByCarNo";
          var params = new URLSearchParams();
          _this.getDateList();
          params.append("starDate", _this.statTime);
          params.append("endDate", _this.endTime);
          params.append("type", _this.type);
          params.append("deviceNo", _this.item.carNo);
          _this.$axios
                  .post(url, params)
                  .then((response) => {
                    if (response.code == 0) {
                      _this.entAddress = response.data.entAddress;
                      _this.legalPhone = response.data.legalPhone;
                      _this.entName = response.data.entName;
                      _this.contacts = response.data.contacts;
                      _this.videoInfo(response.data.data[0].id);
                      _this.videoList = response.data.data;
                      var num = this.videoList.length; //16*9视频个数
                      $(".video-ratio-box").width(10000);
                      this.showWH = "width:" + num * 1040 + "px;";
                    }
                  })
                  .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                  });
        });
      },
      closeBtn() {
        this.type = 1;
        this.entId = "";
        this.entAddress = "";
        this.legalPhone = "";
        this.entName = "";
        this.contacts = "";
        this.videoListNew = [];
        this.videoUrl = "";
        this.videoAdress = "";
        this.pageType = "";
        this.cffalg = false;
        this.qtfalg = false;
        this.deviceNo = "";
        this.videoType = "";
        this.shiList = [];
        this.shitTime = "";
        this.statTime1 = "";
        this.endTime1 = "";
        this.chooseDateTimes = null;
        this.item = {};
        this.dialogHK = false;
        this.cameraName = "设备1";
      },
      controlVideo(direction) {
        var _this = this;
        var url = _this.path + "tVideocamera/getVideoControl";
        var params = new URLSearchParams();
        params.append("direction", direction);
        params.append("id", _this.videoId);
        if (_this.videoId != null && _this.videoId != "") {
          _this.$axios
                  .post(url, params)
                  .then((response) => {
                    if (response.code == 0) {
                      // _this.$message.success("操控成功!");
                    } else {
                      _this.$message.error(response.msg);
                    }
                  })
                  .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                  });
        } else {
          _this.$message.error("请选择需要控制的摄像头!");
        }
      },
      videoInfo(item,index) {
        // console.log(item);
        var _this = this;
        _this.bigScreenVideoURL = item.bigScreenVideoUrl;
        this.cameraName = "设备" + index;
        _this.$nextTick(() => {
          let player = new FlvPlayer({
            id: _this.bigScreenVideoId,
            url: item.url,
            playsinline: true,
            isLive: true,
            whitelist: [""],
            autoplay: true,
            width: "300",
            height: "540",
          });
        });
      },
      selectInfoList() {
        var _this = this;
        _this.$nextTick(() => {
          _this.getDateList();
          var url =
                  _this.path +
                  "tVideocamera/queryAlarmInformationPage?entId=" +
                  _this.item.entId +
                  "&starDate=" +
                  _this.statTime1 +
                  "&endDate=" +
                  _this.endTime1;
          _this.$axios
                  .get(url)
                  .then((response) => {
                    if (response.code == 0) {
                      _this.shiList = [];
                      for (var i = 0; i < response.data.records.length; i++) {
                        var param = {
                          id: i + 1,
                          createTime: response.data.records[i].createTime,
                          message: response.data.records[i].message,
                        };
                        _this.shiList.push(param);
                      }
                    }
                  })
                  .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                  });
        });
      },
      show(index1) {
        var _this = this;
        _this.type = 1;
        _this.$nextTick(() => {
          let player = new FlvPlayer({
            id: _this.bigScreenVideoId,
            url:_this.bigScreenVideoUrl,
            playsinline: true,
            isLive: true,
            whitelist: [""],
            autoplay: true,
            width: "300",
            height: "540",
            errorTips:'此设备不在线',
          });
          _this.videoList.forEach((element, index) => {
            let player = new FlvPlayer({
              id: _this.bigScreenVideoId+index,
              url:element.url,
              playsinline: true,
              isLive: true,
              whitelist: [""],
              autoplay: index == index1 ? true : false,
              width: "300",
              height: "180",
              errorTips:'此设备不在线',
            });
          });
        });
      },

      openVideo(item) {
        let Base64 = require("js-base64").Base64;
        var _this = this;
        _this.$nextTick(() => {
          /*var oJs = document.createElement("script");
          oJs.setAttribute("type", "text/javascript");
          oJs.setAttribute("src", "static/css/js/common.js");
          document.getElementsByTagName("head")[0].appendChild(oJs); //绑定*/
          // _this.videoList.forEach((element, index) => {
          //   element.url =
          //     "/beidou/rtmp/" +
          //     new Date().getTime() +
          //     "/?" +
          //     Base64.encode(
          //       sessionStorage.getItem("jsession") +
          //         ",1," +
          //         item.carNo +
          //         "," +
          //         index +
          //         ",1,0,0"
          //     );
          // });
          window.scrollTo(0, 0);
          _this.item = item;
          _this.dialogHK = true;
          _this.show(0);
        });
      },
      // 请求当前设备视频url
      getBeiDouMonitorVideoUrlGroup(item){
        var _this = this;
        _this.$axios.get("/api/regulatory/pc/beidou/getBeiDouMonitorVideoUrlGroup",
                {
                  params: {
                    vehiIdno: '京A123456'
                  },
                }
        ).then(function (res) {
          if (res.code == 0) {
            _this.item = item;
            _this.videoList = res.data;
            _this.bigScreenVideoUrl = res.data[0].url;
            _this.dialogHK = true;
            _this.$nextTick(() => {
              _this.show(0,res.data);
            });
          }else{
            _this.$message.info(res.msg);
          }
        }).catch((error) => {
          // catch 指请求出错的处理
          _this.$message.error("视频请求出错,请重试!");
          // console.log(error);
        });
      },
      // 切换视频
      changeBigScreenVideo(item){
        // console.log(item);
      }
    },
    created: function () {
      var oJs = document.createElement("script");
      oJs.setAttribute("type", "text/javascript");
      oJs.setAttribute("src", "static/css/js/common.js"); //文件的地址 ,可为绝对及相对路径
      document.getElementsByTagName("head")[0].appendChild(oJs); //绑定
    },
  };
</script>

<style >
  .xgplayer-enter-spinner {
    height: 30px !important;
    width: 30px !important;
  }
</style>
