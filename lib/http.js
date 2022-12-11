import axios from "axios";

axios.defaults.headers.post["Content-type"] = "application/json";
axios.defaults.headers.put["Content-type"] = "application/json";

Object.assign(axios.defaults, {
    timeout: 5 * 1000,
    $error_network(err) {
        console.error("Network Error=>", err);
    },
});

export default {
    defaults(invoke) {
        if (invoke) invoke(axios.defaults);
    },
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
        var _options = {};
        if (options) Object.assign(_options, axios.defaults, options);
        else _options = axios.defaults;

        var finallyCall = (response) => {
            if (_options.$finally) _options.$finally(response);
        };

        const instance = axios.create();
        instance.interceptors.request.use((config) => {
            if (_options.$on_before_request) _options.$on_before_request(config);
            return config;
        });
        instance.interceptors.response.use(
            (response) => {
                finallyCall(response);
                return response;
            },
            (err) => {
                if (!err.response) {
                    finallyCall(err);
                    if (_options.$error_network) _options.$error_network(err);
                    return Promise.reject(err);
                }
                if (err.response.status) {
                    var invoke = _options["$" + err.response.status];
                    if (invoke) invoke(err);
                }
                finallyCall(err);
                return Promise.reject(err);
            }
        );
        var promise = instance.request(url, options);
        return promise;
    },
};
