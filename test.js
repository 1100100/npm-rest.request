import http from "./lib/http.js";
http.defaults((config) => {
    config.baseURL = "https://localhost:44313";
    config.$on_before_request = (options) => {
        //options.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token");
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
    // config.proxy = {
    //     protocol: "http",
    //     host: "localhost",
    //     port: 8888,
    //     auth: {
    //         username: "mikeymike",
    //         password: "rapunz3l",
    //     },
    // };
});

http.get("/api/account/check", {})
    .then((res) => {
        console.log("ok=>", res.data);
    })
    .catch((err) => {
        console.error(err);
    });
