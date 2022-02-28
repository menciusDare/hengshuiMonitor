import axios from 'axios';

let _baseURL = '/api/'
let imageControllerUrl = 'permissions/imageController/uploadImage'
let fileControllerUrl =  'permissions/imageController/uploadFile'

export default {
  uploadImage(formData) {
    return axios.post(_baseURL + imageControllerUrl, formData)
  },
  uploadFile(formData) {
    return axios.post(_baseURL + fileControllerUrl, formData)
  }
}
