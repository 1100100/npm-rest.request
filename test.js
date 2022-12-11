import http from "./lib/http.js";
http.defaults((config) => {
    config.baseURL = "https://www.google.com";
    config.timeout = 0;
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
    config.proxy = {
        protocol: "http",
        host: "thecore.222233.xyz",
        port: 29102,
        auth: {
            username: "43595",
            password: "fQruf8dNTJ0I",
        },
    };
});

http.get("/translate_a/single?client=webapp&ie=UTF-8&sl=auto&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=gt&pc=1&otf=1&ssel=0&tsel=0&kc=1&tk=11", {})
    .then((res) => {
        console.log("ok=>", res.data);
    })
    .catch((err) => {
        // console.error(err);
    });
