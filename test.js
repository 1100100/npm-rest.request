import http from "./lib/http";
http.defaults((config) => {
    config.baseURL = "https://www.google.com";
    config.$on_before_request = (options) => {
        options.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    };
    config.$401 = () => {
        console.log("Request failed with status code 401");
    };
    config.$finally = () => {
        console.log("finally exec");
    };
    config.$error_network = (err) => {
        console.error("network error ", err);
    };
});
