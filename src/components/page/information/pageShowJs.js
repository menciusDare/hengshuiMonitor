import axios from 'axios'
let _baseURL = '/aircontrol/airdiagnosis'
let pageShowControllerUrl = '/api/pageshow'
let requestUrl

export default {
  getPageShow(title){
    requestUrl = '/getPageShowByTitle/'
    return axios.get(_baseURL + pageShowControllerUrl + requestUrl + `${title}`)
  },
  getPageByPageId(pageId){
    requestUrl = '/getPageByPageId/'
    return axios.get(_baseURL + pageShowControllerUrl + requestUrl + `${pageId}`)
  },
  saveOrUpdate(pageShow){
    requestUrl = '/saveOrUpdate'
    let pageShowJson  = JSON.stringify(pageShow)
    return axios.post(_baseURL + pageShowControllerUrl + requestUrl , pageShowJson,{
      headers:{
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  pdfDownByPageId(pageId){
    //pdfDownByPageId/{pageId}
    requestUrl = '/pdfDownByPageId/'
    return axios.get(_baseURL + pageShowControllerUrl + requestUrl + `${pageId}`)
  }
}
