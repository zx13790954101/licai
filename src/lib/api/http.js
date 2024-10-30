/*
* 因为正式环境签名一分钟就会过期，所以每次请求之前主动重新向app获取签名，如果
* 有需求是在app内部不用token就可以获取数据的接口，请求的时候把flag设置成true,
* 这样不用传token也能正常获取数据
*
* */


import axios from 'axios';
/*
* 因为正式环境签名一分钟就会过期，所以每次请求之前主动重新向app获取签名，如果
* 有需求是在app内部不用token就可以获取数据的接口，请求的时候把flag设置成true,
* 这样不用传token也能正常获取数据
*
* */
/*"hxs-gin-dev"//*/
const getBaseArg = () => {
    return {
      sess_token: "",
        utime: "",
        sign: "",
        // sign: "hxs-gin-dev"
    }
};

function getAppInfo(flag) {
    return new Promise((resolve, reject) => {
        let base = getBaseArg();
        resolve(base);
    });

}

const funcArr = [];
let tag = false;


function postProcessor(type, url, params, flag, headers, warning,responseType = '', all = false) {
    return new Promise((resolve, reject) => {
        funcArr.push({func: getAppInfo, type, url, params, flag, headers, all, resolve, reject, warning,responseType});

        function next() {
            const info = funcArr.shift();
            if (info) {
                const {func, type, url, params, flag, headers, all, resolve, reject, warning} = info;
                func(flag).then(res => {
                    if (res === 401) {
                        return Promise.reject(res);
                    }
                    if (type === 'GET') {
                        return axios.get(url, {
                            params: {
                                ...res,
                                ...params,
                                _: Date.now()
                            },
                            headers: {
                                /*'Cache-Control': 'no-cache',*/
                                ...headers

                            },
                            responseType: responseType
                        })
                    } else if (type === 'POST') {
                        return axios.post(url, {
                            ...res,
                            ...params,
                            _: Date.now()
                        }, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                /*'Cache-Control': 'no-cache',*/
                                ...headers

                            },
                            transformRequest: [data => $stringify(data)]
                        })
                    }

                }).then(response => {
                    let {code, msg} = response.data;
                    if (all) return resolve(response.data);
                    if (String(code) === '401') {
                        return reject(401);
                    }
                    if (String(code) !== '200') {
                        if (warning) {
                           // Toast(msg || 'API 接口出错!');
                        }
                        reject(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch(e => {
                    if (e !== 401) {
                      //  Toast(e.message || '数据请求失败!');
                    }
                    reject(e);
                }).finally(() => {
                    tag = false;
                    next(resolve, reject);
                });
            }
        }

        if (!tag) {
            tag = true;
            next()
        }
    })
}

function $stringify(params) {
    let query = [];
    for (let key in params) {
        query.push(key + '=' + params[key])
    }
    return query.join('&');
}

export default {
    // 因参数问题，暂不做抽取
    get: function (url, params = {}, flag = false, headers = {}, warning = true) {
        return postProcessor('GET', url, params, flag, headers, warning)
    },
    getDownload: function (url, params = {}, flag = false, headers = {}, warning = true) {
        return postProcessor('GET', url, params, flag, headers, warning,'arraybuffer',true)
    },
    getAll: function (url, params = {}, flag = false, headers = {}) {
        return postProcessor('GET', url, params, flag, headers, true)
    },
    post: function (url, data = {}, flag = false, headers = {}, warning = true) {
        return postProcessor('POST', url, data, flag, headers, warning);
    },
    postAll: function (url, data = {}, flag = false, headers = {}) {
        return postProcessor('POST', url, data, flag, headers, true);
    }
}
