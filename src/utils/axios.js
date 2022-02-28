// axios 处理
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})

service.defaults.headers.get = {
    'Content-Type': 'application/json;charset=UTF-8',
    //  'Authorization': 'Bearer ' + sessionStorage.getItem('token')
}

service.defaults.headers.post = {
    'Content-Type': 'application/json;',
    //  'Authorization': 'Bearer ' + sessionStorage.getItem('token')
}

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.getItem("token") != null) {// 判断当前的token是否存在 ；
      // console.log("auth认证成功"+sessionStorage.getItem("token"));
      config.headers['Authorization'] = 'Bearer '+ sessionStorage.getItem("token");
    } else {
        router.app.$router.push('/');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
  
// 添加响应拦截器
service.interceptors.response.use(function (response) {
      //登录校验不正确跳到登录界面
      switch (response.data.status) {
          case 50005:
              sessionStorage.removeItem("token")
              router.app.$message.error("重新登录！");
              router.app.$router.push('/');
              return Promise.reject(response);
      }
      return response.data;
  }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
  });
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
                params: params
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        service.post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        service.put(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
  * delete
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        service.delete(url, { params: params })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
  * 下载excel文件方法--get
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function loadExcelGet(url, params) {
    service({
        url: url,
        method: 'get',
        responseType: 'blob',
        params: params, // 与post传参方式不同之处
        headers: {
            // Authentication: getToken()
        }
    }).then(res => {
        if (typeof window.chrome !== 'undefined') {
            var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' })
            var filename = params.fileName
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.style.display = 'none'
            downloadElement.href = href
            downloadElement.download = filename // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE version
            let blob = new Blob([res.data], {
                type: 'application/force-download'
            })
            window.navigator.msSaveBlob(blob, params.fileName)
        } else {
            // Firefox version
            let file = new File([res.data], params.fileName, {
                type: 'application/force-download'
            })
            window.open(URL.createObjectURL(file))
        }
    })
}

/**
  * 下载excel文件方法--post
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function loadExcelPost(data) {
    service({
        method: 'post',
        url: data.url, // 后端接口地址
        responseType: 'blob', // bolb格式的请求方式
        headers: {
            // Authentication: getToken('Admin-Token') // 请求头
        },
        data: data.data // 需要传给后端的请求参数体
    }).then(res => {
        const BLOB = res.data
        const fileReader = new FileReader()
        fileReader.readAsDataURL(BLOB) // 对请求返回的文件进行处理
        fileReader.onload = (e) => {
            let a = document.createElement('a')
            a.download = data.name + '.xlsx'
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }).catch(err => {
        console.log(err.message)
    })
}