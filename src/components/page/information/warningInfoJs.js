import axios from 'axios'
let base_url = '/api'
let controller_url = '/information'
let method_url = ''

export default {
  getAllWarningInfoByWarningType(warningType){
    method_url = '/getAllWarningInfoByWarningType/' + warningType
    return axios.get(base_url + controller_url + method_url)
  },
  getWarningInfoById(id){
    method_url = '/getWarningInfoById/' + id
    return axios.get(base_url + controller_url + method_url)
  },
  saveOrUpdate(param){
    method_url = '/saveOrUpdate'
    return axios.post("/api/regulatory/information/addMessagePushRecord" ,param)
  },
  pdfDownById(warningId){
    method_url = '/pdfDownById/'
    return axios.get(base_url + controller_url + method_url + warningId)
  },
  getWarningInfoByTimeAndType(param){
    method_url = '/getWarningInfoByTimeAndType'
    return axios.post(base_url + controller_url + method_url ,param)
  },
  getWarningInfoByDateTime(param){
    method_url = '/getWarningInfoByDateTime'
    return axios.post(base_url + controller_url + method_url ,param)
  },
  getMultiWarningInfoByTimeAndType(param){
    method_url = '/getMultiWarningInfoByTimeAndType'
    return axios.post(base_url + controller_url + method_url ,param)
  },
  pdfDownByHtmlCode(param){
    method_url = '/pdfDownByHtmlCode'
    return axios.post(base_url + controller_url + method_url,param)
  },
  getDayAllWarningInfo(param){
    method_url = '/getDayAllWarningInfo'
    return axios.post(base_url + controller_url + method_url,param)
  }

}
