//动态加载百度地图api
export default function loadBMapApi(ak) {

    return new Promise(((resolve, reject) => {
        //先加载基础库api,再加载其他api或js依赖
        asyncLoadBaiduMapJsApi(ak)
            .then(() => {
                resolve();
                return true
            })
            .catch(err => {
                reject(err)
            })
        // asyncLoadJs("http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js").then(() => {
        //     resolve();
        //     //return true
        // })
        // .catch(err => {
        //     reject(err)
        // })
        // asyncLoadJs("http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js").then(() => {
        //     resolve();
        //     return true
        // })
        // .catch(err => {
        //     reject(err)
        // })
    }))
}

/**
 * @description 加载百度地图基础组件js
 * @param {string} ak
 */
export function asyncLoadBaiduMapJsApi(ak) {

    // ak = 'N9ZttRqRXqE1ZnxEr17ftskG';

    return new Promise(((resolve, reject) => {

        if (typeof BMap !== 'undefined'){
            resolve(BMap);
            return true;
        }

        window.onBMapCallback = function () {
            resolve(BMap);
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback';
        script.onerror = reject;
        document.head.appendChild(script);
    }))
}

/**
 * @description 加载第三方组件js公共方法
 * @param {string} url
 */
export function asyncLoadJs (url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.head.appendChild(script)
        script.onload = () => {
            resolve()
        }
        script.onerror = reject
    })
}
