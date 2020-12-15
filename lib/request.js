import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.headers.post["Content-type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("access_token")}`;
axios.defaults.timeout = 5000;

const fall_callback_options = {
    $400: (err) => {
        alert(err.response.data ? err.response.data : err.response.statusText);
    },
    //不在特殊处理的状态码里时调用
    $catch: () => {
        alert("系统繁忙，请稍后再试！");
    }
};
export default {
    get(url, options) {
        return this._request(url, { method: "get", ...options });
    },
    post(url, options) {
        return this._request(url, { method: "post", ...options });
    },
    delete(url, options) {
        return this._request(url, { method: "delete", ...options });
    },
    head(url, options) {
        return this._request(url, { method: "head", ...options });
    },
    options(url, options) {
        return this._request(url, { method: "options", ...options });
    },
    put(url, options) {
        return this._request(url, { method: "put", ...options });
    },
    patch(url, options) {
        return this._request(url, { method: "patch", ...options });
    },
    _request(url, options) {
        const instance = axios.create();
        var _options = {};
        Object.assign(_options,
            fall_callback_options,
            {
                validateStatus: (statusCode) => {
                    return statusCode >= 200 && statusCode <= 206;
                }
            },
            options);
        var finallyCall = () => {
            if (_options.$finally)
                _options.$finally();
        }
        instance.interceptors.response.use((resp) => {
            finallyCall();
            return resp;
        }, err => {
            if (!err.response) {
                alert("请求服务器失败，请检查您的网络情况");
                finallyCall();
                return Promise.reject(err)
            }
            switch (err.response.status) {
                case 400:
                    if (_options.$400) {
                        _options.$400(err);
                    }
                    break;
                case 401:
                    if (_options.$401)
                        _options.$401(err);
                    break;
                case 403:
                    if (_options.$403)
                        _options.$403(err);
                    break;
                case 404:
                    console.error(`访问的资源[${url}]不存在：`, err);
                    break;
                default:
                    console.error(err, err.response);
                    if (_options.$catch)
                        _options.$catch(err);
                    break;
            }
            finallyCall();
            return Promise.reject(err)
        });
        var promise = instance(url, _options);
        return promise;
    }
}