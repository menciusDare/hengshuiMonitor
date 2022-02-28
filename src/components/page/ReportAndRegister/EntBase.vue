<template>
        <div style="height:auto;width: 100%" class="main-child" id="top-one">
            <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
               <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">公司信息</div>
            </div>
            <div style="margin-right: 20px;margin-left: 20px;border-bottom:1px solid #adadad;margin-top: 10px;padding-bottom: 10px;">
                <table style="table-layout: fixed;width:800px;word-wrap:break-word;">
                    <colgroup>
                        <col style="width: 76px">

                        </col>
                        <col style="width: 120px">

                        </col>
                        <col style="width: 50px">

                        </col>
                        <col style="width: 80px">

                        </col>
                    </colgroup>
                    <tr style="height: 40px;">
                        <th style="text-align: right">
                            单位名称：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.name}}
                        </td>
                        <th style="text-align: right">
                            统一社会&nbsp;&nbsp;&nbsp;</br>信用代码：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.creditCode}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            单位注册地址：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.registeredAddress}}
                        </td>
                        <th style="text-align: right">
                            邮编：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.postCode}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            生产设施地址：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.address}}
                        </td>
                        <th style="text-align: right">
                            所在区域：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.arceName}}
                        </td>
                    </tr>
                </table>
            </div>
            <!--=================-->
            <div style="margin-right: 20px;margin-left: 20px;margin-top: 10px;padding-bottom: 20px;">
                <table style="table-layout: fixed;width:800px;word-wrap:break-word;">
                    <colgroup>
                        <col style="width: 76px">

                        </col>
                        <col style="width: 120px">

                        </col>
                        <col style="width: 50px">

                        </col>
                        <col style="width: 80px">

                        </col>
                    </colgroup>
                    <tr style="height: 40px;">
                        <th style="text-align: right">
                            法定代表人：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.legal}}
                        </td>
                        <th style="text-align: right">
                            行业类别与代码：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.categoryName}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            总投资（万元）：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.totalInvestment}}
                        </td>
                        <th style="text-align: right">
                            总产值（万元）：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.totalOutputValue}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            占地面积：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.areaCovered}}
                        </td>
                        <th style="text-align: right">
                            职工人数：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.numOfEmps}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            环保部门负责人：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.headOfEpd}}
                        </td>
                        <th style="text-align: right">
                            联系人：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.contacts}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            联系电话：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.contactsPhone}}
                        </td>
                        <th style="text-align: right">
                            传真电话：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.faxTelephone}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            电子信箱：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.mailBox}}
                        </td>
                        <th style="text-align: right">
                            设备经纬度：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.lng+'，'+formDate.lat}}
                        </td>
                    </tr>
                    <tr style="height: 40px;">

                        <th style="text-align: right">
                            单位网址：
                        </th>
                        <td style="padding-left: 20px">
                            {{formDate.companyWebsite}}
                        </td>
                    </tr>
                </table>
            </div>
            <!--=====================-->
            <div id="top-two" style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
                <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">管理部门及人员</div>
            </div>
            <!--=======-->
            <div style="margin-right: 20px;margin-left: 56px;margin-top: 10px;padding-bottom: 10px;">
                <table class="tab-border">
                    <colgroup>
                        <col style="width: 90px">

                        </col>
                        <col style="width: 90px">

                        </col>
                        <col style="width: 90px">

                        </col>
                        <col style="width: 90px">

                        </col>
                        <col style="width: 120px">

                        </col>
                    </colgroup>
                    <tr style="height: 50px;">
                        <th >
                            管理部门
                        </th>
                        <th >
                            部门负责人
                        </th>
                        <th >
                            废物管理负责人
                        </th>
                        <th colspan="2">
                            废物污染防治设施技术负责人及文化程度
                        </th>
                    </tr>


                    <tbody id = "tbodyHtmlS">

                    </tbody>
                </table>
            </div>
            <!--=====================-->
            <div id="top-three" style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
                <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">规章制度</div>
            </div>
            <!--================-->
            <div style="margin-right: 20px;margin-left: 56px;margin-top: 20px;padding-bottom: 10px; height: auto;display: flex">
                    <div v-for="(item ,index) in imgList" style="float: left;height: 280px">
                        <div class="img_container" @mouseover="showImg(index)" @mouseout="outImg(index)">
                            <!-- <iframe v-if="item.fileType == 'pdf'" scrolling="no" width="150px" height="200px" :src="imgUrl+item.locationUrl"/> -->

                            <div class="mask" v-if="item.fileType == 'pdf'" >
                                <button @click="openPdf(index,item.fileName,item.pdfUrl,item.fileType)" style="    background: #ffffff;width: 90px;height: 31px; font-weight: bold;">查看详情</button>
                            </div>
                            <div class="mask" v-if="item.fileType == 'doc'" >
                                <button @click="handleDownload(item.locationUrl)" style="    background: #ffffff;width: 90px;height: 31px; font-weight: bold;">下载</button>
                            </div>
                        </div>
                        <div style="text-align: center;width: 150px;margin-top: 20px">{{item.fileName}}</div>
                    </div>


            </div>

            <!--=====================-->
            <div id="top-four" style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
                <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">管理组织图</div>
            </div>
            <div style="margin-right: 20px;margin-left: 56px;margin-top: 10px;padding-bottom: 10px;" v-if="imgZhu!=null && imgZhu!=''">
                    <img :src="imgUrl+imgZhu" style="width: 80%"/>
            </div>
          <div id="top-five" style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">处置合同备案</div>
          </div>
          <!--================-->
          <div style="margin-right: 20px;margin-left: 56px;margin-top: 20px;padding-bottom: 10px; height: auto;display: flex">
            <div v-for="(item ,index) in hetongList" :key="index" style="float: left;height: 280px">
              <div class="management_img_container" @mouseover="managementShowImg(index)" @mouseout="managementOutImg(index)">
                <!-- <iframe v-if="item.fileType == 'pdf'" scrolling="no" width="150px" height="200px" :src="imgUrl+item.locationUrl"/> -->

                <div class="mask" v-if="item.fileType == 'pdf'" >
                  <button @click="openPdf(index,item.fileName,item.pdfUrl,item.fileType)" style="    background: #ffffff;width: 90px;height: 31px; font-weight: bold;">查看详情</button>
                </div>
                <div class="mask" v-if="item.fileType == 'doc'" >
                  <button @click="handleDownload(item.locationUrl)" style="    background: #ffffff;width: 90px;height: 31px; font-weight: bold;">下载</button>
                </div>
              </div>
              <div style="text-align: center;width: 150px;margin-top: 20px">{{item.fileName}}</div>
            </div>
          </div>

            <!-- 右侧菜单 -->
            <div id="go_to">
                <ul class="menu-lists">
                    <li :class="divTracing==1?'menu-items-two':'menu-items'">
                        <a href="javascript:;" @click="goToTop('#top-one',1)">
                            <div class="menu-name">公司信息</div>
                        </a>
                    </li>
                    <li :class="divTracing==2?'menu-items-two':'menu-items'">
                        <a href="javascript:;" @click="goToTop('#top-two',2)">
                            <div class="menu-name">管理部门及人员</div>
                        </a>
                    </li>
                    <li :class="divTracing==3?'menu-items-two':'menu-items'">
                        <a href="javascript:;" @click="goToTop('#top-three',3)">
                            <div class="menu-name">规章制度</div>
                        </a>
                    </li>
                    <li :class="divTracing==4?'menu-items-two':'menu-items'">
                        <a href="javascript:;" @click="goToTop('#top-four',4)">
                            <div class="menu-name">管理组织图</div>
                        </a>
                    </li>
                  <li :class="divTracing===5?'menu-items-two':'menu-items'">
                    <a href="javascript:;" @click="goToTop('#top-five',5)">
                      <div class="menu-name">处置合同备案</div>
                    </a>
                  </li>
                    <li :class="divTracing==5?'menu-items-two':'menu-items'">
                        <a href="javascript:;" @click="goToTop('#top-first',5)">
                           <i class="el-icon-caret-top" style="font-size: 20px"></i>
                            <div class="menu-name">返回顶部</div>
                        </a>
                    </li>
                </ul>
            </div>
            <!--pdf.word 弹框-->
            <div>
                <el-dialog :modal-append-to-body="false" custom-class="dia-class"
                           :title="titleName"
                           :visible.sync="centerDialogVisibleopenPdf" width="80%" top="2vh" @close="closeDia"
                >
                    <div>
                        <iframe :src="imgUrl+previewUrl" width="100%" height="760px">
                        </iframe>
                    </div>
                    <div style="text-align: center;margin-top: 10px">
                        <el-button type="primary" plain @click="centerDialogVisibleopenPdf = false">关 闭</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

</template>

<script>
import downloadImge from "@/components/common/unit/DownloadImge";
export default {
  name: "EntBase",
  data() {
    return {
      formDate: {
        name: "",
        registeredAddress: "",
        postCode: "",
        address: "",
        legal: "",
        totalInvestment: "",
        totalOutputValue: "",
        areaCovered: "",
        numOfEmps: "",
        headOfEpd: "",
        contacts: "",
        contactsPhone: "",
        faxTelephone: "",
        mailBox: "",
        companyWebsite: "",
        categoryId: "",
        categoryName: "",
      },
      formUser: [],
      formUserS: [],
      imgUrl: this.AppConfig.appInfo.IMG_URL,
      divTracing: 1,
      dataIndex: 0,
      imgList: [],
      imgZhu: "",
      hetongList:[],
      centerDialogVisibleopenPdf: false,
      previewUrl: "",
      titleName: "",
      entId: this.$route.params.entId,
      year: this.$route.params.year,
      carrentId: this.$route.params.correlationId,
    };
  },
  mounted() {
    // this.load();
    this.loadingData();
    this.getUserDept();
    if(this.carrentId && this.carrentId!=null && this.carrentId!= ""){
      this.getImgList();
    }
  },
  methods: {
    //
    closeDia: function () {
      this.centerDialogVisibleopenPdf = false;
      this.previewUrl = "";
      this.titleName = "";
    },
    //返回顶部
    goToTop: function (str, num) {
      this.divTracing = num;
      document.querySelector(str).scrollIntoView();
    },

    //图片浮层
    load: function () {
      $(document).ready(function () {
        $(".img_container").mouseover(function (e) {
          var $this = $(this);
          $(".img_container .mask").show();
        });
        $(".img_container").mouseout(function () {
          $(".img_container .mask").hide();
        });
      });
    },
    //展示pdf
    openPdf: function (index, name, previewUrl, fileType) {
      this.titleName = name;
      this.previewUrl = previewUrl;
      this.centerDialogVisibleopenPdf = true;
      this.outImg(index);
    },
    //pdf文件下载回来
    handleDownload(path) {
      this.$confirm("此操作将下载此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
          closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let params = new URLSearchParams();
        params.append("pathUrl", path);
        let locationUrl = path;
        let format = locationUrl.split(".")[1];
        let url = "api/permissions/imageController/downLoad";
        self.$axios
          .post(url, params, { responseType: "blob" })
          .then(function (response) {
            let imgeName = new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
            downloadImge(response, imgeName);
          })
          .catch(function () {
            self.$message.info("导出异常,请重试!");
          });
      });
    },
    showImg: function (str) {
      $(".img_container .mask").eq(str).show();
    },
    outImg: function (str) {
      $(".img_container .mask").eq(str).hide();
    },
    managementShowImg: function (str) {
      $(".management_img_container .mask").eq(str).show();
    },
    managementOutImg: function (str) {
      $(".management_img_container .mask").eq(str).hide();
    },
    //查询企业信息
    loadingData() {
      var _this = this;
      // let url = "http://localhost:8006/tEnterpriseInfo/"+_this.entId;
      let url = "/api/regulatory/tEnterpriseInfo/" + _this.entId;
      _this.$nextTick(() => {
        _this.$axios
          .get(url)
          .then((response) => {
            if (response.code == 0) {
              _this.formDate = response.data;
            }
          })
          .catch((error) => {
            // catch 指请求出错的处理
            // console.log(error);
          });
      });
    },
    isContains(str, substr) {
      return str.indexOf(substr) >= 0;
    },
    //查询企业图片信息
    getImgList() {
      var _this = this;
      // let url = "http://localhost:8006/tEnterpriseTransportPlan/getImgList/"+_this.carrentId;
      let url =
        "/api/regulatory/tEnterpriseTransportPlan/getImgList/" +
        _this.carrentId;
      _this.$nextTick(() => {
        _this.$axios
          .post(url)
          .then((response) => {
            if (response.code == 0) {
              for (let i = 0; i < response.data.length; i++) {
                let obj = new Object();
                if (response.data[i].type == 1 || response.data[i].type == 2) {
                  if (_this.isContains(response.data[i].fileName, ".pdf")) {
                    // let pdf = _this.getPdf(response.data,16);
                    obj.locationUrl = response.data[i].locationUrl;
                    obj.fileName = response.data[i].fileName;
                    obj.pdfUrl = response.data[i].locationUrl;
                    obj.fileType = "pdf";
                    _this.imgList.push(obj);
                  } else if (
                    _this.isContains(response.data[i].fileName, ".doc")
                  ) {
                    // let pdf = _this.getPdf(response.data,16);
                    obj.locationUrl = response.data[i].locationUrl;
                    obj.fileName = response.data[i].fileName;
                    obj.pdfUrl = response.data[i].locationUrl;
                    obj.fileType = "doc";
                    _this.imgList.push(obj);
                  } else if (
                    _this.isContains(response.data[i].fileName, ".docx")
                  ) {
                    // let pdf = _this.getPdf(response.data,16);
                    obj.locationUrl = response.data[i].locationUrl;
                    obj.fileName = response.data[i].fileName;
                    obj.pdfUrl = response.data[i].locationUrl;
                    obj.fileType = "doc";
                    _this.imgList.push(obj);
                  }
                }
                if(response.data[i].type===11){
                  if (_this.isContains(response.data[i].fileName, ".pdf")) {
                    // let pdf = _this.getPdf(response.data,16);
                    obj.locationUrl = response.data[i].locationUrl;
                    obj.fileName = response.data[i].fileName;
                    obj.pdfUrl = response.data[i].locationUrl;
                    obj.fileType = "pdf";
                    _this.hetongList.push(obj)
                  } else if (_this.isContains(response.data[i].fileName, ".doc")) {
                    obj.locationUrl = response.data[i].locationUrl;
                    obj.fileName = response.data[i].fileName;
                    obj.pdfUrl = response.data[i].locationUrl;
                    obj.fileType = "doc";
                    _this.hetongList.push(obj)
                  }
                }
                // if(response.data[i].type==8){
                //     let pdf = _this.getPdf(response.data,18);
                //     obj.locationUrl=response.data[i].locationUrl;
                //     obj.attachNo=response.data[i].attachNo;
                //     obj.pdfUrl=pdf;
                //     _this.imgList.push(obj)
                // }
                // if(response.data[i].type==9){
                //     let pdf = _this.getPdf(response.data,19);
                //     obj.locationUrl=response.data[i].locationUrl;
                //     obj.attachNo=response.data[i].attachNo;
                //     obj.pdfUrl=pdf;
                //     _this.imgList.push(obj)
                // }
                // if(response.data[i].type==10){
                //     let pdf = _this.getPdf(response.data,20);
                //     obj.locationUrl=response.data[i].locationUrl;
                //     obj.attachNo=response.data[i].attachNo;
                //     obj.pdfUrl=pdf;
                //     _this.imgList.push(obj)
                // }
                // if(response.data[i].type==11){
                //     let pdf = _this.getPdf(response.data,21);
                //     obj.locationUrl=response.data[i].locationUrl;
                //     obj.attachNo=response.data[i].attachNo;
                //     obj.pdfUrl=pdf;
                //     _this.imgList.push(obj)
                // }
                if (response.data[i].type == 3) {
                  _this.imgZhu = response.data[i].locationUrl;
                }


              }
              // _this.imgList = response.data;
            }
          })
          .catch((error) => {
            // catch 指请求出错的处理
            // console.log(error);
          });
      });
    },
    getPdf: function (response, num) {
      for (let i = 0; i < response.length; i++) {
        if (response[i].type == num) {
          return response[i].locationUrl;
        }
      }
      return "";
    },
    //查询管理部门及人员信息
    getUserDept() {
      var _this = this;
      // let url = "http://localhost:8006/tEnterpriseUser/getUserDept/"+_this.entId;
      let url = "/api/regulatory/tEnterpriseUser/getUserDept/" + _this.entId;
      _this.$nextTick(() => {
        _this.$axios
          .post(url)
          .then((res) => {
            if (res.code == 0) {
              _this.formUser = res.data;
              for (let i = 0; i < _this.formUser.length; i++) {
                if (_this.formUser[i].userType == 3) {
                  _this.formUserS.push(_this.formUser[i]);
                }
              }
              _this.dataIndex = _this.formUserS.length;
              var htmlTable = "";
              var tdTable = "";
              if (_this.dataIndex == 0) {
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].userType == 1) {
                    htmlTable +=
                      ' <tr style="height: 50px;">\n' +
                      "                        <td  rowspan=" +
                      _this.dataIndex +
                      ">\n" +
                      res.data[i].deptName +
                      "                            \n" +
                      "                        </td>\n" +
                      "                        <td   rowspan=" +
                      _this.dataIndex +
                      ">\n" +
                      res.data[i].userName +
                      "                            \n" +
                      "                        </td>\n" +
                      _this.tdData(res) +
                      "                    </tr>";
                  }
                }
              } else {
                for (var i = 0; i < res.data.length; i++) {
                  if (res.data[i].userType == 1) {
                    htmlTable +=
                      ' <tr style="height: 50px;">\n' +
                      "                        <td  rowspan=" +
                      _this.dataIndex +
                      ">\n" +
                      res.data[i].deptName +
                      "                            \n" +
                      "                        </td>\n" +
                      "                        <td  rowspan=" +
                      _this.dataIndex +
                      ">\n" +
                      res.data[i].userName +
                      "                            \n" +
                      "                        </td>\n" +
                      _this.tdDataS(res) +
                      "                    </tr>";
                  }
                }
              }
            }
            $("#tbodyHtmlS").html(htmlTable);
          })
          .catch((error) => {
            // catch 指请求出错的处理
            // console.log(error);
          });
      });
    },
    //拼接td
    tdData: function (res) {
      var tdTable =
        " <td   rowspan=" +
        this.dataIndex +
        ">\n" +
        "                            \n" +
        "                        </td>\n" +
        "                        \n" +
        "                        <td>\n" +
        "\n" +
        "                        </td>\n" +
        "                        <td>\n" +
        "                            \n" +
        "                        </td>\n";
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].userType == 2) {
          tdTable =
            "                        <td  rowspan=" +
            this.dataIndex +
            ">\n" +
            res.data[i].userName +
            "                            \n" +
            "                        </td>\n" +
            "                        \n" +
            "                        <td>\n" +
            "\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            "                            \n";
        }
      }
      return tdTable;
    },
    //拼接td
    tdDataS: function (res) {
      var tdTable =
        " <td rowspan=" +
        this.dataIndex +
        ">\n" +
        "                            \n" +
        "                        </td>\n" +
        "                        \n" +
        "                        <td>\n" +
        "\n" +
        "                        </td>\n" +
        "                        <td>\n" +
        "                            \n" +
        "                        </td>\n";
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].userType == 2) {
          tdTable =
            "                        <td rowspan=" +
            this.dataIndex +
            ">\n" +
            res.data[i].userName +
            "                            \n" +
            "                        </td>\n" +
            "                        \n" +
            this.getTest(res);
        }
      }
      return tdTable;
    },
    //拼接双td
    getTest: function (res) {
      let _this = this;
      var tdTable =
        "                        <td>\n" +
        "\n" +
        "                        </td>\n" +
        "                        <td>\n" +
        "                            \n" +
        "                        </td>\n";
      for (var i = 0; i < _this.formUserS.length; i++) {
        var education = _this.formUserS[i].education;
        var educationName = "";
        if (education == 1) {
          educationName = "小学以下";
        } else if (education == 2) {
          educationName = "小学";
        } else if (education == 3) {
          educationName = "初中";
        } else if (education == 4) {
          educationName = "中专";
        } else if (education == 5) {
          educationName = "大专";
        } else if (education == 6) {
          educationName = "高中";
        } else if (education == 7) {
          educationName = "大学";
        } else if (education == 8) {
          educationName = "硕士";
        } else if (education == 9) {
          educationName = "硕士以上";
        } else {
          educationName = "其它";
        }
        if (i == 0) {
          tdTable =
            "      <td>\n" +
            _this.formUserS[i].userName +
            "\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            educationName +
            "                            \n" +
            "                        </td>\n";
        } else {
          tdTable +=
            '<tr style="height: 50px;">\n' +
            "      <td>\n" +
            _this.formUserS[i].userName +
            "\n" +
            "                        </td>\n" +
            "                        <td>\n" +
            educationName +
            "                            \n" +
            "                        </td>\n" +
            "  </tr>";
        }
      }
      return tdTable;
    }
  },
};
</script>

<style>
.tab-border {
  table-layout: fixed;
  width: 950px;
  word-wrap: break-word;
  border: 1px solid black;
  text-align: center;
}
.tab-border tr td {
  border: 1px solid black;
}
.tab-border th {
  border: 1px solid black;
}
.img_container {
  position: relative;
  padding: 0px;
  width: 150px;
  height: 200px;
  margin-right: 20px;
  background: #fff;
  border: 1px solid #f5f5f5;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
}
.management_img_container {
  position: relative;
  padding: 0px;
  width: 150px;
  height: 200px;
  margin-right: 20px;
  background: #fff;
  border: 1px solid #f5f5f5;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
}
.img_container img {
  width: 150px;
  height: 200px;
  border-radius: 4px;
}
.img_container .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 200px;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  line-height: 200px;
  text-align: center;
  border-radius: 4px;
  display: none;
  white-space: nowrap;
  cursor: pointer;
}
.management_img_container .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 200px;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  line-height: 200px;
  text-align: center;
  border-radius: 4px;
  display: none;
  white-space: nowrap;
  cursor: pointer;
}
#go_to {
  /*position: fixed;*/
  right: 50px;
  /*!*bottom: 10px;*!*/
  top: 400px;
  /*height: 300px;*/
  /*width: 92px;*/
  /*border: 1px solid #ebeef5;*/
  /*background-color: #fff;*/
  /*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/
  position: fixed;
  /*top: 50%;*/
  /*left: 20%;*/
  /*transform: translate(610px, -20%);*/
  width: 70px;
  /*z-index: 100;*/
}

.menu-lists {
  background: #fff;
  border: 1px solid #f5f5f5;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.04);
}
.menu-items {
  height: 60px;
  position: relative;
  border-bottom: 1px solid #edeeeffa;
  text-align: center;
  font-size: 12px;
}
.menu-items-two {
  height: 60px;
  position: relative;
  border-bottom: 1px solid #edeeeffa;
  text-align: center;
  font-size: 12px;
  background-color: #edeeeffa;
}
.menu-items a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: 0.3s linear color;
}
.menu-items-two a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: 0.3s linear color;
}
.dia-class .el-dialog__header {
  padding: 10px;
}
.dia-class .el-dialog__body {
  padding: 10px 20px;
}
</style>
